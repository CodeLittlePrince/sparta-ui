import ModalManage from 'sparta/model/ModalManage'

class Cat {
  constructor(name) {
    this.name = name
  }
}

describe('ModalManage', () => {
  const kitty = new Cat('kitty')
  const tom = new Cat('tom')
  const instance = ModalManage.getInstance()

  it('add kitty', () => {
    instance.add(kitty)

    expect(instance.quene.length).to.equal(1)
  })

  it('add tom', () => {
    instance.add(tom)

    expect(instance.quene.length).to.equal(2)
  })

  it('remove kitty', () => {
    instance.remove(kitty)

    expect(instance.quene.length).to.equal(1)
    expect(instance.quene[0]).to.equal(tom)
  })
})