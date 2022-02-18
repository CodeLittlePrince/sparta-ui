import PopManage from 'sparta/model/PopManage'

describe('PopManage', () => {
  const instance = PopManage.getInstance()
  const zIndex = instance.getZIndex()

  it('getZIndex', () => {
    expect(instance.getZIndex())
    .to.equal(zIndex + 1)
  })

  it('getZIndex again', () => {
    expect(instance.getZIndex())
      .to.equal(zIndex + 2)
  })
})