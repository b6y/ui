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

export const textCompose = [
    system.fontWeight,
    system.fontSize,
    system.color,
    system.textDecoration,
    system.fontFamily,
    system.textAlign,
    system.letterSpacing,
];

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
