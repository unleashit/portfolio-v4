import React from 'react';
import Link from 'next/link';
import { ASSETS_URL } from '@/lib/constants';
import { DirectusFiles, Project } from '@/services/types/directus';
import { sluggify } from '@/lib/utils';
import styles from './portfolio.module.scss';
import Img from '@/components/common/Img';

export type ProjectWithMeta = Omit<Project, 'image_logo'> & {
  image_logo: DirectusFiles;
};

export default function PortfolioItem({ item }: { item: ProjectWithMeta }) {
  const {
    image_logo: { width, type },
  } = item;

  return (
    <div className={styles.portfolioItem}>
      <Link href={'/portfolio/' + item.slug}>
        <div className={styles.viewDetails}>
          <span>Learn More</span>
        </div>
        <div>
          <Img
            src={`${ASSETS_URL}/${item.image_logo.id}/${sluggify(
              item.title,
            )}.${type === 'image/svg+xml' ? 'svg' : 'webp'}?format=webp${width ? '&width=' + Math.ceil(+width * 0.8) : ''}`}
            hidpi={`${ASSETS_URL}/${item.image_logo.id}/${sluggify(
              item.title,
            )}.webp?format=webp${width ? '&width=' + width : ''}`}
            alt={item.title}
            loading="lazy"
          />
          <div className={styles.portfolioCaption}>
            <p>{item.decription_short}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
