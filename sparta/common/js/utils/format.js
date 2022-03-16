/**
 * 格式化时间
 * 例子：
 * 1561022826640 => 2019-06-20
 * @param {time} number 数字
 */
const formatDate = function (date, fmt = 'yyyy-MM-dd') {
  if (date === null || date === 'null') {
    return '--'
  }
  date = new Date(Number(date))
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length)
      )
  }
  return fmt
}

/**
 * 把1位数转为2位数
 * 例子：
 * 1 => 01
 * 10 => 10
 * @param {time} number 数字
 */
const formatNumberTo2digits = function(number) {
  let rst = number.toString()
  const len = rst.length
  if (len < 2) {
    rst = '0' + rst
  }
  return rst
}

/**
 * 将日期格式转换为各个浏览器都兼容的格式
 * 例子
 * 2021-11-02 00:00:00 => 2021/11/02T00:00:00
 */
const modifyDate = function modifyDate(date) {
  if (typeof date === 'string') {
    return isNaN(Date.parse(date)) ? new Date(date.replace(/-/g, '/')) : new Date(date)
  }
  return date
}

export default {
  formatDate,
  formatNumberTo2digits,
  modifyDate
}