import styled from "@emotion/styled";
import * as R from "ramda";
import React, { HTMLAttributes } from "react";
import { injectIntl, MessageDescriptor, WrappedComponentProps } from "react-intl";

import {
  Color,
  getBgColor,
  getBorderColor,
  getFgColor,
  getOutlineColor,
  getSize,
  TextArea,
  TextAreaProps,
  Padding,
  themed,
  translateSize,
} from "../../styled";

import { SvgIcon } from "../Icon";

export type TextAreaInputProps = TextAreaProps & {
  state?: Color,
  type?: string,
  value?: any,
  inputSize?: string,
};

const defaultSize = R.defaultTo(2);
const iconMargin = getSize(1);
const getRectangularPaddings = themed<TextAreaInputProps, Padding[]>("rectangularPaddings");
const getFontSizes = themed<TextAreaInputProps, number[]>("fontSizes");

const themeHeight = (props: TextAreaInputProps) => {
  const size = translateSize(defaultSize(props.inputSize));

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

const TextAreaInput = styled(TextArea)<TextAreaInputProps>(
  () => ({
    color: "black",
    appearance: "none",
    width: "100%",
    outline: 0,
    display: "block",
  }),
  // (props) => ({
  //   "background": props.disabled ? getFgColor("light")(props) : getFgColor("white")(props),
  //   "color": theme(`colors.${props.defaultColor}`, props.defaultColor)(props),
  //   "border": `1px solid ${theme(
  //     `colors.${props.defaultBorderColor}`,
  //     props.defaultBorderColor,
  //   )(props)}`,
  //   "&:hover": {
  //     border: `1px solid ${theme(
  //       `colors.${props.hoverBorderColor}`,
  //       props.hoverBorderColor,
  //     )(props)}`,
  //     color: theme(`colors.${props.hoverColor}`, props.hoverColor)(props),
  //   },
  //   "&:focus": {
  //     color: theme(`colors.${props.focusColor}`, props.focusColor)(props),
  //     border: `1px solid ${theme(
  //       `colors.${props.focusBorderColor}`,
  //       props.focusBorderColor,
  //     )(props)}`,
  //     boxShadow: `0px 0px 0px 3px ${theme(
  //       `colors.${props.focusShadowColor}`,
  //       props.focusShadowColor,
  //     )(props)}`,
  //   },
  // }),
  themeHeight,
);

TextAreaInput.defaultProps = {
  state: "default",
  type: "text",
  inputSize: "md",
  borderRadius: 2,
  borderColor: "gray",
};

export default TextAreaInput;