import React from "react";
import ReactMarkdown from "react-markdown";

import Highlight from "./highlight";

export interface Props {
  source: string;
}

export default (props: Props) => {
  return <ReactMarkdown source={props.source} renderers={{ code: Highlight }} />;
};
