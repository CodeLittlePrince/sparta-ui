import { mount } from '@vue/test-utils'
import format from 'sparta/common/js/utils/format'
import { transitionStub, bootstrap } from '../../../../util'
import sinon from 'sinon'
const handleDateChange = sinon.spy()

bootstrap()

describe('date-picker', () => {
  const wrapper = mount({
    data() {
      return {
        time1: new Date('2019/02/11').getTime(),
        defaultTime: '12:00:00',
        disabled: false,
        showTime: false,
        currentDate: Date.now(),
        valueFormat: undefined,
        disabledHour: [10, 23],
        disabledMinute: [20, 30],
        disabledSecond: [55, 56],
      }
    },
    methods: {
      handleDateChange,
      
      disabledDate(date) {
        return date.getTime() > this.currentDate
      },
      disabledDateTime() {
        const disabledHour = this.disabledHour
        const disabledMinute = this.disabledMinute
        const disabledSecond = this.disabledSecond
        return {
          disabledHour: () => disabledHour, // 0-23
          disabledMinute: () => disabledMinute, // 0-59
          disabledSecond: () => disabledSecond // 0-59
        }
      },
    },
    template: `
    <div>
      <sp-button class="test-datepikcer-date-button">测试datepicker</sp-button>
      <sp-date-picker
        ref="wrapper"
        v-model="time1"
        :default-time="defaultTime"
        :disabled-date="disabledDate"
        :disabled="disabled"
        :show-time="showTime"
        :disabled-time="disabledDateTime"
        :value-format="valueFormat"
        clearable
        @change="handleDateChange"
        class="data-picker-1"
      />
    </div>`,
  }, {
    attachTo: document.body,
    stubs: {
      transition: transitionStub,
    }
  })
  describe('prop: type = date', () => {

    describe('基础用法', () => {
      it('应存在日期选择组件', () => {
        expect(wrapper.find('.data-picker-1').isVisible()).to.be.true
      })

      describe('prop: default-time', () => {
        describe('未设置默认时间defatul-time', () => {
          it('应展示2019-02-11日期', () => {
            expect(wrapper.find('.sp-input__inner').element.value).to.equal('2019-02-11')
          })
          it('绑定值的时分秒应为00:00:00', () => {
            expect(wrapper.vm.time1).to.equal(+new Date(new Date('2019/02/11')).setHours(0, 0, 0, 0))
          })
        })
        describe('设置默认时间defatul-time为12:00:00', () => {
          it('绑定值的时分秒应为12:00:00', async () => {
            await wrapper.setData({ defaultTime: '12:00:00' })
            await wrapper.find('.sp-input__inner').setValue('2019-02-12')
            expect(wrapper.vm.time1).to.equal(+new Date(new Date('2019/02/12')).setHours(12, 0, 0, 0))
          })
        })
      })

      describe('event: change', () => {
        it('选择日期后，应派发change事件', async () => {
          await wrapper.setData({ defaultTime: '00:00:00' })
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-date-picker-pane-day__date').trigger('click')
          expect(wrapper.find('.sp-input__inner').element.value).to.equal('2019-01-28')
          expect(handleDateChange.calledWith(format.modifyDate('2019-01-28 00:00:00').getTime())).to.be.true
        })
        it('更改输入框内的值，应派发change事件', async () => {
          await wrapper.find('.sp-input__inner').setValue('2019-02-27')
          expect(handleDateChange.calledWith(format.modifyDate('2019-02-27 00:00:00').getTime())).to.be.true
        })
        it('删除输入框内的值，应派发change事件', async () => {
          await wrapper.find('.sp-input__inner').setValue('')
          await wrapper.find('.test-datepikcer-date-button').trigger('click')
          wrapper.vm.$refs.wrapper.handleInputBlur() // input blur 事件不触发
          expect(handleDateChange.calledWith('')).to.be.true
        })
        it('输入非法日期，不应派发change事件', async () => {
          await wrapper.find('.sp-input__inner').setValue('aaa')
          await wrapper.find('.test-datepikcer-date-button').trigger('click')
          wrapper.vm.$refs.wrapper.handleInputBlur() // input blur 事件不触发
          expect(handleDateChange.calledWith('aaa')).to.be.false
        })
      })
    })

    describe('不可选择的日期', () => {
      describe('prop: disabled-date', () => {
        describe('设置disabled-date为不能大于当前日期', () => {
          it('大于当前日期的元素，应展示禁止选择的样式', async () => {
            await wrapper.find('.sp-date-picker-content').trigger('click')
            expect(wrapper.find('.sp-date-picker-pane-day__cell.is--disabled .sp-date-picker-pane-day__date').text()).to.equal((new Date(new Date().getTime() + 3600 * 24 * 1000).getDate()).toString())
          })
        })
      })
      describe('event: change', () => {
        it('点击不可选日期，不应派发change事件', async () => {
          const callCount = handleDateChange.callCount
          await wrapper.find('.sp-date-picker-pane-day__cell.is--disabled .sp-date-picker-pane-day__date').trigger('click')
          expect(handleDateChange.callCount).to.equal(callCount)
        })
        it('输入不可选的日期，不应派发change事件', async () => {
          const callCount = handleDateChange.callCount
          const year = new Date().getFullYear() + 1
          const month = new Date().getMonth() + 1
          const date = new Date().getDate()
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-input__inner').setValue(`${year}-${month}-${date}`)
          await wrapper.find('.test-datepikcer-date-button').trigger('click')
          wrapper.vm.$refs.wrapper.handleInputBlur() // input blur 事件不触发
          expect(handleDateChange.callCount).to.equal(callCount)
        })
      })
    })

    describe('显示时分秒', () => {
      describe('prop: show-time', () => {
        it('选择日期面板，应该展示选择时间相关操作按钮', async () => {
          await wrapper.setData({ showTime: true, defaultTime: undefined, currentDate: undefined })
          await wrapper.find('.sp-date-picker-content').trigger('click')
          expect(wrapper.find('.sp-date-picker__foot').exists()).to.be.true
        })
      })
      describe('event: change', () => {
        it('点击此刻按钮，应该派发change事件', async () => {
          await wrapper.setData({
            disabledHour: [],
            disabledMinute: [],
            disabledSecond: [],
          })
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-date-picker__current-time').trigger('click')
          await wrapper.vm.$nextTick()
          const currentTime = wrapper.find('.sp-input__inner').element.value
          await wrapper.vm.$nextTick()
          expect(handleDateChange.calledWith(format.modifyDate(currentTime).getTime())).to.be.true
        })
        it('删除输入框内的值，应派发change事件', async () => {
          await wrapper.find('.sp-input__inner').setValue('')
          await wrapper.find('.test-datepikcer-date-button').trigger('click')
          wrapper.vm.$refs.wrapper.handleInputBlur() // input blur 事件不触发
          expect(handleDateChange.calledWith('')).to.be.true
        })
        it('选择日期后，点击确定按钮，应该派发change事件', async () => {
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-date-picker-pane-day__cell.is--today').trigger('click')
          await wrapper.find('.sp-date-picker__foot .sp-date-picker__select').trigger('click')
          const currentTime = wrapper.find('.sp-input__inner').element.value
          expect(handleDateChange.calledWith(format.modifyDate(currentTime).getTime())).to.be.true
        })
        it('更改输入框内的值，应派发change事件', async () => {
          await wrapper.find('.sp-input__inner').setValue('2019-02-27 00:00:00')
          expect(handleDateChange.calledWith(format.modifyDate('2019-02-27 00:00:00').getTime())).to.be.true
        })
        it('输入非法日期，不应派发change事件', async () => {
          await wrapper.find('.sp-input__inner').setValue('aaa')
          await wrapper.find('.test-datepikcer-date-button').trigger('click')
          wrapper.vm.$refs.wrapper.handleInputBlur() // input blur 事件不触发
          expect(handleDateChange.calledWith('aaa')).to.be.false
          await wrapper.vm.$nextTick()
          expect(wrapper.find('.sp-input__inner').element.value).to.equal('2019-02-27 00:00:00')
        })
      })

      describe('interact', () => {
        it('点击选择时间按钮，应该展示时间选择面板', async () => {
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-date-picker__select-time-btn').trigger('click')
          expect(wrapper.find('.sp-time-picker').isVisible()).to.be.true
        })
        it('选择时间后，input输入框内的值应该一起更新', async () => {
          await wrapper.findAll('.sp-time-picker-option').at(1).trigger('click') // 1点
          await wrapper.find('.sp-date-picker__select').trigger('click') // 确定
          expect(wrapper.find('.sp-input__inner').element.value).to.equal('2019-02-27 01:00:00')
        })
        it('点击选择日期按钮，应该隐藏时间选择面板', async () => {
          await wrapper.find('.sp-date-picker__select-date-btn').trigger('click')
          expect(wrapper.find('.sp-time-picker').isVisible()).to.be.false
        })
      })
    })

    describe('禁用时分秒', () => {
      describe('prop: disabled-time', () => {
        it('禁用的时间，应该展示禁用的样式', async () => {
          await wrapper.setData({
            disabledHour: [10, 23],
            disabledMinute: [20, 30],
            disabledSecond: [55, 56],
          })
          await wrapper.find('.sp-date-picker__select-time-btn').trigger('click')
          expect(wrapper.find('.sp-time-picker-option.is-disabled').text()).to.equal('10')
        })
      })

      describe('event: change', () => {
        it('输入禁用的时间，不应派发change时间', async () => {
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-input__inner').setValue('2019-02-27 10:00:00')
          await wrapper.find('.test-datepikcer-date-button').trigger('click')
          wrapper.vm.$refs.wrapper.handleInputBlur() // input blur 事件不触发
          await wrapper.vm.$nextTick()
          expect(wrapper.find('.sp-input__inner').element.value).to.equal('2019-02-27 01:00:00')
        })
      })

      describe('interact', () => {
        it('点击被禁用的时间时，input输入框内的值不应该一起更新', async () => {
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-time-picker-option.is-disabled').trigger('click')
          expect(wrapper.find('.sp-input__inner').element.value).to.equal('2019-02-27 01:00:00')
        })
      })
    })

    describe('prop: value-format = yyyy-MM-dd hh:mm:ss', () => {
      it('设置valueFormat后，绑定的值应为valueFormat的格式', async () => {
        await wrapper.setData({ valueFormat: 'yyyy-MM-dd hh:mm:ss' })
        await wrapper.find('.sp-date-picker-content').trigger('click')
        await wrapper.find('.sp-input__inner').setValue('2019-02-27 02:00:00')
        expect(wrapper.find('.sp-input__inner').element.value).to.equal('2019-02-27 02:00:00')
        expect(handleDateChange.calledWith('2019-02-27 02:00:00')).to.be.true
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

