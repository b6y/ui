import styled from "@emotion/styled";

import Button from "../../core/Button";
import { BaseRouterLink, RouterLinkProps } from "../RouterLink";

import {
  ButtonBoxProps,
  Color,
  WithStyled,
} from "../../styled";

export type RouterButtonProps = ButtonBoxProps & RouterLinkProps & WithStyled & {
  state: Color,
  size: string,
};

const RouterButton = styled(Button.withComponent(BaseRouterLink))<RouterButtonProps>();

RouterButton.defaultProps = {
  textDecoration: "none",
  type: undefined,
  size: "md",
  borderRadius: 2,
};

export default RouterButton;
