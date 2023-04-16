import Link from 'next/link';
import { DirectusFiles, Project } from '../../../directus';
import { assetsURL } from '@/lib/constants';
import { getProjects } from '../../data';
import styles from './portfolio.module.scss';
import { sluggify } from '@/lib/utils.new';
import Img from '@/components/common/Img';

const getNextPrevSlugs = (projects: Project[], currSlug: string) => {
  // get slugs for next/prev links
  const currIdx = projects.findIndex((p) => p.slug === currSlug);
  return {
    prev: currIdx - 1 < 0 ? null : projects[currIdx - 1].slug,
    next: currIdx + 1 > projects.length - 1 ? null : projects[currIdx + 1].slug,
  };
};

async function Gallery({
  project: { image_mobile, image_main, link, title },
  slug,
}: {
  project: Omit<Project, 'image_main' | 'image_mobile'> & {
    image_main: DirectusFiles;
    image_mobile: DirectusFiles;
  };
  slug: string;
}) {
  const projects = await getProjects();
  const { prev, next } = getNextPrevSlugs(projects, slug);

  return (
    <>
      <div className={`${styles.gallery}`}>
        <Img
          src={`${assetsURL}/${image_main.id}/${sluggify(
            title
          )}.webp?format=webp`}
          {...(image_main.width && { width: image_main.width })}
          {...(image_main.height && { height: image_main.height })}
          alt={title}
        />
      </div>
      {image_mobile && (
        <div className={`d-none d-lg-block ${styles.mobileImage}`}>
          <Img
            src={`${assetsURL}/${image_mobile.id}/${sluggify(
              title
            )}-mobile.webp?format=webp`}
            alt={`${title} mobile version`}
          />
        </div>
      )}
      <div className={`d-lg-none ${styles.visitSiteLink}`}>
        <a href={link ? link : '#'} target="_blank">
          <button className="button button-smaller">
            VISIT SITE &nbsp;&nbsp;
            {/*<i className="fa fa-external-link" />*/}
          </button>
        </a>
      </div>
      <div className={`${styles.nextPrevBtns}`}>
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
