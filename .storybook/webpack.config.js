const path = require("path")

module.exports = ({
    config,
    mode
}) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            // {
            //     loader: require.resolve('babel-loader'),
            //     options: {
            //         presets: [
            //             ['react-app', {
            //                 flow: false,
            //                 typescript: true
            //             }]
            //         ],
            //     },
            // },
            {
                loader: require.resolve('awesome-typescript-loader'),
                options: {
                    transpileOnly: true
                }
            },
            {
                loader: require.resolve('react-docgen-typescript-loader'),
            },
        ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};


// module.exports = ({ config }) => {
//     config.module.rules.push({
//         test: /\.(ts|tsx)$/,
//         use: [
//             {
//                 loader: require.resolve('awesome-typescript-loader'),
//             },
//             // Optional

//         ],
//     });
//     config.resolve.extensions.push('.ts', '.tsx');
//     return config;
// };