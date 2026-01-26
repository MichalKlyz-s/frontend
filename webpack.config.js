"use strict";

const path = require("path");
const webpack = require("webpack");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "production",
  entry: "./foo.js", // Change this to your actual entry file if needed
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: "raw-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  // Uncomment if using dev server:
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 8080, // Use number, not string
  //   static: {
  //     directory: path.join(__dirname, 'dist'),
  //   },
  //   compress: true,
  //   hot: true
  // },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};
