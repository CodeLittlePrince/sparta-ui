import { mount } from '@vue/test-utils'
import { bootstrap } from '../../../util'

bootstrap('abroad')

const getTestData = function() {
  return [
    { id: 1, name: 'cat', disabled: false, icon: 'sp-icon-file' },
    { id: 2, name: 'dog', disabled: false, icon: 'sp-icon-check' },
    { id: 3, name: 'pig', disabled: false, icon:'sp-icon-search'},
    { id: 4, name: 'tiger', disabled: false, icon: 'sp-icon-file' },
    { id: 5, name: 'elephant', disabled: false, icon: 'sp-icon-check' }
  ]
}

describe('Select', () => {

  describe('single', () => {
    const wrapper = mount({
      data() {
        return {
          val: '',
          optionsData: getTestData(),
          size: 'default'
        }
      },
      template: `
      <div>
        <sp-button class="sp-select-other-button">测试single</sp-button>
        <sp-select 
          ref="select"
          :size="size"
          v-model="val"
        >
          <sp-option 
            v-for="(item, index) in optionsData"
            :key="index+'a'"
            :label="item.name"
            :value="item.id" 
            :disabled="item.disabled"
          ></sp-option>
        </sp-select>
      </div>
      `,
    })
    document.body.appendChild(wrapper.vm.$el)

    it('size small', async () => {
      debugger
      await wrapper.setData({ size: 'small' })
      expect(wrapper.find('.sp-select.sp-select--small').exists()).to.be.true
    })
  })
})
