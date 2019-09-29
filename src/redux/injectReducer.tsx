import hoistNonReactStatics from "hoist-non-react-statics";
import React from "react";
import { ReactReduxContext } from "react-redux";

import getInjectors from "./reducerInjectors";
import { Reducer } from "./store";

interface InjectReducer {
  key: string;
  reducer: Reducer;
}

export default ({ key, reducer }: InjectReducer) =>
  <TProps extends unknown>(WrappedComponent: React.ComponentType<TProps>) => {
  const ReducerInjector = class extends React.PureComponent<TProps> {
    public static WrappedComponent = WrappedComponent;

    public static contextType = ReactReduxContext;

    public static displayName = `withReducer(${
      WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    public context!: React.ContextType<typeof ReactReduxContext>;

    constructor(props: TProps, context: any) {
      super(props, context);

      getInjectors(context.store)
        .injectReducer(key, reducer);
    }

    public render() {
      return <WrappedComponent {...this.props}/>;
    }
  };

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
