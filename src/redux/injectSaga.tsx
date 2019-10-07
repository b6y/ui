import hoistNonReactStatics from "hoist-non-react-statics";
import React from "react";
import { ReactReduxContext } from "react-redux";

import { getSagaInjectors } from "./sagaInjectors";

export interface InjectSaga {
  key: string;
  saga: () => void;
  mode?: string;
}

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.RESTART_ON_REMOUNT) the saga will be started on component mount and
 * cancelled with `task.cancel()` on component un-mount for improved performance. Another two options:
 *   - constants.DAEMON—starts the saga on component mount and never cancels it or starts again,
 *   - constants.ONCE_TILL_UNMOUNT—behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
export const injectSaga = ({ key, saga, mode }: InjectSaga) =>
  <TProps extends unknown>(WrappedComponent: React.ComponentType<TProps>) => {
    const InjectSaga = class extends React.PureComponent<TProps> {
      public static WrappedComponent = WrappedComponent;

      public static contextType = ReactReduxContext;

      public static displayName = `withSaga(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component"})`;

      public injectors: any;

      constructor(props: TProps, context: any) {
        super(props, context);
        const { store } = context;
        this.injectors = getSagaInjectors(store);
        this.injectors.injectSaga(key, { saga, mode }, this.props);
      }

      public componentWillUnmount() {
        this.injectors.ejectSaga(key);
      }

      public render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };
