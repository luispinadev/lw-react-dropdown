var webpack = require('webpack')

module.exports = {

  entry: [
    './src/index.js'
  ],

  output: {
    path: require("path").resolve("./build/"),
    filename: 'bundle.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        loaders: ['eslint'],
        exclude: /node_modules/
      }
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.styl$/, loader: 'style!css!stylus' }
    ],

  },

  resolve: {
    extensions: ['', '.js', '.json']
  },

  stylus: {
    use: [require('nib')()],
    import: ['~nib/lib/nib/index.styl']
  }
};