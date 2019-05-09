/**
 * 获取指定的dom节点相对于body的top，left
 * @param {dom} elem dom元素
 * @returns 含top，和left的对象
 */
function getElementCoords(elem) {
  const box = elem.getBoundingClientRect()

  const body = document.body
  const docEl = document.documentElement

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  const clientTop = docEl.clientTop || body.clientTop || 0
  const clientLeft = docEl.clientLeft || body.clientLeft || 0

  const top  = box.top +  scrollTop - clientTop
  const left = box.left + scrollLeft - clientLeft

  return { top: Math.round(top), left: Math.round(left) }
}

export default {
  getElementCoords
}