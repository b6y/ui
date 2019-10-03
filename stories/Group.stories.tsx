
import { Meta, Preview, Props, Story } from "@storybook/addon-docs/blocks";
import { select  } from "@storybook/addon-knobs";
import React from "react";

import { Group } from "../src/core/Group";
import { Button } from "../src/core/Button";
import { Box } from "../src/styled";
import Application from "./context";
import { css } from "@emotion/core";

export const simple = () => {
  return (
    <Application>
      <Group>
        <Button size="md" state="primary">Button1</Button>
        <Button size="md" state="info">Button3</Button>
        <Button size="md" state="secondary">Button4</Button>
        <Button size="md" state="brand">Button2</Button>
      </Group>
    </Application>
  );
};

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Group",
  component: Group,
};
