/**
 * 深拷贝
 * @param {object/array} obj 需要深拷贝的对象或数组
 * @return 对象或数组
 */
function deepClone(obj) {
  let result = {}
  for (const name in obj) {
    if (typeof obj[name] === 'object') {
      result[name] = deepClone(obj[name])
    } else {
      result[name] = obj[name]
    }
  }
  return result
}

export default {
  deepClone
}