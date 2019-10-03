
import { Meta, Preview, Props, Story } from "@storybook/addon-docs/blocks";
import { select  } from "@storybook/addon-knobs";
import React from "react";

import { Loading } from "../src/core/Loading";
import { Button } from "../src/core/Button";
import * as loadingActions from "../src/core/Loading/actions";
import { Box } from "../src/styled";
import Application from "./context";
import { css } from "@emotion/core";
import { useStore } from "react-redux";

const Simple = () => {
  const store = useStore();

  const change = () => {
    console.log("???");
    store.dispatch(loadingActions.setState("test", false));
  }

  console.log(store);

  return (
    <Box>
      <Button onClick={change} state="default" size="md">STOP</Button>
      <Loading name="test">
        {() => <b>Content</b>}
      </Loading>
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
  title: "Core|Loading",
  component: Loading,
};
