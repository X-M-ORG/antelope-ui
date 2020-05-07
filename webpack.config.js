const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  mode: 'production',

  entry: {
    'antelope-ui': './src/index.js',
    'antelope-ui.core': './src/index.core.js'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
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
        test: /\.styl(us)?$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },

  plugins: [new VueLoaderPlugin()]
}

module.exports = config
