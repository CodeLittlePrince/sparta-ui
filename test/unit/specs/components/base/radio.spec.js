import { mount } from '@vue/test-utils'
import { bootstrap } from '../../../util'

bootstrap()

describe('Radio', () => {
  const wrapper = mount({
    data() {
      return {
        value: '',
        disabledBanana: false,
        clickResult: '',
        changeResult: '',
      }
    },
    template: `
    <sp-radio-group
      v-model="value"
      @change="handleChange"
    >
      <sp-radio label="apple">苹果</sp-radio>
      <sp-radio label="banana" :disabled="disabledBanana" @click="handleClick">香蕉</sp-radio>
      <sp-radio label="pear">梨</sp-radio>
    </sp-radio-group>
    `,
    methods: {
      handleClick(val) {
        this.clickResult = val
      },
      handleChange(val) {
        this.changeResult = val
      },
    }
  })
  document.body.appendChild(wrapper.vm.$el)
  let radios = null

  describe('props', () => {
    it('disabled--false', async () => {
      radios = await wrapper.findAll('.sp-radio')
      await radios.wrappers[0].trigger('click')
      expect(wrapper.vm.value).to.be.equal('apple')
    })

    it('disabled--ture', async () => {
      await wrapper.setData({ disabledBanana: true })
      await radios.wrappers[1].trigger('click')
      expect(wrapper.vm.value).to.be.equal('apple')
    })
  })

  describe('events', () => {
    it('click', async () => {
      await radios.wrappers[2].trigger('click')
      expect(wrapper.vm.clickResult).to.be.equal('apple')
      expect(wrapper.vm.value).to.be.equal('pear')
      await radios.wrappers[1].trigger('click')
      expect(wrapper.vm.clickResult).to.be.equal('pear')
      expect(wrapper.vm.value).to.be.equal('pear')
    })

    it('change', async () => {
      await radios.wrappers[0].trigger('click')
      expect(wrapper.vm.changeResult).to.be.equal('apple')
      expect(wrapper.vm.value).to.be.equal('apple')
    })
  })
})