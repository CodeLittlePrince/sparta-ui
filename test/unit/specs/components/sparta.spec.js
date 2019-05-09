import Vue from 'vue'
import Sparta from '@/'

describe('Sparta', () => {
  it('use', () => {
    Vue.use(Sparta)
    expect(Vue.component(Sparta.EvButton))
      .to.be.a('function')
  })
})