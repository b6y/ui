import { Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import { createStructuredSelector } from "reselect";

import injectReducer from "../../redux/injectReducer";
import * as actions from "./actions";
import reducer from "./reducer";

interface ChannelProps {
  name: string;
  isSubmitting?: (name: string, state: boolean) => void;
  register?: (name: string) => void;
  children?: React.ReactElement<any>;
  channelState?: {
    isSubmitting: boolean,
  };
}

interface ChannelState {

}

class Channel extends React.PureComponent<ChannelProps, ChannelState> {

  public static actions = actions;
  public formRef = React.createRef<Formik>();

  constructor(props: ChannelProps) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  public componentDidMount() {
    if (!this.props.name) {
      console.error("Invalid <Channel />, name is required.");
      return;
    }

    console.log(`Channel \`${this.props.name}\` up`);

    if (this.props.register) {
      this.props.register(this.props.name);
    }
  }

  public componentDidUpdate() {
    const { channelState } = this.props;

    if (this.formRef.current && channelState) {
      this.formRef.current.setSubmitting(channelState.isSubmitting);
    }
  }

  public onSubmit(childProps: any, onSubmit: (a: any, b: any) => void) {
    return (values: any, form: any) => {
      const { isSubmitting, name } = this.props;

      console.log("%s is submitting", name);

      if (isSubmitting) {
        isSubmitting(name, true);
      }

      return onSubmit(values, form);
    };
  }

  public render() {
    const { children, name } = this.props;

    if (!name) {
      return <b>Invalid.</b>;
    }

    if (!children) {
      return <b>Invalid.</b>;
    }

    return React.Children.map(children, (child: React.ReactElement<any>) => {
      return React.cloneElement(child, {
        ref: this.formRef,
        onSubmit: this.onSubmit(child.props, child.props.onSubmit),
      });
    });
  }
}

const withReducer = injectReducer({
  key: "@b6y/ui/formik/Channel",
  reducer,
});

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    isSubmitting: (name: string, state: boolean) => dispatch(actions.isSubmitting(name, state)),
    register: (name: string) => dispatch(actions.register(name)),
  };
}

const mapStateToProps = createStructuredSelector<any, ChannelProps, any>({
  channelState(state: any, props: ChannelProps) {
    return (state["@b6y/ui/formik/Channel"] || {})[props.name];
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
)(Channel);
