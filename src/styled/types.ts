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
  | "darker"
  | "dark"
  | "light"
  | "lighter"
  | "alpha"
  | "alphadark"
  | "alphadarker"
  | "alphalight"
  | "alphalighter";

export interface ColorInfo {
    bg: string;
    fg: string;
}

export interface Colors {
  brand: ColorInfo;
  lightbrand: ColorInfo;
  lighterbrand: ColorInfo;
  alphalightbrand: ColorInfo;
  alphalighterbrand: ColorInfo;
  alphabrand: ColorInfo;
  alphadarkbrand: ColorInfo;
  alphadarkerbrand: ColorInfo;
  darkbrand: ColorInfo;
  darkerbrand: ColorInfo;

  black: ColorInfo;
  lightblack: ColorInfo;
  lighterblack: ColorInfo;
  alphalightblack: ColorInfo;
  alphalighterblack: ColorInfo;
  alphablack: ColorInfo;
  alphadarkblack: ColorInfo;
  alphadarkerblack: ColorInfo;
  darkblack: ColorInfo;
  darkerblack: ColorInfo;
  
  white: ColorInfo;
  lightwhite: ColorInfo;
  lighterwhite: ColorInfo;
  alphalightwhite: ColorInfo;
  alphalighterwhite: ColorInfo;
  alphawhite: ColorInfo;
  alphadarkwhite: ColorInfo;
  alphadarkerwhite: ColorInfo;
  darkwhite: ColorInfo;
  darkerwhite: ColorInfo;

  gray: ColorInfo;
  lightgray: ColorInfo;
  lightergray: ColorInfo;
  alphalightgray: ColorInfo;
  alphalightergray: ColorInfo;
  alphagray: ColorInfo;
  alphadarkgray: ColorInfo;
  alphadarkergray: ColorInfo;
  darkgray: ColorInfo;
  darkergray: ColorInfo;

  grayer: ColorInfo;
  lightgrayer: ColorInfo;
  lightergrayer: ColorInfo;
  alphalightgrayer: ColorInfo;
  alphalightergrayer: ColorInfo;
  alphagrayer: ColorInfo;
  alphadarkgrayer: ColorInfo;
  alphadarkergrayer: ColorInfo;
  darkgrayer: ColorInfo;
  darkergrayer: ColorInfo;

  blue: ColorInfo;
  lightblue: ColorInfo;
  lighterblue: ColorInfo;
  alphalightblue: ColorInfo;
  alphalighterblue: ColorInfo;
  alphablue: ColorInfo;
  alphadarkblue: ColorInfo;
  alphadarkerblue: ColorInfo;
  darkblue: ColorInfo;
  darkerblue: ColorInfo;

  indigo: ColorInfo;
  lightindigo: ColorInfo;
  lighterindigo: ColorInfo;
  alphalightindigo: ColorInfo;
  alphalighterindigo: ColorInfo;
  alphaindigo: ColorInfo;
  alphadarkindigo: ColorInfo;
  alphadarkerindigo: ColorInfo;
  darkindigo: ColorInfo;
  darkerindigo: ColorInfo;

  violet: ColorInfo;
  lightviolet: ColorInfo;
  lighterviolet: ColorInfo;
  alphalightviolet: ColorInfo;
  alphalighterviolet: ColorInfo;
  alphaviolet: ColorInfo;
  alphadarkviolet: ColorInfo;
  alphadarkerviolet: ColorInfo;
  darkviolet: ColorInfo;
  darkerviolet: ColorInfo;

  fuchsia: ColorInfo;
  lightfuchsia: ColorInfo;
  lighterfuchsia: ColorInfo;
  alphalightfuchsia: ColorInfo;
  alphalighterfuchsia: ColorInfo;
  alphafuchsia: ColorInfo;
  alphadarkfuchsia: ColorInfo;
  alphadarkerfuchsia: ColorInfo;
  darkfuchsia: ColorInfo;
  darkerfuchsia: ColorInfo;

  pink: ColorInfo;
  lightpink: ColorInfo;
  lighterpink: ColorInfo;
  alphalightpink: ColorInfo;
  alphalighterpink: ColorInfo;
  alphapink: ColorInfo;
  alphadarkpink: ColorInfo;
  alphadarkerpink: ColorInfo;
  darkpink: ColorInfo;
  darkerpink: ColorInfo;

  red: ColorInfo;
  lightred: ColorInfo;
  lighterred: ColorInfo;
  alphalightred: ColorInfo;
  alphalighterred: ColorInfo;
  alphared: ColorInfo;
  alphadarkred: ColorInfo;
  alphadarkerred: ColorInfo;
  darkred: ColorInfo;
  darkerred: ColorInfo;

  orange: ColorInfo;
  lightorange: ColorInfo;
  lighterorange: ColorInfo;
  alphalightorange: ColorInfo;
  alphalighterorange: ColorInfo;
  alphaorange: ColorInfo;
  alphadarkorange: ColorInfo;
  alphadarkerorange: ColorInfo;
  darkorange: ColorInfo;
  darkerorange: ColorInfo;

  yellow: ColorInfo;
  lightyellow: ColorInfo;
  lighteryellow: ColorInfo;
  alphalightyellow: ColorInfo;
  alphalighteryellow: ColorInfo;
  alphayellow: ColorInfo;
  alphadarkyellow: ColorInfo;
  alphadarkeryellow: ColorInfo;
  darkyellow: ColorInfo;
  darkeryellow: ColorInfo;

  lime: ColorInfo;
  lightlime: ColorInfo;
  lighterlime: ColorInfo;
  alphalightlime: ColorInfo;
  alphalighterlime: ColorInfo;
  alphalime: ColorInfo;
  alphadarklime: ColorInfo;
  alphadarkerlime: ColorInfo;
  darklime: ColorInfo;
  darkerlime: ColorInfo;

  green: ColorInfo;
  lightgreen: ColorInfo;
  lightergreen: ColorInfo;
  alphalightgreen: ColorInfo;
  alphalightergreen: ColorInfo;
  alphagreen: ColorInfo;
  alphadarkgreen: ColorInfo;
  alphadarkergreen: ColorInfo;
  darkgreen: ColorInfo;
  darkergreen: ColorInfo;

  teal: ColorInfo;
  lightteal: ColorInfo;
  lighterteal: ColorInfo;
  alphalightteal: ColorInfo;
  alphalighterteal: ColorInfo;
  alphateal: ColorInfo;
  alphadarkteal: ColorInfo;
  alphadarkerteal: ColorInfo;
  darkteal: ColorInfo;
  darkerteal: ColorInfo;

  cyan: ColorInfo;
  lightcyan: ColorInfo;
  lightercyan: ColorInfo;
  alphalightcyan: ColorInfo;
  alphalightercyan: ColorInfo;
  alphacyan: ColorInfo;
  alphadarkcyan: ColorInfo;
  alphadarkercyan: ColorInfo;
  darkcyan: ColorInfo;
  darkercyan: ColorInfo;

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
