const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const { NODE_ENV } = process.env;

module.exports = {
  entry: {
    demo: '/app/client/demo.js',
    error: '/app/client/error.js',
  },
  mode: NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: '[name].js',
    publicPath: '/static'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jp(e)?g|svg)$/,
        exclude: /node_modules/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'demo.html',
      template: './app/client/index.html',
      chunks: ['demo'],
      publicPath: '/static',
    }),
    new HtmlWebpackPlugin({
      filename: 'error.html',
      template: './app/client/index.html',
      chunks: ['error'],
      publicPath: '/static',
    }),
    new MiniCssExtractPlugin({}),
    new MomentLocalesPlugin({
      localesToKeep: ['en'],
    }),
  ],
  // TODO - Could implement "Hot reload" or "Fast refresh" plugin
};