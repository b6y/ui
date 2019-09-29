import styled from "@emotion/styled";
import EventEmitter from "eventemitter3";
import hoistNonReactStatic from "hoist-non-react-statics";
import debounce from "lodash/debounce";
import nanoid from "nanoid";
import * as R from "ramda";
import React from "react";
import ReactDOM from "react-dom";
import ReactResizeDetector from "react-resize-detector";

import { Box, BoxProps } from "../../styled";

interface ScrollContext {
  enabled: boolean;
  name?: string;
  bus?: EventEmitter;
  path: any[];
  getMyInfo?(): ScrollContainerInfo | null;
  getRect?(el: HTMLElement): ElementRect;
}

interface ScrollEvent {
  ctx: ScrollContext;
}

interface State {
}

interface Props extends BoxProps {
  enabled: boolean;
  name: string;
  root: boolean;
  x: boolean;
  y: boolean;
}

interface PropsWithContext {
  ctx: ScrollContext;
}

interface ElementRect {
  width: number;
  height: number;
  left: number;
  top: number;
}

interface ScrollContainerInfo extends ElementRect {
  scrollTop: number;
  scrollLeft: number;
}

export interface ListenerProps {
  forwardedRef: React.Ref<any>;
}

export interface ListenerState {
  id?: string;
  rect?: ElementRect;
}

export interface InjectedScrollProps {
  scrollId: string;
  scrollIsEnabled: boolean;
  containerRect: ElementRect;
  getRect(el: HTMLElement): ElementRect | undefined;
}

interface StyledScrollControllerProps extends BoxProps {
  x: boolean;
  y: boolean;
}

const StyledScrollController = styled(Box)<StyledScrollControllerProps>`
position: relative;
overflow-x: ${(props) => props.x ? "auto" : "visible"};
overflow-y: ${(props) => props.y ? "auto" : "visible"};
`;

const omit = R.omit<string>(["name", "x", "y", "ctx", "children"]);

export const Context = React.createContext<ScrollContext>({
  enabled: true,
  path: [],
});

export const listenToScroll = <P, S>(
  WrappedComponent: React.ComponentType<P & { children?: React.ReactNode } & InjectedScrollProps>,
) => {
  const Listener = class extends React.PureComponent<P & ListenerProps, ListenerState> {
    public static contextType = Context;

    public context!: React.ContextType<typeof Context>;

    public state: ListenerState = {};

    constructor(props: P & ListenerProps) {
      super(props);

      this.getRect = this.getRect.bind(this);
      this.scrolled = this.scrolled.bind(this);
    }

    public scrolled(event: ScrollEvent) {
      this.updateContainerRect();
    }

    public componentDidMount(): void {
      if (this.context.bus) {
        this.context.bus.addListener("scroll", this.scrolled);
      }

      this.updateContainerRect();
    }

    public componentWillUnmount(): void {
      if (this.context.bus) {
        this.context.bus.removeListener("scroll", this.scrolled);
      }
    }

    public updateContainerRect() {
      const ctx = this.context;

      if (!ctx.enabled) {
        return;
      }

      let rect = null;
      if (ctx.getMyInfo) {
        rect = ctx.getMyInfo();

        if (rect) {
          // tslint:disable-next-line:max-line-length
          const id = `${nanoid()}-${rect.left}x${rect.top}:${rect.width}x${rect.height}:${rect.scrollLeft}x${rect.scrollTop}`;

          this.setState({ rect, id });
        }
      }
    }

    public getRect(el: HTMLElement): ElementRect | undefined {
      if (this.context.getRect) {
        return this.context.getRect(el);
      }
    }

    public render() {
      const ctx = this.context;

      if (this.state.rect && this.state.id) {
        return (
          <WrappedComponent
            ref={this.props.forwardedRef}
            containerRect={this.state.rect}
            scrollId={this.state.id}
            scrollIsEnabled={ctx.enabled}
            getRect={this.getRect}
            {...this.props}
          />
        );
      } else {
        return null;
      }
    }
  };

  const Hoisted = hoistNonReactStatic(Listener, WrappedComponent);

  return React.forwardRef((props: P & ListenerProps, ref) => {
    return <Hoisted forwardedRef={ref} {...props} />;
  });
};

