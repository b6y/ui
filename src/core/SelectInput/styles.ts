import memo from "memoize-one";
import * as R from "ramda";
import { Styles as ReactSelectStyles } from "react-select/src/styles";

import {
    getBgColor,
    getFgColor,
    getFontSize,
    getSize,
    getSpace,
    getValue,
    Padding,
    Theme,
    themed,
    translateSize,
} from "../../styled";
import { SelectInputProps } from "./types";

const defaultSize = R.defaultTo(2);
const iconMargin = getSize(1);
const getRectangularPaddings = themed<SelectInputProps, Padding[]>("rectangularPaddings");
const getFontSizes = themed<SelectInputProps, number[]>("fontSizes");
const memoTranslateSize = memo((size) => translateSize(defaultSize(size)));

export const height = (props: SelectInputProps) => {
    const size = memoTranslateSize(props.inputSize);

    const paddings = getRectangularPaddings(props);
    const fontSizes = getFontSizes(props);

    if (paddings && fontSizes) {
        const padding: Padding = paddings[size];
        const fontSize: number = fontSizes[size];

        return {
            fontSize: `${fontSize}rem`,
            // TODO: ???
            lineHeight: `1.5`,
            padding: `0`,
            minHeight: "0px",
        };
    } else {
        return {
            // TODO: ???
            lineHeight: `1.5`,
            minHeight: "0px",
        };
    }
};

export const valueHeight = (props: SelectInputProps) => {
    const size = memoTranslateSize(props.inputSize);

    const paddings = getRectangularPaddings(props);
    const fontSizes = getFontSizes(props);

    if (paddings && fontSizes) {
        const padding: Padding = paddings[size];
        const fontSize: number = fontSizes[size];

        return {
            fontSize: `${fontSize}rem`,
            // TODO: ???
            lineHeight: `1.5`,
            padding: `${padding.y / 2}rem ${padding.x / 2}rem`,
            margin: `${padding.y / 2}rem ${padding.x / 2}rem`,
            minHeight: "0px",
        };
    } else {
        return {
            // TODO: ???
            lineHeight: `1.5`,
            minHeight: "0px",
        };
    }
};

export const placeholderHeight = (props: SelectInputProps) => {
    const size = memoTranslateSize(props.inputSize);

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
            minHeight: "0px",
        };
    } else {
        return {
            // TODO: ???
            lineHeight: `1.5`,
            minHeight: "0px",
        };
    }
};

export const placeholderWrapperHeight = (props: SelectInputProps) => {
    const size = memoTranslateSize(props.inputSize);

    const paddings = getRectangularPaddings(props);

    if (paddings) {
        const padding: Padding = paddings[size];

        return {
            // TODO: ???
            lineHeight: `1.5`,
            padding: `${padding.y / 2}rem 0`,
            margin: `${padding.y / 2}rem 0`,
            minHeight: "0px",
            width: 0,
        };
    } else {
        return {
            // TODO: ???
            lineHeight: `1.5`,
            minHeight: "0px",
        };
    }
};

export const valueLabelFontSize = (props: SelectInputProps) => {
    const size = memoTranslateSize(props.inputSize);

    const fontSizes = getFontSizes(props);

    if (fontSizes) {
        const fontSize: number = fontSizes[size];

        return {
            fontSize: `${fontSize}rem`,
        };
    } else {
        return {};
    }
};

