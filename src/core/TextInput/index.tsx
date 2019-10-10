import styled, { StyledComponent } from "@emotion/styled";
import * as R from "ramda";
import React, { HTMLAttributes } from "react";
import { injectIntl, MessageDescriptor, WrappedComponentProps } from "react-intl";

import {
  ColorAlias,
  getBgColor,
  getFgColor,
  getSize,
  hasTransition,
  Input,
  InputProps,
  Padding,
  themed,
  translateSize,
} from "../../styled";

import { SvgIcon } from "../Icon";

export interface TextInputProps extends InputProps {
  state?: ColorAlias;
  inputSize?: string;
  defaultOutlineColor?: ColorAlias;
}

const defaultSize = R.defaultTo(2);
const iconMargin = getSize(1);
const getRectangularPaddings = themed<TextInputProps, Padding[]>("rectangularPaddings");
const getFontSizes = themed<TextInputProps, number[]>("fontSizes");

const themeHeight = (props: TextInputProps) => {
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

const Wrapped = React.forwardRef((props: TextInputProps, ref: React.Ref<HTMLInputElement>) => {
  const { state, inputSize, defaultOutlineColor, ...rest } = props;
  return <Input ref={ref} {...rest} />;
});

export const TextInput = styled(Wrapped)(
  hasTransition,
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

TextInput.defaultProps = {
  state: "default",
  defaultOutlineColor: "primary",
  type: "text",
  inputSize: "md",
  borderRadius: 2,
};
