import styled from "@emotion/styled";

import ButtonTransparent, { ButtonTransparentProps } from "../../core/ButtonTransparent";
import { BaseRouterLink, RouterLinkProps } from "../RouterLink";

const RouterButtonTransparent = ButtonTransparent
  .withComponent(BaseRouterLink) as React.FunctionComponent<ButtonTransparentProps & RouterLinkProps>;

RouterButtonTransparent.defaultProps = {
  textDecoration: "none",
  type: undefined,
  size: "md",
  borderRadius: 2,
};

export default RouterButtonTransparent;
