var createWebpackConfig = require('./webpack.base.js');

var path = require('path');
var fs = require('fs');

module.exports = createWebpackConfig({
  entry: [
    path.join(process.cwd(), 'app/server.js'),
  ],
  plugins: [],
  babelQuery: {
  },
  devtool: 'cheap-module-eval-source-map',
  target : 'node',
  outputDir: 'server'
})
