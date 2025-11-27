class PopLayerManage {

  constructor() {
    this.quene = []
    this.instance = null

    if (PopLayerManage.lock) {
      return new Error('Cannot use new keyword to construct, please use PopLayerManage.getInstance() instead.')
    } else {
      PopLayerManage.lock = true
    }
  }

  static lock = true
  static getInstance() {
    if (this.instance) return this.instance

    PopLayerManage.lock = false
    return this.instance = new PopLayerManage()
  }

  getQueue() {
    return this.quene
  }

  add(modal, type) {
    modal.popLayerType = type
    this.quene.push(modal)
  }

  remove(modal) {
    const index = this.quene.indexOf(modal)
    this.quene.splice(index, 1)
  }

  hideAll() {
    this.quene.forEach(item => {
      if (item.type === 'confirm') {
        item.close()
      } else {
        item.closeHandle()
      }
    })
  }
}

export default PopLayerManage