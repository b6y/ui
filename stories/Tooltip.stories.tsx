import { select  } from "@storybook/addon-knobs";
import React from "react";

import { Tooltip } from "../src/core/Tooltip";
import { wrap } from "./context";

export const simple = wrap(() => {
  return (
    <>
      <Tooltip text={<b><i>html</i> test</b>}>
        <span>Teste</span>
      </Tooltip>
    </>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Tooltip",
  component: Tooltip,
};
