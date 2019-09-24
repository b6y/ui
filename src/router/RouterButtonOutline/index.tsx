import styled from "@emotion/styled";

import ButtonOutline from "../../core/ButtonOutline";
import { BaseRouterLink } from "../RouterLink";

import {
  ButtonBoxProps,
  Color,
  WithStyled,
} from "../../styled";

export type ButtonLinkOutlineProps = ButtonBoxProps & WithStyled & {
  state: Color,
  size: string,
};

const ButtonLinkOutline = styled(ButtonOutline.withComponent(BaseRouterLink))<ButtonLinkOutlineProps>();

ButtonLinkOutline.defaultProps = {
  textDecoration: "none",
  type: undefined,
  size: "md",
  borderRadius: 2,
  borderColor: "transparent",
};

export default ButtonLinkOutline;
