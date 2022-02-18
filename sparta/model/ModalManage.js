class ModalManage {

  constructor() {
    this.quene = []
    this.instance = null

    if (ModalManage.lock) {
      return new Error('Cannot use new keyword to construct, please use ModalManage.getInstance() instead.')
    } else {
      ModalManage.lock = true
    }
  }

  static lock = true
  static getInstance() {
    if (this.instance) return this.instance

    ModalManage.lock = false
    return this.instance = new ModalManage()
  }

  add(modal) {
    this.quene.push(modal)
  }

  remove(modal) {
    const index = this.quene.indexOf(modal)
    this.quene.splice(index, 1)
  }
}

export default ModalManage