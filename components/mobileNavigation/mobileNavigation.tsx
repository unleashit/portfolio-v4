'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { GlobalContext } from '@/lib/clientState/context';
import { TOGGLE_HAMBURGER } from '@/lib/clientState/reducer';
import styles from './mobile-navigation.module.scss';
import clsx from 'clsx';

interface MobileNavigationProps {
  // menuVisible?: boolean;
  children: ReactNode;
}
export default function MobileNavigation({
  children,
}: // menuVisible = false,
MobileNavigationProps) {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const de = document.documentElement;

    if (state.hamburgerState) {
      de.classList.add('mobile-menu-open');
    } else {
      de.classList.remove('mobile-menu-open');
    }
    return () => {
      de.classList.remove('mobile-menu-open');
    };
  }, [state.hamburgerState]);

  const closeBurger = () => {
    dispatch({ type: TOGGLE_HAMBURGER });
  };

  return (
    <div
      className={clsx(
        styles.respMenu,
        'd-none-md',
        !state.hamburgerState && styles.off
      )}
    >
      <div className={styles.closeMenu} onClick={closeBurger}>
        <i className="fa fa-close" /> CLOSE
      </div>
      <h3 className={styles.name}>Jason Gallagher</h3>
      <h3 className={styles.title}>Front End Engineer</h3>
      <div onClick={closeBurger}>{children}</div>
    </div>
  );
}
