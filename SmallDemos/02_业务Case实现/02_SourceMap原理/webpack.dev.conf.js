const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: path.resolve(__dirname, "src/main.js"),
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    // minimizer: [
    //   new TerserWebpackPlugin({
    //     terserOptions: {
    //       output: {
    //         comments: false,
    //       },
    //     },
    //   }),
    // ],
  },
};
