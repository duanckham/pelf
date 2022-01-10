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
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/html/dev.html',
    }),
  ],
  devServer: {
    port: 9527,
    onBeforeSetupMiddleware: server => {
      if (!server) {
        throw new Error('webpack-dev-server is not defined');
      }

      server.app.use((req, res, next) => {
        if (/\/[^\/]+\/bundle\.js/.test(req.url)) {
          return res.redirect('/bundle.js');
        }

        next();
      });
    },
    compress: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
};