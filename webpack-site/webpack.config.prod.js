const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const exec = require('child_process').execSync
const webpackConfigBase = require('./webpack.config.base.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackBar = require('webpackbar')

const ANALYZE = process.env.ANALYZE === 'active'
const ONLINE = process.env.ONLINE === 'active'
const CDN = process.env.CDN || '/'

// 网站版本号设置
let appVersion = ''
try {
  appVersion = exec('git rev-parse --short HEAD').toString().replace(/\n/, '')
} catch (e) {
  console.warn('Getting revision FAILED. Maybe this is not a git project.')
}

// 将第三方依赖（node_modules）的库打包，从而充分利用浏览器缓存
const vendors = [
  'vue',
  'vue-router',
  'axios'
]

// webpack配置
const config = Object.assign(webpackConfigBase.config, {
  mode: 'production',
  // You should configure your server to disallow access to the Source Map file for normal users!
  // devtool: 'source-map', // 因为需要PE支持，暂时先不生成吧
  entry: {
    app: webpackConfigBase.resolve('index.js'),
    /*
      webpack v4默认其实在spitChunks已经有这个功能了，
      但是因为babel-polyfill的动态加入，
      直接将babel-polyfill加入vendor，
      万一以后用到高级语法需要polyfill支持，
      那样会影响整个vendor，
      因此，单独抽离（spitChunks自动会做）
     */
    vendors: vendors
  },
  output: {
    path: webpackConfigBase.resolve('../dist'),
    // publicPath: 'https://cdn.self.com'
    publicPath: CDN,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].js',
    globalObject: 'this'
  },
  optimization: {
    // 分割文件
    splitChunks: {
      chunks: 'all'
    },
    // 压缩js
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      })
    ]
  },
  performance: {
    hints: 'warning'
  },
  plugins: [
    new WebpackBar(),
    // make sure to include the plugin for the magic
    webpackConfigBase.VueLoaderPluginInstance,
    // Scope hosting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 删除build文件夹
    new CleanWebpackPlugin(
      'dist',
      {
        root: webpackConfigBase.resolve('../')
      }
    ),
    // 抽离出css
    webpackConfigBase.extractCSS,
    // html 模板插件
    new HtmlWebpackPlugin({
      appVersion,
      filename: 'index.html',
      template: webpackConfigBase.resolve('index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      }
    }),
    // 复制文件
    new CopyWebpackPlugin([
      // 复制favicon到dist
      {
        from: webpackConfigBase.favicon,
        to: webpackConfigBase.resolve('../dist/')
      }
    ]),
    // 定义全局常量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        ONLINE: ONLINE ? 'true' : 'false' // 一般来说，上线之后埋点会用线上正式的key
      }
    }),
    // 加署名
    new webpack.BannerPlugin('Copyright by 网易支付 https://epay.163.com/'),
  ]
})

// analyze的话，进行文件可视化分析
if (ANALYZE) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  config.plugins.push(
    new BundleAnalyzerPlugin()
  )
}

module.exports = config