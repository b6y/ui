import styled from "@emotion/styled";
import * as R from "ramda";
import React from "react";

import {
    Button as BaseButton,
    ButtonProps as BaseButtonProps,
    ColorAlias,
    getBgColor,
    getSize,
    hasTransition,
    Padding,
    themed,
    translateSize,
} from "../../styled";

import {SvgIcon} from "../Icon";

export interface ButtonOutlineProps extends BaseButtonProps {
    state: ColorAlias;
    size: string;
}

const defaultSize = R.defaultTo(2);
const iconMargin = getSize(1);
const getRectangularPaddings = themed<ButtonOutlineProps, Padding[]>("rectangularPaddings");
const getFontSizes = themed<ButtonOutlineProps, number[]>("fontSizes");

const themeHeight = (props: ButtonOutlineProps) => {
    const size = translateSize(defaultSize(props.size));

    const paddings = getRectangularPaddings(props);
    const fontSizes = getFontSizes(props);

    if (paddings && fontSizes) {
        const padding: Padding = paddings[size];
        const fontSize: number = fontSizes[size];

        return {
            fontSize: `${fontSize}rem`,
            // TODO: ???
            lineHeight: `1.5`,
            padding: `${padding.y}rem ${padding.x}rem`,
        };
    } else {
        return {
            // TODO: ???
            lineHeight: `1.5`,
        };
    }
};

const Wrapper = React.forwardRef((props: ButtonOutlineProps, ref: React.Ref<HTMLButtonElement>) => {
    return <BaseButton ref={ref} {...props} />;
});

export const ButtonOutline = styled(Wrapper)(
    themeHeight,
    hasTransition,
    (props) => ({
        backgroundClip: "padding-box",
        background: "transparent",

        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        outline: "none",
        color: getBgColor(props.state)(props),
    }),
    (props) => ({
        "border": `1px solid ${getBgColor(props.state)(props)}`,

        "&[disabled]": {
            cursor: "not-allowed",
            // backgroundColor: getBgColor(props.state, "alpha")(props),
        },
        "&:hover": {
            color: getBgColor(props.state, "dark")(props),
            border: `1px solid ${getBgColor(props.state, "darker")(props)}`,
            boxShadow: `0px 0px 0px 3px ${getBgColor(props.state, "alpha")(props)}`,
        },
        "&:focus": {
            color: getBgColor(props.state, "dark")(props),
            border: `1px solid ${getBgColor(props.state, "darker")(props)}`,
            boxShadow: `0px 0px 0px 3px ${getBgColor(props.state, "alphadark")(props)}`,
        },
        "&:active": {
            boxShadow: `0px 0px 0px 6px ${getBgColor(props.state, "alphadark")(props)}`,
        },
        "&[disabled]:hover": {
            // backgroundColor: getBgColor(props.state, "alphadark")(props),
        },
        "&[disabled]:focus": {
            // backgroundColor: getBgColor(props.state, "alphadark")(props),
        },
        [`& ${SvgIcon} + *`]: {
            marginLeft: iconMargin(props),
        },
    }),
);

ButtonOutline.defaultProps = {
    type: "button",
    size: "md",
    borderRadius: 2,
    borderColor: "transparent",
};
