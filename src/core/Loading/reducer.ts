import { AnyAction } from "redux";

import { SET_STATE } from "./constants";

// The initial state of the App
const initialState = {};

interface Action extends AnyAction {
  type: string;
  data?: any;
}

export function coreLoadingReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SET_STATE:
      return {
        ...state,
        [action.data.name]: action.data.state,
      };
    default:
      return state;
  }
}
