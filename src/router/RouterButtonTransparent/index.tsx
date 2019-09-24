import styled from "@emotion/styled";

import ButtonTransparent, { ButtonTransparentProps } from "../../core/ButtonTransparent";
import { BaseRouterLink } from "../RouterLink";
import { Styled } from "../../styled"

type RouterButtonTransparentProps = ButtonTransparentProps

const RouterButtonTransparent = styled(ButtonTransparent.withComponent(BaseRouterLink))<RouterButtonTransparentProps>();

RouterButtonTransparent.defaultProps = {
  textDecoration: "none",
  type: undefined,
  size: "md",
  borderRadius: 2,
};

export default RouterButtonTransparent;
