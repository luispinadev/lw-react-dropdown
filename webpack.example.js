var webpack = require('webpack')
module.exports = {

  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './example/index.js'
  ],

  output: {
    path: require("path").resolve("./example/build/"),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  devtool: '#inline-source-map',

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

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.json']
  },

  stylus: {
    use: [require('nib')()],
    import: ['~nib/lib/nib/index.styl']
  }
};