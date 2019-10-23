import { select } from "@storybook/addon-knobs";
import React from "react";

import { Padding } from "../src/core/Padding";
import { Box } from "../src/styled";
import { wrap } from "./context";

export const simple = wrap(() => {
  const spacing = select("spacing", [0, 1, 2, 3, 4, 5, 6], 2);

  return (
    <Box bg="black" p={spacing}>
      <Box bg="lightblack" py={spacing}>
        <Padding spacing={spacing}>
          <Box bg="red" width={1}>Box1</Box>
          <Box bg="blue" width={1}>Box2</Box>
          <Box bg="green" width={1}>Box3</Box>
          <Box bg="yellow" width={1}>Box4</Box>
        </Padding>
      </Box>
    </Box>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Padding",
  component: Padding,
};
