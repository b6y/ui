import React from "react";

import { Button } from "../src/core/Button";
import { Group } from "../src/core/Group";
import { wrap } from "./context";

export const simple = wrap(() => {
  return (
    <>
      <Group>
        <Button size="md" state="primary">Button1</Button>
        <Button size="md" state="info">Button3</Button>
        <Button size="md" state="secondary">Button4</Button>
        <Button size="md" state="brand">Button2</Button>
      </Group>
    </>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Group",
  component: Group,
};
