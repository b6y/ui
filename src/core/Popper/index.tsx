import PopperJS from "popper.js";
import React, { MutableRefObject } from "react";
import ReactDOM from "react-dom";

export type PopperPlacement = | "bottom-end"
                              | "bottom-start"
                              | "bottom"
                              | "left-end"
                              | "left-start"
                              | "left"
                              | "right-end"
                              | "right-start"
                              | "right"
                              | "top-end"
                              | "top-start"
                              | "top";

export interface Props<TContentProps, TRef> {
  anchorEl: React.RefObject<HTMLElement | undefined>;
  children?: React.ReactElement<TContentProps>;
  open: boolean;
  placement: PopperPlacement;
  flip?: boolean;
}

/**
 * Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
export const Popper = React.forwardRef(function Popper<TContentProps, TRef>(
  props: Props<TContentProps, TRef>,
  ref: any,
) {
  const {
    anchorEl,
    children,
    open,
    flip,
    placement = "bottom",
    ...other
  } = props;

  const popperRef: MutableRefObject<PopperJS | undefined> = React.useRef();
  const portalRef = React.createRef<HTMLDivElement>();

  const handleOpen = React.useCallback(() => {
    const popperNode = portalRef.current;

    if (!popperNode || !anchorEl || !open) {
      return;
    }

    if (popperRef.current) {
      popperRef.current.destroy();
      // handlePopperRefRef.current(null);
    }

    if (anchorEl.current) {
      const popper = new PopperJS(anchorEl.current, popperNode, {
        placement,
        modifiers: {
          flip: {
            enabled: flip,
          },
          preventOverflow: {
            boundariesElement: "window",
          },
        },
        // We could have been using a custom modifier like react-popper is doing.
        // But it seems this is the best public API for this use case.
        // onUpdate: createChainedFunction(handlePopperUpdate, popperOptions.onUpdate),
      });

      popperRef.current = popper;
    }
  }, [anchorEl, open, placement]);

  const handleClose = () => {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
  };

  React.useEffect(() => {
    // Let's update the popper position.
    handleOpen();
  }, [handleOpen]);

  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  React.useEffect(() => {
    if (!open) {
      // Otherwise handleExited will call this.
      handleClose();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const content = (
    <div
      ref={portalRef}
      role="tooltip"
      style={{
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        left: "-99999999999px",
        top: "-99999999999px",
        zIndex: 9999,
      }}
      {...other}
    >
      <div ref={ref}>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
});
