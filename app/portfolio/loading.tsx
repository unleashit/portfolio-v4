'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import styles from './loading.module.scss';

export default function PLoader() {
  return (
    <div className={styles.loading}>
      <FontAwesomeIcon icon={faRotate} size="5x" spin color="#ddd" />
    </div>
  );
}
