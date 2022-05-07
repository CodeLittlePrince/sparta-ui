const webpack = require('webpack')
const webpackConfigBase = require('../site/webpack.config.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = Object.assign(webpackConfigBase.config, {
  // sourcemap 模式
  mode: 'development',
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
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]',
          publicPath: '~sparta-ui/lib',
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'vue-style-loader',
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
              resources: webpackConfigBase.resolve('sparta/common/scss/theme/globalpay/variable.scss')
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
    new MiniCssExtractPlugin(
      {
        filename: 'theme/globalpay/[name].css'
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