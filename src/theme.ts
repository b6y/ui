import { darken, lighten, transparentize } from "polished";

import { Colors, NumberOrStringProp, Theme } from "./styled/system";

const baseAlpha = 0.5;
const baseDarken = 0.1;
const baseLighten = 0.1;

interface BaseColor {
  color: string;
  variants: VariantFn[];
}

type VariantFn = (name: string, color: string) => { [key: string]: string };

const darkVariant = (name: string, color: string) => ({
  [`dark${name}`]: darken(baseDarken, color),
  [`alphadark${name}`]: transparentize(baseAlpha, darken(baseDarken, color)),
});

const lightVariant = (name: string, color: string) => ({
  [`light${name}`]: lighten(baseLighten, color),
  [`alphalight${name}`]: transparentize(baseAlpha, lighten(baseLighten, color)),
});

const color = (color: string, variants: VariantFn[] = []) => ({ color, variants });

interface BaseColors {
  [key: string]: BaseColor;
}

const baseColors: BaseColors = {
  brand: color("#00406A", [darkVariant, lightVariant]),
  black: color("#000", [darkVariant, lightVariant]),
  white: color("#fff", [darkVariant, lightVariant]),
  darker: color("#3b3b3b"),
  darken: color("rgba(0, 0, 0, 0.25)"),
  light: color("#eee"),

  grayer: color(darken(0.1, "#bbb"), [darkVariant, lightVariant]),
  gray: color("#bbb", [darkVariant, lightVariant]),
  blue: color("#03a9f3", [darkVariant, lightVariant]),
  indigo: color("#6610f2", [darkVariant, lightVariant]),
  violet: color("#ab8ce4", [darkVariant, lightVariant]),
  fuchsia: color("#ee00de", [darkVariant, lightVariant]),
  pink: color("#e83e8c", [darkVariant, lightVariant]),
  red: color("#ff0000", [darkVariant, lightVariant]),
  orange: color("#fb9678", [darkVariant, lightVariant]),
  yellow: color("#fec107", [darkVariant, lightVariant]),
  lime: color("#67ee00", [darkVariant, lightVariant]),
  green: color("#00c292", [darkVariant, lightVariant]),
  teal: color("#20c997", [darkVariant, lightVariant]),
  cyan: color("#01c0c8", [darkVariant, lightVariant]),
};

const colors = Object.entries(baseColors)
  .reduce((a, [key, value]) => {
    a[key] = value.color;
    a[`alpha${key}`] = transparentize(baseAlpha, value.color);

    const result = value.variants.reduce(
      (res, b) => ({ ...res, ...b(key, value.color) }),
      a,
    );

    return result;
  }, {} as Colors);

export const sizes = [0, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4];

export const space = [0, 0.25, 0.5, 1, 2, 4, 8];

export const fontSizes = [0.6, 0.75, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4];

export const squarePaddings = [
  { x: .125, y: .125 },
  { x: .25, y: .25 },
  { x: .375, y: .375 },
  { x: .5, y: .5 },
  { x: .75, y: .75 },
  { x: 1, y: 1 },
  { x: 1.25, y: 1.25 },
  { x: 1.50, y: 1.50 },
  { x: 1.75, y: 1.75 },
];

export const rectangularPaddings = [
  { x: .0625, y: .125 },
  { x: .5, y: .25 },
  { x: .75, y: .375 },
  { x: 1, y: .5 },
  { x: 1.5, y: .75 },
  { x: 2, y: 1 },
  { x: 2.5, y: 1.25 },
  { x: 3, y: 1.50 },
  { x: 3.5, y: 1.75 },
];

export const fontWeights = {
  normal: 400,
  bold: 700,
};

export const radii = [0, .2, .4];

export const fonts = {
  0: `'Open Sans', sans-serif`,
  sans: `'Open Sans', sans-serif`,
  mono: "\"SF Mono\", \"Roboto Mono\", Menlo, monospace",
};

export const observeFonts = ["Open Sans"];

export const shadows = [
  "none",
  `inset 0 0 0 1px ${colors.gray}`,
  `inset 0 0 0 1px ${colors.gray}, 0 0 4px ${colors.gray}`,
];

