import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation/navigation';
import { getHomeBlocks } from '../../app/data';
import { findKeyWithValue } from '@/lib/utils.new';
import { CMSMarkup } from '@/components/common/CMSMarkup';
import Hamburger from '@/components/home/hamburger';
import styles from './header.module.scss';

export default async function Header() {
  const blocks = await getHomeBlocks();
  const fEE = findKeyWithValue(blocks, 'title', 'Front End Engineer');

  return (
    <header className={styles.mainHeader}>
      <Hamburger />
      {/* @ts-expect-error Server Component */}
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
