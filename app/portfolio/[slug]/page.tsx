import { getProjectBySlug } from './data';
import Gallery from './gallery';
import Tags from './tags';
import styles from './portfolio.module.scss';
import { CMSMarkup } from '@/components/common/CMSMarkup';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProjects } from '../../data';

type PageProps = { params: { slug: string } };

// const Loading = () => {
//   console.log('LOADING.......');
//   return <div>loading..........</div>;
// };

async function PortfolioDetail({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);

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
        <div className={`col-lg-6 ${styles.gallery}`}>
          {/* @ts-expect-error Server Component */}
          <Gallery project={project} slug={params.slug} />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default PortfolioDetail;

export const dynamicParams = false;
