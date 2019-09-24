import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

import { getBgColor, getSpace, getRadii } from "../../styled/system";

import { BodyProps, FooterProps, HeaderProps, ModalChildren, Props, State } from "./types";

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

const ModalBackdrop = styled.div`
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

const ModalHolder = styled.div`
position: fixed;
width: 100%;
height: 100%;
top: 0;
bottom: 0;
left: 0;
right: 0;
z-index: 9999;
`;

const ModalSection = styled.div`
padding: ${getSpace(3)};
`;

const ModalContent = styled.div`
background-color: ${getBgColor("light")};
margin: 50px auto 0;
width: ${(props) => props.width}px;
border-radius: ${getRadii(2)};
border: 1px solid ${(props) => getBgColor(props.borderColor, "light")(props)};
& > ${ModalSection}:not(:only-of-type):not(:last-of-type) {
  border-bottom: 1px solid ${(props) => getBgColor(props.borderColor, "light")(props)};
}
`;

class Modal extends React.PureComponent<Props, State> {
  public static Footer = Footer;
  public static Header = Header;
  public static Body = Body;

  public static defaultProps = {
    borderColor: "default",
    visible: true,
  };

  constructor(a, b) {
    super(a, b);
  }

  public render() {
    if (!this.props.visible) {
      return null;
    }

    const children: ModalChildren = React.Children.toArray(
      this.props.children as ModalChildren,
    );

    const header = children.find((c) => {
      return c.type === Header;
    });

    const body = children.find((c) => {
      return c.type === Body;
    });

    const footer = children.find((c) => {
      return c.type === Footer;
    });

    const modal = ReactDOM.createPortal(
      <>
        <ModalBackdrop />
        <ModalHolder>
          <ModalContent width={800} borderColor={this.props.borderColor}>
            {
              header && (
                <ModalSection borderColor={this.props.borderColor}>
                  {header}
                </ModalSection>
              )
            }
            {
              body && (
                <ModalSection borderColor={this.props.borderColor}>
                  {body}
                </ModalSection>
              )
            }
            {
              footer && (
                <ModalSection borderColor={this.props.borderColor}>
                  {footer}
                </ModalSection>
              )
            }
          </ModalContent>
        </ModalHolder>
      </>,
      document.getElementById("portal-target"),
    );

    return modal;
  }
}

export default Modal;
