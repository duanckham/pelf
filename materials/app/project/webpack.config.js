const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './web/app.js'),
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
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ],
  },
};