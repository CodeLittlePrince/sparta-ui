import clonedeep from 'lodash.clonedeep'
import debounce from 'lodash.debounce'

function noop() {}

/**
 * 通过.分割型字符串在对象中找到对应的值
 * 如：
 * getValueByPath({ name: 'kitty', child: { name: 'tom'} }, 'child.name')
 * 返回'tom'
 * @param {object} object 数据源
 * @param {string} prop 需要查找的目标字段，层级用.分隔的字符串
 */
function getValueByPath(object, prop) {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}

function getPropByPath(obj, path, strict) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  let keyArr = path.split('.')
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    let key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  }
}

export {
  noop,
  clonedeep,
  getValueByPath,
  getPropByPath,
  debounce
}