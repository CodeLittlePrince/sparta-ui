const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueLoaderPluginInstance = new VueLoaderPlugin()
const { alias, resolve } = require('../config')

// __dirname: 总是返回被执行的 js 所在文件夹的绝对路径
// __filename: 总是返回被执行的 js 的绝对路径
// process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
const config = {
  resolve: {
    // 扩展名，比如import 'app.vue'，扩展后只需要写成import 'app'就可以了
    extensions: ['.js', '.vue', '.scss', '.css'],
    // 取路径别名，方便在业务代码中import
    alias,
  },
}

module.exports = {
  config,
  resolve,
  VueLoaderPluginInstance
}