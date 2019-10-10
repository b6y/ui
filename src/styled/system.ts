import PropTypes from "prop-types";
import * as R from "ramda";

import * as gentypes from "./generatedTypes";
import * as types from "./types";

interface EnsureWithTheme {
  theme: types.Theme;
}

// utils
const titleCase = (value: string): string | null => {
  if (R.isNil(value)) {
    return null;
  }

  return value.replace(
    /(^[a-z]| [a-z]|-[a-z]|_[a-z])/g,
    ($1) => $1.toUpperCase(),
  );
};

const noop = <T>(n: T) => n;

export const sizeAliases = ["xs", "sm", "md", "lg", "xlg", "xxlg", "xxxlg"];

export const propTypes = {
  numberOrString: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  responsive: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
  ]),
};

export const defaultBreakpoints = [32, 48, 64, 80].map((n) => `${n}rem`);

export const is = (n: any) => n !== undefined && n !== null;

export const num = (n: any) => typeof n === "number" && !isNaN(n);

export const px = (n: any): string | undefined => is(n) ? (num(n) ? `${n}px` : String(n)) : undefined;
export const em = (n: any): string | undefined => is(n) ? (num(n) ? `${n}em` : String(n)) : undefined;
export const rem = (n: any): string | undefined => is(n) ? (num(n) ? `${n}rem` : String(n)) : undefined;

export const units: { [key: string]: (value: any) => string | undefined } = { px, em, rem };

export const get = <T>(obj: any, ...paths: string[]): T | null => R.pathOr<T | null>(null, paths, obj);

export const getOr = <T>(
    obj: any,
    defaultValue: T,
    ...paths: string[]
): T => R.pathOr<T>(defaultValue, paths, obj);

export const themeGet = <T>(paths: string[], fallback: T | null) => (props: EnsureWithTheme): T | null =>
  get<T>(props.theme, ...paths) || fallback;

export function css<P>(props: P & types.WithCSS) {
  return (props).css;
}

export function themed<Props, Result>(key: string) {
  return function themedApply<ApplyProps = Props, ApplyResult = Result>(
      props: ApplyProps & types.WithTheme<types.Theme>,
  ): ApplyResult | undefined {
    if (props.theme !== undefined) {
      return props.theme[key] as ApplyResult || undefined;
    }

    return undefined;
  };
}

export const translateSize = <T>(size: string | number, defaultValue = 2) => {
  if (typeof size === "number") {
    return size;
  }

  const pos = sizeAliases.indexOf(size);

  if (pos < 0) {
    return defaultValue;
  }

  return pos;
};

export const merge = (a: any, b: any): any =>
  Object.assign(
    {},
    a,
    b,
    Object.keys(b || {}).reduce(
      (obj, key) =>
        Object.assign(obj, {
          [key]:
            a[key] !== null && typeof a[key] === "object"
              ? merge(a[key], b[key])
              : b[key],
        }),
      {},
    ),
  );

export const compose = (...funcs: any) => {
  const fn = (props: any) =>
    funcs
      .map((fn: any) => fn(props))
      .filter(Boolean)
      .reduce(merge, {});

  fn.propTypes = funcs.map((fn: any) => fn.propTypes).reduce(merge, {});
  return fn;
};

export const createMediaQuery = (n: any) => `@media screen and (min-width: ${px(n)})`;

interface StyleParams {
  prop: string;
  cssProperty?: string;
  key?: string;
  getter?: (_: any) => any;
  transformValue?: (_: any) => any;
  scale?: number[] | string[];
}

