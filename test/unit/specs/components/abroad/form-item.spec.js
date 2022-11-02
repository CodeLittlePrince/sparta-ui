import { mount } from '@vue/test-utils'
import { bootstrap } from '../../../util'

bootstrap('abroad')

describe('FormItem', () => {
  const wrapper = mount({
    data() {
      return {
        required: false
      }
    },
    template: `
      <sp-form>
        <sp-form-item
          label="label"
          :required="required">
          <sp-input></sp-input>
        </sp-form-item>
      </sp-form>
    `
  })
  document.body.appendChild(wrapper.vm.$el)
  it('required', async () => {
    expect(wrapper.find('.sp-form-item__label-required').exists()).to.be.false
    await wrapper.setData({ required: true })
    expect(wrapper.find('.sp-form-item__label-required').exists()).to.be.true
  })
})