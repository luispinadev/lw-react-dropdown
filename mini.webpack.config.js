var webpack = require("webpack");
// minified build
module.exports = {

  entry: './src/index.js',

  output: {
    filename: './build/bundle.min.js'       
  },

  module: {
    loaders: [
      { exclude: /node_modules/, test: /\.js$/, loader: 'babel' },
      { test: /\.styl$/, loader: 'style!css!stylus' }
    ]

  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],

  resolve: {
    extensions: ['', '.js', '.json']
  },

  stylus: {
    use: [require('nib')()],
    import: ['~nib/lib/nib/index.styl']
  }
};