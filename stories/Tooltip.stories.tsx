
import { Meta, Preview, Props, Story } from "@storybook/addon-docs/blocks";
import { select  } from "@storybook/addon-knobs";
import React from "react";

import { Tooltip } from "../src/core/Tooltip";
import { Box } from "../src/styled";
import Application from "./context";
import { css } from "@emotion/core";

export const simple = () => {
  const spacing = select("spacing",  [0, 1, 2, 3, 4, 5, 6], 2);

  return (
    <Application>
      <Tooltip text="Teste">
        <b>Teste</b>
      </Tooltip>
    </Application>
  );
};

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Tooltip",
  component: Tooltip,
};