export const style = ({ cssProperty, prop, getter, transformValue, key, scale: defaultScale }: StyleParams) => {
  const css = cssProperty || prop;
  const transform = transformValue || getter || noop;
  const fn = (props: any) => {
    const val = props[prop];
    if (!is(val)) { return null; }

    const scale = key !== undefined ? get(props.theme, key) : defaultScale;

    const style = (n: any) => {
        if (!is(scale)) {
            return { [css]: transform(n) };
        }

        if (is(n)) {
            const value = get(scale, n);

            if (!is(value)) {
                return { [css]: transform(n) };
            }

            return { [css]: transform(value) };
        }

        return null;
    }

    if (!Array.isArray(val)) {
      return style(val);
    }

    // how to hoist this up??
    const breakpoints = [
      null,
      ...(get<string[]>(props.theme, "breakpoints") || defaultBreakpoints).map(
        createMediaQuery,
      ),
    ];

    let styles: { [key: string]: any } = {};

    for (let i = 0; i < val.length; i++) {
      const media = breakpoints[i];
      if (!media) {
        styles = style(val[i]) || {};
        continue;
      }
      const rule = style(val[i]);
      if (!rule) { continue; }
      styles[media] = rule;
    }

    return styles;
  };

  fn.propTypes = { [prop]: propTypes.responsive } as any;

  return fn;
};

export const getWidth = (n: any) => (!num(n) || n > 1 ? px(n) : `${n * 100}%`);

export const util = {
  propTypes,
  defaultBreakpoints,
  is,
  num,
  px,
  get,
  themeGet,
  merge,
  compose,
  createMediaQuery,
  style,
};

// space
const isNegative = (n: any) => n < 0;
const REG = /^[mp][trblxy]?$/;
const properties: { [key: string]: string } = {
  m: "margin",
  p: "padding",
};
const directions: { [key: string]: string | string[] } = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"],
};

const getProperties = (key: string) => {
  const [a, b] = key.split("");
  const property = properties[a];
  const direction = directions[b] || "";
  return Array.isArray(direction)
    ? direction.map((dir) => property + dir)
    : [property + direction];
};

export const getValue = (scale: number[], unit = "rem") => (n: any): string | number | undefined => {
  if (!num(n)) {
    return units[unit](scale[n] || n);
  }

  const abs = Math.abs(n);
  const neg = isNegative(n);
  let value = scale[abs];

  if (!is(value)) {
      value = abs;
  }

  if (!num(value)) {
    return neg ? `-${value}` : value;
  }

  return units[unit](value * (neg ? -1 : 1));
};

const defaultScale = [0, 4, 8, 16, 32, 64, 128, 256, 512];

const defaultSizes = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56];

const defaultFontSizes = [0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6];

const defaultRadii = [0, .15, .3];

const getBg = (color: types.ColorInfo | undefined): string | undefined => color ? color.bg : undefined;
const getFg = (color: types.ColorInfo | undefined): string | undefined => color ? color.fg : undefined;

export const getColor = <T extends EnsureWithTheme>(
    color: string,
  ) => (props: T): types.ColorInfo | undefined => {
    if (props && props.theme) {
      return props.theme.colors[color] || undefined;
    } else {
      return undefined;
    }
  };

export const getBgColor = (
    color: types.ColorAlias,
    modifier?: types.ColorModifier,
  ) => (props: EnsureWithTheme): string | undefined => {
    if (props && props.theme) {
      const colors = props.theme.colors;
      const targetColor = props.theme.defaults[color];

      if (modifier) {
        return getBg(colors[modifier + targetColor]);
      }

      return getBg(colors[targetColor]);
    } else {
      return undefined;
    }
  };

export const getFgColor = (
  color: types.ColorAlias,
  modifier?: types.ColorModifier,
) => (props: EnsureWithTheme): string | undefined => {
  if (props && props.theme) {
    const colors = props.theme.colors;
    const targetColor = props.theme.defaults[color];

    if (modifier) {
      return getFg(colors[modifier + targetColor]);
    }

    return getFg(colors[targetColor]);
  } else {
    return undefined;
  }
};

export const ensureWithTheme = <T>(fn: (theme: types.Theme) => T) => {
  return (props: types.WithStyled): T | undefined => {
    if (props.theme) {
      return fn(props.theme);
    }
  };
}

