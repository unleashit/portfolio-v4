import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation/navigation';
import { getHomeBlocks } from '../../app/data';
import { findKeyWithValue } from '@/lib/utils';
import { CMSMarkup } from '@/components/common/CMSMarkup';
import Hamburger from '@/components/home/hamburger';
import { getImages } from '@/lib/services/fetchImages';
import styles from './header.module.scss';
import { ASSETS_URL } from '@/lib/constants';
import { CustomCSSProperties } from '@/lib/types/global';

export default async function Header() {
  const blocks = await getHomeBlocks();
  const [main, hidpi, fallback] = await getImages(
    `${ASSETS_URL}/a9824768-3995-46a6-a3c8-5a5689778498/header-image.webp?width=3000`,
    `${ASSETS_URL}/a9824768-3995-46a6-a3c8-5a5689778498/header-image.webp`,
  );

  const fEE = findKeyWithValue(blocks, 'title', 'Front End Engineer');

  return (
    <header
      className={styles.mainHeader}
      style={
        {
          backgroundImage: `url('/assets/${fallback}')`,
          '--background-image-webp': `url('/assets/${main}')`,
          '--background-image-hidpi': `url('/assets/${hidpi}')`,
        } as CustomCSSProperties
      }
    >
      <Hamburger />
      <Navigation />
      <div className={styles.titleTaglineWrapper}>
        <h1>{fEE.title}</h1>
        <CMSMarkup html={fEE.content} name={'front end engineer'} />
      </div>
      <div className={styles.buttonWrapper}>
        <Link href="/#work">
          <button className="button button-green">See my work</button>
        </Link>
      </div>
    </header>
  );
}
