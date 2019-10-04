import { select  } from "@storybook/addon-knobs";
import React from "react";

import { ButtonTransparent } from "../src/core/ButtonTransparent";
import { Padding } from "../src/core/Padding";
import { wrap } from "./context";

export const states = wrap(() => {
  const size = select("size", ["xs", "sm", "md", "lg", "xlg", "xxlg", "xxxlg"], "md");

  return (
    <>
      <div>
        <Padding>
          <ButtonTransparent state="brand" size={size}>brand</ButtonTransparent>
          <ButtonTransparent state="default" size={size}>default</ButtonTransparent>
          <ButtonTransparent state="primary" size={size}>primary</ButtonTransparent>
          <ButtonTransparent state="secondary" size={size}>secondary</ButtonTransparent>
          <ButtonTransparent state="success" size={size}>success</ButtonTransparent>
          <ButtonTransparent state="danger" size={size}>danger</ButtonTransparent>
          <ButtonTransparent state="warning" size={size}>warning</ButtonTransparent>
        </Padding>
      </div>
      <br />
      <div>
        <Padding>
          <ButtonTransparent state="info" size={size}>info</ButtonTransparent>
          <ButtonTransparent state="light" size={size}>light</ButtonTransparent>
          <ButtonTransparent state="dark" size={size}>dark</ButtonTransparent>
          <ButtonTransparent state="muted" size={size}>muted</ButtonTransparent>
        </Padding>
      </div>
    </>
  );
});

export default {
  title: "Core|ButtonTransparent",
  component: ButtonTransparent,
};
