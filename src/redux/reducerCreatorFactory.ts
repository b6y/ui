/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { History } from "history";
import { combineReducers, Reducer } from "redux";

import { languageProviderReducer } from "../core/LanguageProvider/reducer";
import { Reducers } from "./store";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function reducerCreatorFactory(history: History, reducers: Reducers) {
  return function createReducer(injectedReducers = {}) {
    return combineReducers({
      ...reducers,
      language: languageProviderReducer,
      ...injectedReducers,
    });
  };
}
