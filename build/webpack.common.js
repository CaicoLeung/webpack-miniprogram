const webpack = require('webpack')
const glob = require('glob')
const path = require('path')
const utils = require('./utils')
const CopyWepackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const appEntry = {
  app: './src/app.ts'
}
const componentsEntry = utils.getEntry(utils.resolve('src'), 'components/**/index.ts')
const pagesEntry = utils.getEntry(utils.resolve('src'), 'pages/**/index.ts')

const entry = Object.assign({}, appEntry, componentsEntry, pagesEntry)

module.exports = {
  mode: 'development',
  entry,
  output: {
    path: utils.resolve('dist'),
    filename: '[name].js'
  },
  devtool: false,
  resolve: {
    // directories where to look for modules (in order)
    extensions: ['.ts', '.js', 'json'],
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
      },
      {
        test: /\.(sa|sc|c|le)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|png|gif|jpeg|jpg|icon)\??.*$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 52100, // 50 KB
              filename: utils.assetsPath('img/[name].[ext]')
            }
          }
        ]
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
    }),
    new MiniCssExtractPlugin({
      filename: "[name].wxss"
    }),
    new LodashModuleReplacementPlugin()
  ]
}
