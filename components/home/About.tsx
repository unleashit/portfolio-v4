import Skills from '@/components/home/Skills';
import { getHomeBlocks } from '../../app/data';
import { findKeyWithValue } from '@/lib/utils.new';
import { CMS } from '@/components/common/cms';
import { assetsURL } from '@/lib/constants';

interface AboutProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  animation: Function;
}

export default async function About({ animation }: AboutProps) {
  const blocks = await getHomeBlocks();
  const about = findKeyWithValue(blocks, 'title', 'About Me');

  return (
    <section className={animation() + 'about container-fluid'} id="about">
      <div className="row">
        <div className="col-md-8">
          <h3>About Me</h3>
        </div>
        <div className="col-md-4 hidden-md-down">
          <h3>Skills</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3 col-lg-2">
          <img
            src={`${assetsURL}/789eb936-f215-4ac8-b679-e7c360206472/me.webp?format=webp`}
            alt="Jason Gallagher"
            className="jg-image"
          />
        </div>
        <div className="col-sm-9 col-lg-6">
          <CMS html={about.content} name="content" />
        </div>
        <div className="skills col-lg-4 clearfix" id="skills">
          <h3 className="hidden-lg-up">Skills</h3>
          {/* @ts-expect-error Server Component */}
          <Skills />
        </div>
      </div>
    </section>
  );
}
