import React from 'react';
import { getHomeBlocks } from '../../app/data';
import { findKeyWithValue } from '@/lib/utils.new';
import { CMSMarkup } from '@/components/common/CMSMarkup';
import { assetsURL } from '@/lib/constants';
import styles from './whoWhatWhere.module.scss';

export default async function WhoWhatWhere() {
  const blocks = await getHomeBlocks();
  const whoiam = findKeyWithValue(blocks, 'title', 'Who I Am');
  const whatido = findKeyWithValue(blocks, 'title', 'What I do');
  const whereiam = findKeyWithValue(blocks, 'title', "Where I'm located");

  return (
    <section className={`${styles.whoWhatWhere} container-fluid`}>
      <div className="row">
        <div className="col-md-4">
          <h3>{whoiam.title}</h3>
          <CMSMarkup html={whoiam.content} name={'whoami'} />
          <img
            src={`${assetsURL}/${whoiam.image}/who-i-am.webp?height=132&format=webp`}
            srcSet={`${assetsURL}/${whoiam.image}/who-i-am.webp?height=195&format=webp 1.1x`}
            alt={whoiam.title}
            className={styles.whoIamImage}
          />
        </div>
        <div className="col-md-4">
          <h3>{whatido?.title}</h3>
          <CMSMarkup html={whatido.content} name={'whatido'} />
          <img
            src={`${assetsURL}/${whatido.image}/what-i-do.webp?height=132&format=webp`}
            srcSet={`${assetsURL}/${whatido.image}/what-i-do.webp?height=195&format=webp 1.1x`}
            alt={whatido.title}
            className={styles.whatIdoImage}
          />
        </div>
        <div className="col-md-4">
          <h3>{whereiam.title}</h3>
          <CMSMarkup html={whereiam.content} name={'whereiam'} />
          <img
            src={`${assetsURL}/${whereiam.image}/where-i-am.webp?height=132&format=webp`}
            srcSet={`${assetsURL}/${whereiam.image}/where-i-am.webp?height=195&format=webp 1.1x`}
            alt={whereiam.title}
            className={styles.whereIamImage}
          />
        </div>
      </div>
    </section>
  );
}
