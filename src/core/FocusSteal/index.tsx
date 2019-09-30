import React from "react";

import Context from "./context";

import { FocusStealEvent, FocusStealProps, State } from "./types";

export function notContains<R1 extends HTMLElement, R2 extends HTMLElement>(
  containerRef: React.RefObject<HTMLElement>,
  containsRef: React.RefObject<HTMLElement>,
  valid: () => void
) {
  return function NotContainsEvent(evt: FocusStealEvent) {
    if (containerRef.current && containsRef.current) {
      const container = containerRef.current;
      const contains = containsRef.current;
      if (
        container !== null &&
        contains !== null &&
        contains !== evt.target &&
        !container.contains(evt.target)
      ) {
        valid();
      }
    }
  };
}

class FocusStealConsumer extends React.PureComponent<FocusStealProps, State> {
  public static contextType = Context;

  public static defaultProps = {
    enabled: true,
  };

  public context!: React.ContextType<typeof Context>;

  constructor(props: FocusStealProps) {
    super(props);

    this.stolen = this.stolen.bind(this);
  }

  public stolen(event: FocusStealEvent) {
    if (this.props.enabled && this.props.onSteal) {
      this.props.onSteal(event);
    }
  }

  public componentDidMount() {
    if (this.context.bus) {
      this.context.bus.addListener("stolen", this.stolen);
    }
  }

  public componentWillUnmount() {
    if (this.context.bus) {
      this.context.bus.removeListener("stolen", this.stolen);
    }
  }

  public render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default FocusStealConsumer;
