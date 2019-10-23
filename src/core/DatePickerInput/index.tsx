import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import moment, { Moment } from "moment";
import * as R from "ramda";
import React from "react";
import { injectIntl, MessageDescriptor, WrappedComponentProps } from "react-intl";

import { DayPickerSingleDateController } from "react-dates";
import { Box, ColorAlias } from "../../styled";
import { FocusStealEvent } from "../FocusSteal/types";
import { Popper } from "../Popper";
import { TextInput } from "../TextInput";

export interface DatePickerInputProps extends WrappedComponentProps {
  placeholder?: string | MessageDescriptor;
  onChange?: (value: string | null) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
  onFocus?: (event: React.SyntheticEvent) => void;
  visibleMonths?: number;
  value?: any;
  state?: ColorAlias;
  disabled?: boolean;
  inputSize?: string;
}

export interface State {
  visible: boolean;
  value: Moment | null;
}

class BaseDatePickerInput extends React.Component<DatePickerInputProps, State> {
  public static defaultProps: Partial<DatePickerInputProps> = {
    state: "default",
    visibleMonths: 2,
  };

  public portal = React.createRef<HTMLDivElement>();
  public input = React.createRef<HTMLInputElement>();

  public state = {
    visible: false,
    value: null,
  };

  constructor(props: DatePickerInputProps, context: any) {
    super(props, context);

    this.changed = this.changed.bind(this);
    this.blurred = this.blurred.bind(this);
    this.focused = this.focused.bind(this);
    this.focusStolen = this.focusStolen.bind(this);
    this.pickerChanged = this.pickerChanged.bind(this);
    this.pickerFocusChanged = this.pickerFocusChanged.bind(this);
    this.outsideClicked = this.outsideClicked.bind(this);
    this.inputKeyDown = this.inputKeyDown.bind(this);
  }

  public componentDidMount() {
    if (this.props.value !== null) {
      this.setState({ value: moment(this.props.value) });
    }
  }

  public componentDidUpdate(prevProps: DatePickerInputProps, prevState: State) {
    if (this.props.value !== prevProps.value) {
      if (this.props.value !== null) {
        this.setState({ value: moment(this.props.value) });
      } else {
        this.setState({ value: null });
      }
    }
  }

  public showDropdown() {
    if (this.state.visible) {
      return;
    }
    // console.error("showDropdown");

    this.setState({ visible: true });
  }

  public hideDropdown() {
    // console.error("hideDropdown");

    this.setState({ visible: false });
  }

  public toggleDropdown() {
    // console.error("toggleDropdown");

    this.setState({ visible: !this.state.visible });
  }

  public changed(value: string) {
    // console.error("changed");

    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.hideDropdown();
  }

  public blurred(evt: React.FocusEvent<HTMLInputElement>) {
    evt.persist();

    // console.log(this.portal.current, this.input.current, evt.target, evt)

    const target = evt.relatedTarget || evt.target;

    if (this.portal.current && this.input.current) {
      if (this.input.current !== target &&
        target &&
        target instanceof HTMLElement &&
        !this.portal.current.contains(target)) {
        this.hideDropdown();
      }
    }
    // // console.error("blurred");
    // this.hideDropdown();

    // if (this.props.onBlur) {
    //   this.props.onBlur(evt);
    // }
  }

  public focused(evt: React.SyntheticEvent) {
    evt.persist();
    // console.error("focused", evt);
    this.showDropdown();

    if (this.props.onFocus) {
      this.props.onFocus(evt);
    }
  }

  public inputKeyDown(evt: React.KeyboardEvent) {
    if (evt.which === 8) {
      this.pickerChanged(null);
    }
  }

  public focusStolen(evt: FocusStealEvent) {
    // console.error("focusStolen");
    if (this.portal.current && this.input.current) {
      if (this.input.current !== evt.target &&
        !this.portal.current.contains(evt.target)) {
        this.hideDropdown();
      }
    }
  }

  public pickerChanged(value: Moment | null) {
    this.hideDropdown();
    if (this.props.onChange && value !== null) {
      this.props.onChange(value.format("YYYY-MM-DD HH:mm:ss"));
    } else if (this.props.onChange) {
      this.props.onChange(null);
    }
  }

  public pickerFocusChanged(arg: { focused: boolean | null }) {
  }

  public outsideClicked() {
    this.hideDropdown();
  }

  public render() {
    // console.error("!!!!!!!!!!!!!!///", this.state.visible);
    const { props } = this;

    const filteredProps = R.omit([
      "field",
      "onFocus",
      "onBlur",
      "onChange",
      "form",
      "value",
      "name",
      "children",
      "placeholder",
      "visibleMonths",
    ], props);

    // const fieldProps = {
    //   ...R.omit<Props, string>([], props),
    //   visibleMonths: 2,
    //   value: props.value || "",
    // } as InlineDatePickerInputProps;

    const newFilteredProps = { ...filteredProps };

    let placeholder: string | undefined;

    if (typeof props.placeholder === "string") {
      placeholder = props.placeholder;
    }

    if (R.is(Object, props.placeholder)) {
      placeholder = props.intl.formatMessage(props.placeholder as MessageDescriptor);
    }

    const input = (
      <TextInput
        readOnly
        ref={this.input}
        placeholder={placeholder}
        value={props.value ? this.props.intl.formatDate(props.value, { timeZone: "UTC" }) : ""}
        onFocus={this.focused}
        onBlur={this.blurred}
        onKeyDown={this.inputKeyDown}
        onClick={() => this.showDropdown()}
        {...newFilteredProps} />
    );

    let portalContent: React.ReactElement | undefined;

    if (this.state.visible) {
      portalContent = (
        <Box mt={1} boxShadow={2}>
          <DayPickerSingleDateController
            onDateChange={this.pickerChanged}
            onFocusChange={this.pickerFocusChanged}
            onOutsideClick={this.outsideClicked}
            focused={true}
            numberOfMonths={3}
            date={this.state.value}
          />
        </Box>
      );
    }

    return (
      <>
        {input}
        <Popper
          placement="bottom-start"
          anchorEl={this.input}
          ref={this.portal}
          open={this.state.visible}
          children={portalContent}/>
      </>
    );
  }
}

export const DatePickerInput = injectIntl(BaseDatePickerInput);
