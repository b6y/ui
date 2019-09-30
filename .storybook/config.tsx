import React from "react"

import { createMemoryHistory } from "history";

import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';

import App from "../src/core/Application";
import definition from "../src/definition";

const history = createMemoryHistory();

addDecorator((storyFn) => {
    return (
        <App definition={definition({ history })}>{storyFn()}</App>
    )
});

// automatically import all files ending in *.stories.tsx?
configure(require.context("../src", true, /\.stories\.tsx?$/), module);
