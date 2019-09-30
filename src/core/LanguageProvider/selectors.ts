import { createSelector } from "reselect";

const selectLanguage = (state: any) => state.language;

const makeSelectLocale = () =>
  createSelector(selectLanguage, (languageState) => languageState.locale);

export { selectLanguage, makeSelectLocale };
