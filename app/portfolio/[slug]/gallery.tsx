import Link from 'next/link';
import { Project } from '../../../directus';
import { assetsURL } from '@/lib/constants';
import { getProjects } from '../../data';

const getNextPrevSlugs = (projects: Project[], currSlug: string) => {
  const currIdx = projects.findIndex((p) => p.slug === currSlug);
  return {
    prev: currIdx - 1 < 0 ? null : projects[currIdx - 1].slug,
    next: currIdx + 1 > projects.length - 1 ? null : projects[currIdx + 1].slug,
  };
};

async function Gallery({
  project: { image_mobile, image_main, link },
  slug,
}: {
  project: Project;
  slug: string;
}) {
  const projects = await getProjects();
  const { prev, next } = getNextPrevSlugs(projects, slug);

  return (
    <>
      <div className="gallery">
        <img src={`${assetsURL}/${image_main}?format=webp`} alt="" />
      </div>
      {image_mobile && (
        <div className="d-none d-lg-block mobile-image">
          <img src={`${assetsURL}/${image_mobile}?format=webp`} alt="" />
        </div>
      )}
      <div className="d-lg-none visit-site-link">
        <a href={link ? link : '#'} target="_blank">
          <button className="button button-smaller">
            VISIT SITE &nbsp;&nbsp;
            <i className="fa fa-external-link" />
          </button>
        </a>
      </div>
      <div className="next-prev-btns">
        {prev && (
          <Link href={'/portfolio/' + prev}>
            <button className="button button-xs">Previous</button>
          </Link>
        )}
        {next && (
          <Link href={'/portfolio/' + next}>
            <button className="button button-xs">Next</button>
          </Link>
        )}
      </div>
    </>
  );
}

export default Gallery;
