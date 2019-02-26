const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const environment = process.env.NODE_ENV;

let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(environment) },
  }),
  new WriteFilePlugin(),
  new ExtractTextPlugin({ filename: 'app.css' }),
];

let appConfig = [
  'babel-polyfill',
  './web/app.js',
];

if (environment === 'production') {
  plugins.push(new UglifyJSPlugin());
} else {
  appConfig = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http:\/\/localhost:9527',
    'webpack/hot/only-dev-server',
  ].concat(appConfig);
}

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname, 'web'),
      'node_modules',
    ]
  },
  entry: {
    app: appConfig
  },
  output: {
    path: path.resolve(__dirname, 'public/build'),
    publicPath: path.resolve(__dirname, 'public'),
    hotUpdateChunkFilename: 'app.hot-update.js',
    hotUpdateMainFilename: 'app.hot-update.json',
    filename: 'app.bundle.js',
  },
  devServer: {
    hot: false,
    lazy: false,
    inline: true,
    host: '0.0.0.0',
    port: 9527,
    disableHostCheck: true,
    watchOptions: {
      aggregateTimeout: 1000,
      poll: 1000,
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      }
    ],
  },
  plugins: plugins,
};