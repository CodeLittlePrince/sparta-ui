const newArray = function(start, end) {
  let result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

const getRangeHours = function(ranges) {
  const hours = []
  let disabledHours = [];

  (ranges || []).forEach(range => {
    const value = range.map(date => date.getHours())

    disabledHours = disabledHours.concat(newArray(value[0], value[1]))
  })

  if (disabledHours.length) {
    for (let i = 0; i < 24; i++) {
      hours[i] = disabledHours.indexOf(i) === -1
    }
  } else {
    for (let i = 0; i < 24; i++) {
      hours[i] = false
    }
  }

  return hours
}

function setRangeData(arr, start, end, value) {
  for (let i = start; i < end; i++) {
    arr[i] = value
  }
}

const getRangeMinutes = function(ranges, hour) {
  const minutes = new Array(60)

  if (ranges.length > 0) {
    ranges.forEach(range => {
      const start = range[0]
      const end = range[1]
      const startHour = start.getHours()
      const startMinute = start.getMinutes()
      const endHour = end.getHours()
      const endMinute = end.getMinutes()
      if (startHour === hour && endHour !== hour) {
        setRangeData(minutes, startMinute, 60, true)
      } else if (startHour === hour && endHour === hour) {
        setRangeData(minutes, startMinute, endMinute + 1, true)
      } else if (startHour !== hour && endHour === hour) {
        setRangeData(minutes, 0, endMinute + 1, true)
      } else if (startHour < hour && endHour > hour) {
        setRangeData(minutes, 0, 60, true)
      }
    })
  } else {
    setRangeData(minutes, 0, 60, true)
  }
  return minutes
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

export default {
  getRangeHours,
  getRangeMinutes,
  formatNumberTo2digits
}