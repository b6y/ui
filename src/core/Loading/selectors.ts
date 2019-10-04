import { createSelector } from "reselect";
import * as R from "ramda";

const selectLoadingState = (name: string) => (state: any) => {
  return R.pathOr(true, ["@b6y/components/core/Loading", name], state);
};

export { selectLoadingState };
