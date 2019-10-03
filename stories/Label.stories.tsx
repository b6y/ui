
import { Meta, Preview, Props, Story } from "@storybook/addon-docs/blocks";
import { select  } from "@storybook/addon-knobs";
import React from "react";

import { Label } from "../src/core/Label";
import { Box } from "../src/styled";
import Application from "./context";
import { css } from "@emotion/core";

export const simple = () => {
  return (
    <Application>
      <Label>
        Just a simple label
      </Label>
    </Application>
  );
};

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Label",
  component: Label,
};
