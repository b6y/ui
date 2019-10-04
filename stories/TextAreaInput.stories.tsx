import { action } from "@storybook/addon-actions";
import React from "react";

import { TextAreaInput } from "../src/core/TextAreaInput";
import { Padding } from "../src/core/Padding";
import { wrap } from "./context";

export const simple = wrap(() => {
  const [state, setState] = React.useState(null);

  const changed = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    action("changed")(evt.target.value);
    setState(evt.target.value);
  };

  return (
    <>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextAreaInput onChange={changed} value={state || ""} placeholder="brand" state="brand" disabled />
        <TextAreaInput onChange={changed} value={state || ""} placeholder="brand" state="brand" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextAreaInput onChange={changed} value={state || ""} placeholder="default" state="default" disabled />
        <TextAreaInput onChange={changed} value={state || ""} placeholder="default" state="default" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextAreaInput onChange={changed} value={state || ""} placeholder="primary" state="primary" disabled />
        <TextAreaInput onChange={changed} value={state || ""} placeholder="primary" state="primary" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextAreaInput onChange={changed} value={state || ""} placeholder="secondary" state="secondary" disabled />
        <TextAreaInput onChange={changed} value={state || ""} placeholder="secondary" state="secondary" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextAreaInput onChange={changed} value={state || ""} placeholder="success" state="success" disabled />
        <TextAreaInput onChange={changed} value={state || ""} placeholder="success" state="success" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextAreaInput onChange={changed} value={state || ""} placeholder="danger" state="danger" disabled />
        <TextAreaInput onChange={changed} value={state || ""} placeholder="danger" state="danger" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextAreaInput onChange={changed} value={state || ""} placeholder="warning" state="warning" disabled />
        <TextAreaInput onChange={changed} value={state || ""} placeholder="warning" state="warning" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextAreaInput onChange={changed} value={state || ""} placeholder="info" state="info" disabled />
        <TextAreaInput onChange={changed} value={state || ""} placeholder="info" state="info" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextAreaInput onChange={changed} value={state || ""} placeholder="light" state="light" disabled />
        <TextAreaInput onChange={changed} value={state || ""} placeholder="light" state="light" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextAreaInput onChange={changed} value={state || ""} placeholder="dark" state="dark" disabled />
        <TextAreaInput onChange={changed} value={state || ""} placeholder="dark" state="dark" />
      </Padding>
      <Padding width={1 / 2} spacing={3} my={3}>
        <TextAreaInput onChange={changed} value={state || ""} placeholder="muted" state="muted" disabled />
        <TextAreaInput onChange={changed} value={state || ""} placeholder="muted" state="muted" />
      </Padding>
    </>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|TextAreaInput",
  component: TextAreaInput,
};
