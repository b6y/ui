import { Color } from "../../styled";
import { Adapter, OptionType } from "./adapter";

export interface SelectInputProps {
    placeholder?: string;
    options: Adapter;
    isClearable?: boolean;
    value?: any;
    state?: Color;
    inputSize?: string;
    onChange?: (value: any, option: OptionType | undefined) => void;
    onBlur?: (event: React.SyntheticEvent) => void;
    onFocus?: (event: React.SyntheticEvent) => void;
}

export interface State {
    option: any;
    loading: boolean;
    value?: any;
}
