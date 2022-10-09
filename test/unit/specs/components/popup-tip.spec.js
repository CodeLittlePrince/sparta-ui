import { mount, shallowMount } from '@vue/test-utils'
import PopupTip from 'base/popup-tip'
import { createTest, createVue, destroyVM } from '../../util';

describe('PopupTip', () => {
  const wrapper  = mount({
    data() {
      return {
        width: '200',
        color: '#747d8c',
        hasBorder: false,
        theme: 'white'
      }
    },
    template: `
    <sp-popup-tip
      :width="width" 
      :color="color"
      :has-border="hasBorder"
      :theme="theme"
    >
      <i class="sp-icon-ques"></i>
      <template slot="popup">
        我是做好事不留名的红领巾我是做好事不留名的红领巾我是做好事不留名的红领巾我是做好事不留名的红领巾
      </template>
    </sp-popup-tip>
    `,
    components: {
      'sp-popup-tip': PopupTip,
    }
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
    })
  })
  after(() => {
    document.body.removeChild(wrapper.vm.$el)
  })
})