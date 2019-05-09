import Vue from 'vue'
import OptionGroup from '@/components/option-group'

describe('OptionGroup', () => {
  it('use', () => {
    Vue.use(OptionGroup)
    expect(Vue.component(OptionGroup.name))
      .to.be.a('function')
  })
})