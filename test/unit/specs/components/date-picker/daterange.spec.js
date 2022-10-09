import { mount, createWrapper } from '@vue/test-utils'
import Datepikcer from 'base/date-picker'
import format from 'sparta/common/js/utils/format'
import { sleep, transitionStub, triggerEvent } from '../../../util';
import sinon from 'sinon'
const handleDaterangeChange = sinon.spy()

describe('date-picker', () => {
  const wrapper = mount({
    data() {
      return {
        time: [new Date('2019/02/11').getTime(), new Date('2021/11/12').getTime()],
        defaultTime: undefined,
        disabled: false,
        showTime: false,
        valueFormat: undefined
      }
    },
    methods: {
      handleDaterangeChange,
      disabledDateRange(date) {
        return date.getTime() < new Date('2019/01/11').getTime() || date.getTime() > new Date('2021/12/12').getTime()
      },
      disabledRangeTime(type) {
        if (type === 'start') {
          return {
            disabledHour: () => [13, 16],
            disabledMinute: () => [20, 30],
            disabledSecond: () => [55, 56]
          }
        }
        return {
          disabledHour: () => [20, 22],
          disabledMinute: () => [30, 50],
          disabledSecond: () => [55, 56]
        }
      },
    },
    template: `
    <div>
      <sp-button class="test-datepikcer-daterange-button">测试datepicker 范围</sp-button>
      <sp-date-picker
      class="data-picker-2"
      v-model="time"
      type="daterange"
      :default-time="defaultTime"
      :disabled-date="disabledDateRange"
      :disabled-time="disabledRangeTime"
      :show-time="showTime"
      :disabled="disabled"
      :value-format="valueFormat"
      clearable
      @change="handleDaterangeChange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
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
  describe('prop: type = daterange', () => {
    describe('基础用法', () => {
      it('应存在日期选择组件', () => {
        expect(wrapper.find('.data-picker-2').isVisible()).to.be.true
      })

      describe('prop: default-time', () => {
        describe('未设置默认时间defatul-time', () => {
          it('应展示开始时间2019-02-11，结束时间2021-11-12', () => {
            expect(wrapper.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('2019-02-11')
            expect(wrapper.find('.sp-date-picker-range-end .sp-input__inner').element.value).to.equal('2021-11-12')
          })
          it('绑定值的时分秒，开始时间应为00:00:00，结束时间应为23:59:59', async () => {
            await wrapper.find('.sp-date-picker-range-start .sp-input__inner').setValue('2019-02-12')
            await wrapper.find('.test-datepikcer-daterange-button').trigger('click')
            expect(wrapper.vm.time).to.deep.equal([+new Date(new Date('2019/02/12')).setHours(0, 0, 0, 0), +new Date(new Date('2021/11/12')).setHours(23, 59, 59, 0)])
          })
        })
        describe('设置默认时间defatul-time为["12:00:00","12:00:00"]', () => {
          it('绑定值的时分秒，开始时间应为12:00:00，结束时间应为12:00:00', async () => {
            await wrapper.setData({ defaultTime: ["12:00:00", "12:00:00"] })
            await wrapper.find('.sp-date-picker-range-start .sp-input__inner').setValue('2019-02-11')
            await wrapper.find('.test-datepikcer-daterange-button').trigger('click')
            expect(wrapper.vm.time).to.deep.equal([+new Date(new Date('2019/02/11')).setHours(12, 0, 0, 0), +new Date(new Date('2021/11/12')).setHours(12, 0, 0, 0)])
          })
        })
      })

      describe('event: change', () => {
        it('选择完成 起 始 日期后，应派发change事件', async () => {
          await wrapper.setData({ defaultTime: ["00:00:00", "23:59:59"] })
          const start = wrapper.findAll('.sp-date-picker-range__pane').at(0)
          const end = wrapper.findAll('.sp-date-picker-range__pane').at(1)
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await start.find('.sp-date-picker-pane-day__date').trigger('click')
          await end.find('.sp-date-picker-pane-day__date').trigger('click')
          expect(wrapper.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('2019-01-28')
          expect(wrapper.find('.sp-date-picker-range-end .sp-input__inner').element.value).to.equal('2021-11-01')
          expect(handleDaterangeChange.calledWith(sinon.match.array.contains([format.modifyDate('2019-01-28 00:00:00').getTime(), format.modifyDate('2021-11-01 23:59:59').getTime()]))).to.be.true
        })
        it('更改输入框内的值，应派发change事件', async () => {
          await wrapper.find('.sp-date-picker-range-start .sp-input__inner').setValue('2019-02-27')
          expect(handleDaterangeChange.calledWith(sinon.match.array.contains([format.modifyDate('2019-02-27 00:00:00').getTime(), format.modifyDate('2021-11-01 23:59:59').getTime()]))).to.be.true
        })
        it('只删除结束日期输入框内的值，不应派发change事件', async () => {
          const { callCount } = handleDaterangeChange
          await wrapper.find('.sp-date-picker-range-end .sp-input__inner').setValue('')
          await wrapper.find('.test-datepikcer-daterange-button').trigger('click')
          expect(wrapper.find('.sp-date-picker-range-end .sp-input__inner').element.value).to.equal('2021-11-01')
          expect(handleDaterangeChange.callCount).to.equal(callCount)
        })
        it('输入非法日期，不应派发change事件', async () => {
          const { callCount } = handleDaterangeChange
          await wrapper.find('.sp-date-picker-range-start .sp-input__inner').setValue('2019-13-27')
          await wrapper.find('.test-datepikcer-daterange-button').trigger('click')
          expect(wrapper.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('2019-02-27')
          expect(handleDaterangeChange.callCount).to.equal(callCount)
        })
        it('选择的开始日期值大于结束日期，应修正数据派发change事件', async () => {
          await wrapper.find('.sp-date-picker-content').trigger('click')
          const start = wrapper.findAll('.sp-date-picker-range__pane').at(0)
          const end = wrapper.findAll('.sp-date-picker-range__pane').at(1)

          await start.find('.sp-icon-arrow-double-right').trigger('click') // 下一年
          await start.find('.sp-date-picker-pane-day__header-month-select').trigger('click') // 月份
          await start.find('.sp-date-picker-pane-month__cell').trigger('click') // 1月
          await start.find('.sp-date-picker-pane-day__date').trigger('click') // 30号

          await end.find('.sp-icon-arrow-double-left').trigger('click') // 上一年
          await end.find('.sp-date-picker-pane-day__header-year-select').trigger('click') // 年份
          await end.find('.sp-date-picker-pane-year__date').trigger('click') // 2019
          await end.find('.sp-date-picker-pane-day__date').trigger('click') // 28号
          await wrapper.vm.$nextTick()
          
          expect(wrapper.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('2019-10-28')
          expect(wrapper.find('.sp-date-picker-range-end .sp-input__inner').element.value).to.equal('2019-12-30')
          expect(handleDaterangeChange.calledWith(sinon.match.array.contains([format.modifyDate('2019-10-28 00:00:00').getTime(), format.modifyDate('2019-12-30 23:59:59').getTime()]))).to.be.true
        })
      })
    })

    describe('不可选择的日期', () => {
      describe('prop: disabled-date', () => {
        describe('设置disabled-date为不能大于2021/12/12，不能小于2019/01/11', () => {
          it('大于大于2021/12/12的日期，应展示禁止选择的样式', async () => {
            await wrapper.find('.sp-date-picker-range-start .sp-input__inner').setValue('2019-02-27') // 重置
            await wrapper.find('.sp-date-picker-range-end .sp-input__inner').setValue('2021-10-31') // 重置
            await wrapper.find('.sp-date-picker-content').trigger('click')
            await wrapper.find('.sp-icon-arrow-left').trigger('click')
            expect(wrapper.find('.sp-date-picker-pane-day__cell.is--disabled .sp-date-picker-pane-day__date').text()).to.equal('31') // 校验第一个
          })
        })
      })
      describe('event: change', () => {
        it('点击不可选日期，不应派发change事件', async () => {
          const { callCount } = handleDaterangeChange
          await wrapper.find('.sp-date-picker-pane-day__cell.is--disabled .sp-date-picker-pane-day__date').trigger('click')
          expect(handleDaterangeChange.callCount).to.equal(callCount)
        })
        it('输入不可选的日期，不应派发change事件', async () => {
          const { callCount } = handleDaterangeChange
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-date-picker-range-start .sp-input__inner').setValue('2019-01-01')
          await wrapper.find('.test-datepikcer-daterange-button').trigger('click')
          expect(wrapper.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('2019-02-27')
          expect(handleDaterangeChange.callCount).to.equal(callCount)
        })
      })
    })

    describe('显示时分秒', () => {
      describe('prop: show-time', () => {
        it('选择日期面板，应该展示选择时间相关操作按钮', async () => {
          await wrapper.setData({ showTime: true })
          await wrapper.find('.sp-date-picker-content').trigger('click')
          expect(wrapper.find('.sp-date-picker__foot').exists()).to.be.true
        })
      })
      describe('event: change', () => {
        it('选择日期后，点击确定按钮，应该派发change事件', async () => {
          await wrapper.find('.sp-date-picker-content').trigger('click')
          const start = wrapper.findAll('.sp-date-picker-range__pane').at(0)
          const end = wrapper.findAll('.sp-date-picker-range__pane').at(1)
          await start.find('.sp-date-picker-pane-day__date').trigger('click')
          await end.find('.sp-date-picker-pane-day__date').trigger('click')
          await wrapper.find('.sp-date-picker__range-select').trigger('click')
          expect(wrapper.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('2019-01-28 00:00:00')
          expect(wrapper.find('.sp-date-picker-range-end .sp-input__inner').element.value).to.equal('2021-09-27 23:59:59')
          expect(handleDaterangeChange.calledWith(sinon.match.array.contains([format.modifyDate('2019-01-28 00:00:00').getTime(), format.modifyDate('2021-09-27 23:59:59').getTime()]))).to.be.true
        })
        it('删除输入框内的值，不应派发change事件', async () => {
          const { callCount } = handleDaterangeChange
          await wrapper.find('.sp-date-picker-range-start .sp-input__inner').setValue('')
          await wrapper.find('.test-datepikcer-daterange-button').trigger('click')
          expect(wrapper.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('2019-01-28 00:00:00')
          expect(handleDaterangeChange.callCount).to.equal(callCount)
        })
        
        it('更改输入框内的值，应派发change事件', async () => {
          await wrapper.find('.sp-date-picker-range-end .sp-input__inner').setValue('2021-09-26 23:59:59')
          expect(handleDaterangeChange.calledWith(sinon.match.array.contains([format.modifyDate('2019-01-28 00:00:00').getTime(), format.modifyDate('2021-09-26 23:59:59').getTime()]))).to.be.true
        })
        it('输入非法日期，不应派发change事件', async () => {
          const { callCount } = handleDaterangeChange
          await wrapper.find('.sp-date-picker-range-end .sp-input__inner').setValue('2021-09-AA 23:59:59')
          await wrapper.find('.test-datepikcer-daterange-button').trigger('click')
          expect(handleDaterangeChange.callCount).to.equal(callCount)
          await wrapper.vm.$nextTick()
          expect(wrapper.find('.sp-date-picker-range-end .sp-input__inner').element.value).to.equal('2021-09-26 23:59:59')
        })
      })

      describe('interact', () => {
        it('点击选择时间按钮，应该展示时间选择面板', async () => {
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-date-picker__select-time-btn').trigger('click')
          expect(wrapper.find('.sp-time-picker').isVisible()).to.be.true
        })
        it('选择时间后，input输入框内的值应该一起更新', async () => {
          await wrapper.findAll('.sp-time-picker-option').at(1).trigger('click')
          await wrapper.find('.test-datepikcer-daterange-button').trigger('click')
          expect(wrapper.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('2019-01-28 01:00:00')
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
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-date-picker__select-time-btn').trigger('click')
          expect(wrapper.find('.sp-time-picker-option.is-disabled').text()).to.equal('13')
        })
      })

      describe('event: change', () => {
        it('输入禁用的时间，不应派发change时间', async () => {
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-date-picker-range-start .sp-input__inner').setValue('2019-01-28 13:00:00')
          await wrapper.find('.test-datepikcer-daterange-button').trigger('click')
          expect(wrapper.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('2019-01-28 01:00:00')
        })
      })

      describe('interact', () => {
        it('点击被禁用的时间时，input输入框内的值不应该一起更新', async () => {
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-time-picker-option.is-disabled').trigger('click')
          expect(wrapper.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('2019-01-28 01:00:00')
        })
      })
    })

    describe('prop: value-format = yyyy-MM-dd hh:mm:ss', () => {
      it('设置valueFormat后，绑定的值应为valueFormat的格式', async () => {
        await wrapper.setData({ valueFormat: 'yyyy-MM-dd hh:mm:ss' })
        await wrapper.find('.sp-date-picker-content').trigger('click')
        await wrapper.find('.sp-date-picker-range-start .sp-input__inner').setValue('2019-01-28 02:00:00')
        expect(wrapper.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('2019-01-28 02:00:00')
        expect(handleDaterangeChange.calledWith(sinon.match.array.contains(['2019-01-28 02:00:00', '2021-09-26 23:59:59']))).to.be.true
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

