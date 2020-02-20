const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  mode: 'production',

  entry: './src/index.js',

  resolve: {
    extensions: ['.js', '.vue', '.json']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'antelope-ui.js',
    library: 'antelope',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [new VueLoaderPlugin()]
}

module.exports = config
