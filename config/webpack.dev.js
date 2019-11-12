const Dotenv = require("dotenv-webpack");
const WebpackBar = require("webpackbar");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    open: true,
    stats: {
      all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      // additional options
      moduleTrace: true,
      errorDetails: true
    }
  },
  plugins: [
    new Dotenv({
      path: ".env"
    }),
    new WebpackBar({ name: "Running Development" }),
    new ErrorOverlayPlugin()
  ]
};
