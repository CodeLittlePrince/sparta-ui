/**
 * @file 异步加载脚本文件
 */

/**
 * 脚本文件加载器
 * @param {(string|string[])} path - 文件地址
 * @param {Object} options - 配置参数
 * @param {boolean} options.async - 设置script元素的async属性
 * @param {boolean} options.defer - 设置script元素的defer属性
 * @returns {Promise} Promise实例
 */

/* istanbul ignore next */
function loadScript(path, options = {}) {
  return new Promise((resolve, reject) => {
    if (typeof path !== 'string') {
      if (Array.isArray(path)) {
        Promise.all(path.map(p => loadScript(p, options))).then(resolve).catch(reject)
        return
      }
      reject()
      return
    }
    const script = document.createElement('script')
    script.src = path
    script.async = !!options.async
    script.defer = !!options.defer
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default loadScript
