import * as emotion from "@emotion/core";
import { useTheme } from "emotion-theming";
import { FieldProps } from "formik";
import * as R from "ramda";
import React, { useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";

import { MenuListComponentProps, MenuListProps } from "react-select/src/components/Menu";
import { OptionProps } from "react-select/src/components/Option";
import { SingleValueProps } from "react-select/src/components/SingleValue";
import { Styles as ReactSelectStyles } from "react-select/src/styles";
import { ValueType } from "react-select/src/types";
import { Theme } from "../../styled";
import { getValue, translateSize, css, getBgColor, getFontSize, Color, getBorderColor, getOutlineColor } from "../../styled/system";
import { Adapter, OptionType } from "./adapter";
import styled from "@emotion/styled";

const defaultSize = R.defaultTo(2);

const height = (size: any, theme: Theme) => {
  console.log(size);
  const translatedSize = translateSize(defaultSize(size));

  const padding: any = theme.rectangularPaddings[translatedSize];
  const fontSize: any = theme.fontSizes[translatedSize];

  return {
    fontSize: `${fontSize}rem`,
    lineHeight: `1.5`,
    padding: `${padding.y}rem ${padding.x}rem`,
    height: "auto",
    minHeight: "auto",
    maxHeight: "auto",
  };
};

const customStyles = (inputProps: SelectInputProps, theme: Theme): ReactSelectStyles => {
  const props = { ...inputProps, theme };
  const state = props.state || "default";

  let outline = state;

  if (state === "default") {
    outline = "primary";
  }

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
      width: "100%"
    }),
    control: (base, state) => ({
      ...base,
      ...height(props.size, theme),
      "label": "control",
      "border": state.isFocused
        ? `1px solid ${getBorderColor(state)(props)}`
        : `1px solid ${getBorderColor(state)(props)}`,
      "boxShadow": state.isFocused ? `0px 0px 0px 3px ${getOutlineColor(outline, "alphadark")(props)}` : "none",
      "borderRadius": getValue(theme.radii)(2),
      "background": getBgColor(state)(props),
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
    }),
    groupHeading: (base) => ({
      ...base,
      label: "groupHeading",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      label: "dropdownIndicator",
      padding: 0,
      paddingLeft: 4,
      paddingRight: 0,
      margin: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      label: "clearIndicator",
      padding: 0,
      paddingLeft: 0,
      paddingRight: 4,
      margin: 0,
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
  })
};

export interface SelectInputProps {
  options: Adapter;
  isClearable?: boolean;
  value?: any;
  state?: Color;
  size?: string,
  onChange?: (value: any, option: OptionType | undefined) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
  onFocus?: (event: React.SyntheticEvent) => void;
}

interface State {
  option: any;
  loading: boolean;
  value?: any;
}

const CustomOptionWrapper = styled.div(css);

const CustomOption = (props: OptionProps<any>) => {
  const {
    children,
    className,
    cx,
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    innerProps,
  } = props;

  return (
    <CustomOptionWrapper
      css={getStyles("option", props)}
      className={(cx as any)(
        {
          "option": true,
          "option--is-disabled": isDisabled,
          "option--is-focused": isFocused,
          "option--is-selected": isSelected,
        },
        className
      )}
      ref={innerRef}
      {...innerProps}
    >
      {children}
    </CustomOptionWrapper>
  );
};

const CustomDisplayOption = (props: SingleValueProps<any>) => {
  const { children, className, cx, getStyles, isDisabled, innerProps } = props;
  return (
    <div
      className={cx(
        emotion.css(getStyles("singleValue", props)).styles,
        {
          "single-value": true,
          "single-value--is-disabled": isDisabled,
        },
        className,
      ) as string}
      {...innerProps}
    >
      {children}
    </div>
  );
};

const MenuList = (props: MenuListComponentProps<any>) => {
  const { children, className, cx, getStyles, isMulti, innerRef } = props;
  return (
    <div
      className={cx(
        emotion.css(getStyles("menuList", props)).styles,
        {
          "menu-list": true,
          "menu-list--is-multi": isMulti,
        },
        className,
      ) as string}
      ref={innerRef}
    >
      {children}
    </div>
  );
};

const NewBaseSelectInput = (props: SelectInputProps) => {
  const isMounted = useRef(false);
  const theme = useTheme<Theme>();

  const [state, setState] = useState({ option: null, value: null, loading: true } as State);

  const setOption = (value: any) => {
    if (value !== null) {
      setState({ ...state, loading: true });

      const { options } = props;

      return options.byIds([value], props).then((res) => {
        if (isMounted.current) {
          setState({ value, option: res[0], loading: false });
        }

        return res[0];
      });
    } else {
      setState({ loading: false, option: null, value: null });

      return Promise.resolve(null);
    }
  };

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    const { value: newValue } = props;

    if (R.isNil(newValue)) {
      setOption(null);
    } else {
      setOption(newValue);
    }
  }, [props.value]);

  const onChange = (value: ValueType<OptionType>) => {
    console.log(value);
    // setOption(value);

    if (props.onChange) {
      if (value && !Array.isArray(value)) {
        const option = value as OptionType;
        props.onChange(option.value, option);
      } else {
        props.onChange(undefined, undefined);
      }
    } else {
      if (value && !Array.isArray(value)) {
        const option = value as OptionType;
        setOption(option.value);
      } else {
        setOption(null);
      }
    }
  };

  const onBlur = (evt: React.SyntheticEvent) => {
    if (props.onBlur) {
      props.onBlur(evt);
    }
  };

  const onFocus = (evt: React.SyntheticEvent) => {
    if (props.onFocus) {
      props.onFocus(evt);
    }
  };

  const portalDOM = document.getElementById("portal-target");

  const { options, isClearable } = props;

  return (
    <AsyncSelect
      // menuIsOpen={true}
      components={{ Option: CustomOption, SingleValue: CustomDisplayOption, MenuList }}
      loadOptions={(text: any) => options.search(text, props)}
      defaultOptions={true}
      cacheOptions
      styles={customStyles(props, theme)}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={state.loading ? null : state.option}
      isClearable={isClearable}
      isSearchable={!state.loading}
      menuPortalTarget={portalDOM}
      isLoading={state.loading}
      isDisabled={state.loading}
      placeholder={state.loading ? "Carregando..." : "Selecione..."}
    />
  );
};

export * from "./adapter";

// export const SelectInput = withTheme(BaseSelectInput);
export const SelectInput = NewBaseSelectInput;

export default SelectInput;
