import { mount } from '@vue/test-utils'
import { bootstrap } from '../../../util'

bootstrap('abroad')

describe('Radio', () => {
  const wrapper = mount({
    data() {
      return {
        value: '',
        size: 'default'
      }
    },
    template: `
    <sp-radio-group
      v-model="value"
    >
      <sp-radio :size="size" label="apple">苹果</sp-radio>
      <sp-radio :size="size" label="banana">香蕉</sp-radio>
      <sp-radio :size="size" label="pear">梨</sp-radio>
    </sp-radio-group>
    `,
  })
  document.body.appendChild(wrapper.vm.$el)
  let radios = null

  describe('props', () => {
    it('size small', async () => {
      radios = await wrapper.findAll('.sp-radio__wrap')
      await wrapper.setData({ size: 'small' })
      expect(radios.wrappers[0].find('.sp-radio--small').exists()).to.be.true
    })
  })
})