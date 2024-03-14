import PopManage from 'sparta/model/PopManage'

describe('PopManage', () => {
  const instance = PopManage.getInstance()

  it('getZIndex', () => {
    const zIndex = instance.getZIndex()
    expect(instance.getZIndex())
      .to.equal(zIndex + 1)
  })

  it('getZIndex again', () => {
    const zIndex = instance.getZIndex()
    instance.getZIndex()
    expect(instance.getZIndex())
      .to.equal(zIndex + 2)
  })
})