import styled from "@emotion/styled";
import * as R from "ramda";
import React, { HTMLAttributes } from "react";
import { injectIntl, MessageDescriptor, WrappedComponentProps } from "react-intl";

import {
  ColorAlias,
  getBgColor,
  getFgColor,
  getSize,
  TextArea,
  TextAreaProps,
  Padding,
  themed,
  translateSize,
  Fonts,
} from "../../styled";

import { SvgIcon } from "../Icon";

export interface TextAreaInputProps extends TextAreaProps {
  state?: ColorAlias;
  defaultOutlineColor?: ColorAlias;
  inputSize?: string;
}

const defaultSize = R.defaultTo(2);
const iconMargin = getSize(1);
const getRectangularPaddings = themed<TextAreaInputProps, Padding[]>("rectangularPaddings");
const getFontSizes = themed<TextAreaInputProps, number[]>("fontSizes");
const getFonts = themed<TextAreaInputProps, Fonts>("fonts");

const themeHeight = (props: TextAreaInputProps) => {
  const size = translateSize(defaultSize(props.inputSize));

  const paddings = getRectangularPaddings(props);
  const fontSizes = getFontSizes(props);
  const fonts = getFonts(props);

  if (paddings && fontSizes && fonts) {
    const padding: Padding = paddings[size];
    const fontSize: number = fontSizes[size];

    return {
      fontSize: `${fontSize}rem`,
      fontFamily: fonts.mono,
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

const Wrapped = React.forwardRef((props: TextAreaInputProps, ref: React.Ref<HTMLTextAreaElement>) => {
  const { state, inputSize, defaultOutlineColor, ...rest } = props;
  return <TextArea ref={ref} {...rest} />;
});

export const TextAreaInput = styled(Wrapped)(
  () => ({
    color: "black",
    appearance: "none",
    width: "100%",
    outline: 0,
    display: "block",
  }),
  (props) => {
    const state = props.state || "default";

    let outline = state;

    if (state === "default") {
      outline = props.defaultOutlineColor || "primary";
    }

    return {
      "background": props.disabled ? getBgColor("light", "alphadark")(props) : getBgColor("white")(props),
      "color": props.disabled ? getFgColor("white", "alpha")(props) : getFgColor("white")(props),
      "border": `1px solid ${getBgColor(state)(props)}`,
      "&:hover": {
        border: `1px solid ${getBgColor(outline, "dark")(props)}`,
        boxShadow: `0px 0px 0px 3px ${getBgColor(outline, "alpha")(props)}`,
      },
      "&:focus": {
        border: `1px solid ${getBgColor(outline, "dark")(props)}`,
        boxShadow: `0px 0px 0px 3px ${getBgColor(outline, "alphadark")(props)}`,
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
  themeHeight,
);

TextAreaInput.defaultProps = {
  state: "default",
  inputSize: "md",
  borderRadius: 2,
  borderColor: "gray",
};
