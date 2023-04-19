import React from 'react';
import { getHomeBlocks } from '../../app/data';
import { findKeyWithValue } from '@/lib/utils';
import { CMSMarkup } from '@/components/common/CMSMarkup';
import { ASSETS_URL } from '@/lib/constants';
import styles from './whoWhatWhere.module.scss';
import Img from '@/components/common/Img';

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
          <Img
            src={`${ASSETS_URL}/${whoiam.image.id}/who-i-am.webp?height=132&format=webp`}
            hidpi={`${ASSETS_URL}/${whoiam.image.id}/who-i-am.webp?height=195&format=webp`}
            alt={whoiam.title}
            className={styles.whoIamImage}
            {...(whoiam.image.width && { width: whoiam.image.width })}
            {...(whoiam.image.height && { height: whoiam.image.height })}
          />
        </div>
        <div className="col-md-4">
          <h3>{whatido?.title}</h3>
          <CMSMarkup html={whatido.content} name={'whatido'} />
          <Img
            src={`${ASSETS_URL}/${whatido.image.id}/what-i-do.webp?height=132&format=webp`}
            hidpi={`${ASSETS_URL}/${whatido.image.id}/what-i-do.webp?height=195&format=webp`}
            alt={whatido.title}
            className={styles.whatIdoImage}
            {...(whatido.image.width && { width: whatido.image.width })}
            {...(whatido.image.height && { height: whatido.image.height })}
          />
        </div>
        <div className="col-md-4">
          <h3>{whereiam.title}</h3>
          <CMSMarkup html={whereiam.content} name={'whereiam'} />
          <Img
            src={`${ASSETS_URL}/${whereiam.image.id}/where-i-am.webp?height=132&format=webp`}
            hidpi={`${ASSETS_URL}/${whereiam.image.id}/where-i-am.webp?height=195&format=webp`}
            alt={whereiam.title}
            className={styles.whereIamImage}
            {...(whereiam.image.width && { width: whereiam.image.width })}
            {...(whereiam.image.height && { height: whereiam.image.height })}
          />
        </div>
      </div>
    </section>
  );
}
