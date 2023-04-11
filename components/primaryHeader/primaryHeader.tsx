'use client';

import { useContext, useEffect } from 'react';
import { GlobalContext } from '@/lib/clientState/context';
import { SET_HEADER, TOGGLE_HAMBURGER } from '@/lib/clientState/reducer';
// import OpenChat from "../ReactHelpDesk/client/openChat";
// import LiveChatStatus from "../ReactHelpDesk/client/liveChatStatus";
import throttle from 'lodash/throttle';

export function PrimaryHeader({
  isHome = false,
  children,
}: {
  visible?: boolean;
  isHome?: boolean;
  children: React.ReactNode;
}) {
  const { state, dispatch } = useContext(GlobalContext);
  useEffect(() => {
    if (!isHome) {
      dispatch({ type: SET_HEADER, payload: true });
      return;
    }

    const handleScroll = throttle(() => {
      const top = window.scrollY;

      // handle primary header
      if (top >= 250) {
        document.documentElement.classList.add('sticky-menu-open');
        dispatch({ type: SET_HEADER, payload: true });
      } else if (top < 250) {
        document.documentElement.classList.remove('sticky-menu-open');
        dispatch({ type: SET_HEADER, payload: false });
      }
    }, 150);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('UMOUNTING');
      document.documentElement.classList.remove('sticky-menu-open');
      if (state.headerState) {
        dispatch({ type: SET_HEADER, payload: false });
      }
    };
    // eslint-disable-next-line
  }, [isHome]);

  const toggleHamburger = () => {
    dispatch({ type: TOGGLE_HAMBURGER });
  };

  return (
    <div className={`sticky-header${state.headerState ? ' on' : ' off'}`}>
      <div className="container-fluid">
        {children}
        <div
          className="hamburger-alt d-sm-none float-end"
          onClick={toggleHamburger}
        >
          <i className="fa fa-bars" /> &nbsp;MENU
        </div>
        {/*<div className="contact-info pull-right hidden-xs-down">*/}
        {/*  <div>*/}
        {/*    <span className="chat-status">*/}
        {/*      <OpenChat>*/}
        {/*        <LiveChatStatus remoteId={this.props.remoteId} />*/}
        {/*      </OpenChat>*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

// StickyHeader.propTypes = {
//   visible: PropTypes.bool,
//   openBurger: PropTypes.func.isRequired,
//   remoteId: PropTypes.string.isRequired,
// };
