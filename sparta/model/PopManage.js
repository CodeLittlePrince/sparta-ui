// 管理所有弹窗或类弹窗的层级zIndex
class PopManage {
  static id = 0
  static popInstances = {}
  static zIndex = 2000
  constructor() {
    PopManage.id ++
    this.id = PopManage.id
    PopManage.zIndex += this.id
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
    PopManage.zIndex ++
  }
  nextZIndex() {
    return PopManage.zIndex + 1
  }
}

export default PopManage