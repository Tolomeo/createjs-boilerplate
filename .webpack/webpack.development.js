const { merge } = require("webpack-merge");

const common = require("./webpack.common");
const paths = require("./paths");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: paths.src,
    open: true,
  },
});
