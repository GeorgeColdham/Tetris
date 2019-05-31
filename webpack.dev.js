const path = require('path')
const common = require('./webpack.common')
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader', // 3. creates style nodes from JS strings
        'css-loader', // 2. translates CSS into CommonJS
        'sass-loader' // 1. compiles Sass to CSS, using Node Sass by default
      ]
    }]
  }
})
