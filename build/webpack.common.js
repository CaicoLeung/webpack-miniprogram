const webpack = require('webpack')
const glob = require('glob')
const path = require('path')
const utils = require('./utils')

const appEntry = {
  app: './src/app.ts'
}
const componentsEntry = utils.getEntry(utils.resolve('src'), 'components/**/index.ts')
const pagesEntry = utils.getEntry(utils.resolve('src'), 'pages/**/index.ts')

const entry = Object.assign({}, appEntry, componentsEntry, pagesEntry)

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: utils.resolve('dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
}
