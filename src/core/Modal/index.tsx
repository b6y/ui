import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

import { getBgColor, getSpace, getRadii, Box, BoxProps, Color, WithStyled } from "../../styled";

export interface FooterProps {}
export interface HeaderProps {}
export interface BodyProps {}

export type FooterDef = React.ReactElement<FooterProps>;
export type HeaderDef = React.ReactElement<HeaderProps>;
export type BodyDef = React.ReactElement<BodyProps>;

export class Footer extends React.PureComponent<FooterProps> {
  public render() {
    return (
      <div style={{ display: "flex", alignContent: "flex-end", justifyContent: "flex-end" }}>
        { this.props.children }
      </div>
    );
  }
}

export class Header extends React.PureComponent<HeaderProps> {
  public render() {
    return this.props.children;
  }
}

export class Body extends React.PureComponent<BodyProps> {
  public render() {
    return this.props.children;
  }
}

export type ModalBackdropProps = BoxProps & {};

const ModalBackdrop = styled(Box)<ModalBackdropProps>`
background: rgba(0, 0, 0, 60%);
position: fixed;
width: 100%;
height: 100%;
top: 0;
bottom: 0;
left: 0;
right: 0;
z-index: 9999;
`;

export type ModalHolderProps = BoxProps & {};

const ModalHolder = styled(Box)<ModalHolderProps>`
position: fixed;
width: 100%;
height: 100%;
top: 0;
bottom: 0;
left: 0;
right: 0;
z-index: 9999;
`;

export type ModalSectionProps = BoxProps & {};

const ModalSection = styled(Box)<ModalSectionProps>`
padding: ${getSpace(3)};
`;

export type ModalContentProps = BoxProps & {
  borderColor?: Color;
  visible?: boolean;
  children: ModalChild | ModalChildren;
};

const ModalContent = styled("div")<ModalContentProps>`
background-color: ${getBgColor("light")};
margin: 50px auto 0;
width: ${(props) => props.width}px;
border-radius: ${getRadii(2)};
border: 1px solid ${(props) => getBgColor(props.borderColor || "default", "light")(props)};
& > ${ModalSection}:not(:only-of-type):not(:last-of-type) {
  border-bottom: 1px solid ${(props) => getBgColor(props.borderColor || "default", "light")(props)};
}
`;

export type ModalChild = FooterDef | HeaderDef | BodyDef | undefined;
export type ModalChildren = ModalChild[];

export type ModalProps = WithStyled & {
  borderColor?: Color;
  visible?: boolean;
  children: ModalChild | ModalChildren;
};

export interface ModalState {}


class Modal extends React.PureComponent<ModalProps, ModalState> {
  public static Footer = Footer;
  public static Header = Header;
  public static Body = Body;

  public static defaultProps = {
    borderColor: "default",
    visible: true,
  };

  public render() {
    if (!this.props.visible) {
      return null;
    }

    const children: ModalChildren = React.Children.toArray(
      this.props.children as ModalChildren,
    );

    const header = children.find((c) => {
      if (c) {
        return c.type === Header;
      } 

      return false;
    });

    const body = children.find((c) => {
      if (c) {
        return c.type === Body;
      }

      return false;
    });

    const footer = children.find((c) => {
      if (c) {
        return c.type === Footer;
      }

      return false;
    });

    let headerEl: React.ReactElement<ModalSectionProps> | undefined;
    let bodyEl: React.ReactElement<ModalSectionProps> | undefined;
    let footerEl: React.ReactElement<ModalSectionProps> | undefined;

    if (header) {
      headerEl = (
        <ModalSection borderColor={this.props.borderColor}>
          {header}
        </ModalSection>
      );
    }

    if (body) {
      bodyEl = (
        <ModalSection borderColor={this.props.borderColor}>
          {body}
        </ModalSection>
      );
    }

    if (footer) {
      footerEl = (
        <ModalSection borderColor={this.props.borderColor}>
          {footer}
        </ModalSection>
      );
    }

    const modal = ReactDOM.createPortal(
      <>
        <ModalBackdrop />
        <ModalHolder>
          <ModalContent width={800} borderColor={this.props.borderColor}>
            {headerEl}
            {bodyEl}
            {footerEl}
          </ModalContent>
        </ModalHolder>
      </>,
      document.getElementById("portal-target")!,
    );

    return modal;
  }
}

export default Modal;