class ContextualizedScrollController extends React.PureComponent<Props & PropsWithContext, State> {
  public containerRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: Props & PropsWithContext) {
    super(props);

    this.scrolled = debounce(this.scrolled.bind(this), 5);
    // this.scrolled = this.scrolled.bind(this);
    this.resized = this.resized.bind(this);
    this.getMyInfo = this.getMyInfo.bind(this);
    this.getRect = this.getRect.bind(this);
  }

  public componentDidMount(): void {
    this.attach();
  }

  public componentWillUnmount(): void {
    this.detach();
  }

  public getRect(el: HTMLElement): ElementRect {
    const rect = el.getBoundingClientRect();

    return {
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset,
      width: rect.width,
      height: rect.height,
    };
  }

  public getMyInfo(): ScrollContainerInfo | null {
    if (this.props.root) {
      return {
        scrollTop: window.scrollY,
        scrollLeft: window.scrollX,
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    } else {
      const node = ReactDOM.findDOMNode(this);

      if (node instanceof HTMLElement) {
        const rect = node.getBoundingClientRect();

        return {
          scrollTop: node.scrollTop,
          scrollLeft: node.scrollLeft,
          left: rect.left + window.pageXOffset,
          top: rect.top + window.pageYOffset,
          width: rect.width,
          height: rect.height,
        };
      }

      return null;
    }
  }

  public scrolled(event: UIEvent) {
    const { ctx } = this.props;
    const { bus } = ctx;

    if (bus) {
      bus.emit("scroll", { ctx });
    }
  }

  public domScrolled(event: Event) {
    const { ctx } = this.props;
    const { bus } = ctx;

    if (bus) {
      bus.emit("scroll", { ctx });
    }
  }

  public resized() {
    const { ctx } = this.props;
    const { bus } = ctx;

    if (bus) {
      bus.emit("scroll", { ctx });
    }
  }

  public render() {
    const safeProps = omit<Props>(this.props);

    return (
      <Context.Provider value={{
        ...this.props.ctx,
        getMyInfo: this.getMyInfo,
        getRect: this.getRect,
      }}>
        <StyledScrollController ref={this.containerRef} x={this.props.x} y={this.props.y} {...safeProps}>
          {this.props.children}
          <ReactResizeDetector handleWidth handleHeight onResize={this.resized} />
        </StyledScrollController>
      </Context.Provider>
    );
  }

  private attach(): void {
    if (this.props.root) {
      window.addEventListener("scroll", this.domScrolled);
      window.addEventListener("resize", this.domScrolled);
    } else {
      const { current } = this.containerRef;
      if (current !== null && current instanceof HTMLElement) {
        current.addEventListener("scroll", this.domScrolled);
      }
    }
  }

  private detach(): void {
    if (this.props.root) {
      window.removeEventListener("scroll", this.domScrolled);
      window.removeEventListener("resize", this.domScrolled);
    } else {
      const { current } = this.containerRef;
      if (current !== null && current instanceof HTMLElement) {
        current.removeEventListener("scroll", this.domScrolled);
      }
    }
  }
}

class ScrollController extends React.PureComponent<Props, State> {
  public static defaultProps = {
    enabled: true,
    x: true,
    y: true,
    root: false,
  };

  public mergeContext(x: ScrollContext): ScrollContext {
    return {
      name: this.props.name,
      bus: x.bus || new EventEmitter(),
      path: [...x.path, this],
      enabled: this.props.enabled,
    };
  }

  public render() {
    return (
      <Context.Consumer>
        {(x) => <ContextualizedScrollController ctx={this.mergeContext(x)} {...this.props} />}
      </Context.Consumer>
    );
  }
}

interface RootProps { }

export class RootScrollController extends React.PureComponent<RootProps> {
  public render() {
    return <ScrollController name="root" x={true} y={true} root={true} {...this.props} />;
  }
}

export default ScrollController;
