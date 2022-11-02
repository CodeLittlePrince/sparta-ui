import { mount } from '@vue/test-utils'
import { bootstrap } from '../../../util'

bootstrap()

describe('PopupTip', () => {
  const wrapper = mount({
    data() {
      return {
        width: '200',
        color: '#747d8c',
        hasBorder: false,
        theme: 'white',
        placement: 'top'
      }
    },
    template: `
    <sp-popup-tip
      :width="width" 
      :color="color"
      :has-border="hasBorder"
      :theme="theme"
      :placement="placement"
    >
      <i class="sp-icon-ques"></i>
      <template slot="popup">
        我是做好事不留名的红领巾我是做好事不留名的红领巾我是做好事不留名的红领巾我是做好事不留名的红领巾
      </template>
    </sp-popup-tip>
    `,
  })
  document.body.appendChild(wrapper.vm.$el)

  describe('props', () => {
    it('render', async() => {
      await wrapper.find('.sp-popup-tip').trigger('mouseover')
      expect(wrapper.find('.sp-popup-tip__wrap').exists()).to.be.true
    })

    it('width', async() => {
      expect(wrapper.find('.sp-popup-tip__wrap').element.style.width).to.be.equal('200px')
    })

    it('color', async() => {
      expect(wrapper.find('.sp-popup-tip__wrap').element.style.color).to.be.equal('rgb(116, 125, 140)')
      await wrapper.setData({ color: '#000' })
      expect(wrapper.find('.sp-popup-tip__wrap').element.style.color).to.be.equal('rgb(0, 0, 0)')
    })

    it('hasBorder', async() => {
      expect(wrapper.find('.sp-popup-tip__wrap.has--border').exists()).to.be.false
      await wrapper.setData({ hasBorder: true })
      expect(wrapper.find('.sp-popup-tip__wrap.has--border').exists()).to.be.true
    })

    it('theme', async() => {
      await wrapper.setData({ theme: 'blue' })
      expect(wrapper.find('.sp-popup-tip.is--theme-blue').exists()).to.be.true

      await wrapper.setData({ theme: 'red' })
      expect(wrapper.find('.sp-popup-tip.is--theme-red').exists()).to.be.true
    })
    it('placement', async() => {
      await wrapper.find('.sp-popup-tip').trigger('mouseover')
      expect(wrapper.find('.sp-popup-tip__wrap.arrow--bottom').exists()).to.be.true
    })
  })
  after(() => {
    document.body.removeChild(wrapper.vm.$el)
  })
})