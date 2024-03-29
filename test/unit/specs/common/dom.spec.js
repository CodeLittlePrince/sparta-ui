import dom from 'sparta/common/js/utils/dom'

describe('dom', () => {
  it('getElementCoords', () => {
    const ele = document.createElement('div')
    expect(dom.getElementCoords(ele).top)
      .to.equal(0)
    expect(dom.getElementCoords(ele).left)
      .to.equal(0)
  })
})