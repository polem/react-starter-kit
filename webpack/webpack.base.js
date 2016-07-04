var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var AssetsPlugin = require('assets-webpack-plugin')

var createWebpackConfig = function(options) {
  return {
    entry: options.entry,
    output: {
      path: path.resolve(process.cwd(), 'build', options.outputDir),
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },
    module: {
      loaders: [{
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: 'babel',
        exclude: /node_modules/,
        query: options.babelQuery,
      }, {
        test: /\.s?css$/,
        exclude: /node_modules/,
        loader: options.cssLoaders,
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }, {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif)$/,
        loader: 'file-loader',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader?limit=10000',
      }],
    },
    plugins: options.plugins.concat([
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        children: true,
        minChunks: 2,
        async: true,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        }
      }),
      new AssetsPlugin({ filename: 'assets.json' }),
    ]),
    resolve: {
      modules: ['app', 'node_modules'],
      extensions: [
        '',
        '.js',
        '.jsx',
        '.react.js',
      ],
      packageMains: [
        'main',
      ],
    },
    target: options.target, // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true,
    devtool: options.devtool
  };
};

module.exports = createWebpackConfig;
