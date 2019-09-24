// TODO: types
import styled from "@emotion/styled";
import * as R from "ramda";
import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

import { css, themed, WithStyled } from "../../styled";

import {
  alignSelf,
  borderColor,
  borderRadius,
  borders,
  color,
  flex,
  fontSize,
  getOutlineColor,
  getRadii,
  getSpace,
  order,
  space,
  width,
  WithAlignSelf,
  WithBorderColor,
  WithBorderRadius,
  WithBorders,
  WithColor,
  WithFlex,
  WithFontSize,
  WithOrder,
  WithSpace,
  WithWidth,
} from "../../styled";

export type RouterLinkProps =
  & NavLinkProps
  & WithSpace
  & WithWidth
  & WithFontSize
  & WithColor
  & WithFlex
  & WithOrder
  & WithAlignSelf
  & WithBorderRadius
  & WithBorders
  & WithBorderColor
  & WithStyled;

export const BaseRouterLink = styled(React.forwardRef((props: RouterLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
  // Props removed because of `NavLink` conflicts
  const actualProps = R.omit(["as", "color", "size", "borderRadius"], props);

  return <NavLink {...actualProps} innerRef={ref} />;
}))(
  space,
  width,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
  borderRadius,
  borders,
  borderColor,
  themed("Link"),
  css,
);

export const RouterLink = styled(BaseRouterLink)(
  (props) => ({
    ":focus": {
      outline: "none",
      position: "relative",
    },
    ":focus:before": {
      position: "absolute",
      content: "''",
      top: getSpace(-1)(props),
      left: getSpace(-1)(props),
      right: getSpace(-1)(props),
      bottom: getSpace(-1)(props),
      display: "block",
      boxShadow: `0px 0px 0px 3px ${getOutlineColor("primary", "alpha")(props)}`,
      borderRadius: getRadii(1)(props),
    },
  }),
);

RouterLink.defaultProps = {
  color: "blue",
  tabIndex: 0,
  activeClassName: "__active",
};

export default RouterLink;
