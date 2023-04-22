'use client';

import { CSSProperties, useEffect } from 'react';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cssModule from './loader.module.scss';

interface LoaderProps {
  height?: string;
  styles?: CSSProperties;
}

const Loader = ({ height, styles }: LoaderProps) => {
  useEffect(() => {
    console.log('LOADING...');
  }, []);

  return (
    <div
      className={cssModule.loading}
      {...(styles && { styles: styles })}
      {...(height && { styles: { height } })}
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
