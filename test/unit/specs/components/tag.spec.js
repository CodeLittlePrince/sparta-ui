import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Tag from '@/components/tag'

describe('Tag', () => {

  it('use', () => {
    Vue.use(Tag)
    expect(Vue.component(Tag.name))
      .to.be.a('function')
  })
  it('delete one tag', () => {
    const wrapper = mount(Tag, {
      propsData: {
        closable: true
      }
    })
    wrapper.vm.$emit('close')
    wrapper.find('.ev-icon-close').trigger('click')
    // wrapper.emitted() => Object{close: [[], [...]]}
    expect(wrapper.emitted().close).to.exist
  })
})