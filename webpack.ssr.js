const path = require("path");

const PATHS = {
  build: path.join(__dirname, "static"),
  ssrDemo: path.join(__dirname, "src", "ssr.js")
};

module.exports = {
  mode: "production",
  entry: {
    index: PATHS.ssrDemo
  },
  output: {
    path: PATHS.build,
    filename: "[name].js",
    libraryTarget: "umd",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: PATHS.ssrDemo,
        use: "babel-loader"
      }
    ]
  }
};
