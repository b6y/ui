import EventEmitter from "eventemitter3";

import { BoxProps } from "../../styled";

export interface State {
}

export type FocusStealProps = BoxProps & {
  enabled?: boolean;
  onSteal: (evt: FocusStealEvent) => void;
}

export interface FocusStealEvent {
  type: "mousedown" | "focusin";
  target: HTMLElement;
}

export interface PropsWithContext {
  ctx: FocusStealContext;
}

export interface FocusStealContext {
  bus?: EventEmitter;
}
