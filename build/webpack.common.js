const webpack = require('webpack')
const glob = require('glob')
const path = require('path')
const utils = require('./utils')
const CopyWepackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
    // directories where to look for modules (in order)
    extensions: ['.ts', '.js'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new CopyWepackPlugin({
      patterns: [
        {
          from: './',
          to: './',
          context: 'src/',
          globOptions: {
            gitignore: true,
            ignore: ['**/*.ts', '**/*.js', '**/*.css', '**/*.scss', '**/*.less', '**/*.scss', '**/*.sass'],
          }
        },
      ]
    })
  ]
}
