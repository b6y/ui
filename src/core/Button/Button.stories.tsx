import { action } from "@storybook/addon-actions";
import React from "react";
import Button from "./index";
import styled from "@emotion/styled";
import { Color } from "../../styled";

export default {
  title: "Button",
};

const Wrapper = styled.div`
display: flex;
align-items: flex-start;
> * { margin-right: 15px }
`;

const states: Color[] = ["brand", "primary", "secondary", "brand", "success", "warning", "danger", "info"];
const sizes = ["xs", "sm", "md", "lg", "xlg", "xxlg", "xxxlg"];

const make = (size: string) => {
  return () => {
    return (
      <Wrapper>
        {states.map((state) => {
          return <Button key={state} state={state} size={size} onClick={action("clicked")}>{state}</Button>;
        })}
      </Wrapper>
    )
  };
}

export const xs = make("xs");
export const sm = make("sm");
export const md = make("md");
export const lg = make("lg");
export const xlg = make("xlg");
export const xxlg = make("xxlg");
export const xxxlg = make("xxxlg");
