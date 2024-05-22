const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: path.resolve(__dirname, "client", "index.js"),
  mode: isDev ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/static/index.html",
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".html"],
    },
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 3001,
    proxy: [
      {
        context: ["/Brew"],
        target: "http://localhost:3000",
      },
    ],
  },
};
