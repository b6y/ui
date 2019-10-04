import React from "react";

import { Button } from "../src/core/Button";
import { Loading } from "../src/core/Loading";
import {selectLoadingState, setLoadingState} from "../src/core/Loading";
import { useStore } from "../src/redux";
import { Box } from "../src/styled";
import { wrap } from "./context";

export const simple = wrap(() => {
  const store = useStore();

  const toggle = () => {
    const state = store.select(selectLoadingState("test"));

    store.dispatch(setLoadingState("test", !state));
  };

  return (
    <Box>
      <Button onClick={toggle} state="default" size="md">Toggle</Button>
      <Box>
        <Loading name="test">
          {() => <b>Content</b>}
        </Loading>
      </Box>
    </Box>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Loading",
  component: Loading,
};
