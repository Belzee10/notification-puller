const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const PurifyCSSPlugin = require("purifycss-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const path = require("path");
const glob = require("glob");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  output: {
    chunkFilename: "[name].[chunkhash:4].js",
    filename: "[name].[chunkhash:4].js"
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          preset: ["default", { discardComments: { removeAll: true } }]
        },
        canPrint: false
      }),
      new TerserPlugin({ sourceMap: true }),
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
    new WebpackBar({ name: "Building Production" }),
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version()
    }),
    new MiniCssExtractPlugin({ filename: "styles/[name].[contenthash:4].css" }),
    new PurifyCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "src")}/**/*.js`, {
        nodir: true
      })
    })
  ]
};
