// 管理所有弹窗或类弹窗的层级zIndex
class PopManage {
  static id = 0
  static popInstances = {}
  constructor(zIndex) {
    PopManage.id ++
    this.id = PopManage.id
    this.zIndex = zIndex || 2000 + this.id
  }
  getId() {
    return this.id
  }
  getZIndex() {
    return this.zIndex
  }
  getInstances() {
    return PopManage.popInstances
  }
  register(instance) {
    instance && (PopManage.popInstances[this.id] = instance)
  }
  deregister() {
    PopManage.id --
    delete PopManage.popInstances[this.id]
  }
  zIndexIncrease() {
    PopManage.id ++
    this.zIndex ++
  }
  nextZIndex() {
    return this.zIndex + 1
  }
}

export default PopManage