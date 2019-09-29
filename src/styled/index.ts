import styled from "@emotion/styled";

import {
  alignContent,
  alignItems,
  alignSelf,
  bgColor,
  borderColor,
  borderRadius,
  borders,
  boxShadow,
  color,
  flex,
  flexBasis,
  flexDirection,
  flexWrap,
  fontFamily,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  justifyItems,
  justifySelf,
  letterSpacing,
  lineHeight,
  order,
  space,
  textAlign,
  textDecoration,
  verticalAlign,
  width,
  WithCSS,
  WithTheme,
} from "./system";

import * as types from "./types";

import {
  theme,
} from "styled-tools";

export function css<P>(props: P & WithCSS) {
  return (props).css;
}

export function themed<Props, Result>(key: string) {
  return function themedApply<ApplyProps = Props, ApplyResult = Result>(
    props: ApplyProps & WithTheme<types.Theme>,
  ): ApplyResult | undefined  {
    if (props.theme !== undefined) {
      return props.theme[key] as ApplyResult || undefined;
    }

    return undefined;
  };
}

export type InputComponent = types.StyledHTML<"input", types.InputProps>;
export const Input: InputComponent = styled.input<types.InputProps>(
  space,
  width,
  height,
  fontSize,
  lineHeight,
  color,
  flex,
  order,
  alignSelf,
  justifySelf,
  borderRadius,
  borders,
  borderColor,
  bgColor,
  textDecoration,
  verticalAlign,
  boxShadow,
  themed("Input"),
  css,
);

export type TextAreaComponent = types.StyledHTML<"textarea", types.TextAreaProps>;
export const TextArea: TextAreaComponent = styled.textarea<types.TextAreaProps>(
  space,
  width,
  height,
  fontSize,
  lineHeight,
  color,
  flex,
  order,
  alignSelf,
  justifySelf,
  borderRadius,
  borders,
  borderColor,
  bgColor,
  textDecoration,
  verticalAlign,
  boxShadow,
  themed("TextArea"),
  css,
);

export type BoxComponent = types.StyledHTML<"div", types.BoxProps>;
export const Box: BoxComponent = styled.div<types.BoxProps>(
  space,
  width,
  height,
  fontSize,
  lineHeight,
  color,
  flex,
  order,
  alignSelf,
  justifySelf,
  borderRadius,
  borders,
  borderColor,
  bgColor,
  textDecoration,
  verticalAlign,
  boxShadow,
  themed("Box"),
  css,
);

export type FormBoxComponent = types.StyledHTML<"form", types.FormBoxProps>;
export const FormBox: FormBoxComponent = styled.form<types.FormBoxProps>(
  space,
  width,
  height,
  fontSize,
  lineHeight,
  color,
  flex,
  order,
  alignSelf,
  justifySelf,
  borderRadius,
  borders,
  borderColor,
  bgColor,
  textDecoration,
  verticalAlign,
  boxShadow,
  themed("FormBox"),
  css,
);

export type SpanBoxComponent = types.StyledHTML<"span", types.SpanBoxProps>;
export const SpanBox: SpanBoxComponent = styled.span(
  space,
  width,
  height,
  fontSize,
  lineHeight,
  color,
  flex,
  order,
  alignSelf,
  justifySelf,
  borderRadius,
  borders,
  borderColor,
  bgColor,
  textDecoration,
  verticalAlign,
  boxShadow,
  themed("SpanBox"),
  css,
);

export type ButtonBoxComponent = types.StyledHTML<"button", types.ButtonBoxProps>;
export const ButtonBox: ButtonBoxComponent =
  styled.button(
    space,
    width,
    height,
    fontSize,
    lineHeight,
    color,
    flex,
    order,
    alignSelf,
    justifySelf,
    borderRadius,
    borders,
    borderColor,
    textDecoration,
    verticalAlign,
    boxShadow,
    themed("Box"),
    css,
  );

export type FlexComponent = types.Styled<types.BoxProps, types.FlexProps>;
export const Flex: FlexComponent = styled(Box)(
  {
    display: "flex",
  },
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  flexBasis,
  alignContent,
  justifyItems,
  themed("Flex"),
);

export type TextComponent = types.Styled<types.BoxProps, types.TextProps>;
export const Text: TextComponent = styled(Box.withComponent("p"))(
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  themed("Text"),
);

type HeadingComponent = types.Styled<types.BoxProps, types.HeadingProps>;
export const Heading: HeadingComponent = styled(Text.withComponent("h2"))(
  (props) => ({
    borderBottom: `1px solid ${theme("colors.light")(props)}`,
  }),
  themed("Heading"),
);

Heading.defaultProps = {
  m: 0,
  p: 2,
  mb: 2,
  fontSize: 4,
  fontWeight: "400",
};

export type LinkComponent = types.Styled<types.BoxProps, types.LinkProps>;
export const Link: LinkComponent = styled(Box.withComponent("a"))(themed("Link"));

Link.defaultProps = {
  color: "blue",
};

export type ImageComponent = types.StyledHTML<"img", types.ImageProps>;
export const Image: ImageComponent = styled.img(
  {
    maxWidth: "100%",
    height: "auto",
  },
  borderRadius,
  themed("Image"),
);

Image.defaultProps = {
  m: 0,
};

export * from "./system";
