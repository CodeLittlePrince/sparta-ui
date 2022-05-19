import { mount } from '@vue/test-utils'
import Datepikcer from 'sparta/components/date-picker'
import format from 'sparta/common/js/utils/format'
import { transitionStub } from '../../../util';
import sinon from 'sinon'
const handleDateChange = sinon.spy()

describe('date-picker', () => {
  const TODAY = new Date(new Date().setHours(0, 0, 0, 0)).getTime() // 获取当天的时间
  const ONE_DAY = 24 * 60 * 60 * 1000
  const wrapper = mount({
    data() {
      return {
        time: '',
        defaultTime: '10:00:00',
        showTime: true,
      }
    },
    methods: {
      handleDateChange,

      disabledDate(date) {
        const dateTime = date.getTime()
        return dateTime > TODAY + ONE_DAY * 61 || dateTime < TODAY + ONE_DAY * 1
      },
    },
    template: `
    <div>
      <sp-button class="test-disabled-date-button">测试disabledDate(D+1 - D+61)</sp-button>
      <sp-date-picker
        ref="wrapper"
        v-model="time"
        :default-time="defaultTime"
        :disabled-date="disabledDate"
        :show-time="showTime"
        clearable
        @change="handleDateChange"
        class="disabled-date-picker" 
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
  describe('prop: type = date', () => {
    describe('不可选择的日期', () => {
      describe('prop: disabled-date', () => {
        describe('设置disabled-date为 D+1 到 D+61', () => {
          it('当年应该可选', async () => {
            await wrapper.find('.sp-date-picker-content').trigger('click')
            await wrapper.find('.sp-date-picker-pane-day__header-year-select').trigger('click')
            expect(wrapper.find('.sp-date-picker-pane-year__cell.is--current-year .sp-date-picker-pane-year__date').classes('is--disabled')).to.be.false
          })
        })
      })

      describe('event: change', () => {
        it('点击此刻按钮，不应派发change事件', async () => {
          await wrapper.find('.sp-date-picker-content').trigger('click')
          await wrapper.find('.sp-date-picker__current-time').trigger('click')
          expect(handleDateChange.called).to.be.false
        })
      })

      describe('prop: value', () => {
        describe('设置为disabled-date范围内的值', () => {
          it('应支持展示', async () => {
            await wrapper.setData({ time: TODAY })
            expect(wrapper.find('.sp-input__inner').element.value).to.equal(format.formatDate(TODAY, 'yyyy-MM-dd hh:mm:ss'))
            await wrapper.setData({ time: TODAY + 60 * 60 * 100})
            expect(wrapper.find('.sp-input__inner').element.value).to.equal(format.formatDate(TODAY + 60 * 60 * 100, 'yyyy-MM-dd hh:mm:ss'))
          })
        })
        describe('设置为非法日期', () => {
          it('应重置数据', async () => {
            await wrapper.setData({ time: 'ABC' })
            expect(wrapper.find('.sp-input__inner').element.value).to.equal('')
          })
        })
      })
    })
  })

  const wrapperRange = mount({
    data() {
      return {
        time1: [],
      }
    },
    methods: {
      disabledDate(date) {
        const dateTime = date.getTime()
        return dateTime > TODAY + ONE_DAY * 61 || dateTime < TODAY + ONE_DAY * 1
      },
    },
    template: `
    <div>
      <sp-button class="test-disabled-date-button">测试日期范围disabledDate(D+1 - D+61)</sp-button>
      <sp-date-picker
        ref="wrapper"
        v-model="time1"
        type="daterange"
        :disabled-date="disabledDate"
        :show-time="true"
        clearable
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
    describe('不可选择的日期', () => {
      describe('prop: value', () => {
        describe('设置为disabled-date范围内的值', () => {
          it('应支持展示', async () => {
            await wrapperRange.setData({ time1: [TODAY, TODAY + 60 * 60 * 100] })
            expect(wrapperRange.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal(format.formatDate(TODAY, 'yyyy-MM-dd hh:mm:ss'))
            expect(wrapperRange.find('.sp-date-picker-range-end .sp-input__inner').element.value).to.equal(format.formatDate(TODAY + 60 * 60 * 100, 'yyyy-MM-dd hh:mm:ss'))
          })
        })
        describe('设置为非法日期', () => {
          it('应重置数据', async () => {
            await wrapperRange.setData({ time1: ['abc', '123'] })
            expect(wrapperRange.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal('')
            expect(wrapperRange.find('.sp-date-picker-range-end .sp-input__inner').element.value).to.equal('')
          })
        })
      })
    })
  })
})