export const styles = (inputProps: SelectInputProps, theme: Theme): ReactSelectStyles => {
    const props = { ...inputProps, theme };
    const state = props.state || "default";

    let outline = state;

    if (state === "default") {
        outline = "primary";
    }

    const inputState = state;
    const padding: Padding = (() => {
        let padding: Padding | undefined;

        const paddings = getRectangularPaddings(props);

        if (paddings) {
            padding = paddings[memoTranslateSize(props.inputSize)];
        }

        if (!padding) {
            return { x: 0, y: 0 };
        }

        return padding;
    })();

    return ({
        input: (base) => ({
            ...base,
            label: "input",
            margin: 0,
            padding: `${padding.y}rem ${padding.x}rem`,
            paddingTop: 0,
            paddingBottom: 0,
            background: "transparent",
        }),
        group: (base) => ({
            ...base,
            label: "group",
        }),
        container: (base) => ({
            ...base,
            label: "container",
            background: "none",
            padding: 0,
            width: "100%",
        }),
        control: (base, state) => ({
            ...base,
            ...height(props),
            "label": "control",
            "border": state.isFocused
                ? `1px solid ${getBgColor(inputState)(props)}`
                : `1px solid ${getBgColor(inputState)(props)}`,
            "boxShadow": state.isFocused ? `0px 0px 0px 3px ${getBgColor(outline, "alphadark")(props)}` : "none",
            "borderRadius": getValue(theme.radii)(2),
            "background": state.isDisabled ? getBgColor("light", "alphadark")(props) : getBgColor("white")(props),
            ":hover": {
                border: `1px solid ${getBgColor(outline, "dark")(props)}`,
                boxShadow: state.isFocused ? undefined : `0px 0px 0px 3px ${getBgColor(outline, "alpha")(props)}`,
            },
        }),
        menuList: (base) => ({
            ...base,
            label: "menuList",
        }),
        menu: (base) => ({
            ...base,
            label: "menu",
            paddingBottom: 0,
            paddingTop: 0,
        }),
        loadingMessage: (base) => ({
            ...base,
            label: "loadingMessage",
        }),
        loadingIndicator: (base) => ({
            ...base,
            label: "loadingIndicator",
        }),
        indicatorSeparator: (base) => ({
            ...base,
            label: "indicatorSeparator",
            padding: 0,
            width: 0,
        }),
        indicatorsContainer: (base) => ({
            ...base,
            label: "indicatorsContainer",
            paddingRight: getSpace(memoTranslateSize(props.inputSize))(props),
            // position: "absolute",
            // right: 4,
            // top: "50%",
            // transform: "translateY(-50%)",
            color: getBgColor(state)(props),
        }),
        groupHeading: (base) => ({
            ...base,
            label: "groupHeading",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            "label": "dropdownIndicator",
            "padding": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "margin": 0,
            "color": getBgColor(state)(props),
            ":hover": {
                color: getBgColor(state, "dark")(props),
            },
        }),
        clearIndicator: (base) => ({
            ...base,
            "label": "clearIndicator",
            "padding": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "margin": 0,
            "color": getBgColor(state)(props),
            ":hover": {
                color: getBgColor(state, "dark")(props),
            },
        }),
        multiValue: (base) => ({
            ...base,
            label: "multiValue",
        }),
        multiValueLabel: (base) => ({
            ...base,
            label: "multiValueLabel",
        }),
        multiValueRemove: (base) => ({
            ...base,
            label: "multiValueRemove",
        }),
        noOptionsMessage: (base) => ({
            ...base,
            label: "noOptionsMessage",
        }),
        option: (base, state) => {
            return ({
                ...base,
                label: "option",
                backgroundColor: state.isSelected ?
                    getBgColor("primary")({ theme }) :
                    state.isFocused ?
                        getBgColor("primary", "alphalight")({ theme }) :
                        "transparent",
                fontSize: getFontSize(2)({ theme }),
            });
        },
        placeholder: (base) => ({
            ...base,
            wrapper: {
                ...placeholderWrapperHeight(props),
            },
            label: "placeholder",
            ...placeholderHeight(props),
        }),
        singleValue: (base) => ({
            ...base,
            label: "singleValue",
            top: undefined,
            transform: undefined,
            webkitTransform: undefined,
            position: undefined,
            ...valueHeight(props),
        }),
        valueContainer: (base) => ({
            ...base,
            label: "valueContainer",
            padding: 0,
        }),
        menuPortal: (base) => ({
            ...base,
            label: "menuPortal",
            zIndex: 9999,
        }),
    });
};
