import { mount } from '@vue/test-utils'
import Datepikcer from 'base/date-picker'
import { transitionStub } from '../../../util';
import sinon from 'sinon'
const handleDateChange = sinon.spy()

describe('date-picker', () => {
  const wrapper = mount({
    data() {
      return {
        time1: new Date('2019/01/01').getTime(),
        showTime: false,
      }
    },
    methods: {
      handleDateChange,
    },
    template: `
    <div>
      <sp-date-picker
      ref="wrapper"
      v-model="time1"
      :show-time="showTime"
      clearable
      @change="handleDateChange"
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
    describe('interact', () => {
      it('当前为1月时，通过左箭头切换上一个月，年份应该变为上一年', async () => {
        await wrapper.find('.sp-date-picker-content').trigger('click')
        await wrapper.find('.sp-icon-arrow-left').trigger('click')
        expect(wrapper.find('.sp-date-picker-pane-day__header-year-select').text()).to.equal('2018年')
        expect(wrapper.find('.sp-date-picker-pane-day__header-month-select').text()).to.equal('12月')
      })

      it('当前为12月时，通过右箭头切换下一个月，年份应该变为下一年', async () => {
        await wrapper.find('.sp-icon-arrow-right').trigger('click')
        expect(wrapper.find('.sp-date-picker-pane-day__header-year-select').text()).to.equal('2019年')
        expect(wrapper.find('.sp-date-picker-pane-day__header-month-select').text()).to.equal('1月')
      })

      it('当前为12月时，选择面板中1月的日期，年份应该变为下一年', async () => {
        await wrapper.find('.sp-date-picker-content').trigger('click')
        await wrapper.find('.sp-input__inner').setValue('2018-12-01')
        await wrapper.find('.sp-date-picker-pane-day__cell.is--next-month-cell').trigger('click')
        expect(wrapper.find('.sp-input__inner').element.value).to.equal('2019-01-01')
      })

      it('当前为1月时，切换右箭头切换下一个月，月份应变为下一个月', async () => {
        await wrapper.find('.sp-date-picker-content').trigger('click')
        await wrapper.find('.sp-icon-arrow-right').trigger('click')
        expect(wrapper.find('.sp-date-picker-pane-day__header-year-select').text()).to.equal('2019年')
        expect(wrapper.find('.sp-date-picker-pane-day__header-month-select').text()).to.equal('2月')
      })
    })
  })
})

