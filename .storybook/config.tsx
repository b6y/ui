import React from "react";

import { withInfo } from "@storybook/addon-info";
import { addDecorator, configure } from "@storybook/react";

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
