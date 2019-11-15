const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const PurifyCSSPlugin = require("purifycss-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const glob = require("glob");

module.exports = {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial"
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: ".env.production"
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "styles/[name].css" }),
    new WebpackBar({ name: "Building Production" }),
    new PurifyCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "src")}/**/*.js`, {
        nodir: true
      })
    })
  ]
};
