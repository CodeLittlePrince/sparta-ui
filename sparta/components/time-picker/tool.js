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

export default {
  formatNumberTo2digits
}