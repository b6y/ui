import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Color } from "../../styled";
import Button from "./index";

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
    );
  };
};

const stories = storiesOf("Button", module);

stories.add("md (Default)", make("md"));
stories.add("xs", make("xs"));
stories.add("sm", make("sm"));
stories.add("lg", make("lg"));
stories.add("xlg", make("xlg"));
stories.add("xxlg", make("xxlg"));
stories.add("xxxlg", make("xxxlg"));
