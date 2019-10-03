
import { Meta, Preview, Props, Story } from "@storybook/addon-docs/blocks";
import { select  } from "@storybook/addon-knobs";
import React from "react";

import { FormGroup } from "../src/core/FormGroup";
import { TextInput } from "../src/core/TextInput";
import { Box } from "../src/styled";
import Application from "./context";
import { css } from "@emotion/core";

export const simple = () => {
  const spacing = select("spacing",  [0, 1, 2, 3, 4, 5, 6], 2);

  return (
    <Application>
      <Box width={1/2}>
        <FormGroup label="Label">
          <TextInput defaultValue="input" />
        </FormGroup>
      </Box>
    </Application>
  );
};

simple.story = {
  parameters: {},
};

export default {
  title: "Core|FormGroup",
  component: FormGroup,
};
