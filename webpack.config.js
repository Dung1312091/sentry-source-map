var path = require("path");
var hwp = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const fs = require("fs");
module.exports = {
  devtool: "source-map",
  entry: path.join(__dirname, "/src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/build")
  },
  externals: {
    electron: "commonjs electron"
  },
  target: "electron-renderer",
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      loader: "babel-loader"
    }]
  },
  plugins: [
    new hwp({
      template: path.join(__dirname, "/public/index.html")
    }),
    // new SentryWebpackPlugin({
    //   include: "build",
    //   ignoreFile: ".sentrycliignore",
    //   ignore: ["node_modules", "webpack.config.js"],
    //   configFile: ".sentryclirc",
    //   release: "v5",
    //   urlPrefix: "~/build/"
    // })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};