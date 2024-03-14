import { mount } from '@vue/test-utils'
import { transitionStub, bootstrap } from '../../../../util'
import sinon from 'sinon'
const handleDateChange = sinon.spy()

bootstrap()

const wrapper = mount({
  data() {
    return {
      time1: '',
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
          type="date"
          :show-time="showTime"
          clearable
          @change="handleDateChange"
        />
      </div>`,
}, {
  attachTo: document.body,
  stubs: {
    transition: transitionStub,
  }
})

const wrapperRange = mount({
  data() {
    return {
      time1: [],
      showTime: true,
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
        type="daterange"
        :show-time="showTime"
        clearable
        @change="handleDateChange"
        />
      </div>`,
}, {
  attachTo: document.body,
  stubs: {
    transition: transitionStub,
  }
})
describe('date-picker', () => {
  describe('prop: type = date', () => {
    describe('interact', () => {
      it('没有默认值时，初始化日期组件为当前年月日', async () => {
        await wrapper.find('.sp-date-picker-content').trigger('click')
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        expect(wrapper.find('.sp-date-picker-pane-day__header-year-select').text()).to.equal(`${year}年`)
        expect(wrapper.find('.sp-date-picker-pane-day__header-month-select').text()).to.equal(`${month}月`)
      })
      it('切换年份', async () => {
        await wrapper.find('.sp-date-picker-pane-day__header-year-select').trigger('click')
        expect(wrapper.find('.sp-date-picker-pane-year').isVisible()).to.be.true
      })
      it('切换月份', async () => {
        wrapper.vm.$refs.wrapper.handleInputBlur() // input blur 事件不触发
        await wrapper.find('.sp-date-picker-pane-day__header-month-select').trigger('click')
        expect(wrapper.find('.sp-date-picker-pane-month').isVisible()).to.be.true
      })
    })
  })

  describe('prop: type = daterange', () => {
    describe('interact', () => {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let nextYear = month === 12 ? year + 1 : year
      month = month === 12 ? 1 : month
      let nextMonth = month + 1
      let day = new Date().getDate().toString()
      day = day.length === 1 ? `0${day}` : day
      it('没有默认值时，初始化日期组件为当前年月日', async () => {
        await wrapperRange.find('.sp-date-picker-content').trigger('click')
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const start = wrapperRange.findAll('.sp-date-picker-range__pane').at(0)
        const end = wrapperRange.findAll('.sp-date-picker-range__pane').at(1)
        expect(start.find('.sp-date-picker-pane-day__header-year-select').text()).to.equal(`${year}年`)
        expect(start.find('.sp-date-picker-pane-day__header-month-select').text()).to.equal(`${month}月`)
        expect(end.find('.sp-date-picker-pane-day__header-year-select').text()).to.equal(`${nextYear}年`)
        expect(end.find('.sp-date-picker-pane-day__header-month-select').text()).to.equal(`${nextMonth}月`)
      })
      it('选择开始与结束时间为同一天', async () => {
        month = month.toString().length === 1 ? `0${month}` : month
        nextMonth = nextMonth.toString().length === 1 ? `0${nextMonth}` : nextMonth
        await wrapperRange.find('.sp-date-picker-content').trigger('click')
        await wrapperRange.find('.sp-date-picker-pane-day__cell.is--today').trigger('click') // start
        await wrapperRange.find('.sp-date-picker-pane-day__cell.is--today').trigger('click') // end
     
        expect(wrapperRange.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal(`${year}-${month}-${day} 00:00:00`)
        expect(wrapperRange.find('.sp-date-picker-range-end .sp-input__inner').element.value).to.equal(`${year}-${month}-${day} 23:59:59`)
      })
      it('选择结束时间为01:01:01', async () => {
        await wrapperRange.find('.sp-date-picker__select-time-btn').trigger('click')
        const end = wrapperRange.findAll('.sp-date-picker-range__pane').at(1)
        await end.findAll('.sp-time-picker-pane__list').at(0).findAll('.sp-time-picker-option').at(1).trigger('click') // 时
        await end.findAll('.sp-time-picker-pane__list').at(1).findAll('.sp-time-picker-option').at(1).trigger('click') // 分
        await end.findAll('.sp-time-picker-pane__list').at(2).findAll('.sp-time-picker-option').at(1).trigger('click') // 秒
        await wrapperRange.find('.sp-date-picker__range-select').trigger('click') // 确认
        expect(wrapperRange.find('.sp-date-picker-range-start .sp-input__inner').element.value).to.equal(`${year}-${month}-${day} 00:00:00`)
        expect(wrapperRange.find('.sp-date-picker-range-end .sp-input__inner').element.value).to.equal(`${year}-${month}-${day} 01:01:01`)
      })
      describe('设置默认值为：近一个月', () => {
        const time = new Date()
        const todayStart = time.setHours(0, 0, 0, 0)
        const todayEnd = time.setHours(23, 59, 59, 999)
        const ONE_DAY = 86400000 // 24 * 3600 * 1000
        const day = time.getDate()
        it('起始2个面板应分别展示起始点', async () => {
          await wrapperRange.setData({ time1: [todayStart - 31 * ONE_DAY, todayEnd] })
          await wrapperRange.find('.sp-date-picker-content').trigger('click')
          expect(wrapperRange.findAll('.sp-date-picker-pane-day').at(0).find('.sp-date-picker-pane-day__cell.is--checked').exists()).to.be.true
          expect(wrapperRange.findAll('.sp-date-picker-pane-day').at(1).find('.sp-date-picker-pane-day__cell.is--checked').exists()).to.be.true
        })
        describe('再切换为：近两周', () => {
          it('起始点应只在开始面板中展示', async () => {
            let rangeParams = []
            if (day <= 14) {
              rangeParams = [todayStart, todayEnd + 14 * ONE_DAY]
            } else {
              rangeParams = [todayStart - 14 * ONE_DAY, todayEnd]
            }
            await wrapperRange.setData({ time1:  rangeParams})
            await wrapperRange.find('.sp-date-picker-content').trigger('click')
            expect(wrapperRange.findAll('.sp-date-picker-pane-day').at(0).findAll('.sp-date-picker-pane-day__cell.is--checked').length).to.equal(2)
            expect(wrapperRange.findAll('.sp-date-picker-pane-day').at(1).find('.sp-date-picker-pane-day__cell.is--checked').exists()).to.be.false
          })
        })
      })

    })
  })
})

