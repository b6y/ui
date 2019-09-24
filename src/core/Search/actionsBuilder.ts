import { BuiltSearch } from "./index";

export default <AdapterContext>(buildSearch: BuiltSearch<AdapterContext>) => ({
  register(data) {
    return {
      type: buildSearch.constants.DO_REGISTER,
      data,
    };
  },
  search(name, adapterContext, search = {}, params = { page: 1, scrolling: false }) {
    return {
      type: buildSearch.constants.DO_SEARCH,
      data: { adapterContext, name, search, params },
    };
  },
  setCurrent(name, current, search: any = {}) {
    return {
      type: buildSearch.constants.SET_CURRENT,
      data: { name, current, search },
    };
  },
  setLoading(name, state) {
    return {
      type: buildSearch.constants.SET_LOADING,
      data: { name, state },
    };
  },
  registerAndSearch(component, adapterContext, search, params) {
    return {
      type: buildSearch.constants.DO_REGISTER_AND_SEARCH,
      data: { adapterContext, component, search, params },
    };
  },
});
