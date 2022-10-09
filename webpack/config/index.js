const path = require('path')

// 减少路径书写
function resolve(dir) {
  return path.join(__dirname, '../../' + dir)
}

exports.alias = {
  root: resolve('/'),
  site: resolve('/site'),
  sparta: resolve('/sparta'),
  spartaComponents: resolve(`/sparta/components/${process.env.THEME}`),
  base: resolve('/sparta/components/base')
}

exports.resolve = resolve