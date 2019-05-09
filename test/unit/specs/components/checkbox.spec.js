import Vue from 'vue'
import Checkbox from '@/components/checkbox'

describe('Checkbox', () => {
  it('use', () => {
    Vue.use(Checkbox)
    expect(Vue.component(Checkbox.name))
      .to.be.a('function')
  })
})