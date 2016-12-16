var path = require('path');

var webpack = require('webpack');

var packageData = require('./package.json');

plugins = [];
plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = {
    entry: path.resolve(__dirname, packageData.main),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    plugins: plugins
};
