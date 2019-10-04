import React from "react";

import { Markdown } from "../src/core/Markdown";
import {selectLoadingState, setLoadingState} from "../src/core/Loading";
import { useStore } from "../src/redux";
import { Box } from "../src/styled";
import Application from "./context";
import { text } from "@storybook/addon-knobs";

const markdownExample = `\
# Test
## test
### test
#### test
[a](https://google.com.br/)
`;

const Simple = () => {
  const content = text("source", markdownExample);
  const store = useStore();

  const toggle = () => {
    const state = store.select(selectLoadingState("test"));

    store.dispatch(setLoadingState("test", !state));
  };

  return (
    <Box>
      <Markdown source={content} />
    </Box>
  );
};

export const simple = () => {
  return (
    <Application>
      <Simple />
    </Application>
  );
};

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Markdown",
  component: Markdown,
};
