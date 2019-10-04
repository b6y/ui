import { useTheme } from "emotion-theming";
import { FieldProps } from "formik";
import * as R from "ramda";
import React, { useState, useRef, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { Theme } from "../../styled";
import { getValue, translateSize } from "../../styled/system";
import { Adapter } from "./adapter";

import * as emotion from "@emotion/core";
import { MenuListComponentProps, MenuListProps } from "react-select/src/components/Menu";
import { OptionProps } from "react-select/src/components/Option";
import { SingleValueProps } from "react-select/src/components/SingleValue";
import { Styles as ReactSelectStyles } from "react-select/src/styles";

const defaultSize = R.defaultTo(2);

const height = (size: any, theme: Theme) => {
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

const customStyles = (size: any, theme: Theme): ReactSelectStyles => ({
  input: (base) => ({
    ...base,
    label: "input",
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
    background: theme.colors.white,
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
    width: '100%'
  }),
  control: (base, state) => ({
    ...base,
    ...height(size, theme),
    "label": "control",
    "border": state.isFocused
      ? `1px solid ${theme.colors.cyan}`
      : `1px solid ${theme.colors.gray}`,
    "boxShadow": state.isFocused ? `0 0 0 3px ${theme.colors.alphacyan}` : "none",
    "borderRadius": getValue(theme.radii)(2),
    "background": theme.colors.white,
    "&:hover": {
      border: `1px solid ${theme.colors.cyan}`,
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
  option: (base) => ({
    ...base,
    label: "option",
  }),
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
});

export interface SelectInputProps {
  options: Adapter;
  isClearable?: boolean;
  value?: any;
  onChange?: (value: string | null) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
  onFocus?: (event: React.SyntheticEvent) => void;
}

interface State {
  option: any;
  loading: boolean;
  value?: any;
}

const CustomOption = (props: OptionProps<any>) => {
  const { children, className, cx, getStyles, isDisabled, isFocused, isSelected, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      className={cx(
        emotion.css(getStyles("option", props)).styles,
        {
          "option": true,
          "option--is-disabled": isDisabled,
          "option--is-focused": isFocused,
          "option--is-selected": isSelected,
        },
        className,
      ) as string}
      {...innerProps}
    >
      {children}
    </div>
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

    const { value } = props;

    if (R.isNil(value)) {
      setOption(null);
    } else {
      setOption(value);
    }
  }, []);

  const onChange = (value: any) => {
    setState({ ...state, value });

    if (props.onChange) {
      props.onChange(value);
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
      components={{ Option: CustomOption, SingleValue: CustomDisplayOption, MenuList }}
      loadOptions={(text: any) => options.search(text, props)}
      defaultOptions={true}
      cacheOptions
      styles={customStyles(2, theme)}
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
}

class BaseSelectInput extends React.PureComponent<SelectInputProps, State> {
  // HAHA.
  public isMounted: boolean = false;

  constructor(props: SelectInputProps, context: any) {
    super(props, context);

    this.state = {
      option: null,
      value: null,
      loading: true,
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  public setOption(value: any) {
    if (value !== null) {
      this.setState({ loading: true });

      const { options } = this.props;

      return options.byIds([value], this.props).then((res) => {
        if (this.isMounted) {
          this.setState({ value, option: res[0], loading: false });
        }

        return res[0];
      });
    } else {
      this.setState({ loading: false, option: null, value: null });

      return Promise.resolve(null);
    }
  }

  public componentDidMount() {
    this.isMounted = true;
    const { value } = this.props;

    if (R.isNil(value)) {
      this.setOption(null);
    } else {
      this.setOption(value);
    }
  }

  public componentWillUnmount(): void {
    this.isMounted = false;
  }

  public componentDidUpdate(prevProps: SelectInputProps) {
    let oldValue = null;
    let value = null;

    if (!R.isNil(this.props.value)) {
      value = this.props.value;
    }

    if (!R.isNil(prevProps.value)) {
      oldValue = prevProps.value;
    }

    if (oldValue !== value) {
      if (!value) {
        this.setOption(null);
      } else {
        this.setOption(value);
      }
    }
  }

  public onChange(value: any) {
    this.setState({ value });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  public onBlur(evt: React.SyntheticEvent) {
    if (this.props.onBlur) {
      this.props.onBlur(evt);
    }
  }

  public onFocus(evt: React.SyntheticEvent) {
    if (this.props.onFocus) {
      this.props.onFocus(evt);
    }
  }

  public render() {
    const portalDOM = document.getElementById("portal-target");

    const { options, theme, isClearable } = this.props;

    const { option, loading } = this.state;

    return (
      <div>
        <AsyncSelect
          components={{ Option: CustomOption, SingleValue: CustomDisplayOption, MenuList }}
          loadOptions={(text: any) => options.search(text, this.props)}
          defaultOptions={true}
          cacheOptions
          styles={customStyles(2, theme)}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          value={loading ? null : option}
          isClearable={isClearable}
          isSearchable={!loading}
          menuPortalTarget={portalDOM}
          isLoading={loading}
          isDisabled={loading}
          placeholder={loading ? "Carregando..." : "Selecione..."}
        />
      </div>
    );
  }
}

export * from "./adapter";

// export const SelectInput = withTheme(BaseSelectInput);
export const SelectInput = NewBaseSelectInput;

export default SelectInput;
