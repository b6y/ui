import React from "react";

import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator, addParameters, configure } from "@storybook/react";
import theme from "./theme";

addParameters({
    options: {
        theme,
    },
    backgrounds: [
        { name: "white", value: "#fff", default: true },
        { name: "black", value: "#000" },
        { name: "gray", value: "#bbb" },
        { name: "yellow", value: "#fec107" },
        { name: "green", value: "#00c292" },
        { name: "blue", value: "#03a9f3" },
        { name: "red", value: "#ff0000" },
    ],
});

// addDecorator(withInfo({}));
addDecorator(withKnobs);

// addDecorator(withInfo({
//     styles: {
//       header: {
//         h1: {
//           marginRight: '20px',
//           fontSize: '25px',
//           display: 'inline',
//         },
//         body: {
//           paddingTop: 0,
//           paddingBottom: 0,
//         },
//         h2: {
//           display: 'inline',
//           color: '#999',
//         },
//       },
//       infoBody: {
//         backgroundColor: '#eee',
//         padding: '0px 5px',
//         lineHeight: '2',
//       },
//     },
//     inline: true,
//     source: false,
// }));

// automatically import all files ending in *.stories.tsx?
configure(require.context("../stories", true, /\.stories\.(ts|tsx|mdx)$/), module);