export const getSpace = (n: any) => ensureWithTheme((theme) => {
  const scale = theme ? (get<number[]>(theme, "space") || defaultScale) : defaultScale;
  const getStyle = getValue(scale, "rem");

  return getStyle(n);
});

export const getRadii = (n: any) => (props: EnsureWithTheme) => {
  const scale = props.theme ? (getOr<number[]>(props.theme, defaultRadii, "radii")) : defaultRadii;
  const getStyle = getValue(scale, "rem");

  console.log(n, scale)

  return getStyle(n);
};

export const getSize = (n: any) => (props: EnsureWithTheme) => {
  const scale = props.theme ? (get<number[]>(props.theme, "sizes") || defaultSizes) : defaultSizes;

  const getStyle = getValue(scale, "rem");

  return getStyle(n);
};

export const getFontSize = (n: any) => (props: EnsureWithTheme) => {
  const scale = props.theme ? (get<number[]>(props.theme, "fontSizes") || defaultFontSizes) : defaultFontSizes;
  const getStyle = getValue(scale, "rem");

  return getStyle(n);
};

export const hasTransition = ensureWithTheme((theme) => {
  return { transition: "all 150ms ease-out" };
});

// space props
export const spaceProps: Array<keyof gentypes.WithSpace> =
  ["m", "mt", "mr", "mb", "ml", "mx", "my", "p", "pt", "pr", "pb", "pl", "px", "py"];

export const space = <P>(props: P & EnsureWithTheme & gentypes.WithSpace): any => {
  const keys = Object.keys(props)
    .filter((key) => REG.test(key))
    .sort() as Array<keyof gentypes.WithSpace>;
  const scale = props.theme ? (get<number[]>(props.theme, "space") || defaultScale) : defaultScale;
  const getStyle = getValue(scale);

  return keys
    .map((key: keyof gentypes.WithSpace) => {
      const value = props[key];
      const properties = getProperties(key);

      const style = (n: any) =>
        is(n)
          ? properties.reduce(
          (a, prop) => ({
            ...a,
            [prop]: getStyle(n),
          }),
          {},
          )
          : null;

      if (!Array.isArray(value)) {
        return style(value);
      }

      const breakpoints = [
        null,
        ...(get<string[]>(props.theme, "breakpoints") || defaultBreakpoints).map(
          createMediaQuery,
        ),
      ];

      let styles: { [key: string]: any } = {};

      for (let i = 0; i < value.length; i++) {
        const media = breakpoints[i];
        if (!media) {
          styles = style(value[i]) || {};
          continue;
        }
        const rule = style(value[i]);
        if (!rule) { continue; }
        styles[media] = rule;
      }

      return styles;
    })
    .reduce(merge, {});
};

space.propTypes = {
  m: propTypes.responsive,
  mt: propTypes.responsive,
  mr: propTypes.responsive,
  mb: propTypes.responsive,
  ml: propTypes.responsive,
  mx: propTypes.responsive,
  my: propTypes.responsive,
  p: propTypes.responsive,
  pt: propTypes.responsive,
  pr: propTypes.responsive,
  pb: propTypes.responsive,
  pl: propTypes.responsive,
  px: propTypes.responsive,
  py: propTypes.responsive,
};
// --

// styles

// width props
export const widthProps: Array<keyof gentypes.WithWidth> = ["width"];

export const width = style({
  prop: "width",
  transformValue: getWidth,
});
// --

// height props
export const heightProps: Array<keyof gentypes.WithHeight> = ["height"];

export const height = style({
  prop: "height",
  transformValue: getWidth,
});
// --

// fontSize props
export const fontSizeProps: Array<keyof gentypes.WithFontSize> = ["fontSize"];

export const fontSize = style({
  prop: "fontSize",
  key: "fontSizes",
  transformValue: rem,
  scale: [0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6],
});
// --

// textColor props
export const textColorProps: Array<keyof gentypes.WithTextColor> = ["color"];

export const textColor = style({
  prop: "color",
  key: "colors",
});
// --

