import { select  } from "@storybook/addon-knobs";
import React from "react";

import { ButtonOutline } from "../src/core/ButtonOutline";
import { Padding } from "../src/core/Padding";
import { wrap } from "./context";

export const states = wrap(() => {
  const size = select("size", ["xs", "sm", "md", "lg", "xlg", "xxlg", "xxxlg"], "md");

  return (
    <>
      <div>
        <Padding>
          <ButtonOutline state="brand" size={size}>brand</ButtonOutline>
          <ButtonOutline state="default" size={size}>default</ButtonOutline>
          <ButtonOutline state="primary" size={size}>primary</ButtonOutline>
          <ButtonOutline state="secondary" size={size}>secondary</ButtonOutline>
          <ButtonOutline state="success" size={size}>success</ButtonOutline>
          <ButtonOutline state="danger" size={size}>danger</ButtonOutline>
          <ButtonOutline state="warning" size={size}>warning</ButtonOutline>
        </Padding>
      </div>
      <br />
      <div>
        <Padding>
          <ButtonOutline state="info" size={size}>info</ButtonOutline>
          <ButtonOutline state="light" size={size}>light</ButtonOutline>
          <ButtonOutline state="dark" size={size}>dark</ButtonOutline>
          <ButtonOutline state="muted" size={size}>muted</ButtonOutline>
        </Padding>
      </div>
    </>
  );
});

export default {
  title: "Core|ButtonOutline",
  component: ButtonOutline,
};
