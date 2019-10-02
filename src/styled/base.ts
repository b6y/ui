import * as R from "ramda";
import * as system from "./system";

export const baseCompose = [
    system.space,
    system.width,
    system.height,
    system.order,
    system.alignSelf,
    system.justifySelf,
    system.borderRadius,
    system.borders,
    system.borderColor,
    system.bgColor,
    system.verticalAlign,
    system.boxShadow,
    system.lineHeight,
];

export const baseProps = [
    ...system.spaceProps,
    ...system.widthProps,
    ...system.heightProps,
    ...system.orderProps,
    ...system.alignSelfProps,
    ...system.justifySelfProps,
    ...system.borderRadiusProps,
    ...system.bordersProps,
    ...system.borderColorProps,
    ...system.bgColorProps,
    ...system.verticalAlignProps,
    ...system.boxShadowProps,
    ...system.lineHeightProps,
]

export const clearBase = R.omit(baseProps);

export const textCompose = [
    system.fontWeight,
    system.fontSize,
    system.textColor,
    system.textDecoration,
    system.fontFamily,
    system.textAlign,
    system.letterSpacing,
];

export const textProps = [
    ...system.fontWeightProps,
    ...system.fontSizeProps,
    ...system.textColorProps,
    ...system.textDecorationProps,
    ...system.fontFamilyProps,
    ...system.textAlignProps,
    ...system.letterSpacingProps,
]

export const clearText = R.omit(textProps);

export const flexCompose = [
    system.alignContent,
    system.alignItems,
    system.flex,
    system.flexBasis,
    system.flexDirection,
    system.flexWrap,
    system.justifyContent,
    system.justifyItems,
];

export const flexProps = [
    ...system.alignContentProps,
    ...system.alignItemsProps,
    ...system.flexProps,
    ...system.flexBasisProps,
    ...system.flexDirectionProps,
    ...system.flexWrapProps,
    ...system.justifyContentProps,
    ...system.justifyItemsProps,
];

export const clearFlex = R.omit(flexProps);

export const clearAll = R.omit([...baseProps, ...textProps, ...flexProps]);
