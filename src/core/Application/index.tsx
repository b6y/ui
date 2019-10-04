import { Global } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import FontFaceObserver from "fontfaceobserver";

import FocusStealProvider from "../../core/FocusSteal/provider";
import LanguageProvider from "../../core/LanguageProvider";
import { Definition } from "../../definition";
import GlobalStyle from "../../globalStyles";
import defaultTheme from "../../theme";
import Context from "./context";

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

export class Application extends React.PureComponent<InnerProps> {
  public render() {
    const { definition } = this.props;
    const theme = definition.theme(defaultTheme);

    return (
      <HelmetProvider context={helmetContext}>
        <ReduxProvider store={definition.store}>
          <FocusStealProvider>
            <Global styles={GlobalStyle}/>
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

class ApplicationRoot extends React.PureComponent<Props> {
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
      <Context.Provider value={this.props.definition}>
        <Application ref={this.app} {...this.props}>
          {this.props.children}
        </Application>
      </Context.Provider>
    );
  }
}

export default ApplicationRoot;
