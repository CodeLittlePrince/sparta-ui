import Vue from 'vue'
import Input from '@/components/input'

describe('Input', () => {
  it('use', () => {
    Vue.use(Input)
    expect(Vue.component(Input.name))
      .to.be.a('function')
  })
})