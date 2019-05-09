import Vue from 'vue'
import Option from '@/components/option'

describe('Option', () => {
  it('use', () => {
    Vue.use(Option)
    expect(Vue.component(Option.name))
      .to.be.a('function')
  })
})