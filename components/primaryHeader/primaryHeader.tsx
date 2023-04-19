'use client';

import { ReactNode, useCallback, useContext } from 'react';
import { GlobalContext } from '@/lib/clientState/context';
import { TOGGLE_HAMBURGER } from '@/lib/clientState/reducer';
// import OpenChat from "../ReactHelpDesk/client/openChat";
// import LiveChatStatus from "../ReactHelpDesk/client/liveChatStatus";
import styles from './header.module.scss';
import clsx from 'clsx';
import useOpenHeaderOnScroll from '@/components/primaryHeader/useOpenHeaderOnScroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export function PrimaryHeader({
  isHome = false,
  children,
}: {
  visible?: boolean;
  isHome?: boolean;
  children: ReactNode;
}) {
  const { state, dispatch } = useContext(GlobalContext);

  // Show sticky header when user scrolls down
  useOpenHeaderOnScroll(isHome);

  const toggleHamburger = useCallback(() => {
    dispatch({ type: TOGGLE_HAMBURGER });
  }, [dispatch]);

  return (
    <div
      className={clsx(
        styles.primaryHeader,
        !isHome && styles.interior,
        !isHome || state.headerState ? styles.on : styles.off
      )}
    >
      <div className="container-fluid">
        {children}
        <div
          className={`${styles.hamburgerAlt} d-md-none float-end`}
          onClick={toggleHamburger}
        >
          <FontAwesomeIcon icon={faBars} /> &nbsp;MENU
        </div>
        <div className={`${styles.contactInfo} float-end d-sm-block`}>
          <div>
            {/*<span className="chat-status">*/}
            {/*<OpenChat>*/}
            {/*  <LiveChatStatus remoteId={this.props.remoteId} />*/}
            {/*</OpenChat>*/}
            {/*</span>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
