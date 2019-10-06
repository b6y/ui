import { useTheme } from "emotion-theming";
import * as R from "ramda";
import React, { useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { ValueType } from "react-select/src/types";

import { Theme } from "../../styled";
import { OptionType } from "../SelectInput/adapter";
import { CustomDisplayOption } from "../SelectInput/displayOption";
import { CustomMenuList } from "../SelectInput/menuList";
import { CustomOption } from "../SelectInput/option";
import { styles } from "./styles";
import { MultiSelectInputProps, State } from "./types";

const NewBaseMultiSelectInput = (props: MultiSelectInputProps) => {
  const isMounted = useRef(false);
  const theme = useTheme<Theme>();

  const [state, setState] = useState({ options: [], values: [], loading: true } as State);

  const setOptions = (values: any[]) => {
    if (Array.isArray(values)) {
      setState({ ...state, loading: true });

      const { options } = props;

      return options.byIds(values, props).then((res) => {
        if (isMounted.current) {
          setState({ values, options: res, loading: false });
        }

        return res;
      });
    } else {
      setState({ loading: false, options: [], values: [] });

      return Promise.resolve([]);
    }
  };

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    const { values: newValues } = props;

    if (R.isNil(newValues) || !Array.isArray(newValues)) {
      setOptions([]);
    } else {
      setOptions(newValues);
    }
  }, [props.values]);

  const onChange = (value: ValueType<OptionType>) => {
    // setOption(value);

    if (Array.isArray(value)) {
      const values = (value as OptionType[]).map((a) => a.value);

      if (props.onChange) {
        props.onChange(values, value);
      } else {
        setOptions(values);
      }
    } else {
      if (props.onChange) {
        props.onChange([], []);
      } else {
        setOptions([]);
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
      }}
      isMulti={true}
      loadOptions={(text: any) => options.search(text, props)}
      defaultOptions={true}
      cacheOptions
      styles={styles(props, theme)}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={state.loading ? [] : state.options}
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
export * from "../SelectInput/adapter";

// export const SelectInput = withTheme(BaseSelectInput);
export const MultiSelectInput = NewBaseMultiSelectInput;

export default MultiSelectInput;
