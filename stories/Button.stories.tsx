import { select } from "@storybook/addon-knobs";
import React from "react";

import { Button } from "../src/core/Button";
import { Padding } from "../src/core/Padding";
import { wrap } from "./context";

export const states = wrap(() => {
  const size = select("size", ["xs", "sm", "md", "lg", "xlg", "xxlg", "xxxlg"], "md");

  return (
    <>
      <div>
        <Padding>
          <Button state="brand" size={size}>brand</Button>
          <Button state="default" size={size}>default</Button>
          <Button state="primary" size={size}>primary</Button>
          <Button state="secondary" size={size}>secondary</Button>
          <Button state="success" size={size}>success</Button>
          <Button state="danger" size={size}>danger</Button>
          <Button state="warning" size={size}>warning</Button>
        </Padding>
      </div>
      <br />
      <div>
        <Padding>
          <Button state="info" size={size}>info</Button>
          <Button state="light" size={size}>light</Button>
          <Button state="dark" size={size}>dark</Button>
          <Button state="muted" size={size}>muted</Button>
        </Padding>
      </div>
    </>
  );
});

export default {
  title: "Core|Button",
  component: Button,
};
