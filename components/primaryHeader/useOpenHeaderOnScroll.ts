import { useContext, useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';
import { SET_HEADER } from '@/lib/clientState/reducer';
import { GlobalContext } from '@/lib/clientState/context';

function useOpenHeaderOnScroll(isHome: boolean) {
  const { state, dispatch } = useContext(GlobalContext);
  const body = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isHome) {
      return;
    }
    const handleScroll = throttle(() => {
      body.current = document.body;
      const top = window.scrollY;

      // handle primary header
      if (top >= 250) {
        body.current.classList.add('primary-header-open');
        dispatch({ type: SET_HEADER, payload: true });
      } else if (top < 250) {
        body.current.classList.remove('primary-header-open');
        dispatch({ type: SET_HEADER, payload: false });
      }
    }, 150);

    // run once on mount to detect if user arrived at a scrolled position
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      body.current && body.current.classList.remove('primary-header-open');
      if (state.headerState) {
        dispatch({ type: SET_HEADER, payload: false });
      }
    };
    // eslint-disable-next-line
  }, [isHome]);
}

export default useOpenHeaderOnScroll;
