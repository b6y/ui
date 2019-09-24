import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import styled from "@emotion/styled";
import * as R from "ramda";
import React from "react";
import { injectIntl, MessageDescriptor, WithIntlProps } from "react-intl";
import { theme } from "styled-tools";

import { DateRangePicker, DayPickerRangeController, DayPickerSingleDateController } from "react-dates";
import { Box } from "../../styled";
import { translateSize } from "../../styled/system";
import FocusSteal from "../FocusSteal";
import { FocusStealEvent } from "../FocusSteal/types";
import InlineDatePickerInput/*, { Props as InlineDatePickerInputProps }*/ from "../InlineDatePickerInput";
import Popper from "../Popper";
import Portal, { PortalRefType } from "../Portal";
import moment, { Moment } from "moment";

export const defaultState = {
  defaultColor: "black",
  defaultBorderColor: "gray",
  hoverBorderColor: "cyan",
  hoverColor: "black",
  focusColor: "black",
  focusBorderColor: "cyan",
  focusShadowColor: "alphacyan",
};

export const states = {
  default: defaultState,
  primary: {
    defaultColor: "black",
    defaultBorderColor: "blue",
    hoverBorderColor: "blue",
    hoverColor: "black",
    focusColor: "black",
    focusBorderColor: "blue",
    focusShadowColor: "alphablue",
  },
  secondary: {
    defaultColor: "black",
    defaultBorderColor: "darker",
    hoverBorderColor: "darker",
    hoverColor: "black",
    focusColor: "black",
    focusBorderColor: "darker",
    focusShadowColor: "alphadarker",
  },
  success: {
    defaultColor: "black",
    defaultBorderColor: "green",
    hoverBorderColor: "green",
    hoverColor: "black",
    focusColor: "black",
    focusBorderColor: "green",
    focusShadowColor: "alphagreen",
  },
  danger: {
    defaultColor: "black",
    defaultBorderColor: "red",
    hoverBorderColor: "red",
    hoverColor: "black",
    focusColor: "black",
    focusBorderColor: "red",
    focusShadowColor: "alphared",
  },
  warning: {
    defaultColor: "black",
    defaultBorderColor: "yellow",
    hoverBorderColor: "yellow",
    hoverColor: "black",
    focusColor: "black",
    focusBorderColor: "yellow",
    focusShadowColor: "alphayellow",
  },
  info: {
    defaultColor: "black",
    defaultBorderColor: "pink",
    hoverBorderColor: "pink",
    hoverColor: "black",
    focusColor: "black",
    focusBorderColor: "pink",
    focusShadowColor: "alphapink",
  },
};

const defaultSize = R.defaultTo(2);

const themeIt = (props) => {
  const size = translateSize(defaultSize(props.size));

  const padding: any = theme("rectangularPaddings")(props)[size];
  const fontSize: any = theme("fontSizes")(props)[size];

  return {
    fontSize: `${fontSize}rem`,
    lineHeight: `1.5`,
    padding: `${padding.y}rem ${padding.x}rem`,
  };
};

const DefaultStyledTextInput = Box.withComponent("input");

const StyledTextInputBase = styled(React.forwardRef<any, any>(({ form, ...props }, ref) => (
  <DefaultStyledTextInput ref={ref} {...props} />
)))(
  {
    color: "black",
    appearance: "none",
    width: "100%",
    outline: 0,
    display: "block",
  },
  themeIt,
  (props) => ({
    "background": props.disabled ? theme("colors.light")(props) : theme("colors.white")(props),
    "color": theme(`colors.${props.defaultColor}`, props.defaultColor)(props),
    "border": `1px solid ${theme(
      `colors.${props.defaultBorderColor}`,
      props.defaultBorderColor,
    )(props)}`,
    "&:hover": {
      border: `1px solid ${theme(
        `colors.${props.hoverBorderColor}`,
        props.hoverBorderColor,
      )(props)}`,
      color: theme(`colors.${props.hoverColor}`, props.hoverColor)(props),
    },
    "&:focus": {
      color: theme(`colors.${props.focusColor}`, props.focusColor)(props),
      border: `1px solid ${theme(
        `colors.${props.focusBorderColor}`,
        props.focusBorderColor,
      )(props)}`,
      boxShadow: `0px 0px 0px 3px ${theme(
        `colors.${props.focusShadowColor}`,
        props.focusShadowColor,
      )(props)}`,
    },
  }),
);

StyledTextInputBase.defaultProps = {
  borderColor: "gray",
};

interface Props extends WithIntlProps<Props> {
  onChange?: (value: string | null) => void;
  visibleMonths?: number;
  placeholder: string | MessageDescriptor;
  label: string | MessageDescriptor;
  value: string;
  size: string;
  state: string;
}

interface State {
  visible: boolean;
  value: Moment | null;
}

class StyledTextInput extends React.Component<Props, State> {
  public static defaultProps = {
    state: "default",
    size: "md",
    borderRadius: 2,
    visibleMonths: 2,
  };

  public portal = React.createRef<PortalRefType>();
  public input = React.createRef<HTMLInputElement>();

  public state = {
    visible: false,
    value: null,
  };

  constructor(props, context) {
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

  public componentDidUpdate(prevProps: Props, prevState: State) {
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
  }

  public focused(evt: React.SyntheticEvent) {
    evt.persist();
    // console.error("focused", evt);
    this.showDropdown();
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
      "state",
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

    const state = states[props.state || "default"];
    const newFilteredProps = { ...state, ...filteredProps };

    const input = (
      <StyledTextInputBase
        readOnly
        ref={this.input}
        value={props.value ? this.props.intl.formatDate(props.value, { timeZone: "UTC" }) : ""}
        onFocus={this.focused}
        onClick={() => this.showDropdown()}
        {...newFilteredProps} />
    );

    let portalContent = null;

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

export default injectIntl(StyledTextInput);
