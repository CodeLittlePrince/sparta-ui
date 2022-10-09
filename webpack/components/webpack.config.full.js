const webpack = require('webpack')
const webpackConfigBase = require('./webpack.config.base.js')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const THEME = process.env.THEME
const extractCSS =
  new MiniCssExtractPlugin(
    {
      filename: 'index.css'
    }
  )

// webpack配置
const config = smp.wrap(Object.assign(webpackConfigBase.config, {
  mode: 'production',
  entry: {
    index: webpackConfigBase.resolve(`sparta/components/${THEME}/index.js`)
  },
  output: {
    path: webpackConfigBase.resolve(`lib/${THEME}`),
    filename: 'index.js',
    library: 'sparta',
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
  optimization: {
    // 压缩js
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  stats: 'errors-warnings',
  // loaders处理
  module: {
    noParse: /^vue$/,
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
          publicPath: 'sparta-ui/lib'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]',
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
              resources: webpackConfigBase.resolve(`sparta/common/scss/theme/${THEME}/variable.scss`)
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
}))

module.exports = config