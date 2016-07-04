var createWebpackConfig = require('./webpack.base.js');
var webpack = require('webpack');

var path = require('path');
var fs = require('fs');

module.exports = createWebpackConfig({
  entry: [
    'webpack-hot-middleware/client',
    path.join(process.cwd(), 'app'),
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  babelQuery: {
    presets: ['react-hmre'],
  },
  target : 'web',
  outputDir: 'client'
})