// bgColor props
export const bgColorProps: Array<keyof gentypes.WithBgColor> = ["bg"];

export const bgColor = style({
  prop: "bg",
  cssProperty: "backgroundColor",
  key: "colors",
});
// --

// textDecoration props
export const textDecorationProps: Array<keyof gentypes.WithTextDecoration> = ["textDecoration"];

export const textDecoration = style({
  prop: "textDecoration",
});
// --

// color props
export const colorProps: Array<keyof gentypes.WithColor> = [...bgColorProps, ...textColorProps];

export const color = compose(
  textColor,
  bgColor,
);
// --

// fontFamily props
export const fontFamilyProps: Array<keyof gentypes.WithFontFamily> = ["fontFamily"];

export const fontFamily = style({
  prop: "fontFamily",
  key: "fonts",
});
// --

// textAlign props
export const textAlignProps: Array<keyof gentypes.WithTextAlign> = ["textAlign"];

export const textAlign = style({
  prop: "textAlign",
});
// --

// lineHeight props
export const lineHeightProps: Array<keyof gentypes.WithLineHeight> = ["lineHeight"];

export const lineHeight = style({
  prop: "lineHeight",
  key: "lineHeights",
  transformValue: rem,
  scale: [0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6],
});
// --

// fontWeight props
export const fontWeightProps: Array<keyof gentypes.WithFontWeight> = ["fontWeight"];

export const fontWeight = style({
  prop: "fontWeight",
  key: "fontWeights",
});
// --

// fontStyle props
export const fontStyleProps: Array<keyof gentypes.WithFontStyle> = ["fontStyle"];

export const fontStyle = style({
  prop: "fontStyle",
});
// --

// letterSpacing props
export const letterSpacingProps: Array<keyof gentypes.WithLetterSpacing> = ["letterSpacing"];

export const letterSpacing = style({
  prop: "letterSpacing",
  key: "letterSpacings",
  transformValue: rem,
});
// --

// layout

// display props
export const displayProps: Array<keyof gentypes.WithDisplay> = ["display"];

export const display = style({
  prop: "display",
});
// --

// maxWidth props
export const maxWidthProps: Array<keyof gentypes.WithMaxWidth> = ["maxWidth"];

export const maxWidth = style({
  prop: "maxWidth",
  key: "maxWidths",
  transformValue: rem,
});
// --

// minWidth props
export const minWidthProps: Array<keyof gentypes.WithMinWidth> = ["minWidth"];

export const minWidth = style({
  prop: "minWidth",
  key: "minWidths",
  transformValue: rem,
});
// --

// maxHeight props
export const maxHeightProps: Array<keyof gentypes.WithMaxHeight> = ["maxHeight"];

export const maxHeight = style({
  prop: "maxHeight",
  key: "maxHeights",
  transformValue: rem,
});
// --

// minHeight props
export const minHeightProps: Array<keyof gentypes.WithMinHeight> = ["minHeight"];

export const minHeight = style({
  prop: "minHeight",
  key: "minHeights",
  transformValue: rem,
});
// --

export const sizeWidth = style({
  prop: "size",
  cssProperty: "width",
  transformValue: rem,
});

export const sizeHeight = style({
  prop: "size",
  cssProperty: "height",
  transformValue: rem,
});

// sizeWidth props
export const sizeProps: Array<keyof gentypes.WithSize> = ["size"];

export const size = compose(
  sizeHeight,
  sizeWidth,
);
// --

interface RatioProps {
  ratio?: number;
}

const ratioPadding = style({
  prop: "ratio",
  cssProperty: "paddingBottom",
  transformValue: (n) => `${n * 100}%`,
});

// ratio props
export const ratioProps: Array<keyof RatioProps> = ["ratio"];

export const ratio = (props: RatioProps) =>
  props.ratio
    ? {
      height: 0,
      ...ratioPadding(props),
    }
    : null;

ratio.propTypes = {
  ...ratioPadding.propTypes,
};
// --

