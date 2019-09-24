import styled from "@emotion/styled";
import * as R from "ramda";

import {
  Box,
  ButtonBoxProps,
  Color,
  getBgColor,
  getBorderColor,
  getFgColor,
  getOutlineColor,
  getSize,
  Padding,
  themed,
  translateSize,
} from "../../styled";

import { SvgIcon } from "../Icon";

type ButtonProps = ButtonBoxProps & {
  state: Color,
  size: string,
};

const defaultSize = R.defaultTo(2);
const iconMargin = getSize(1);
const getRectangularPaddings = themed<ButtonProps, Padding[]>("rectangularPaddings");
const getFontSizes = themed<ButtonProps, number[]>("fontSizes");

const themeHeight = (props: ButtonProps) => {
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

const Button = styled(Box.withComponent("button"))<ButtonProps>(
  (props) => ({
    appearance: "none",
    backgroundColor: getBgColor(props.state)(props),

    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",

    outline: "none",
    border: `1px solid ${getBorderColor(props.state)(props)}`,
    color: getFgColor(props.state)(props),
  }),
  themeHeight,
  (props) => {
    return {
      "&[disabled]": {
        cursor: "not-allowed",
        backgroundColor: getBgColor(props.state, "alpha")(props),
      },
      "&:hover": {
        color: getFgColor(props.state, "dark")(props),
        backgroundColor: getBgColor(props.state, "dark")(props),
        border: `1px solid ${getBorderColor(props.state, "dark")(props)}`,
        boxShadow: `0px 0px 0px 3px ${getOutlineColor(props.state, "alpha")(props)}`,
      },
      "&:focus": {
        color: getFgColor(props.state, "dark")(props),
        backgroundColor: getBgColor(props.state, "dark")(props),
        border: `1px solid ${getBorderColor(props.state, "dark")(props)}`,
        boxShadow: `0px 0px 0px 3px ${getOutlineColor(props.state, "alphadark")(props)}`,
      },
      "&[disabled]:hover": {
        backgroundColor: getBgColor(props.state, "alphadark")(props),
      },
      "&[disabled]:focus": {
        backgroundColor: getBgColor(props.state, "alphadark")(props),
      },
      [`& ${SvgIcon} + *`]: {
        marginLeft: iconMargin(props),
      },
    };
  },
);

Button.defaultProps = {
  state: "default",
  type: "button",
  size: "md",
  borderRadius: 2,
};

export default Button;
