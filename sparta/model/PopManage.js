import Vue from 'vue'

// 管理所有弹窗或类弹窗的层级zIndex
class PopManage {

  constructor() {
    this.instance = null
    this.zIndex = Vue.prototype.$SPARTA?.zIndex || 2000

    if (PopManage.lock) {
      return new Error('Cannot use new keyword to construct, please use PopManage.getInstance() instead.')
    } else {
      PopManage.lock = true
    }
  }

  static lock = true
  static getInstance() {
    if (this.instance) return this.instance

    PopManage.lock = false
    return this.instance = new PopManage()
  }

  getZIndex() {
    return this.zIndex++
  }
}

export default PopManage