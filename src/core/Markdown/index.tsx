import React from "react";
import ReactMarkdown from "react-markdown";

import { Highlight } from "./highlight";

export interface MarkdownProps {
  source: string;
}

export const Markdown = (props: MarkdownProps) => {
  return <ReactMarkdown source={props.source} renderers={{ code: Highlight }} />;
};