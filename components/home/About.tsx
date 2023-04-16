import Skills from '@/components/home/Skills';
import { getHomeBlocks } from '../../app/data';
import { findKeyWithValue } from '@/lib/utils.new';
import { CMSMarkup } from '@/components/common/CMSMarkup';
import { assetsURL } from '@/lib/constants';
import styles from './about.module.scss';

// interface AboutProps {
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   animation: Function;
// }

export default async function About() {
  const blocks = await getHomeBlocks();
  const about = findKeyWithValue(blocks, 'title', 'About Me');

  return (
    <section className={`${styles.about} container-fluid`} id="about">
      <div className="row">
        <div className="col-lg-8">
          <h3>About Me</h3>
          <div className="row">
            <div className="col-md-3 col-xl-3">
              <img
                src={`${assetsURL}/789eb936-f215-4ac8-b679-e7c360206472/me.webp?format=webp`}
                alt="Jason Gallagher, Full Stack Engineer"
                className={styles.jgImage}
              />
            </div>
            <div className="col-md-9 col-xl-9">
              <CMSMarkup html={about.content} name="content" />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className={`${styles.skills} col-lg-12`} id="skills">
            {/* @ts-expect-error Server Component */}
            <Skills />
          </div>
        </div>
      </div>
    </section>
  );
}
