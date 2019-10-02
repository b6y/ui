import React from "react";
import styled from "@emotion/styled";

import Button, { ButtonProps } from "../../core/Button";
import { BaseRouterLink, RouterLinkProps } from "../RouterLink";

import {
  Color,
  WithStyled,
} from "../../styled";

export interface RouterButtonProps extends Omit<RouterLinkProps, "type"> {
  state: Color;
  size: string;
}

const RouterButton = Button.withComponent(BaseRouterLink) as React.SFC<ButtonProps & RouterLinkProps>;

RouterButton.defaultProps = {
  textDecoration: "none",
  size: "md",
  borderRadius: 2,
};

export default RouterButton;
