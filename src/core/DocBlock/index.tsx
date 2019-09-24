import React from "react";

interface DocBlockProps {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
}

interface DocBlockState {
  visible: boolean;
}

// DON'T EVER DO THAT ON PRODUCTION!!!
if (!window.__openedDocBlocks__) {
  window.__openedDocBlocks__ = {};
}

// <Section id="kitchensink.example" title="Section Example">
//   {() => (
//     <React.Fragment>
//       <div>Example</div>
//     </React.Fragment>
//   )}
// </Section>
export default class DocBlock extends React.PureComponent<DocBlockProps, DocBlockState> {
  public state = {
    visible: !!window.__openedDocBlocks__[this.props.id],
  };

  constructor(props, context) {
    super(props, context);
  }

  public toggle() {
    const visible = !this.state.visible;
    this.setState((s) => ({ visible }));

    window.__openedDocBlocks__[this.props.id] = visible;
  }

  public render() {
    return (
      <div>
        <div onClick={() => this.toggle()} style={{
          backgroundColor: "#ddd",
          padding: 10,
          borderRadius: 3,
          cursor: "pointer",
          position: "relative",
          zIndex: 2,
          userSelect: "none",
        }}>
          {this.props.title}
        </div>
        {this.state.visible && (
          <div style={{
            padding: 10,
            paddingTop: 15,
            backgroundColor: "#eee",
            borderRadius: 3,
            marginTop: -6,
            position: "relative",
            zIndex: 1,
          }}>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}
