import React from "react";

import { Application } from "../src/core/Application";
import { PrintContext, PrintTheme, wrap } from "./context";

export const theme = wrap(() => {
  return (
    <pre><PrintTheme /></pre>
  );
});

export const context = wrap(() => {
  return (
    <pre><PrintContext /></pre>
  );
});

export default {
  title: "Core|Application",
  component: Application,
};
