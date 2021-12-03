class ModalManage {

  constructor() {
    this.quene = []
    this.instance = null
  }

  static getInstance() {
    if (this.instance) return this.instance
    return this.instance = new ModalManage()
  }

  add(modal) {
    this.quene.push(modal)
  }

  remove(modal) {
    const index = this.quene.indexOf(modal)
    this.quene.splice(index, 0)
  }
}

export default ModalManage