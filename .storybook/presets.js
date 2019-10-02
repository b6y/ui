const path = require("path");
 
module.exports = [
  "@storybook/addon-docs/react/preset",
  {
    name: "@storybook/preset-typescript",
    options: {
      tsLoaderOptions: {
        transpileOnly: true
      },
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, "../tsconfig.docgen.json")
      },
      include: [
        path.resolve(__dirname, "../src"), path.resolve(__dirname),
        path.resolve(__dirname, "../stories"), path.resolve(__dirname)
      ]
    }
  }
];