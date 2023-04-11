'use client';

import { TOGGLE_HAMBURGER } from '@/lib/clientState/reducer';
import { useContext } from 'react';
import { GlobalContext } from '@/components/providers';

const Hamburger = () => {
  const { dispatch } = useContext(GlobalContext);
  const toggleHamburger = () => {
    dispatch({ type: TOGGLE_HAMBURGER });
  };

  return (
    <div className="hamburger d-md-none container-fluid">
      <div onClick={toggleHamburger}>
        <i className="fa fa-bars" /> MENU
      </div>
    </div>
  );
};

export default Hamburger;
