import { darken, lighten, transparentize, readableColor } from "polished";

import { Colors, ColorModifier, NumberOrStringProp, Theme } from "./styled/system";

const baseAlpha = 0.5;
const baseDarken = 0.1;
const baseLighten = 0.1;

type VariantFn = (color: string) => string;

interface Variant {
    name: ColorModifier;
    transform: VariantFn;
}

type Variants = {
    [key in ColorModifier]: Variant
};

const variants: Variants = {
    light: {
        name: "light",
        transform: (color: string) => lighten(baseLighten, color),
    },
    alphalight: {
        name: "alphalight",
        transform: (color: string) => transparentize(baseAlpha, lighten(baseLighten, color)),
    },
    alpha: {
        name: "alpha",
        transform: (color: string) => transparentize(baseAlpha, color),
    },
    alphadark: {
        name: "alphadark",
        transform: (color: string) => transparentize(baseAlpha, darken(baseDarken, color)),
    },
    dark: {
        name: "dark",
        transform: (color: string) => darken(baseDarken, color),
    },
};

const allVariants = Object.values(variants);

interface BaseColor {
    color: string;
    variants: Variant[];
}
interface BaseColors {
    [key: string]: BaseColor;
}

const color = (
    color: string,
    variants: Variant[] = allVariants,
) => ({ color, variants });

export const baseColors: BaseColors = {
  brand: color("#00406A"),
  black: color("#000"),
  white: color("#fff"),
  darker: color("#3b3b3b"),
  darken: color("rgba(0, 0, 0, 0.25)"),
  light: color("#eee"),
  grayer: color(darken(0.1, "#bbb")),
  gray: color("#bbb"),
  blue: color("#03a9f3"),
  indigo: color("#6610f2"),
  violet: color("#ab8ce4"),
  fuchsia: color("#ee00de"),
  pink: color("#e83e8c"),
  red: color("#ff0000"),
  orange: color("#fb9678"),
  yellow: color("#fec107"),
  lime: color("#67ee00"),
  green: color("#00c292"),
  teal: color("#20c997"),
  cyan: color("#01c0c8"),
};

const colors = Object.entries(baseColors)
    .reduce((a, [key, value]) => {
        a[key] = {
            bg: value.color,
            fg: readableColor(value.color),
        };

        const result = value.variants.reduce(
            (res, b) => {
                const c = b.transform(value.color);
                res[b.name + key] = {
                    bg: c,
                    fg: readableColor(value.color),
                };
                return res;
            },
            a,
        );

        return result;
    }, {} as Colors);

export const colorsMeta = Object.entries(baseColors)
    .map(([name, { color, variants }]) => {
        return {
            name,
            bg: color,
            fg: readableColor(color),
            variants: variants.map((variant) => {
                const c = variant.transform(color);
                return { name: variant.name, bg: c, fg: readableColor(c) };
            }),
        };
    });

export const sizes = [0, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4];

export const space = [0, 0.25, 0.5, 1, 2, 4, 8];

export const fontSizes = [0.6, 0.75, 0.85, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4];

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
