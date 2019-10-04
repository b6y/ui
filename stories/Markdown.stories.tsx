import React from "react";

import { text } from "@storybook/addon-knobs";
import {selectLoadingState, setLoadingState} from "../src/core/Loading";
import { Markdown } from "../src/core/Markdown";
import { useStore } from "../src/redux";
import { Box } from "../src/styled";
import { wrap } from "./context";

const markdownExample = `\
# Test
## test
### test
#### test
[a](https://google.com.br/)
`;

export const simple = wrap(() => {
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
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Markdown",
  component: Markdown,
};
