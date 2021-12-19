const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: path.resolve(__dirname, './web/app.dev.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader?url=false',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.scss'],
    modules: [
      path.resolve(__dirname, 'web'),
      'node_modules',
    ],
  },
  output: {
    path: path.resolve(__dirname, './public/build'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/html/dev.html',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, './public'),
    port: 9527,
    compress: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
};