export const defaults = {
  bg: {
    black: "black",
    white: "white",
    brand: "brand",
    default: "gray",
    primary: "blue",
    secondary: "indigo",
    success: "teal",
    danger: "red",
    warning: "yellow",
    info: "cyan",
    light: "white",
    dark: "black",
    muted: "darker",
  },
  font: {
    black: "black",
    white: "white",
    brand: "brand",
    default: "black",
    primary: "blue",
    secondary: "indigo",
    success: "teal",
    danger: "red",
    warning: "yellow",
    info: "cyan",
    light: "white",
    dark: "black",
    muted: "darker",
  },
  fg: {
    black: "black",
    white: "white",
    brand: "white",
    default: "black",
    primary: "white",
    secondary: "white",
    success: "white",
    danger: "white",
    warning: "white",
    info: "white",
    light: "black",
    dark: "white",
    muted: "black",
  },
  outline: {
    black: "black",
    white: "white",
    brand: "brand",
    default: "gray",
    primary: "blue",
    secondary: "indigo",
    success: "teal",
    danger: "red",
    warning: "yellow",
    info: "cyan",
    light: "white",
    dark: "black",
    muted: "darker",
  },
  border: {
    black: "black",
    white: "white",
    brand: "brand",
    default: "gray",
    primary: "blue",
    secondary: "indigo",
    success: "teal",
    danger: "red",
    warning: "yellow",
    info: "cyan",
    light: "white",
    dark: "black",
    muted: "darker",
  },
};

export interface Breakpoints {
  // >= 80rem
  xxlg?: NumberOrStringProp;
  // > 64rem <= 80rem
  xlg?: NumberOrStringProp;
  // > 48rem <= 64rem
  lg?: NumberOrStringProp;
  // > 32rem <= 48rem
  md?: NumberOrStringProp;
  // > 16rem <= 32rem
  sm?: NumberOrStringProp;
  // <= 16rem
  xs?: NumberOrStringProp;
}

/**
 *
 * @param xs <= 24rem
 * @param sm > 24rem <= 32rem
 * @param md > 32rem <= 48rem
 * @param lg > 48rem <= 64rem
 * @param xlg > 64rem <= 80rem
 * @param xxlg >= 80rem
 * @param defaultValue
 */
export const fullBreakpoints =
  (
    xs: NumberOrStringProp,
    sm: NumberOrStringProp,
    md: NumberOrStringProp,
    lg: NumberOrStringProp,
    xlg: NumberOrStringProp,
    xxlg: NumberOrStringProp,
    defaultValue: NumberOrStringProp = undefined,
  ) =>
    [
      // xs
      xs === undefined ? defaultValue : xs,
      // sm
      sm === undefined ? defaultValue : sm,
      // md
      md === undefined ? defaultValue : md,
      // lg
      lg === undefined ? defaultValue : lg,
      // xlg
      xlg === undefined ? defaultValue : xlg,
      // xxlg
      xxlg === undefined ? defaultValue : xxlg,
    ];

/**
 *
 * @param sm <= 32rem
 * @param md  > 32rem <= 48rem
 * @param lg  > 48rem
 * @param defaultValue
 */
export const breakpoints =
  (
    sm: NumberOrStringProp,
    md: NumberOrStringProp,
    lg: NumberOrStringProp,
    defaultValue: NumberOrStringProp = undefined,
  ) =>
    [
      // xs
      sm === undefined ? defaultValue : sm,
      // sm
      sm === undefined ? defaultValue : sm,
      // md
      md === undefined ? defaultValue : md,
      // lg
      lg === undefined ? defaultValue : lg,
      // xlg
      lg === undefined ? defaultValue : lg,
      // xxlg
      lg === undefined ? defaultValue : lg,
    ];

export const theme = {
  breakpoints: [24, 32, 48, 64, 80, 96].map((n) => `${n}rem`),
  defaults,
  space,
  fontSizes,
  fontWeights,
  fonts,
  colors,
  radii,
  shadows,
  rectangularPaddings,
  squarePaddings,
  sizes,
  observeFonts,
} as Theme;
