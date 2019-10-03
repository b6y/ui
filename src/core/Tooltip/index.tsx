import styled from "@emotion/styled";
import * as R from "ramda";
import React, { ReactElement } from "react";

import { Box, Span } from "../../styled";
import Popper, { PopperPlacement } from "../Popper";

export interface Props {
  children: React.ReactNode;
  placement?: PopperPlacement;
  text: React.ReactNode;
}

export interface State {
  visible: boolean;
}

const TooltipElement = styled((props) => {
  const newProps = R.omit(
    [
      "visible",
    ],
    props,
  );

  return (
    <Box mt={3} mb={3}>
      <Span {...newProps} />
    </Box>
  );
})`
  border-radius: 6px;
  padding: 5px 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

export const Tooltip = React.forwardRef(function Tooltip(props: Props, ref) {
  const anchorRef: React.MutableRefObject<HTMLElement | undefined> = React.useRef();
  const [visible, setVisible] = React.useState(false);

  const { children, text, placement = "bottom" } = props;

  const onOver = () => {
    if (visible) {
      return;
    }

    setVisible(true);
  };

  const onFocus = () => {
    if (visible) {
      return;
    }

    setVisible(true);
  };

  const onBlur = () => {
    setVisible(false);
  };

  const onLeave = () => {
    setVisible(false);
  };

  // TODO: verify runtime type pl0x
  const child = React.Children.only(children) as ReactElement<any> & {
    ref?: React.MutableRefObject<any>,
  };

  const childProps: {
    onFocus?: (evt: any) => void;
    onBlur?: (evt: any) => void;
    onMouseOver?: (evt: any) => void;
    onMouseLeave?: (evt: any) => void;
    key?: string;
    ref?: React.Ref<HTMLElement>;
    tabIndex?: string;
  } = {};

  childProps.tabIndex = "0";
  childProps.onFocus = onFocus;
  childProps.onBlur = onBlur;
  childProps.onMouseOver = onOver;
  childProps.onMouseLeave = onLeave;
  childProps.key = "el";
  childProps.ref = (node: HTMLElement) => {
    if (child.ref) {
      child.ref.current = node;
    }
    anchorRef.current = node;
  };

  return <>
    {React.cloneElement(child, childProps)}
    <Popper flip={true} placement={placement} anchorEl={anchorRef} open={visible}>
      <TooltipElement
        bg="black"
        color="white"
      >
        {text}
      </TooltipElement>
    </Popper>
  </>;
});

export default Tooltip;
