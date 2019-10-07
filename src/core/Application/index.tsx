import { Global } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import FontFaceObserver from "fontfaceobserver";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";

import { FocusStealProvider } from "../../core/FocusSteal/provider";
import { LanguageProvider } from "../../core/LanguageProvider";
import { Definition } from "../../definition";
import { GlobalCSS } from "../../globalStyles";
import { theme as defaultTheme } from "../../theme";
import { DefinitionContext } from "./context";

export interface Props {
  definition: Definition;
}

interface InnerProps {
  definition: Definition;
}

export let portal = React.createRef<HTMLDivElement>();

// /* tslint:disable */
// if (process.env.NODE_ENV !== "production") {
//   const {whyDidYouUpdate} = require("why-did-you-update");
//   whyDidYouUpdate(React);
// }
// /* tslint:enable */

const helmetContext = {};

export class ApplicationContexts extends React.PureComponent<InnerProps> {
  public render() {
    const { definition } = this.props;
    const theme = definition.theme(defaultTheme);

    return (
      <HelmetProvider context={helmetContext}>
        <ReduxProvider store={definition.store}>
          <FocusStealProvider>
            <Global styles={GlobalCSS}/>
            <div style={{ fontFamily: theme.fonts[0] }}>
              <div ref={portal} id="portal-target" />
              <LanguageProvider messages={definition.messages}>
                <ThemeProvider theme={theme}>
                  {this.props.children}
                </ThemeProvider>
              </LanguageProvider>
            </div>
          </FocusStealProvider>
        </ReduxProvider>
      </HelmetProvider>
    );
  }
}

export class Application extends React.PureComponent<Props> {
  public app = React.createRef<Application>();

  public componentDidMount() {
    if (this.props.definition.theme) {
      const theme = this.props.definition.theme(defaultTheme);

      Promise.all(theme.observeFonts.map((font) => {
        const observer = new FontFaceObserver(font);

        return observer.load().then(() => {
          return [observer, font];
        });
      })).then((a) => {
        document.body.classList.add("fontLoaded");
      });
    }
  }

  public render() {
    return (
      <DefinitionContext.Provider value={this.props.definition}>
        <ApplicationContexts ref={this.app} {...this.props}>
          {this.props.children}
        </ApplicationContexts>
      </DefinitionContext.Provider>
    );
  }
}

export * from "./context";
