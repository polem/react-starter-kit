var createWebpackConfig = require('./webpack.base.js');

var path = require('path');
var fs = require('fs');

module.exports = createWebpackConfig({
  entry: [
    path.join(process.cwd(), 'app'),
  ],
  plugins: [],
  babelQuery: {
    presets: ['react-hmre'],
  },
  target : 'web',
  outputDir: 'client'
})
