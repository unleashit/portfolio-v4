"use client";

import * as React from "react";
import { initialState, reducer } from "@/lib/clientState/reducer";
import type { Action, GlobalState } from "@/lib/clientState/reducer";
import { GlobalContext } from "@/lib/clientState/context";
import { arrayEquals } from "@/lib/utils.new";

const handleLocalStorage = (
  state: GlobalState,
  dispatch: React.Dispatch<Action>
) => {
  let appState: GlobalState | undefined;

  try {
    const rawState = localStorage.getItem("appState");
    appState = rawState && JSON.parse(rawState);

    // disallow user from altering state keys?
    if (
      appState &&
      !arrayEquals(Object.keys(appState), Object.keys(initialState))
    ) {
      throw new Error("Unexpected state detected. Resetting to initial state");
    }
  } catch (err) {
    console.error(err);
    appState = initialState;
  }

  if (appState && Object.is(state, initialState) && state !== appState) {
    // state is initial state but localstorage has a not null value
    // user lost session so rehydrate context from localstorage
    dispatch({ type: "rehydrate", payload: appState });
  } else {
    // update localstorage on every update for now...
    localStorage.setItem("appState", JSON.stringify(state));
  }
};

function GlobalState({ children }: React.PropsWithChildren) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    // set local storage on state change or rehydrate on session loss
    handleLocalStorage(state, dispatch);
  }, [state, dispatch]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;

// export default function Providers({ children }: { children: React.ReactNode }) {
//   return <GlobalState>{children}</GlobalState>;
// }