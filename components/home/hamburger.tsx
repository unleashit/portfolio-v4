'use client';

import { TOGGLE_HAMBURGER } from '@/lib/clientState/reducer';
import { useCallback, useContext } from 'react';
import { GlobalContext } from '@/lib/clientState/context';
import styles from './header.module.scss';
import clsx from 'clsx';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Hamburger = () => {
  const { dispatch } = useContext(GlobalContext);
  const toggleHamburger = useCallback(() => {
    dispatch({ type: TOGGLE_HAMBURGER });
  }, [dispatch]);

  return (
    <div className={clsx(styles.hamburger, 'd-md-none', 'container-fluid')}>
      <div onClick={toggleHamburger}>
        <FontAwesomeIcon icon={faBars} /> MENU
      </div>
    </div>
  );
};

export default Hamburger;
