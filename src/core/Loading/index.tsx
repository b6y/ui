import React from "react";

import { connect } from "react-redux";
import { compose, Dispatch } from "redux";

import LoadingIndicator from "../../core/LoadingIndicator";
import injectReducer from "../../redux/injectReducer";
import * as actions from "./actions";
import reducer from "./reducer";

interface LoadingProps {
  loading?: any;
  name: string;
  children: () => React.ReactElement;
}

const Loading = (props: LoadingProps) => {
  const { loading, name, children } = props;

  let state = loading && loading[name];

  if (loading === null || state === undefined) {
    state = true;
  }

  if (state) {
    return <LoadingIndicator />;
  }

  return children();
};

const withReducer = injectReducer({ key: "@b6y/components/core/Loading", reducer });

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setState: (name: string, state: boolean) => dispatch(actions.setState(name, state)),
  };
}

const mapStateToProps = (state: any) => {
  return ({
    loading: state["@b6y/components/core/Loading"] || null,
  });
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose<typeof Loading>(
  withReducer,
  withConnect,
)(Loading);
