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
        time1: '',
        defaultTime: '10:00:00',
        showTime: true,
      }
    },
    methods: {
      handleDateChange,

      disabledDate(date) {
        const TODAY = new Date(new Date().setHours(0, 0, 0, 0)).getTime() // 获取当天的时间
        const ONE_DAY = 24 * 60 * 60 * 1000
        const dateTime = date.getTime()
        return dateTime > TODAY + ONE_DAY * 61 || dateTime < TODAY + ONE_DAY * 1
      },
    },
    template: `
    <div>
      <sp-button class="test-disabled-date-button">测试disabledDate(D+1 - D+61)</sp-button>
      <sp-date-picker
      ref="wrapper"
      v-model="time1"
      :default-time="defaultTime"
      :disabled-date="disabledDate"
      :show-time="showTime"
      clearable
      @change="handleDateChange"
      class="disabled-date-picker"  />
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
          expect(wrapper.vm.time1).to.equal('')
        })
      })
    })
  })
})

