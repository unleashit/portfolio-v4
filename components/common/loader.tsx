'use client';

import React from 'react';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './loader.module.scss';

interface LoaderProps {
  height?: number;
  style?: React.CSSProperties;
}

const Loader = ({ height, style }: LoaderProps) => {
  return (
    <div
      className={styles.loading}
      {...(height && { height })}
      {...(style && { styles: style })}
    >
      <FontAwesomeIcon
        icon={faRotate}
        size="5x"
        spin
        color="var(--jg-lime-green-light)"
      />
    </div>
  );
};

export default Loader;
