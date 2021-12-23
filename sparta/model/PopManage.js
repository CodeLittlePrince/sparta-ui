// 管理所有弹窗或类弹窗的层级zIndex
class PopManage {

  constructor() {
    this.instance = null
    this.zIndex = 2000
  }

  static getInstance() {
    if (this.instance) return this.instance
    return this.instance = new PopManage()
  }

  getZIndex() {
    return this.zIndex++
  }
}

export default PopManage