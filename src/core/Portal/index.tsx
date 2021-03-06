import React from "react";
import ReactDOM from "react-dom";
import { InjectedScrollProps, listenToScroll } from "../ScrollController";

export interface PortalProps {
  onHide?: () => void;
  visible?: boolean;
  content: React.ReactNode;
  span?: number;
  left?: number;
  top?: number;
  zIndex?: number;
}

interface InnerPortalProps extends PortalProps, InjectedScrollProps {}

interface State {
  top?: number;
  left?: number;
  id?: string;
  visible?: boolean;
}

abstract class PortalImpl extends React.Component<InnerPortalProps, State> {
  public abstract contains(el: HTMLElement): boolean;
}
class BasePortal extends PortalImpl {
  public static defaultProps = {
    span: 0,
  };

  public portal = React.createRef<HTMLDivElement>();

  public state: State = {};

  public componentDidMount(): void {
    const node = ReactDOM.findDOMNode(this);
    if (node instanceof HTMLElement) {
      const rect = this.props.getRect(node);

      if (rect) {
        const newTop = rect.top + rect.height;
        const newLeft = rect.left;

        let visible = false;

        if (this.props.visible !== null) {
          visible = this.props.visible || false;
        }

        this.setState({
          top: newTop,
          left: newLeft,
          id: this.props.scrollId,
          visible,
        });
      }
    }
  }

  public shouldComponentUpdate(
    nextProps: Readonly<InnerPortalProps>,
    nextState: Readonly<State>, nextContext: any,
  ): boolean {
    return (nextProps.visible || this.props.visible) ||
      this.state.id !== nextProps.scrollId ||
      this.props.visible !== nextProps.visible;
  }

  public componentDidUpdate(): void {
    const { id: oldId } = this.state;

    const node = ReactDOM.findDOMNode(this);

    if (node instanceof HTMLElement) {
      const newId = this.props.scrollId;

      if (oldId !== newId) {
        const rect = this.props.getRect(node);

        if (rect !== undefined) {
          const newTop = rect.top + rect.height;
          const newLeft = rect.left;

          let visible = this.props.visible;

          if (this.props.visible === null) {
            visible = false;
          }

          this.setState({ top: newTop, left: newLeft, id: newId, visible }, () => {
            if (this.props.onHide) {
              this.props.onHide();
            }
          });
        }
      }
    }
  }

  public contains(el: HTMLElement) {
    if (el && this.portal.current) {
      return this.portal.current.contains(el);
    }

    return false;
  }

  public render() {
    console.error("Portal::render", this.props.visible);
    let portal = null;

    if (this.props.scrollIsEnabled && this.props.visible) {
      portal = ReactDOM.createPortal(
        <div ref={this.portal} style={{
          position: "absolute",
          width: "fit-content",
          zIndex: this.props.zIndex ? this.props.zIndex : 9999,
          top: (this.state.top || 0) + (this.props.span || 0),
          left: this.state.left,
        }}>
          { this.props.content }
        </div>,
        document.getElementById("portal-target")!,
      );
    }

    return (
      <React.Fragment>
        <span data-info="portal-placeholder" />
        {portal}
      </React.Fragment>
    );
  }
}

export const Portal = listenToScroll(BasePortal);
