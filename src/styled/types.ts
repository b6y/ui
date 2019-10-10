import { StyledComponent } from "@emotion/styled";

import * as gentypes from "./generatedTypes";

export type ColorAlias =
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

export type ColorModifier =
  | "dark"
  | "light"
  | "alpha"
  | "alphadark"
  | "alphalight";

export interface ColorInfo {
    bg: string;
    fg: string;
}

export interface Colors {
  black: ColorInfo;
  alphablack: ColorInfo;
  white: ColorInfo;
  alphawhite: ColorInfo;
  darker: ColorInfo;
  alphadarker: ColorInfo;
  darken: ColorInfo;
  alphadarken: ColorInfo;
  grayer: ColorInfo;
  alphagrayer: ColorInfo;
  gray: ColorInfo;
  alphagray: ColorInfo;
  light: ColorInfo;
  alphalight: ColorInfo;

  blue: ColorInfo;
  alphablue: ColorInfo;
  darkblue: ColorInfo;
  lightblue: ColorInfo;
  alphalightblue: ColorInfo;
  alphadarkblue: ColorInfo;

  indigo: ColorInfo;
  alphaindigo: ColorInfo;
  darkindigo: ColorInfo;
  lightindigo: ColorInfo;
  alphalightindigo: ColorInfo;
  alphadarkindigo: ColorInfo;

  violet: ColorInfo;
  alphaviolet: ColorInfo;
  darkviolet: ColorInfo;
  lightviolet: ColorInfo;
  alphalightviolet: ColorInfo;
  alphadarkviolet: ColorInfo;

  fuchsia: ColorInfo;
  alphafuchsia: ColorInfo;
  darkfuchsia: ColorInfo;
  lightfuchsia: ColorInfo;
  alphalightfuchsia: ColorInfo;
  alphadarkfuchsia: ColorInfo;

  pink: ColorInfo;
  alphapink: ColorInfo;
  darkpink: ColorInfo;
  lightpink: ColorInfo;
  alphalightpink: ColorInfo;
  alphadarkpink: ColorInfo;

  red: ColorInfo;
  alphared: ColorInfo;
  darkred: ColorInfo;
  lightred: ColorInfo;
  alphalightred: ColorInfo;
  alphadarkred: ColorInfo;

  orange: ColorInfo;
  alphaorange: ColorInfo;
  darkorange: ColorInfo;
  lightorange: ColorInfo;
  alphalightorange: ColorInfo;
  alphadarkorange: ColorInfo;

  yellow: ColorInfo;
  alphayellow: ColorInfo;
  darkyellow: ColorInfo;
  lightyellow: ColorInfo;
  alphalightyellow: ColorInfo;
  alphadarkyellow: ColorInfo;

  lime: ColorInfo;
  alphalime: ColorInfo;
  darklime: ColorInfo;
  lightlime: ColorInfo;
  alphalightlime: ColorInfo;
  alphadarklime: ColorInfo;

  green: ColorInfo;
  alphagreen: ColorInfo;
  darkgreen: ColorInfo;
  lightgreen: ColorInfo;
  alphalightgreen: ColorInfo;
  alphadarkgreen: ColorInfo;

  teal: ColorInfo;
  alphateal: ColorInfo;
  darkteal: ColorInfo;
  lightteal: ColorInfo;
  alphalightteal: ColorInfo;
  alphadarkteal: ColorInfo;

  cyan: ColorInfo;
  alphacyan: ColorInfo;
  darkcyan: ColorInfo;
  lightcyan: ColorInfo;
  alphalightcyan: ColorInfo;
  alphadarkcyan: ColorInfo;

  brand: ColorInfo;
  alphabrand: ColorInfo;
  darkbrand: ColorInfo;
  lightbrand: ColorInfo;
  alphalightbrand: ColorInfo;
  alphadarkbrand: ColorInfo;

  [name: string]: ColorInfo;
}

