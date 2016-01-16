// webpack.config.js
module.exports = {

  entry: './src/index.js',

  output: {
    filename: './build/bundle.js'       
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
      { exclude: /node_modules/, test: /\.js$/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css?modules!stylus' }
    ]

  },

  resolve: {
    extensions: ['', '.js', '.json']
  },

  stylus: {
    use: [require('nib')()],
    import: ['~nib/lib/nib/index.styl']
  }
};