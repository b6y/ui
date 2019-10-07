import { useTheme } from "emotion-theming";
import * as R from "ramda";
import React, { useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { ValueType } from "react-select/src/types";

import { Theme } from "../../styled";
import { OptionType } from "./adapter";
import { CustomDisplayOption } from "./displayOption";
import { CustomMenuList } from "./menuList";
import { CustomOption } from "./option";
import { CustomPlaceholder } from "./placeholder";
import { styles } from "./styles";
import { SelectInputProps, State } from "./types";

export const SelectInput = (props: SelectInputProps) => {
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
      components={{ 
        Option: CustomOption,
        SingleValue: CustomDisplayOption,
        MenuList: CustomMenuList,
        Placeholder: CustomPlaceholder,
      }}
      loadOptions={(text: any) => options.search(text, props)}
      defaultOptions={true}
      cacheOptions
      styles={styles(props, theme)}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={state.loading ? null : state.option}
      isClearable={isClearable}
      isSearchable={!state.loading}
      menuPortalTarget={portalDOM}
      isLoading={state.loading}
      isDisabled={state.loading}
      placeholder={state.loading ? "Carregando..." : (props.placeholder ? props.placeholder : "Selecione...")}
    />
  );
};

export * from "./types";
export * from "./adapter";