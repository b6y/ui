import * as R from "ramda";
import { Styles as ReactSelectStyles } from "react-select/src/styles";

import {
    getBgColor,
    getBorderColor,
    getFgColor,
    getFontSize,
    getOutlineColor,
    getSize,
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

export const height = (props: SelectInputProps) => {
    const size = translateSize(defaultSize(props.inputSize));

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

export const styles = (inputProps: SelectInputProps, theme: Theme): ReactSelectStyles => {
    const props = { ...inputProps, theme };
    const state = props.state || "default";

    let outline = state;

    if (state === "default") {
        outline = "primary";
    }

    const inputState = state;

    return ({
        input: (base) => ({
            ...base,
            label: "input",
            margin: 0,
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
                ? `1px solid ${getBorderColor(outline)(props)}`
                : `1px solid ${getBorderColor(outline)(props)}`,
            "boxShadow": state.isFocused ? `0px 0px 0px 3px ${getOutlineColor(outline, "alphadark")(props)}` : "none",
            "borderRadius": getValue(theme.radii)(2),
            "background": state.isDisabled ? getBgColor("light", "alphadark")(props) : getBgColor("white")(props),
            ":hover": {
                border: `1px solid ${getBorderColor(outline, "dark")(props)}`,
                boxShadow: state.isFocused ? undefined : `0px 0px 0px 3px ${getOutlineColor(outline, "alpha")(props)}`,
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
            position: "absolute",
            right: 4,
            top: "50%",
            transform: "translateY(-50%)",
            color: getBorderColor(state)(props),
        }),
        groupHeading: (base) => ({
            ...base,
            label: "groupHeading",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            "label": "dropdownIndicator",
            "padding": 0,
            "paddingLeft": 4,
            "paddingRight": 0,
            "margin": 0,
            "color": getBorderColor(state)(props),
            ":hover": {
                color: getBorderColor(state, "dark")(props),
            },
        }),
        clearIndicator: (base) => ({
            ...base,
            "label": "clearIndicator",
            "padding": 0,
            "paddingLeft": 0,
            "paddingRight": 4,
            "margin": 0,
            "color": getBorderColor(state)(props),
            ":hover": {
                color: getBorderColor(state, "dark")(props),
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
            label: "placeholder",
            position: "relative",
            top: "0",
            transform: "none",
        }),
        singleValue: (base) => ({
            ...base,
            label: "singleValue",
            top: undefined,
            transform: undefined,
            webkitTransform: undefined,
            position: undefined,
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
