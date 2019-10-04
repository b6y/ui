import React from "react";
import ReactMarkdown from "react-markdown";

import Highlight from "./highlight";

export interface Props {
  source: string;
}

export const Markdown = (props: Props) => {
  return <ReactMarkdown source={props.source} renderers={{ code: Highlight }} />;
};

export default Markdown;
