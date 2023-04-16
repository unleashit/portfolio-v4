import { useContext, useEffect } from 'react';
import throttle from 'lodash/throttle';
import { SET_HEADER } from '@/lib/clientState/reducer';
import { GlobalContext } from '@/lib/clientState/context';

function useOpenHeaderOnScroll(isHome: boolean) {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const handleScroll = throttle(() => {
      const top = window.scrollY;

      // handle primary header
      if (top >= 250) {
        document.documentElement.classList.add('primary-header-open');
        dispatch({ type: SET_HEADER, payload: true });
      } else if (top < 250) {
        document.documentElement.classList.remove('primary-header-open');
        dispatch({ type: SET_HEADER, payload: false });
      }
    }, 150);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.classList.remove('primary-header-open');
      if (state.headerState) {
        dispatch({ type: SET_HEADER, payload: false });
      }
    };
    // eslint-disable-next-line
  }, [isHome]);
}

export default useOpenHeaderOnScroll;
