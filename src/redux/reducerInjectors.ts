import checkStore from "./checkStore";

import { Reducer, Store } from "../redux";

export function injectReducerFactory(store: Store, isValid?: boolean) {
  return function injectReducer(key: string, reducer: Reducer) {
    if (!isValid) { checkStore(store); }

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a
    // key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    ) {
      return;
    }

    store.mergeReducers({ [key]: reducer });
  };
}

export default function getInjectors(store: Store) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
