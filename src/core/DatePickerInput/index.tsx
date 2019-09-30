import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import styled from "@emotion/styled";
import * as R from "ramda";
import React from "react";
import { injectIntl, MessageDescriptor, WrappedComponentProps } from "react-intl";
import { theme } from "styled-tools";
import moment, { Moment } from "moment";

import { DateRangePicker, DayPickerRangeController, DayPickerSingleDateController } from "react-dates";
import { Box } from "../../styled";
import { translateSize, Color } from "../../styled/system";
import FocusSteal from "../FocusSteal";
import { FocusStealEvent } from "../FocusSteal/types";
import Popper from "../Popper";
import Portal, { PortalRefType } from "../Portal";
import TextInput from "../TextInput";

interface DatePickerInputProps extends WrappedComponentProps {
  onChange?: (value: string | null) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
  onFocus?: (event: React.SyntheticEvent) => void;
  visibleMonths?: number;
  value?: any;
  state?: Color;
}

interface State {
  visible: boolean;
  value: Moment | null;
}

class DatePickerInput extends React.Component<DatePickerInputProps, State> {
  public static defaultProps: Partial<DatePickerInputProps> = {
    state: "default",
    visibleMonths: 2,
  };

  public portal = React.createRef<PortalRefType>();
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
  }

  public componentDidMount() {
    if (this.props.value !== null) {
      this.setState({ value: moment(this.props.value) });
    }
  }

  public componentDidUpdate(prevProps: DatePickerInputProps, prevState: State) {
    if (this.props.value !== prevProps.value) {
      this.setState({ value: moment(this.props.value) });
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

  public blurred(evt: React.SyntheticEvent) {
    // console.error("blurred");
    this.hideDropdown();

    if (this.props.onBlur) {
      this.props.onBlur(evt);
    }
  }

  public focused(evt: React.SyntheticEvent) {
    evt.persist();
    // console.error("focused", evt);
    this.showDropdown();

    if (this.props.onFocus) {
      this.props.onFocus(evt);
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
    if (this.props.onChange && value !== null) {
      this.props.onChange(value.format("YYYY-MM-DD HH:mm:ss"));
    }
  }

  public pickerFocusChanged(arg: { focused: boolean | null }) {
    console.log({ arg })
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
    ], props);

    // const fieldProps = {
    //   ...R.omit<Props, string>([], props),
    //   visibleMonths: 2,
    //   value: props.value || "",
    // } as InlineDatePickerInputProps;

    const newFilteredProps = { ...filteredProps };

    const input = (
      <TextInput
        readOnly
        ref={this.input}
        value={props.value ? this.props.intl.formatDate(props.value, { timeZone: "UTC" }) : ""}
        onFocus={this.focused}
        onBlur={this.blurred}
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
            focused={this.state.visible}
            hideKeyboardShortcutsPanel={true}
            numberOfMonths={3}
            date={this.state.value}
          />
        </Box>
      );
    }

    return (
      <FocusSteal enabled={this.state.visible} onSteal={this.focusStolen}>
        {input}
        <Popper
          placement="bottom-start"
          anchorEl={this.input}
          ref={this.portal}
          open={this.state.visible}
          children={portalContent}/>
      </FocusSteal>
    );
  }
}

export default injectIntl(DatePickerInput);
