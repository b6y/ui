import React from "react";
import { Color } from "../../styled/system";

export interface FooterProps {}
export interface HeaderProps {}
export interface BodyProps {}

export type FooterDef = React.ReactElement<FooterProps>;
export type HeaderDef = React.ReactElement<HeaderProps>;
export type BodyDef = React.ReactElement<BodyProps>;

export type ModalChild = FooterDef | HeaderDef | BodyDef;
export type ModalChildren = ModalChild[];

export interface Props {
  borderColor?: Color;
  visible?: boolean;
  children: ModalChild | ModalChildren;
}

export interface State {}
