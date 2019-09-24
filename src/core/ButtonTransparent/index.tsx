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

export type ButtonTransparentProps = ButtonBoxProps & WithStyled & {
  state: Color,
  size: string,
};

const defaultSize = R.defaultTo(2);
const iconMargin = getSize(1);
const getRectangularPaddings = themed<ButtonTransparentProps, Padding[]>("rectangularPaddings");
const getFontSizes = themed<ButtonTransparentProps, number[]>("fontSizes");

const themeHeight = (props: ButtonTransparentProps) => {
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

const ButtonTransparent = styled(ButtonBox)<ButtonTransparentProps>(
  themeHeight,
  (props) => ({
    appearance: "none",

    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",

    outline: "none",
    border: `1px solid transparent`,
    background: "transparent",
    color: getFontColor(props.state)(props),
  }),
  (props) => {
    return {
      "&[disabled]": {
        cursor: "not-allowed",
      },
      "&:hover": {
        border: `1px solid ${getBorderColor(props.state, "dark")(props)}`,
        boxShadow: `0px 0px 0px 3px ${getOutlineColor(props.state, "alpha")(props)}`,
      },
      "&:focus": {
        border: `1px solid ${getBorderColor(props.state, "dark")(props)}`,
        boxShadow: `0px 0px 0px 3px ${getOutlineColor(props.state, "alphadark")(props)}`,
      },
      "&[disabled]:hover": {
      },
      "&[disabled]:focus": {
      },
      [`& ${SvgIcon} + *`]: {
        marginLeft: iconMargin(props),
      },
    };
  },
);

ButtonTransparent.defaultProps = {
  state: "default",
  type: "button",
  size: "md",
  borderRadius: 2,
};

export default ButtonTransparent;
