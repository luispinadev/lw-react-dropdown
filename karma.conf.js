// var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    singleRun: true,

    frameworks: [ 'chai', 'mocha' ],

    files: [
      'tests.webpack.js'
    ],

    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-firefox-launcher',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'dots' ],

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    }

  });
};