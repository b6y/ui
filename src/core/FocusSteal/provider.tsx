import EventEmitter from "eventemitter3";
import React from "react";

import { FocusStealEvent } from "./types";

import { FocusStealContext } from "./context";

export class FocusStealProvider extends React.PureComponent {
  public bus = new EventEmitter();

  public componentDidMount() {
    window.addEventListener("mousedown", (evt) => {
      this.bus.emit("stolen", { type: "mousedown", target: evt.target } as FocusStealEvent);
    });

    window.addEventListener("focusin", (evt) => {
      this.bus.emit("stolen", { type: "focusin", target: evt.target } as FocusStealEvent);
    });
  }

  public render() {
    return (
      <FocusStealContext.Provider value={{ bus: this.bus }} {...this.props} />
    );
  }
}