// verticalAlign props
export const verticalAlignProps: Array<keyof gentypes.WithVerticalAlign> = ["verticalAlign"];

export const verticalAlign = style({
  prop: "verticalAlign",
});
// --

// flexbox

// alignItems props
export const alignItemsProps: Array<keyof gentypes.WithAlignItems> = ["alignItems"];

export const alignItems = style({
  prop: "alignItems",
});
// --

// alignContent props
export const alignContentProps: Array<keyof gentypes.WithAlignContent> = ["alignContent"];

export const alignContent = style({
  prop: "alignContent",
});
//

// justifyItems props
export const justifyItemsProps: Array<keyof gentypes.WithJustifyItems> = ["justifyItems"];

export const justifyItems = style({
  prop: "justifyItems",
});
// --

// justifyContent props
export const justifyContentProps: Array<keyof gentypes.WithJustifyContent> = ["justifyContent"];

export const justifyContent = style({
  prop: "justifyContent",
});
// --

// flexWrap props
export const flexWrapProps: Array<keyof gentypes.WithFlexWrap> = ["flexWrap"];

export const flexWrap = style({
  prop: "flexWrap",
});
// --

// flexBasis props
export const flexBasisProps: Array<keyof gentypes.WithFlexBasis> = ["flexBasis"];

export const flexBasis = style({
  prop: "flexBasis",
  transformValue: getWidth,
});
// --

// flexDirection props
export const flexDirectionProps: Array<keyof gentypes.WithFlexDirection> = ["flexDirection"];

export const flexDirection = style({
  prop: "flexDirection",
});
// --

// flex props
export const flexProps: Array<keyof gentypes.WithFlex> = ["flex"];

export const flex = style({
  prop: "flex",
});
// --

// justifySelf props
export const justifySelfProps: Array<keyof gentypes.WithJustifySelf> = ["justifySelf"];

export const justifySelf = style({
  prop: "justifySelf",
});
// --

// alignSelf props
export const alignSelfProps: Array<keyof gentypes.WithAlignSelf> = ["alignSelf"];

export const alignSelf = style({
  prop: "alignSelf",
});
// --

// order props
export const orderProps: Array<keyof gentypes.WithOrder> = ["order"];

export const order = style({
  prop: "order",
});
// --

// grid

// gridGap props
export const gridGapProps: Array<keyof gentypes.WithGridGap> = ["gridGap"];

export const gridGap = style({
  prop: "gridGap",
  transformValue: rem,
  key: "space",
});
// --

// gridColumnGap props
export const gridColumnGapProps: Array<keyof gentypes.WithGridColumnGap> = ["gridColumnGap"];

export const gridColumnGap = style({
  prop: "gridColumnGap",
  transformValue: rem,
  key: "space",
});
// --

// gridRowGap props
export const gridRowGapProps: Array<keyof gentypes.WithGridRowGap> = ["gridRowGap"];

export const gridRowGap = style({
  prop: "gridRowGap",
  transformValue: rem,
  key: "space",
});
// --

// gridColumn props
export const gridColumnProps: Array<keyof gentypes.WithGridColumn> = ["gridColumn"];

export const gridColumn = style({
  prop: "gridColumn",
});
// --

// gridRow props
export const gridRowProps: Array<keyof gentypes.WithGridRow> = ["gridRow"];

export const gridRow = style({
  prop: "gridRow",
});
// --

// gridAutoFlow props
export const gridAutoFlowProps: Array<keyof gentypes.WithGridAutoFlow> = ["gridAutoFlow"];

export const gridAutoFlow = style({
  prop: "gridAutoFlow",
});
// --

// gridAutoColumns props
export const gridAutoColumnsProps: Array<keyof gentypes.WithGridAutoColumns> = ["gridAutoColumns"];

export const gridAutoColumns = style({
  prop: "gridAutoColumns",
});
// --

// gridAutoRows props
export const gridAutoRowsProps: Array<keyof gentypes.WithGridAutoRows> = ["gridAutoRows"];

