import { ColorAlias } from "../../styled";
import { Adapter, OptionType } from "../SelectInput/adapter";

export interface MultiSelectInputProps {
    placeholder?: string;
    options: Adapter;
    isClearable?: boolean;
    values?: any[];
    state?: ColorAlias;
    inputSize?: string;
    onChange?: (values: any[], options: OptionType[] | undefined) => void;
    onBlur?: (event: React.SyntheticEvent) => void;
    onFocus?: (event: React.SyntheticEvent) => void;
}

export interface State {
    options: OptionType[];
    loading: boolean;
    values: any[];
}
