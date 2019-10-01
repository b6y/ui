import { StyledComponent } from "@emotion/styled";
import React from "react";

import * as gentypes from "./generatedTypes";

export type Color =
  | "brand"
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "muted"
  | "black"
  | "white";

export type Modifier =
  | "dark"
  | "light"
  | "alpha"
  | "alphadark"
  | "alphalight";

export interface Colors {
  black: string;
  alphablack: string;
  white: string;
  alphawhite: string;
  darker: string;
  alphadarker: string;
  darken: string;
  alphadarken: string;
  grayer: string;
  alphagrayer: string;
  gray: string;
  alphagray: string;
  light: string;
  alphalight: string;

  blue: string;
  alphablue: string;
  darkblue: string;
  lightblue: string;
  alphalightblue: string;
  alphadarkblue: string;

  indigo: string;
  alphaindigo: string;
  darkindigo: string;
  lightindigo: string;
  alphalightindigo: string;
  alphadarkindigo: string;

  violet: string;
  alphaviolet: string;
  darkviolet: string;
  lightviolet: string;
  alphalightviolet: string;
  alphadarkviolet: string;

  fuchsia: string;
  alphafuchsia: string;
  darkfuchsia: string;
  lightfuchsia: string;
  alphalightfuchsia: string;
  alphadarkfuchsia: string;

  pink: string;
  alphapink: string;
  darkpink: string;
  lightpink: string;
  alphalightpink: string;
  alphadarkpink: string;

  red: string;
  alphared: string;
  darkred: string;
  lightred: string;
  alphalightred: string;
  alphadarkred: string;

  orange: string;
  alphaorange: string;
  darkorange: string;
  lightorange: string;
  alphalightorange: string;
  alphadarkorange: string;

  yellow: string;
  alphayellow: string;
  darkyellow: string;
  lightyellow: string;
  alphalightyellow: string;
  alphadarkyellow: string;

  lime: string;
  alphalime: string;
  darklime: string;
  lightlime: string;
  alphalightlime: string;
  alphadarklime: string;

  green: string;
  alphagreen: string;
  darkgreen: string;
  lightgreen: string;
  alphalightgreen: string;
  alphadarkgreen: string;

  teal: string;
  alphateal: string;
  darkteal: string;
  lightteal: string;
  alphalightteal: string;
  alphadarkteal: string;

  cyan: string;
  alphacyan: string;
  darkcyan: string;
  lightcyan: string;
  alphalightcyan: string;
  alphadarkcyan: string;

  brand: string;
  alphabrand: string;
  darkbrand: string;
  lightbrand: string;
  alphalightbrand: string;
  alphadarkbrand: string;

  [name: string]: string;
}

export interface DefaultColorSet {
  default: keyof Colors;
  black: keyof Colors;
  white: keyof Colors;
  brand: keyof Colors;
  primary: keyof Colors;
  secondary: keyof Colors;
  success: keyof Colors;
  danger: keyof Colors;
  warning: keyof Colors;
  info: keyof Colors;
  light: keyof Colors;
  dark: keyof Colors;
  muted: keyof Colors;
}

export interface Defaults {
  fg: DefaultColorSet;
  bg: DefaultColorSet;
  border: DefaultColorSet;
  outline: DefaultColorSet;
  font: DefaultColorSet;
}

export interface FontWeights {
  normal: number;
  bold: number;
}

export interface Padding {
  x: number;
  y: number;
}

export interface Fonts {
  0: string;
  sans: string;
  mono: string;
}

export interface Theme {
  defaults: Defaults;
  breakpoints: string[];
  space: number[];
  fontSizes: number[];
  fontWeights: FontWeights;
  fonts: Fonts;
  colors: Colors;
  radii: number[];
  shadows: string[];
  rectangularPaddings: Padding[];
  squarePaddings: Padding[];
  Box?: BaseBoxProps;
  SpanBox?: BaseSpanProps;
  ButtonBox?: BaseButtonProps;
  Flex?: BaseFlexProps;
  Text?: BaseTextProps;
  Heading?: BaseHeadingProps;
  Anchor?: BaseAnchorProps;
  Image?: BaseImageProps;

  [key: string]: any;
}

export type Styled<
  InnerProps,
  StyleProps,
  TTheme extends object = Theme,
> = StyledComponent<InnerProps, StyleProps, TTheme>;

export type StyledHTML<
  TElement extends keyof JSX.IntrinsicElements,
  StyleProps,
  TTheme extends object = Theme,
> = StyledComponent<JSX.IntrinsicElements[TElement], StyleProps, TTheme>;

export interface WithCSS {
  css?: any;
}

export interface WithTheme<TTheme = Theme> {
  theme?: TTheme;
}

export interface WithStyled<T = Theme> extends WithTheme<T>, WithCSS {}

export interface BaseProps extends
  gentypes.WithSpace,
  gentypes.WithHeight,
  gentypes.WithWidth,
  gentypes.WithFlex,
  gentypes.WithOrder,
  gentypes.WithAlignSelf,
  gentypes.WithJustifySelf,
  gentypes.WithBorderRadius,
  gentypes.WithBorders,
  gentypes.WithBorderColor,
  gentypes.WithVerticalAlign,
  gentypes.WithBoxShadow,
  WithStyled {}

export interface HasTextProps extends
  gentypes.WithFontWeight,
  gentypes.WithFontSize,
  gentypes.WithColor,
  gentypes.WithTextDecoration {}

export interface BoxProps extends
  Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "css">,
  BaseProps {}

export interface InputProps extends
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "color" | "css" | "size" | "width" | "height">,
  BaseProps,
  HasTextProps {}

export interface TextAreaProps extends
  Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, "color" | "css" | "size" | "width" | "height">,
  BaseProps,
  HasTextProps {}

export interface FormProps extends
  Omit<React.HTMLAttributes<HTMLFormElement>, "color" | "css">,
  BaseProps {}

export interface SpanProps extends 
  Omit<React.HTMLAttributes<HTMLSpanElement>, "color" | "css">,
  BaseProps,
  HasTextProps {}

export interface AnchorProps extends
  Omit<React.HTMLAttributes<HTMLAnchorElement>, "color" | "css">,
  BaseProps,
  HasTextProps {}

export interface ButtonProps extends
  Omit<React.HTMLAttributes<HTMLButtonElement>, "color" | "css">,
  BaseProps,
  HasTextProps {}

export interface FlexProps extends
  Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "css">,
  BaseProps,
  gentypes.WithFlexWrap,
  gentypes.WithFlexDirection,
  gentypes.WithFlexBasis,
  gentypes.WithAlignItems,
  gentypes.WithJustifyContent {}

export interface TextProps extends
  Omit<React.HTMLAttributes<HTMLParagraphElement>, "color" | "css">,
  BaseProps,
  HasTextProps {}

export interface BaseHeadingProps extends
  Omit<React.HTMLAttributes<HTMLHeadingElement>, "color" | "css">,
  BaseProps,
  HasTextProps {}

export interface ImageProps extends
  Omit<React.HTMLAttributes<HTMLImageElement>, "css">,
  BaseProps {}

export * from "./generatedTypes";
