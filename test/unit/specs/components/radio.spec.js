import Vue from 'vue'
import Radio from '@/components/radio'

describe('Radio', () => {
  it('use', () => {
    Vue.use(Radio)
    expect(Vue.component(Radio.name))
      .to.be.a('function')
  })
})