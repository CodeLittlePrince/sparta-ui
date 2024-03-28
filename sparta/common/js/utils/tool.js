import clonedeep from 'lodash.clonedeep'
import debounce from 'lodash.debounce'

import { isString, isObject } from './types'

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
export const kebabCase = function (str) {
  const hyphenateRE = /([^-])([A-Z])/g
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}

export const capitalize = function (str) {
  if (!isString(str)) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const isEqual = function (value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2)
  }
  return looseEqual(value1, value2)
}

export const looseEqual = function (a, b) {
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

export const arrayEquals = function (arrayA, arrayB) {
  arrayA = arrayA || []
  arrayB = arrayB || []

  if (arrayA.length !== arrayB.length) {
    return false
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false
    }
  }

  return true
}

export const isEmpty = function (val) {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''
  switch (Object.prototype.toString.call(val)) {
  // String or Array
  case '[object String]':
  case '[object Array]':
    return !val.length

    // Map or Set or File
  case '[object File]':
  case '[object Map]':
  case '[object Set]': {
    return !val.size
  }
  // Plain Object
  case '[object Object]': {
    return !Object.keys(val).length
  }
  }

  return false
}

// coerce truthy value to array
export const coerceTruthyValueToArray = function (val) {
  if (Array.isArray(val)) {
    return val
  } else if (val) {
    return [val]
  } else {
    return []
  }
}

export const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true
  if (!(a instanceof Array)) return false
  if (!(b instanceof Array)) return false
  if (a.length !== b.length) return false
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const arrayFindIndex = function (arr, pred) {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i
    }
  }
  return -1
}

export function merge(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

export const generateId = function () {
  return Math.floor(Math.random() * 10000)
}

function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key]
  }
  return to
}

export function toObject(arr) {
  var res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

export {
  noop,
  clonedeep,
  getValueByPath,
  getPropByPath,
  debounce
}