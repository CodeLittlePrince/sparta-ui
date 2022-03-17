const ora = require('ora')
const webpack = require('webpack')

// 生成full代码
const webpackConfigFull = require('./webpack.config.full')
buildPack(webpackConfigFull, 'building for full')

// 生成modules代码
const webpackConfigModules = require('./webpack.config.modules')
buildPack(webpackConfigModules, 'building for modules')

// 运行wbepack
function buildPack(webpackConfig, spinnerText) {
  var spinner = ora(spinnerText + ' --- theme: ' + process.env.THEME + '...')
  console.log('')
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