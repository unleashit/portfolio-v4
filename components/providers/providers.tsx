'use client';

import * as React from 'react';
import ReactDOM from 'react-dom';
import { initialState, reducer } from '@/lib/clientState/reducer';
import type { GlobalState } from '@/lib/clientState/reducer';
import { GlobalContext } from '@/lib/clientState/context';
// import { arrayEquals } from '@/lib/utils';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faFileText,
  faEnvelope,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
// import isEqual from 'lodash/isEqual';

// const handleLocalStorage = (
//   state: GlobalState,
//   dispatch: React.Dispatch<Action>
// ) => {
//   let appState: GlobalState | undefined;
//
//   try {
//     const rawState = localStorage.getItem('appState');
//     appState = rawState && JSON.parse(rawState);
//
//     // disallow user from altering state keys?
//     // if (
//     //   appState &&
//     //   !arrayEquals(Object.keys(appState), Object.keys(initialState))
//     // ) {
//     //   throw new Error('Unexpected state detected. Resetting to initial state');
//     // }
//   } catch (err) {
//     console.error(err);
//     appState = initialState;
//   }
//
//   if (appState && !isEqual(state, appState) && isEqual(state, initialState)) {
//     // state is initial state but localstorage has a not null value
//     // user lost session so rehydrate context from localstorage
//     dispatch({ type: 'rehydrate', payload: appState });
//   } else {
//     // update localstorage on every update for now...
//     localStorage.setItem('appState', JSON.stringify(state));
//   }
// };

// function getInitialorLocalState() {
//   if (typeof window === 'undefined') return initialState;
//
//   const json = localStorage.getItem('appState');
//   const appState = json && JSON.parse(json);
//   return appState ? appState : initialState;
// }

function AddMetaData({ children }: { children: React.ReactNode }) {
  let backgroundImg;
  if (typeof window !== 'undefined') {
    backgroundImg =
      window.innerWidth > 3000
        ? '/assets/header-image-hidpi-a9824768-3995-46a6-a3c8-5a5689778498.webp'
        : '/assets/header-image-main-a9824768-3995-46a6-a3c8-5a5689778498.webp';
  }

  backgroundImg &&
    ReactDOM.preload(backgroundImg, {
      as: 'image',
      type: 'image/webp',
      fetchPriority: 'high',
    });

  return children;
}

function FontAwesome({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    dom.watch();
    library.add(faFileText, faEnvelope, faComments, faGithub);
  }, []);

  // React.useEffect(() => {
  //   window.document.scrollingElement?.scrollTo(0, 0);
  // });

  // const { state, dispatch } = React.useContext(GlobalContext);

  // React.useEffect(() => {
  //   // set local storage on state change or rehydrate on session loss
  //   handleLocalStorage(state, dispatch);
  // }, [state, dispatch]);

  return children;
}

function GlobalState({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

// export default GlobalState;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalState>
      <AddMetaData>
        <FontAwesome>{children}</FontAwesome>
      </AddMetaData>
    </GlobalState>
  );
}
