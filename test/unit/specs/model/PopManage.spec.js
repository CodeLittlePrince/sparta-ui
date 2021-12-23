import PopManage from 'sparta/model/PopManage'

const pm = PopManage.getInstance()

describe('PopManage', () => {
  it('getInstances', () => {
    expect(pm.getInstances())
      .to.be.an('object')
  })
  it('getZIndex', () => {
    expect(pm.getZIndex())
      .to.equal(2000)
  })
})