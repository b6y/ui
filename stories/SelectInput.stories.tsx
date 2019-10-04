import { action } from "@storybook/addon-actions";
import React from "react";

import { SelectInput, ArrayAdapter } from "../src/core/SelectInput";
import { Padding } from "../src/core/Padding";
import { wrap } from "./context";

export const simple = wrap(() => {
  const [state, setState] = React.useState(null);

  const changed = (evt: React.ChangeEvent<HTMLInputElement>) => {
    action("changed")(evt.target.value);
    setState(evt.target.value);
  };

  const options = new ArrayAdapter([{ label: 'Ok', value: 1, option: (<b>xd</b>), }])

  return (
    <>
      <Padding width={1 / 2} spacing={3} my={3}>
        <SelectInput options={options} />
      </Padding>
    </>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|SelectInput",
  component: SelectInput,
};
