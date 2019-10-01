import styled from "@emotion/styled";

import {theme} from "styled-tools";

import {baseCompose, flexCompose, textCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export type BoxComponent = types.StyledHTML<"div", types.BoxProps>;
export const Box: BoxComponent = styled.div(
    ...baseCompose,
    themed("Box"),
    css,
);

export type InputComponent = types.StyledHTML<"input", types.InputProps>;
export const Input: InputComponent = styled.input(
    ...baseCompose,
    ...textCompose,
    themed("Input"),
    css,
);

export type TextAreaComponent = types.StyledHTML<"textarea", types.TextAreaProps>;
export const TextArea: TextAreaComponent = styled.textarea(
    ...baseCompose,
    ...textCompose,
    themed("TextArea"),
    css,
);

export type FormComponent = types.StyledHTML<"form", types.FormProps>;
export const Form: FormComponent = styled.form(
    ...baseCompose,
    themed("Form"),
    css,
);

export type SpanComponent = types.StyledHTML<"span", types.SpanProps>;
export const Span: SpanComponent = styled.span(
    ...baseCompose,
    ...textCompose,
    themed("SpanBox"),
    css,
);

export type ButtonComponent = types.StyledHTML<"button", types.ButtonProps>;
export const Button: ButtonComponent = styled.button(
    ...baseCompose,
    ...textCompose,
    themed("Box"),
    css,
);

export type FlexComponent = types.Styled<types.BoxProps, types.FlexProps>;
export const Flex: FlexComponent = styled(Box)(
    ...baseCompose,
    ...flexCompose,
    {
        display: "flex",
    },
    themed("Flex"),
);

export type TextComponent = types.StyledHTML<"p", types.TextProps>;
export const Text: TextComponent = styled.p(
    ...baseCompose,
    ...textCompose,
    themed("Text"),
    css,
);

type Heading2Component = types.StyledHTML<"h2", types.HeadingProps>;
export const Heading2: Heading2Component = styled.h2(
    ...baseCompose,
    ...textCompose,
    (props) => ({
        borderBottom: `1px solid ${theme("colors.light")(props)}`,
    }),
    themed("Heading"),
    css,
);

Heading2.defaultProps = {
    m: 0,
    p: 2,
    mb: 2,
    fontSize: 4,
    fontWeight: "400",
};

export type LinkComponent = types.StyledHTML<"a", types.LinkProps>;
export const Link: LinkComponent = styled.a(
    ...baseCompose,
    ...textCompose,
    themed("Link"),
    css,
);

Link.defaultProps = {
    color: "blue",
};

export type ImageComponent = types.StyledHTML<"img", types.ImageProps>;
export const Image: ImageComponent = styled.img(
    ...baseCompose,
    {
        maxWidth: "100%",
        height: "auto",
    },
    themed("Image"),
);

Image.defaultProps = {
    m: 0,
};

export * from "./system";