export const gridAutoRows = style({
  prop: "gridAutoRows",
});
// --

// gridTemplateColumns props
export const gridTemplateColumnsProps: Array<keyof gentypes.WithGridTemplateColumns> = ["gridTemplateColumns"];

export const gridTemplateColumns = style({
  prop: "gridTemplateColumns",
});
// --

// gridTemplateRows props
export const gridTemplateRowsProps: Array<keyof gentypes.WithGridTemplateRows> = ["gridTemplateRows"];

export const gridTemplateRows = style({
  prop: "gridTemplateRows",
});
// --

// gridTemplateAreas props
export const gridTemplateAreasProps: Array<keyof gentypes.WithGridTemplateAreas> = ["gridTemplateAreas"];

export const gridTemplateAreas = style({
  prop: "gridTemplateAreas",
});
// --

// gridArea props
export const gridAreaProps: Array<keyof gentypes.WithGridArea> = ["gridArea"];

export const gridArea = style({
  prop: "gridArea",
});
// --

// borders
const getBorder = (n: any) => (num(n) && n > 0 ? `${n}px solid` : n);

// border props
export const borderProps: Array<keyof gentypes.WithBorder> = ["border"];

export const border = style({
  prop: "border",
  key: "borders",
  transformValue: getBorder,
});
// --

// borderTop props
export const borderTopProps: Array<keyof gentypes.WithBorderTop> = ["borderTop"];

export const borderTop = style({
  prop: "borderTop",
  key: "borders",
  transformValue: getBorder,
});
// --

// borderRight props
export const borderRightProps: Array<keyof gentypes.WithBorderRight> = ["borderRight"];

export const borderRight = style({
  prop: "borderRight",
  key: "borders",
  transformValue: getBorder,
});
// --

// borderBottom props
export const borderBottomProps: Array<keyof gentypes.WithBorderBottom> = ["borderBottom"];

export const borderBottom = style({
  prop: "borderBottom",
  key: "borders",
  transformValue: getBorder,
});
// --

// borderLeft props
export const borderLeftProps: Array<keyof gentypes.WithBorderLeft> = ["borderLeft"];

export const borderLeft = style({
  prop: "borderLeft",
  key: "borders",
  transformValue: getBorder,
});
// --

// borders props
export const bordersProps: Array<keyof gentypes.WithBorders> = [
  ...borderProps,
  ...borderTopProps,
  ...borderRightProps,
  ...borderBottomProps,
  ...borderLeftProps,
];

export const borders = compose(
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
);
// --

// borderColor props
export const borderColorProps: Array<keyof gentypes.WithBorderColor> = ["borderColor"];

export const borderColor = style({
  prop: "borderColor",
  key: "colors",
});
// --

// borderRadius props
export const borderRadiusProps: Array<keyof gentypes.WithBorderRadius> = ["borderRadius"];

export const borderRadius = style({
  prop: "borderRadius",
  key: "radii",
  transformValue: rem,
});
// --

// boxShadow props
export const boxShadowProps: Array<keyof gentypes.WithBoxShadow> = ["boxShadow"];

export const boxShadow = style({
  prop: "boxShadow",
  key: "shadows",
});
// --

// opacity props
export const opacityProps: Array<keyof gentypes.WithOpacity> = ["opacity"];

export const opacity = style({
  prop: "opacity",
});
// --

// overflow props
export const overflowProps: Array<keyof gentypes.WithOverflow> = ["overflow"];

export const overflow = style({
  prop: "overflow",
});
// --

// backgrounds

// background props
export const backgroundProps: Array<keyof gentypes.WithBackground> = ["background"];

export const background = style({
  prop: "background",
});
// --

// backgroundImage props
export const backgroundImageProps: Array<keyof gentypes.WithBackgroundImage> = ["backgroundImage"];

export const backgroundImage = style({
  prop: "backgroundImage",
});
// --

// backgroundSize props
export const backgroundSizeProps: Array<keyof gentypes.WithBackgroundSize> = ["backgroundSize"];

