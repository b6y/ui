import React from "react";
import styled from "@emotion/styled";
import * as R from "ramda";

import {
  Box,
  BoxProps,
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

type TextInputProps = BoxProps & {
  state: Color,
  size: string,
};

const defaultSize = R.defaultTo(2);
const iconMargin = getSize(1);
const getRectangularPaddings = themed<TextInputProps, Padding[]>("rectangularPaddings");
const getFontSizes = themed<TextInputProps, number[]>("fontSizes");

const themeHeight = (props: TextInputProps) => {
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

const DefaultStyledTextInput = Box.withComponent("input");

const StyledTextInputBase = styled(({ form, ...props }) => (
  <DefaultStyledTextInput {...props} />
))(
  {
    color: "black",
    appearance: "none",
    width: "100%",
    outline: 0,
    display: "block",
  },
  themeIt,
  (props) => ({
    "background": props.disabled ? theme("colors.light")(props) : theme("colors.white")(props),
    "color": theme(`colors.${props.defaultColor}`, props.defaultColor)(props),
    "border": `1px solid ${theme(
      `colors.${props.defaultBorderColor}`,
      props.defaultBorderColor,
    )(props)}`,
    "&:hover": {
      border: `1px solid ${theme(
        `colors.${props.hoverBorderColor}`,
        props.hoverBorderColor,
      )(props)}`,
      color: theme(`colors.${props.hoverColor}`, props.hoverColor)(props),
    },
    "&:focus": {
      color: theme(`colors.${props.focusColor}`, props.focusColor)(props),
      border: `1px solid ${theme(
        `colors.${props.focusBorderColor}`,
        props.focusBorderColor,
      )(props)}`,
      boxShadow: `0px 0px 0px 3px ${theme(
        `colors.${props.focusShadowColor}`,
        props.focusShadowColor,
      )(props)}`,
    },
  }),
);

StyledTextInputBase.defaultProps = {
  borderColor: "gray",
};

const StyledTextInput = (props) => {
  const filteredProps = R.omit(["state"], props);

  const state = states[props.state || "default"];
  const newFilteredProps = { ...state, ...filteredProps };

  return <StyledTextInputBase {...newFilteredProps} />;
};

StyledTextInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string,
      defaultMessage: PropTypes.string,
    }),
  ]),
  size: PropTypes.string,
  state: PropTypes.string,
};

StyledTextInput.defaultProps = {
  state: "default",
  size: "md",
  borderRadius: 2,
};

export default StyledTextInput;
