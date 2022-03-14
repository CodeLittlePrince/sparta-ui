import { mount } from '@vue/test-utils'
import Datepikcer from 'sparta/components/date-picker'
import format from 'sparta/common/js/utils/format'
import { transitionStub } from '../../../util';
import sinon from 'sinon'
const handleDateChange = sinon.spy()

describe('date-picker', () => {
  const wrapper = mount({
    data() {
      return {
        month: new Date('2019/02/11').getTime(),
        disabled: false,
        currentDate: Date.now(),
        valueFormat: undefined
      }
    },
    methods: {
      handleDateChange,
      disabledDate(date) {
        return date.getTime() > this.currentDate
      },
    },
    template: `
    <div>
      <sp-button class="test-datepikcer-month-button">测试datepicker 月份</sp-button>
      <sp-date-picker
      ref="wrapper"
      type="month"
      v-model="month"
      :disabled-date="disabledDate"
      :disabled="disabled"
      :value-format="valueFormat"
      clearable
      @change="handleDateChange"
      class="data-picker-3"  />
    </div>`,
    components: {
      'sp-date-picker': Datepikcer,
    }
  }, {
    attachTo: document.body,
    stubs: {
      transition: transitionStub,
    }
  })
  describe('prop: type = month', () => {

    describe('基础用法', () => {
      it('应存在月份选择组件', () => {
        expect(wrapper.find('.data-picker-3').isVisible()).to.be.true
      })

      describe('event: change', () => {
        it('选择月份后，应派发change事件', async () => {
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-date-picker-pane-month__cell').trigger('click')
          expect(wrapper.find('.sp-input__inner').element.value).to.equal('2019-01')
          expect(handleDateChange.calledWith(format.modifyDate('2019-01').getTime())).to.be.true
        })
        it('更改输入框内的值，应派发change事件', async () => {
          await wrapper.find('.sp-input__inner').setValue('2019-02')
          expect(handleDateChange.calledWith(format.modifyDate('2019-02').getTime())).to.be.true
        })
        it('删除输入框内的值，应派发change事件', async () => {
          await wrapper.find('.sp-input__inner').setValue('')
          await wrapper.find('.test-datepikcer-month-button').trigger('click')
          wrapper.vm.$refs.wrapper.handleInputBlur() // input blur 事件不触发
          expect(handleDateChange.calledWith('')).to.be.true
        })
        it('输入非法日期，不应派发change事件', async () => {
          await wrapper.find('.sp-input__inner').setValue('aaa')
          await wrapper.find('.test-datepikcer-month-button').trigger('click')
          wrapper.vm.$refs.wrapper.handleInputBlur() // input blur 事件不触发
          expect(handleDateChange.calledWith('aaa')).to.be.false
        })
      })
    })

    describe('不可选择的日期', () => {
      describe('prop: disabled-date', () => {
        describe('设置disabled-date为不能大于当前日期', () => {
          it('大于当前月份的元素，应展示禁止选择的样式', async () => {
            await wrapper.find('.sp-date-picker-content').trigger('click')
            await wrapper.find('.sp-icon-arrow-double-right').trigger('click') // 下一年
            expect(wrapper.find('.sp-date-picker-pane-month__cell.is--disabled .sp-date-picker-pane-month__date').text()).to.equal('1月')
          })
        })
      })
      describe('event: change', () => {
        it('点击不可选月份，不应派发change事件', async () => {
          const callCount = handleDateChange.callCount
          await wrapper.find('.sp-date-picker-pane-month__cell.is--disabled').trigger('click')
          expect(handleDateChange.callCount).to.equal(callCount)
        })
        it('输入不可选的年份，不应派发change事件', async () => {
          const callCount = handleDateChange.callCount
          const year = new Date().getFullYear() + 1
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-input__inner').setValue(`${year}-01`)
          await wrapper.find('.test-datepikcer-month-button').trigger('click')
          wrapper.vm.$refs.wrapper.handleInputBlur() // input blur 事件不触发
          expect(handleDateChange.callCount).to.equal(callCount)
        })
      })
    })

    describe('prop: value-format = yyyy-MM', () => {
      it('设置valueFormat后，绑定的值应为valueFormat的格式', async () => {
        await wrapper.setData({ valueFormat: 'yyyy-MM' })
        await wrapper.find('.sp-date-picker-content').trigger('click')
        await wrapper.find('.sp-input__inner').setValue('2019-01')
        expect(wrapper.find('.sp-input__inner').element.value).to.equal('2019-01')
        expect(handleDateChange.calledWith('2019-01')).to.be.true
      })
    })

    describe('禁用', () => {
      describe('prop: disabled', () => {
        it('日期组件，应该展示禁用的样式', async () => {
          await wrapper.setData({ disabled: true })
          expect(wrapper.find('.sp-date-picker').classes('is--disabled')).to.be.true
        })
      })
    })
  })
})

