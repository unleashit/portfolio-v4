export interface Action {
  type: string;
  payload?: unknown;
}

type State = (state: GlobalState, action: Action) => GlobalState;

export interface GlobalState {
  headerState: boolean;
  hamburgerState: boolean;
  animateAbout: boolean;
  animatePortfolio: boolean;
  animateContact: boolean;
  animateOff: boolean;
}

export const TOGGLE_HAMBURGER = "TOGGLE_HAMBURGER";
// export const OPEN_HAMBURGER = "OPEN_HAMBURGER";
// export const CLOSE_HAMBURGER = "CLOSE_HAMBURGER";
export const SET_HEADER = "SET_HEADER";
export const ANIMATE_ABOUT = "ANIMATE_ABOUT";
export const ANIMATE_PORTFOLIO = "ANIMATE_PORTFOLIO";
export const ANIMATE_CONTACT = "ANIMATE_CONTACT";
export const ANIMATE_OFF = "ANIMATE_OFF";
export const REHYDRATE = "REHYDRATE";

export const initialState: GlobalState = {
  headerState: false,
  hamburgerState: false,
  animateAbout: false,
  animatePortfolio: false,
  animateContact: false,
  animateOff: false,
};

export const reducer: State = (state, action) => {
  switch (action.type) {
    case TOGGLE_HAMBURGER:
      return { ...state, hamburgerState: !state.hamburgerState };
    // case OPEN_HAMBURGER:
    //   return Object.assign({}, state, {
    //     hamburgerState: true,
    //     htmlClass: "menu-open",
    //   });
    // case CLOSE_HAMBURGER:
    //   return Object.assign({}, state, {
    //     hamburgerState: false,
    //     htmlClass: null,
    //   });
    case SET_HEADER:
      return Object.assign({}, state, {
        headerState: action.payload,
      });
    case ANIMATE_ABOUT:
      return Object.assign({}, state, {
        animateAbout: action.payload,
      });
    case ANIMATE_PORTFOLIO:
      return Object.assign({}, state, {
        animatePortfolio: action.payload,
      });
    case ANIMATE_CONTACT:
      return Object.assign({}, state, {
        animateContact: action.payload,
      });
    case ANIMATE_OFF:
      return Object.assign({}, state, {
        animateOff: action.payload,
      });
    case REHYDRATE:
      return Object.assign({}, action.payload as GlobalState);

    default:
      return state;
  }
};
