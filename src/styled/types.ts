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
  Box?: BoxProps;
  SpanBox?: SpanBoxProps;
  ButtonBox?: ButtonBoxProps;
  Flex?: FlexProps;
  Text?: TextProps;
  Heading?: HeadingProps;
  Link?: LinkProps;
  Image?: ImageProps;

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

export type WithStyled<T = Theme> = WithTheme<T> & WithCSS;

export type BoxProps<BaseProps = React.HTMLAttributes<HTMLDivElement>> =
  & BaseProps
  & gentypes.WithFontWeight
  & gentypes.WithSpace
  & gentypes.WithHeight
  & gentypes.WithWidth
  & gentypes.WithFontSize
  & gentypes.WithColor
  & gentypes.WithFlex
  & gentypes.WithOrder
  & gentypes.WithAlignSelf
  & gentypes.WithJustifySelf
  & gentypes.WithBorderRadius
  & gentypes.WithBorders
  & gentypes.WithBorderColor
  & gentypes.WithVerticalAlign
  & gentypes.WithBoxShadow
  & WithStyled;

export type InputProps<BaseProps = React.InputHTMLAttributes<HTMLInputElement>> =
  & BaseProps
  & gentypes.WithFontWeight
  & gentypes.WithSpace
  & gentypes.WithHeight
  & gentypes.WithWidth
  & gentypes.WithFontSize
  & gentypes.WithColor
  & gentypes.WithFlex
  & gentypes.WithOrder
  & gentypes.WithAlignSelf
  & gentypes.WithJustifySelf
  & gentypes.WithBorderRadius
  & gentypes.WithBorders
  & gentypes.WithBorderColor
  & gentypes.WithVerticalAlign
  & gentypes.WithBoxShadow
  & WithStyled;

export type TextAreaProps<BaseProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>> =
  & BaseProps
  & gentypes.WithFontWeight
  & gentypes.WithSpace
  & gentypes.WithHeight
  & gentypes.WithWidth
  & gentypes.WithFontSize
  & gentypes.WithColor
  & gentypes.WithFlex
  & gentypes.WithOrder
  & gentypes.WithAlignSelf
  & gentypes.WithJustifySelf
  & gentypes.WithBorderRadius
  & gentypes.WithBorders
  & gentypes.WithBorderColor
  & gentypes.WithVerticalAlign
  & gentypes.WithBoxShadow
  & WithStyled;

export type FormBoxProps<BaseProps = React.HTMLAttributes<HTMLFormElement>> =
  & BaseProps
  & gentypes.WithFontWeight
  & gentypes.WithSpace
  & gentypes.WithHeight
  & gentypes.WithWidth
  & gentypes.WithFontSize
  & gentypes.WithColor
  & gentypes.WithFlex
  & gentypes.WithOrder
  & gentypes.WithAlignSelf
  & gentypes.WithJustifySelf
  & gentypes.WithBorderRadius
  & gentypes.WithBorders
  & gentypes.WithBorderColor
  & gentypes.WithVerticalAlign
  & gentypes.WithBoxShadow
  & WithStyled;

export type SpanBoxProps = BoxProps<React.HTMLAttributes<HTMLSpanElement>> & gentypes.WithTextDecoration;

export type ButtonBoxProps = BoxProps<React.HTMLAttributes<HTMLButtonElement>> & gentypes.WithTextDecoration;

export type FlexProps =
  & BoxProps
  & gentypes.WithFlexWrap
  & gentypes.WithFlexDirection
  & gentypes.WithFlexBasis
  & gentypes.WithAlignItems
  & gentypes.WithJustifyContent;

export type TextProps =
  & BoxProps<React.HTMLAttributes<HTMLParagraphElement>>
  & gentypes.WithFontFamily
  & gentypes.WithFontWeight
  & gentypes.WithTextAlign
  & gentypes.WithLineHeight
  & gentypes.WithLetterSpacing;

export type HeadingProps =
  & BoxProps<React.HTMLAttributes<HTMLHeadingElement>>
  & gentypes.WithFontFamily
  & gentypes.WithFontWeight
  & gentypes.WithTextAlign
  & gentypes.WithLineHeight
  & gentypes.WithLetterSpacing;

export type LinkProps = BoxProps<React.HTMLAttributes<HTMLAnchorElement>>;

export type ImageProps =
  & React.HTMLAttributes<HTMLImageElement>
  & gentypes.WithFontWeight
  & gentypes.WithSpace
  & gentypes.WithHeight
  & gentypes.WithWidth
  & gentypes.WithFontSize
  & gentypes.WithColor
  & gentypes.WithFlex
  & gentypes.WithOrder
  & gentypes.WithAlignSelf
  & gentypes.WithJustifySelf
  & gentypes.WithBorderRadius
  & gentypes.WithBorders
  & gentypes.WithBorderColor
  & gentypes.WithVerticalAlign
  & gentypes.WithBoxShadow
  & WithStyled;

export * from "./generatedTypes";
