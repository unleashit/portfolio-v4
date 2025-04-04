import { getProjectBySlug } from './data';
import Gallery from './gallery';
import Tags from './tags';
import { Metadata } from 'next';
import styles from './portfolio.module.scss';
import { CMSMarkup } from '@/components/common/CMSMarkup';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProjects } from '../../data';
import { META_DEFAULT_DESC } from '@/lib/constants';

type Params = Promise<{ slug: string; description: string }>;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

async function PortfolioDetail(props: { params: Params }) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  return (
    <div className={`${styles.portfolioDetail} container-fluid`}>
      <div className="row">
        <div className="col-lg-4">
          <h3>{project.title}</h3>
          <div>
            <CMSMarkup html={project.description} name="project-description" />
          </div>
          <Tags tags={project.tags} />
          <div className={`d-none d-lg-block ${styles.visitSiteLink}`}>
            <a href={project.link ? project.link : '#'} target="_blank">
              <button className="button button-smaller">
                VISIT SITE &nbsp;&nbsp;
                <FontAwesomeIcon icon={faExternalLink} />
              </button>
            </a>
          </div>
        </div>
        <div className={`col-lg-6`} style={{ position: 'relative' }}>
          <Gallery project={project} slug={slug} />
        </div>
      </div>
    </div>
  );
}

export default PortfolioDetail;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const { description } = await getProjectBySlug(slug);
  const titleSlug = slug
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: titleSlug,
    description: description || `${slug} - ${META_DEFAULT_DESC}`,
    alternates: {
      canonical: `https://jasongallagher.org/portfolio/${slug}`,
    },
  };
}
