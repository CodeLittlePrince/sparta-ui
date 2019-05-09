import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Button from '@/components/button'

describe('Button', () => {

  it('use', () => {
    Vue.use(Button)
    expect(Vue.component(Button.name))
      .to.be.a('function')
  })

  it('render', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes('ev-button')).to.equal(true)
  })

  it('type', () => {
    const wrapper = mount(Button, {
      propsData: {
        type: 'primary'
      }
    })
    expect(wrapper.classes('ev-button--primary')).to.equal(true)
  })

  it('click', () => {
    const wrapper = mount(Button)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.text).to.equal('clicked')
  })
})