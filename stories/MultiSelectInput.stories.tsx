import { action } from "@storybook/addon-actions";
import React, { useMemo, useState } from "react";

import { ArrayAdapter, OptionType, MultiSelectInput } from "../src/core/MultiSelectInput";
import { wrap } from "./context";

const defaultOptions = [
  { label: "Value 1", value: 1 },
  { label: "Value 2", value: 2 },
  { label: "Value 3", value: 3 },
  { label: "Value 4", value: 4 },
  { label: "Value 5", value: 5 },
  { label: "Value 6", value: 6 },
  { label: "Value 7", value: 7 },
  { label: "Value 8", value: 8 },
  { label: "Value 9", value: 9 },
  { label: "Value 10", value: 10 },
]

export const controlled = wrap(() => {
  const [state, setState] = useState([3]);

  const changed = (value: any[], item?: OptionType[]) => {
    action("changed")({item, value});
    setState(value);
  };

  const options = useMemo(() => {
    return new ArrayAdapter(defaultOptions);
  }, []);

  return (
    <>
      <MultiSelectInput
        inputSize="md"
        isClearable={true}
        options={options}
        onChange={changed}
        onBlur={() => action("blurred")()}
        onFocus={() => action("focused")()}
        values={state}
      />
    </>
  );
});

export const uncontrolled = wrap(() => {
  const options = useMemo(() => {
    return new ArrayAdapter(defaultOptions);
  }, []);

  return (
    <>
      <MultiSelectInput inputSize="md" isClearable={true} options={options} values={[2]} />
    </>
  );
});

export default {
  title: "Core|MultiSelectInput",
  component: MultiSelectInput,
};
