import { mount } from '@vue/test-utils'
import FormItem from 'sparta/components/abroad/form-item'
import Form from 'base/form'
import Input from 'base/input'

describe('FormItem', () => {
  const wrapper = mount({
    components: {
      'sp-form-item': FormItem,
      'sp-form': Form,
      'sp-input': Input
    },
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
   });
})