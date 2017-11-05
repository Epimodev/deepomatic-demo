const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const config = require('./config');

// add hot-module-replacement entry
webpackBaseConfig.entry.unshift('react-hot-loader/patch');

module.exports = merge(webpackBaseConfig, {
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-modules-flow-types-loader' },
          { loader: 'css-loader', options: config.cssOptions },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader', options: config.sassOptions },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: config.entryHTML,
      template: config.outputHTML,
      inject: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
