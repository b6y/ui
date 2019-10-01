import React from "react";

import { createMemoryHistory } from "history";

import { withInfo } from "@storybook/addon-info";
import { configure } from "@storybook/react";
import { addDecorator } from "@storybook/react";

import App from "../src/core/Application";
import definition from "../src/definition";

const history = createMemoryHistory();

addDecorator(withInfo({
    styles: {
      header: {
        h1: {
          marginRight: '20px',
          fontSize: '25px',
          display: 'inline',
        },
        body: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        h2: {
          display: 'inline',
          color: '#999',
        },
      },
      infoBody: {
        backgroundColor: '#eee',
        padding: '0px 5px',
        lineHeight: '2',
      },
    },
    inline: true,
    source: false,
}));

addDecorator((storyFn) => {
    return (
        <App definition={definition({ history })}>{storyFn()}</App>
    );
});

// automatically import all files ending in *.stories.tsx?
configure(require.context("../src", true, /\.stories\.tsx?$/), module);
