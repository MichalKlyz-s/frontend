const path = require("path");
("use strict");
const webpack = require("webpack");
module.exports = {
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  // devServer: {
  //   host: '0.0.0.0',
  //   port: '8080'
  // }
};

// import * as path from 'path';
// import * as webpack from 'webpack';
// // in case you run into any typescript error when configuring `devServer`
// import 'webpack-dev-server';

// const config: webpack.Configuration = {
//   mode: 'production',
//   entry: './foo.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'foo.bundle.js',
//   },
// };

// export default config;
