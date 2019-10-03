import { action } from "@storybook/addon-actions";
import { useTheme } from "emotion-theming";
import { createMemoryHistory } from "history";
import React from "react";

import App from "../src/core/Application";
import AppContext from "../src/core/Application/context";
import definition from "../src/definition";
import { Box } from "../src/styled";

const history = createMemoryHistory();
const appDefinition = definition({ history });

export const PrintContext = (props: {}) => {
    const ctx = React.useContext(AppContext);
    React.useEffect(() => {
        action("context")(ctx);
    }, []);
    return (
        <>
            <pre>{JSON.stringify(ctx, null, "  ")}</pre>
        </>
    );
};

export const PrintTheme = (props: {}) => {
    const theme = useTheme();
    React.useEffect(() => {
        action("theme")(theme);
    }, []);
    return (
        <>
            <pre>{JSON.stringify(theme, null, "  ")}</pre>
        </>
    );
};

export default (props: React.PropsWithChildren<{}>) => {
    return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i\&display=swap" rel="stylesheet" />
            <App definition={appDefinition}>
                <Box p={3}>
                    {props.children}
                </Box>
            </App>
        </div>
    );
};
