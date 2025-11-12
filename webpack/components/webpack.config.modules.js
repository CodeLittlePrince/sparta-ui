const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const webpackConfigBase = require('./webpack.config.base.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const THEME = process.env.THEME
const extractCSS =
  new MiniCssExtractPlugin(
    {
      filename: `${THEME}/[name]/index.css`
    }
  )

// 读取所有的组件名和对应的index.js路径
let componentEntryMap = {}
const cPath = webpackConfigBase.resolve(`sparta/components/${THEME}`)
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
  entry: {
    ...componentEntryMap,
    'ModalManage': webpackConfigBase.resolve('sparta/model/ModalManage'),
    'PopManage': webpackConfigBase.resolve('sparta/model/PopManage'),
    'PopLayerManage': webpackConfigBase.resolve('sparta/model/PopLayerManage'),
  },
  output: {
    path: webpackConfigBase.resolve('lib'),
    filename: (pathData) => {
      return [
        'ModalManage',
        'PopManage',
        'PopLayerManage',
      ].includes(pathData.chunk.name) ?
        'model/[name].js':
        `${THEME}/[name]/index.js`
    },
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  externals: {
    'vue': {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    'sparta/model/ModalManage': 'sparta-ui/lib/model/ModalManage',
    'sparta/model/PopManage': 'sparta-ui/lib/model/PopManage',
    'sparta/model/PopLayerManage': 'sparta-ui/lib/model/PopLayerManage',
  },
  optimization: {
    // 压缩js
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin()
    ],
  },
  // loaders处理
  module: {
    noParse: /^vue$/,
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: `${THEME}/img/[name].[ext]`,
          publicPath: 'sparta-ui/lib'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'file-loader',
        options: {
          name: `${THEME}/font/[name].[ext]`,
          publicPath: '~sparta-ui/lib'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader', options: {
              sourceMap: false,
              sassOptions: { outputStyle: 'expanded' }
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: false,
              resources: webpackConfigBase.resolve(`sparta/common/scss/${THEME}/variable.scss`)
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            // Use cache carefully 😤It will cache although you have changed .browserslistrc sometimes.
            options: { cacheDirectory: true }
          },
          { loader: 'eslint-loader', options: { cache: true } }
        ]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    // make sure to include the plugin for the magic
    webpackConfigBase.VueLoaderPluginInstance,
    // Scope hosting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 抽离出css
    extractCSS,
    // 定义全局常量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        THEME: `'${THEME}'`,
      }
    })
  ]
})

module.exports = config