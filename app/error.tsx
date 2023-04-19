'use client';

import { useEffect } from 'react';
import styles from './error.module.scss';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorBoundary}>
      <h2>Application Error</h2>
      <p>Something went wrong, or lost connection to the internet</p>
      <button className="button button-green" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
