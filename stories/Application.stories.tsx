import React from "react";

import { Application } from "../src/core/Application";
import Context, { PrintContext, PrintTheme } from "./context";

export const theme = () => {
  return (
    <Context>
      <pre><PrintTheme /></pre>
    </Context>
  );
};

export const context = () => {
  return (
    <Context>
      <pre><PrintContext /></pre>
    </Context>
  );
};

export default {
  title: "Core|Application",
  component: Application,
};
