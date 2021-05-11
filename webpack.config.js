const path = require("path");
// plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
// paths
const srcPath = path.resolve(__dirname, "src");
const htmlPath = path.resolve(__dirname, "html");
const distPath = path.resolve(__dirname, "dist");
const nodeModulesPath = path.resolve(__dirname, "node_modules");

module.exports = {
  context: srcPath,
  mode: "development",
  entry: {
    createjs: path.join(nodeModulesPath, "/createjs/builds/createjs-2015.11.26.combined.js"),
    app: path.join(srcPath, "/app.ts"),
  },
  devtool: "source-map",
  output: {
    path: distPath,
    filename: "[name].[contenthash:8].js",
  },
  devServer: {
    contentBase: srcPath,
    open: true,
    stats: {
      warnings: false,
    },
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ },
      { test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /node_modules(\/|\\)(createjs)(\/|\\).*\.js$/,
        loader: "imports-loader",
        options: {
          additionalCode: "window.createjs = {};",
        },
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(htmlPath, "/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].chunk.css",
    }),
    new ESLintPlugin({
      extensions: [".js", ".ts"],
    }),
  ],
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "@": srcPath,
      "@createjs": path.resolve(srcPath, "createjs"),
    },
  },
};
