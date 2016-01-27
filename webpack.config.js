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
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.styl$/, loader: 'style!css!stylus' }
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