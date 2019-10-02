import { createMemoryHistory } from "history";
import React from "react";

import App from "../src/core/Application";
import definition from "../src/definition";

const history = createMemoryHistory();

export default (props: React.PropsWithChildren<{}>) => {
    return <App definition={definition({ history })}>{props.children}</App>;
};