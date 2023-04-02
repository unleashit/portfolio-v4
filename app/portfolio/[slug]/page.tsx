import { getProjects } from '../../data';
import { getProjectBySlug } from './data';
import Gallery from './gallery';
import Tags from './tags';
import style from './portfolio.module.scss';

type PageProps = { params: { slug: string } };

async function PortfolioDetail({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);

  return (
    <div className="portfolio-detail container-fluid">
      <div className="row">
        <div className="col-lg-4">
          <h3>{project.title}</h3>
          <div>{project.description}</div>
          <Tags tags={project.tags} />
          <div className="hidden-md-down visit-site-link">
            <a href={project.link ? project.link : '#'} target="_blank">
              <button className="button button-smaller">
                VISIT SITE &nbsp;&nbsp;
                <i className="fa fa-external-link" />
              </button>
            </a>
          </div>
        </div>
        <div className={`col-lg-6 ${style.gallery}`}>
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
