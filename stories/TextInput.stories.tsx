import { action } from "@storybook/addon-actions";
import React from "react";

import { TextInput } from "../src/core/TextInput";
import { Padding } from "../src/core/Padding";
import Application from "./context";

export const simple = () => {
  const [state, setState] = React.useState(null);

  const changed = (evt: React.ChangeEvent<HTMLInputElement>) => {
    action("changed")(evt.target.value);
    setState(evt.target.value);
  };

  return (
    <Application>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextInput onChange={changed} value={state || ""} placeholder="brand" state="brand" disabled />
        <TextInput onChange={changed} value={state || ""} placeholder="brand" state="brand" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextInput onChange={changed} value={state || ""} placeholder="default" state="default" disabled />
        <TextInput onChange={changed} value={state || ""} placeholder="default" state="default" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextInput onChange={changed} value={state || ""} placeholder="primary" state="primary" disabled />
        <TextInput onChange={changed} value={state || ""} placeholder="primary" state="primary" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextInput onChange={changed} value={state || ""} placeholder="secondary" state="secondary" disabled />
        <TextInput onChange={changed} value={state || ""} placeholder="secondary" state="secondary" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextInput onChange={changed} value={state || ""} placeholder="success" state="success" disabled />
        <TextInput onChange={changed} value={state || ""} placeholder="success" state="success" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextInput onChange={changed} value={state || ""} placeholder="danger" state="danger" disabled />
        <TextInput onChange={changed} value={state || ""} placeholder="danger" state="danger" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextInput onChange={changed} value={state || ""} placeholder="warning" state="warning" disabled />
        <TextInput onChange={changed} value={state || ""} placeholder="warning" state="warning" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextInput onChange={changed} value={state || ""} placeholder="info" state="info" disabled />
        <TextInput onChange={changed} value={state || ""} placeholder="info" state="info" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextInput onChange={changed} value={state || ""} placeholder="light" state="light" disabled />
        <TextInput onChange={changed} value={state || ""} placeholder="light" state="light" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextInput onChange={changed} value={state || ""} placeholder="dark" state="dark" disabled />
        <TextInput onChange={changed} value={state || ""} placeholder="dark" state="dark" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextInput onChange={changed} value={state || ""} placeholder="muted" state="muted" disabled />
        <TextInput onChange={changed} value={state || ""} placeholder="muted" state="muted" />
      </Padding>
    </Application>
  );
};

simple.story = {
  parameters: {},
};

export default {
  title: "Core|TextInput",
  component: TextInput,
};
