const ora = require('ora')
const webpack = require('webpack')

// 主题为“跨境收款”
process.env.THEME = 'globalpay'
// 生成full代码
buildPack(require('./webpack.config.full'), 'building for full')
// 生成modules代码
buildPack(require('./webpack.config.modules'), 'building for modules')

// 主题为“Epay”
process.env.THEME = 'epay'
// 生成full代码
buildPack(require('./webpack.config.full'), 'building for full')
// 生成modules代码
buildPack(require('./webpack.config.modules'), 'building for modules')

// 运行wbepack
function buildPack(webpackConfig, spinnerText) {
  var spinner = ora(spinnerText || 'building for uncompressed files...')
  spinner.start()
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) {
      throw err
    }
    // terminal输出样式
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  })
}