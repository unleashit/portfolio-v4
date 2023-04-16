import React from 'react';
import Link from 'next/link';
import { assetsURL } from '@/lib/constants';
import { DirectusFiles, Project } from '../../directus';
import { sluggify } from '@/lib/utils.new';
import styles from './portfolio.module.scss';
import Img from '@/components/common/Img';

export default function PortfolioItem({
  item,
}: // index,
// color,
{
  item: Omit<Project, 'image_logo'> & {
    image_logo: DirectusFiles;
  };
  index: any;
  color: string;
}) {
  // const color = {
  //   backgroundColor: this.props.color,
  // };
  return (
    <div className={styles.portfolioItem}>
      <Link href={'/portfolio/' + item.slug}>
        <div className={styles.viewDetails}>
          <span>Learn More</span>
        </div>
        <div>
          <Img
            src={`${assetsURL}/${item.image_logo.id}/${sluggify(
              item.title
            )}.webp?format=webp`}
            alt={item.title}
            {...(item.image_logo.width && { width: item.image_logo.width })}
            {...(item.image_logo.height && { height: item.image_logo.height })}
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
