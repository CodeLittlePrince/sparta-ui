import { mount } from '@vue/test-utils'
import Button from 'base/button'

describe('Button', () => {
  const clickSpy = sinon.spy()

  const wrapper = mount({
    data() {
      return {
        type: 'default',
        loading: false,
        plain: false,
        disabled: false,
      }
    },
    template: `
      <sp-button
        :type="type"
        :loading="loading"
        :plain="plain"
        :disabled="disabled"
        @click="handleClick"
      >click</sp-button>
    `,
    components: {
      'sp-button': Button,
    },
    methods: {
      handleClick: clickSpy
    }
  })
  document.body.appendChild(wrapper.vm.$el)
  let button = null

  describe('props', () => {
    it('type--default', async () => {
      button = await wrapper.find('.sp-button')
      expect(button.element.matches('.sp-button--default')).to.be.true
    });
    it('type--danger', async () => {
      await wrapper.setData({ type: 'danger' })
      expect(button.element.matches('.sp-button--danger')).to.be.true
    });
    it('type--text', async () => {
      await wrapper.setData({ type: 'text' })
      expect(button.element.matches('.sp-button--text')).to.be.true
    });
    it('type--primary', async () => {
      await wrapper.setData({ type: 'primary' })
      expect(button.element.matches('.sp-button--primary')).to.be.true
    });
    it('plain', async () => {
      await wrapper.setData({ plain: true })
      expect(button.element.matches('.is--plain')).to.be.true
      await wrapper.setData({ plain: false })
    });
    it('loading', async () => {
      await wrapper.setData({ loading: true })
      expect(wrapper.find('.sp-icon-loading').isVisible()).to.be.true
      await button.trigger('click')
      expect(clickSpy.notCalled).to.be.true
      await wrapper.setData({ loading: false })
      await button.trigger('click')
      expect(clickSpy.callCount).to.be.equal(1)
    });
    it('disabled', async () => {
      await wrapper.setData({ disabled: true })
      expect(button.element.matches('.is--disabled')).to.be.true
      await button.trigger('click')
      expect(clickSpy.callCount).to.be.equal(1)
      await wrapper.setData({ disabled: false })
      await button.trigger('click')
      expect(clickSpy.callCount).to.be.equal(2)
    });
  })

  // props已经验证过，这里只作为规范demo先写在这里
  // describe('events', () => {
  //   it('click', async () => {
  //     await wrapper.setData({ type: 'primary' })
  //     await button.trigger('click')
  //     expect(clickSpy.callCount).to.be.equal(1)
  //   });
  // })
})