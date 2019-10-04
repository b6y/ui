const path = require('path');

module.exports = (webpack) => {
    return {
        ...webpack.config,
        module: {
            ...webpack.config.module,
            rules: [
                ...(webpack.config.module.rules || []),
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: require.resolve('babel-loader'),
                            options: {
                                presets: [['react-app', { flow: false, typescript: true }]],
                                plugins: ['emotion']
                            }
                        },
                        {
                            loader: require.resolve('react-docgen-typescript-loader'),
                            options: {
                                tsconfigPath: path.resolve(__dirname, "../tsconfig.docgen.json")
                            },
                        },
                    ],
                    include: [
                        path.resolve(__dirname, "../src"), path.resolve(__dirname),
                        path.resolve(__dirname, "../stories"), path.resolve(__dirname)
                    ],
                },
            ],
        },
        resolve: {
            ...webpack.config.resolve,
            extensions: [...(webpack.config.resolve.extensions || []), '.ts', '.tsx'],
        },
    };
}