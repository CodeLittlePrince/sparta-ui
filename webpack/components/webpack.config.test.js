const webpack = require('webpack')
const webpackConfigBase = require('../site/webpack.config.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = Object.assign(webpackConfigBase.config, {
  mode: 'development',
  devtool: process.env.SINGLE_RUN === 'Y' ? 'none': '#inline-source-map',
  resolve: Object.assign(webpackConfigBase.config.resolve, {
    alias: Object.assign(webpackConfigBase.config.resolve.alias, {
      // https://github.com/vuejs-templates/webpack/issues/215#issuecomment-238095102
      vue: 'vue/dist/vue.js'
    })
  }),
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
          publicPath: 'sparta-ui/lib',
          sourceMap: true
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]',
          publicPath: '~sparta-ui/lib',
          sourceMap: true
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader', options: {
              sourceMap: true,
              sassOptions: { outputStyle: 'expanded' }
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                webpackConfigBase.resolve('sparta/common/scss/globalpay/variable.scss'),
                webpackConfigBase.resolve('sparta/common/scss/browser/variable.scss')
              ]
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
          }
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
    new MiniCssExtractPlugin(
      {
        filename: 'globalpay/[name].css'
      }
    ),
    // 定义全局常量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"test"'
      }
    })
  ]
})

module.exports = config