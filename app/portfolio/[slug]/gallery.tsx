import Link from 'next/link';
import { Project } from '@/services/types/directus';
import { ASSETS_URL } from '@/lib/constants';
import { getProjects } from '../../data';
import styles from './portfolio.module.scss';
import { sluggify } from '@/lib/utils.new';
import Img from '@/components/common/Img';
import { ProjectWithMeta } from '@/services/types/directus.data';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  project: ProjectWithMeta;
  slug: string;
}) {
  const projects = await getProjects();
  const { prev, next } = getNextPrevSlugs(projects, slug);
  const { width, height } = image_main;

  return (
    <>
      <div className={`${styles.gallery}`}>
        <Img
          src={`${ASSETS_URL}/${image_main.id}/${sluggify(
            title
          )}.webp?format=webp${width && '&width=650'}`}
          hidpi={`${ASSETS_URL}/${image_main.id}/${sluggify(
            title
          )}.webp?format=webp`}
          {...(width && { width })}
          {...(height && { height })}
          alt={title}
        />
      </div>
      {image_mobile && (
        <div className={`d-none d-lg-block ${styles.mobileImage}`}>
          <Img
            src={`${ASSETS_URL}/${image_mobile.id}/${sluggify(
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
            <FontAwesomeIcon icon={faExternalLink} />
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
