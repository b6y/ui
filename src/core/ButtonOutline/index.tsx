import styled from "@emotion/styled";
import * as R from "ramda";

import {
  ButtonBox,
  ButtonBoxProps,
  Color,
  getBorderColor,
  getFontColor,
  getOutlineColor,
  getSize,
  Padding,
  themed,
  translateSize,
  WithStyled,
} from "../../styled";

import { SvgIcon } from "../Icon";

export type ButtonOutlineProps = ButtonBoxProps & WithStyled & {
  state: Color,
  size: string,
};

const defaultSize = R.defaultTo(2);
const iconMargin = getSize(1);
const getRectangularPaddings = themed<ButtonOutlineProps, Padding[]>("rectangularPaddings");
const getFontSizes = themed<ButtonOutlineProps, number[]>("fontSizes");

const themeHeight = (props: ButtonOutlineProps) => {
  const size = translateSize(defaultSize(props.size));

  const paddings = getRectangularPaddings(props);
  const fontSizes = getFontSizes(props);

  if (paddings && fontSizes) {
    const padding: Padding = paddings[size];
    const fontSize: number = fontSizes[size];

    return {
      fontSize: `${fontSize}rem`,
      // TODO: ???
      lineHeight: `1.5`,
      padding: `${padding.y}rem ${padding.x}rem`,
    };
  } else {
    return {
      // TODO: ???
      lineHeight: `1.5`,
    };
  }
};

const ButtonOutline = styled(ButtonBox)<ButtonOutlineProps>(
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
  type: "button",
  size: "md",
  borderRadius: 2,
  borderColor: "transparent",
};

export default ButtonOutline;
