const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: "./src/js/app.js",

  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    assetModuleFilename: "images/[name][ext]",
  },
  mode: "development",

  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [ 'style-loader', 'css-loader' ] for style tag
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.s[ac]ss$/i,

        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};

module.exports = config;
