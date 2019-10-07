import React from "react";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { makeSelectLocale } from "./selectors";

interface LanguageProviderProps {
  locale: string;
  messages: any;
  children: React.ReactNode;
}

class BaseLanguageProvider extends React.PureComponent<LanguageProviderProps> {
  public render() {
    const { locale, messages, children } = this.props;

    return (
      <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale }),
);

export const LanguageProvider = connect(mapStateToProps)(BaseLanguageProvider);
