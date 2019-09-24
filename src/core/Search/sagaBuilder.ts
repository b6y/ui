import { put, select, takeEvery } from "redux-saga/effects";

import { BuiltSearch } from "./index";

import { View } from "./types";

import { Query } from "../../search";

export default <AdapterContext>(builtSearch: BuiltSearch<AdapterContext>) => {
  const {
    DO_SEARCH,
    DO_REGISTER,
    REGISTER,
    DO_REGISTER_AND_SEARCH,
  } = builtSearch.constants;
  const { setLoading, setCurrent } = builtSearch.actions;

  function* doSearch({
                       data: {
                         adapterContext,
                         params: { page: newPage, scrolling },
                         search: newSearch,
                         name,
                       },
                     }) {
    const globalState = yield select();
    const state: View = yield select(builtSearch.selector(name));

    const {
      env,
      current,
      defaultSearch,
      fields,
      search: previousSearch,
      sort,
    } = state;

    const currentSearch = newSearch || previousSearch;

    const page = newPage || current.currentPage;
    const limit = Math.min(Math.max(state.limit, 1), 50);

    let scrollId = null;
    if (scrolling) {
      scrollId = state.current.scrollId;
    }

    yield put(setLoading(name, true));

    const runParams = {
      scrollId,
      fields,
      sort,
      limit,
      page,
      search: { ...defaultSearch, ...currentSearch },
      previousSearch,
    } as Query;

    const result = yield builtSearch.adapter.run(
      runParams,
      adapterContext as AdapterContext,
      globalState,
      env,
    );

    yield put(setCurrent(name, result, runParams.search));
  }

  function* doRegister({ data }) {
    yield put({ type: REGISTER, data });
  }

  function* doRegisterAndSearch({ data: { adapterContext, component, search, params } }) {
    yield put({ type: REGISTER, data: component });

    yield put({
      type: DO_SEARCH,
      data: { adapterContext, search, params, name: component.name },
    });
  }

  return function* saga() {
    yield takeEvery(DO_REGISTER_AND_SEARCH, doRegisterAndSearch);
    yield takeEvery(DO_REGISTER, doRegister);
    yield takeEvery(DO_SEARCH, doSearch);
  };
};
