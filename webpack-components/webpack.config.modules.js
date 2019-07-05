const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackConfigBase = require('./webpack.config.base.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const extractCSS =
  new MiniCssExtractPlugin(
    {
      filename: '[name]/index.css'
    }
  )

// 读取所有的组件名和对应的index.js路径
let componentEntryMap = {}
const cPath = webpackConfigBase.resolve('components')
const files = fs.readdirSync(cPath)
if (files) {
  files.forEach(name => {
    const p = path.join(cPath, name)
    if (fs.statSync(p).isDirectory()) {
      componentEntryMap[name] = p
    }
  })
}

// webpack配置
const config = Object.assign(webpackConfigBase.config, {
  mode: 'production',
  entry: componentEntryMap,
  output: {
    path: webpackConfigBase.resolve('../lib'),
    filename: '[name]/index.js',
    chunkFilename: '[name]/[id].js',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  // loaders处理
  module: {
    noParse: /^vue$/,
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      }
    ]
  },
  optimization: {
    // 压缩js
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    webpackConfigBase.VueLoaderPluginInstance,
    // Scope hosting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 抽离出css
    extractCSS,
    // 定义全局常量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
})

module.exports = config