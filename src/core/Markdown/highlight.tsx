import Prism from "prismjs";
import "prismjs/themes/prism-solarizedlight.css";

import "prismjs/components/prism-java";
import "prismjs/components/prism-markup-templating";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-php";
import "prismjs/components/prism-scala";
import "prismjs/components/prism-typescript";

import React from "react";

export interface HighlightProps {
  value: string;
  language?: string;
}

export class Highlight extends React.PureComponent<HighlightProps> {
  public static defaultProps = {
    language: "",
  };

  public codeEl: any;

  constructor(props: HighlightProps) {
    super(props);

    this.codeEl = null;
  }

  public componentDidMount() {
  }

  public componentDidUpdate() {
  }

  public highlightCode(code: string) {
    if (this.props.language) {
      return Prism.highlight(code, Prism.languages[this.props.language], this.props.language);
    } else {
      return code;
    }
  }

  public render() {
    return (
      <pre>
        <div dangerouslySetInnerHTML={{__html: this.highlightCode(this.props.value)}} />
      </pre>
    );
  }
}