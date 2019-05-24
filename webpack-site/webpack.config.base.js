const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueLoaderPluginInstance = new VueLoaderPlugin()
const hljs = require('highlight.js')

const extractCSS =
  new MiniCssExtractPlugin(
    {
      filename: isProduction ? 'static/css/[name].[contenthash:8].css' : 'static/css/[name].css',
      chunkFilename: isProduction ? 'static/css/[name].[contenthash:8].css' : 'static/css/[name].css',
    }
  )

// 减少路径书写
function resolve(dir) {
  return path.join(__dirname, '../site/' + dir)
}

// 网站图标配置
const favicon = resolve('../favicon.ico')

// 指定以__base64为后缀的svg转为base64
const svgBase64Reg = /__base64\.(svg)(\?.*)?$/

// __dirname: 总是返回被执行的 js 所在文件夹的绝对路径
// __filename: 总是返回被执行的 js 的绝对路径
// process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
const config = {
  resolve: {
    // 扩展名，比如import 'app.vue'，扩展后只需要写成import 'app'就可以了
    extensions: ['.js', '.vue', '.scss', '.css', '.md'],
    // 取路径别名，方便在业务代码中import
    alias: {
      site: resolve('/'),
      sparta: resolve('../sparta/'),
      doc: resolve('../doc/'),
      common: resolve('/common/'),
      ajax: resolve('/common/js/ajax/'),
      utils: resolve('/common/js/utils/'),
      views: resolve('/views/'),
      components: resolve('/components/'),
      directives: resolve('/directives/'),
      filters: resolve('/filters/'),
      mixins: resolve('/mixins/'),
      plugins: resolve('/plugins/')
    }
  },
  // loaders处理
  module: {
    noParse: /^(vue|vue-router|vuex)$/,
    rules: [
      {
        test: /\.(svg)(\?.*)?$/,
        include: svgBase64Reg,
        loader: 'url-loader',
        options: {
          limit: 99999,
          name: isProduction
            ? 'static/font/[name].[hash:8].[ext]'
            : 'static/font/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        exclude: svgBase64Reg,
        loader: 'file-loader',
        options: {
          name: isProduction
            ? 'static/img/[name].[hash:8].[ext]'
            : 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: isProduction
            ? 'static/font/[name].[hash:8].[ext]'
            : 'static/font/[name].[ext]'
        }
      },
      // https://vue-loader.vuejs.org/zh/migrating.html#%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E4%B8%8D%E5%85%BC%E5%AE%B9%E5%8F%98%E6%9B%B4
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: !isProduction ? 'vue-style-loader' : MiniCssExtractPlugin.loader
          },
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
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
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
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler',
            options: {
              raw: true,
              // 自定义highlight逻辑
              highlight (str, lang) {
                if (lang === 'vue') {
                  let rst = ''
                  const htmlStartIndex = str.indexOf('<template>')
                  // 加html
                  const hasHtml = htmlStartIndex > -1
                  if (hasHtml) {
                    const reg = /<\/template>/g
                    let htmlEndIndex = 0
                    let match = {}
                    while ((match = reg.exec(str)) != null) {
                      htmlEndIndex = match.index + 11
                    }
                    const html = str.slice(htmlStartIndex, htmlEndIndex)
                    rst = hljs.highlight('html', html, true).value + '</br>'
                  }
                  // 加js
                  const scriptStartIndex = str.indexOf('<script>')
                  const hasScript = scriptStartIndex > -1
                  if (hasScript) {
                    const scriptEndIndex = str.indexOf('</script>') + 9
                    const script = str.slice(scriptStartIndex, scriptEndIndex)
                    rst += '</br>' + hljs.highlight('js', script, true).value + '</br>'
                  }
                  // 加css
                  const styleStartIndex = str.indexOf('<style>')
                  const hasStyle = styleStartIndex > -1
                  if (hasStyle) {
                    const styleEndIndex = str.indexOf('</style>') + 8
                    const style = str.slice(styleStartIndex, styleEndIndex)
                    rst += '</br>' + hljs.highlight('css', style, true).value + '</br>'
                  }
                  return rst
                } else if (!(lang && hljs.getLanguage(lang))) {
                  return ''
                } else {
                  return hljs.highlight(lang, str, true).value
                }
              },
              preprocess (markdownIt, source) {
                markdownIt.use(require('markdown-it-container'), 'demo', {
                  validate (params) {
                    return params.trim().match(/^demo\s+(.*)$/)
                  },
                
                  render (tokens, idx) {
                    const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
                
                    if (tokens[idx].nesting === 1) {
                      let desc = m[1] || ''
                      desc = markdownIt.render(desc)
                      let content = tokens[idx + 1].content
                      content = content.replace(/<script>(.|\n)*?<\/script>/g, '') // 解决md中script上下文唯一导致取值问题
                      return `<c-code-view desc="${desc}">
                        <template slot="demo">${content}</template>
                      `
                    }
                    return '</c-code-view>\n'
                  }
                })
                return markdownIt.render(source)
              }
            }
          }
        ]
      }
    ]
  }
}

module.exports = {
  config,
  favicon,
  resolve,
  extractCSS,
  VueLoaderPluginInstance
}