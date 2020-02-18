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
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [new VueLoaderPlugin()]
}

module.exports = config
