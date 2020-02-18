const path = require('path')

const config = {
  mode: 'production',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'antelope-ui.js'
  }
}

module.exports = config
