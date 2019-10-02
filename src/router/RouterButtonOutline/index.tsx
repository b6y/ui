import styled from "@emotion/styled";

import ButtonOutline from "../../core/ButtonOutline";
import { BaseRouterLink } from "../RouterLink";

import {
  ButtonProps,
  Color,
} from "../../styled";

export interface ButtonLinkOutlineProps extends ButtonProps {
  state: Color;
  size: string;
}

const ButtonLinkOutline = styled(ButtonOutline.withComponent(BaseRouterLink))<ButtonLinkOutlineProps>();

ButtonLinkOutline.defaultProps = {
  textDecoration: "none",
  type: undefined,
  size: "md",
  borderRadius: 2,
  borderColor: "transparent",
};

export default ButtonLinkOutline;
