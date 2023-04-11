'use client';

import { ReactNode, useContext } from 'react';
import { GlobalContext } from '@/lib/clientState/context';
import { TOGGLE_HAMBURGER } from '@/lib/clientState/reducer';

interface MobileNavigationProps {
  // menuVisible?: boolean;
  children: ReactNode;
}
export default function MobileNavigation({
  children,
}: // menuVisible = false,
MobileNavigationProps) {
  const { state, dispatch } = useContext(GlobalContext);
  const closeBurger = () => {
    dispatch({ type: TOGGLE_HAMBURGER });
  };

  const classes = `resp-menu d-none-md${state.hamburgerState ? ' on' : ' off'}`;

  return (
    <div className={classes}>
      <div className="close-menu" onClick={closeBurger}>
        <i className="fa fa-close" /> CLOSE
      </div>
      <h3 className="name">Jason Gallagher</h3>
      <h3 className="title">Front End Engineer</h3>
      <div onClick={closeBurger}>{children}</div>
    </div>
  );
}
