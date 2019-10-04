import React from "react";

import { FormGroup } from "../src/core/FormGroup";
import { TextInput } from "../src/core/TextInput";
import { Box } from "../src/styled";
import { wrap } from "./context";

export const simple = wrap(() => {
  return (
    <>
      <Box width={1 / 2}>
        <FormGroup label="Label">
          <TextInput defaultValue="input" />
        </FormGroup>
      </Box>
    </>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|FormGroup",
  component: FormGroup,
};