export const backgroundSize = style({
  prop: "backgroundSize",
});
// --

// backgroundPosition props
export const backgroundPositionProps: Array<keyof gentypes.WithBackgroundPosition> = ["backgroundPosition"];

export const backgroundPosition = style({
  prop: "backgroundPosition",
});
// --

// backgroundRepeat props
export const backgroundRepeatProps: Array<keyof gentypes.WithBackgroundRepeat> = ["backgroundRepeat"];

export const backgroundRepeat = style({
  prop: "backgroundRepeat",
});
// --

// position

// position props
export const positionProps: Array<keyof gentypes.WithPosition> = ["position"];

export const position = style({
  prop: "position",
});
// --

// zIndex props
export const zIndexProps: Array<keyof gentypes.WithZIndex> = ["zIndex"];

export const zIndex = style({
  prop: "zIndex",
});
// --

// top props
export const topProps: Array<keyof gentypes.WithTop> = ["top"];

export const top = style({
  prop: "top",
  transformValue: rem,
});
// --

// right props
export const rightProps: Array<keyof gentypes.WithRight> = ["right"];

export const right = style({
  prop: "right",
  transformValue: rem,
});
// --

// bottom props
export const bottomProps: Array<keyof gentypes.WithBottom> = ["bottom"];

export const bottom = style({
  prop: "bottom",
  transformValue: rem,
});
// --

// left props
export const leftProps: Array<keyof gentypes.WithLeft> = ["left"];

export const left = style({
  prop: "left",
  transformValue: rem,
});
// --

export const styles: { [key: string]: ((props: EnsureWithTheme) => any) & { propTypes: any } } = {
  space,
  width,
  fontSize,
  textColor,
  bgColor,
  color,
  fontFamily,
  textAlign,
  lineHeight,
  fontWeight,
  fontStyle,
  letterSpacing,
  display,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  sizeWidth,
  sizeHeight,
  size,
  ratioPadding,
  verticalAlign,
  alignItems,
  alignContent,
  justifyItems,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  flex,
  justifySelf,
  alignSelf,
  order,
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridArea,
  // borders
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borders,
  borderColor,
  borderRadius,
  boxShadow,
  opacity,
  overflow,
  background,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
  textDecoration,
};

// mixed
const omit = (obj: { [key: string]: any }, blacklist: string[]) => {
  const next: { [key: string]: any } = {};
  for (const key in obj) {
    if (blacklist.indexOf(key) > -1) { continue; }
    next[key] = obj[key];
  }
  return next;
};

const funcs = Object.keys(styles)
  .map((key) => styles[key])
  .filter((fn) => typeof fn === "function");

const blacklist = funcs.reduce(
  (a, fn) => [...a, ...Object.keys(fn.propTypes || {})],
  ["theme"],
);

export function ifTrue<P, Success, Fail>(
  test: (props: P) => boolean,
  ok: (props: P) => Success,
  notOk: (props: P) => Fail | null = (props: P) => null,
) {
  return function ifTrueApply(props: P): any {
    if (test(props)) {
      return ok(props);
    } else {
      return notOk(props);
    }
  }
}

export const mixed = (props: EnsureWithTheme) =>
  funcs.map((fn) => fn(props)).reduce(merge, omit(props, blacklist));

// @ts-ignore
export const genTypes = () => {
  // tslint:disable-next-line:forin
  for (const i in styles) {
    const name = titleCase(i);
    console.log(`export interface With${name} {`);
    const types = styles[i].propTypes;
    // tslint:disable-next-line:forin
    for (const propKey in types) {
      const prop = types[propKey];

      if (prop === propTypes.numberOrString) {
        console.log(`  ${propKey}?: NumberOrStringProp;`);
      } else if (prop === propTypes.responsive) {
        console.log(`  ${propKey}?: ResponsiveProp;`);
      } else {
        console.log(`  ${propKey}?: ${prop.name};`);
      }
    }
    console.log("}");
  }
};

export * from "./types";
