import styled from "@emotion/styled";
import * as R from "ramda";

import { theme } from "styled-tools";
import { Box } from "../../styled";
import { getBorderColor, getOutlineColor, getSize, translateSize } from "../../styled/system";

import { SvgIcon } from "../Icon";

const defaultSize = R.defaultTo(2);
const iconMargin = getSize(1);

const themeHeight = (props) => {
  const size = translateSize(defaultSize(props.size));

  const padding: any = theme("rectangularPaddings")(props)[size];
  const fontSize: any = theme("fontSizes")(props)[size];

  return {
    fontSize: `${fontSize}rem`,
    lineHeight: `1.5`,
    padding: `${padding.y}rem ${padding.x}rem`,
  };
};

const ButtonOutline = styled(Box.withComponent("button"))(
  (props) => ({
    backgroundClip: "padding-box",
    background: "transparent",

    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    outline: "none",
    color: getBorderColor(props.state)(props),
  }),
  themeHeight,
  (props) => ({
    "border": `1px solid ${getBorderColor(props.state)(props)}`,

    "&[disabled]": {
      cursor: "not-allowed",
      // backgroundColor: getBgColor(props.state, "alpha")(props),
    },
    "&:hover": {
      color: getBorderColor(props.state, "dark")(props),
      border: `1px solid ${getBorderColor(props.state, "dark")(props)}`,
      boxShadow: `0px 0px 0px 3px ${getOutlineColor(props.state, "alpha")(props)}`,
    },
    "&:focus": {
      color: getBorderColor(props.state, "dark")(props),
      border: `1px solid ${getBorderColor(props.state, "dark")(props)}`,
      boxShadow: `0px 0px 0px 3px ${getOutlineColor(props.state, "alphadark")(props)}`,
    },
    "&[disabled]:hover": {
      // backgroundColor: getBgColor(props.state, "alphadark")(props),
    },
    "&[disabled]:focus": {
      // backgroundColor: getBgColor(props.state, "alphadark")(props),
    },
    [`& ${SvgIcon} + *`]: {
      marginLeft: iconMargin(props),
    },
  }),
);

ButtonOutline.defaultProps = {
  as: "button",
  type: "button",
  size: "md",
  borderRadius: 2,
  borderColor: "transparent",
};

ButtonOutline.displayName = "ButtonOutline";
ButtonOutline.propTypes = {
  ...ButtonOutline.propTypes,
};

export default ButtonOutline;
