import React from "react";
import { PopperPlacement } from "../Popper";

export interface Props {
  children: React.ReactNode;
  placement?: PopperPlacement;
  text: React.ReactNode;
}

export interface State {
  visible: boolean;
}
