'use client';

import { ReactNode, useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '@/lib/clientState/context';
import { TOGGLE_HAMBURGER } from '@/lib/clientState/reducer';
import styles from './mobile-menu.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface MobileNavigationProps {
  children: ReactNode;
}
export default function MobileMenu({ children }: MobileNavigationProps) {
  const { state, dispatch } = useContext(GlobalContext);
  const body = useRef<HTMLElement | null>(null);

  useEffect(() => {
    body.current = document.body;

    if (state.hamburgerState) {
      body.current.classList.add('mobile-menu-open');
    } else {
      body.current.classList.remove('mobile-menu-open');
    }
    return () => {
      body.current && body.current.classList.remove('mobile-menu-open');
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
        <FontAwesomeIcon icon={faClose} /> CLOSE
      </div>
      <h3 className={styles.name}>Jason Gallagher</h3>
      <h3 className={styles.title}>Front End Engineer</h3>
      <div onClick={closeBurger}>{children}</div>
    </div>
  );
}
