import React from "react";

import { Button, ButtonProps } from "../../core/Button";
import { BaseRouterLink, RouterLinkProps } from "../RouterLink";

export const RouterButton = Button.withComponent(BaseRouterLink) as React.FunctionComponent<ButtonProps & RouterLinkProps>;

RouterButton.defaultProps = {
  textDecoration: "none",
  size: "md",
  borderRadius: 2,
};
