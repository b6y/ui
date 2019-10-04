import React from "react";

import { Label } from "../src/core/Label";
import { wrap } from "./context";

export const simple = wrap(() => {
  return (
    <>
      <Label>
        Just a simple label
      </Label>
    </>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Label",
  component: Label,
};
