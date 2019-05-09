import PopManage from '@/model/PopManage'

const pm = new PopManage()

describe('PopManage', () => {
  it('constructor', () => {
    expect(pm)
      .to.be.an('object')
  })
  it('getId', () => {
    expect(pm.getId())
      .to.equal(1)
  })
  it('getZIndex', () => {
    expect(pm.getZIndex())
      .to.equal(2001)
  })
  it('getInstances', () => {
    expect(pm.getInstances())
      .to.be.an('object')
  })
  it('register', () => {
    pm.register('kitty')
    expect(pm.getInstances()[1])
      .to.equal('kitty')
  })
  it('deregister', () => {
    pm.deregister()
    expect(pm.getInstances())
      .to.be.empty
  })
  it('nextZIndex', () => {
    expect(pm.nextZIndex())
      .to.equal(2002)
  })
})