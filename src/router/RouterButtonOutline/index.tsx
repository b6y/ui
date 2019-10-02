import React from "react";

import ButtonOutline, {ButtonOutlineProps} from "../../core/ButtonOutline";
import {BaseRouterLink, RouterLinkProps} from "../RouterLink";

const RouterButtonOutline = ButtonOutline.withComponent(BaseRouterLink) as React.FunctionComponent<ButtonOutlineProps & RouterLinkProps>;

RouterButtonOutline.defaultProps = {
    textDecoration: "none",
    type: undefined,
    size: "md",
    borderRadius: 2,
    borderColor: "transparent",
};

export default RouterButtonOutline;

