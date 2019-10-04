import { action } from "@storybook/addon-actions";
import React from "react";

import { DatePickerInput } from "../src/core/DatePickerInput";
import { Padding } from "../src/core/Padding";
import { wrap } from "./context";

export const simple = wrap(() => {
  const [state, setState] = React.useState(null);

  const changed = (value) => {
    action("changed")(value);
    setState(value);
  };

  return (
    <>
      <Padding width={1 / 2} spacing={3} my={3}>
        <DatePickerInput onChange={changed} value={state} placeholder="brand" state="brand" disabled />
        <DatePickerInput onChange={changed} value={state} placeholder="brand" state="brand" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <DatePickerInput onChange={changed} value={state} placeholder="default" state="default" disabled />
        <DatePickerInput onChange={changed} value={state} placeholder="default" state="default" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <DatePickerInput onChange={changed} value={state} placeholder="primary" state="primary" disabled />
        <DatePickerInput onChange={changed} value={state} placeholder="primary" state="primary" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <DatePickerInput onChange={changed} value={state} placeholder="secondary" state="secondary" disabled />
        <DatePickerInput onChange={changed} value={state} placeholder="secondary" state="secondary" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <DatePickerInput onChange={changed} value={state} placeholder="success" state="success" disabled />
        <DatePickerInput onChange={changed} value={state} placeholder="success" state="success" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <DatePickerInput onChange={changed} value={state} placeholder="danger" state="danger" disabled />
        <DatePickerInput onChange={changed} value={state} placeholder="danger" state="danger" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <DatePickerInput onChange={changed} value={state} placeholder="warning" state="warning" disabled />
        <DatePickerInput onChange={changed} value={state} placeholder="warning" state="warning" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <DatePickerInput onChange={changed} value={state} placeholder="info" state="info" disabled />
        <DatePickerInput onChange={changed} value={state} placeholder="info" state="info" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <DatePickerInput onChange={changed} value={state} placeholder="light" state="light" disabled />
        <DatePickerInput onChange={changed} value={state} placeholder="light" state="light" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <DatePickerInput onChange={changed} value={state} placeholder="dark" state="dark" disabled />
        <DatePickerInput onChange={changed} value={state} placeholder="dark" state="dark" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <DatePickerInput onChange={changed} value={state} placeholder="muted" state="muted" disabled />
        <DatePickerInput onChange={changed} value={state} placeholder="muted" state="muted" />
      </Padding>
    </>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|DatePickerInput",
  component: DatePickerInput,
};
