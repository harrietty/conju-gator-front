const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const configuration = require("./configuration");

const isDevelopment = process.env.NODE_ENV === "development";

function prepareConfig(config) {
  const c = {};
  Object.keys(config).forEach(key => {
    c[`process.env.${key}`] = JSON.stringify(config[key]);
  });
  return c;
}

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: "file-loader?name=[name].[ext]" // <-- retain original file name
      }
    ]
  },
  mode: process.env.NODE_ENV,
  devtool: isDevelopment ? "eval-source-map " : false,
  devServer: {
    hot: true,
    port: 7700,
    historyApiFallback: true,
    inline: true,
    disableHostCheck: true,
    contentBase: path.join(__dirname, "dist")
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(
      prepareConfig(configuration[process.env.NODE_ENV])
    ),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: "./src/static/favicon-16x16.png"
    }),
    new MinifyPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === "true" ? "server" : "disabled"
    })
  ].filter(Boolean)
};