export interface Defaults {
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
  observeFonts: string[],
  colors: Colors;
  radii: number[];
  shadows: string[];
  rectangularPaddings: Padding[];
  squarePaddings: Padding[];
  Box?: BoxProps;
  SpanBox?: SpanProps;
  ButtonBox?: ButtonProps;
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

export interface WithStyled<T = Theme> extends WithTheme<T>, WithCSS {}

export interface BaseProps extends
  gentypes.WithSpace,
  gentypes.WithHeight,
  gentypes.WithWidth,
  gentypes.WithOrder,
  gentypes.WithAlignSelf,
  gentypes.WithJustifySelf,
  gentypes.WithBorderRadius,
  gentypes.WithBorders,
  gentypes.WithBorderColor,
  gentypes.WithBgColor,
  gentypes.WithVerticalAlign,
  gentypes.WithBoxShadow,
  gentypes.WithLineHeight,
  gentypes.WithMaxWidth,
  gentypes.WithMaxHeight,
  gentypes.WithMinWidth,
  gentypes.WithMinHeight,
  WithStyled {}

export interface HasTextProps extends
  gentypes.WithFontWeight,
  gentypes.WithFontSize,
  gentypes.WithColor,
  gentypes.WithTextDecoration {}

export interface BoxProps extends
  Omit<JSX.IntrinsicElements["div"], "color" | "css" | "ref">,
  BaseProps {}

export interface InputProps extends
  Omit<JSX.IntrinsicElements["input"], "color" | "css" | "ref" | "size" | "width" | "height">,
  BaseProps,
  HasTextProps {}

export interface TextAreaProps extends
  Omit<JSX.IntrinsicElements["textarea"], "color" | "css" | "ref" | "size" | "width" | "height">,
  BaseProps,
  HasTextProps {}

export interface FormProps extends
  Omit<JSX.IntrinsicElements["form"], "color" | "css" | "ref">,
  BaseProps {}

export interface SpanProps extends
  Omit<JSX.IntrinsicElements["span"], "color" | "css" | "ref">,
  BaseProps,
  HasTextProps {}

export interface LinkProps extends
  Omit<JSX.IntrinsicElements["a"], "color" | "css" | "ref">,
  BaseProps,
  HasTextProps {}

export interface ButtonProps extends
  Omit<JSX.IntrinsicElements["button"], "color" | "css" | "ref">,
  BaseProps,
  HasTextProps {}

export interface FlexProps extends
  Omit<JSX.IntrinsicElements["div"], "color" | "css" | "ref">,
  BaseProps,
  gentypes.WithFlexWrap,
  gentypes.WithFlexDirection,
  gentypes.WithFlexBasis,
  gentypes.WithAlignItems,
  gentypes.WithJustifyContent {}

export interface TextProps extends
  Omit<JSX.IntrinsicElements["p"], "color" | "css" | "ref">,
  BaseProps,
  HasTextProps {}

export interface HeadingProps extends
  Omit<JSX.IntrinsicElements["h1"], "color" | "css" | "ref">,
  BaseProps,
  HasTextProps {}

export interface ImageProps extends
  Omit<JSX.IntrinsicElements["img"], "color" | "css" | "ref" | "size" | "width" | "height">,
  BaseProps {}

export interface TableHeadProps extends
    Omit<JSX.IntrinsicElements["thead"], "color" | "css" | "ref">,
    BaseProps {}

export interface TableBodyProps extends
    Omit<JSX.IntrinsicElements["tbody"], "color" | "css" | "ref">,
    BaseProps {}

export interface TableFootProps extends
    Omit<JSX.IntrinsicElements["tfoot"], "color" | "css" | "ref">,
    BaseProps {}

export interface TableRowProps extends
    Omit<JSX.IntrinsicElements["tr"], "color" | "css" | "ref">,
    BaseProps {}

export interface TableCellProps extends
    Omit<JSX.IntrinsicElements["td"], "color" | "css" | "ref">,
    BaseProps {}

export interface TableProps extends
    Omit<JSX.IntrinsicElements["table"], "color" | "css" | "ref">,
    BaseProps {}

export * from "./generatedTypes";
