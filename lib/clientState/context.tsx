"use client";

import * as React from "react";
import { initialState, GlobalState } from "@/lib/clientState/reducer";
import type { Action } from "@/lib/clientState/reducer";

export type GlobalContextType = {
  state: GlobalState;
  dispatch: (action: Action) => void;
};

export const GlobalContext = React.createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => undefined,
});
