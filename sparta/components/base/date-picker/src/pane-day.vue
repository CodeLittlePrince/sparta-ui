<template>
  <div class="sp-date-picker-pane-day">
    <!-- 头部 -->
    <div class="sp-date-picker-pane-day__header">
      <a
        class="sp-icon-arrow-double-left"
        title="上一年"
        @click="handleLastYear"
      ></a>
      <a
        class="sp-icon-arrow-left"
        title="上个月"
        @click="handleLastMonth"
      ></a>
      <span class="sp-date-picker-pane-day__header-ym-select">
        <a
          class="sp-date-picker-pane-day__header-year-select"
          title="选择年份"
          @click="handleSwitchYear"
        >{{ calYear }}年</a>
        <a
          class="sp-date-picker-pane-day__header-month-select"
          title="选择月份"
          @click="handleSwitchMonth"
        >{{ calMonth + 1 }}月</a>
      </span>
      <a
        class="sp-icon-arrow-right"
        title="下个月"
        @click="handleNextMonth"
      ></a>
      <a
        class="sp-icon-arrow-double-right"
        title="下一年"
        @click="handleNextYear"
      ></a>
    </div>
    <!-- 内容 -->
    <div class="sp-date-picker-pane-day__body">
      <table
        class="sp-date-picker-pane-day__table"
        cellspacing="0"
        role="grid"
      >
        <thead>
          <tr>
            <th
              title="周一"
              class="sp-date-picker-pane-day__column-header"
            >
              <span class="sp-date-picker-pane-day__column-header-inner">一</span>
            </th>
            <th
              title="周二"
              class="sp-date-picker-pane-day__column-header"
            >
              <span class="sp-date-picker-pane-day__column-header-inner">二</span>
            </th>
            <th
              title="周三"
              class="sp-date-picker-pane-day__column-header"
            >
              <span class="sp-date-picker-pane-day__column-header-inner">三</span>
            </th>
            <th
              title="周四"
              class="sp-date-picker-pane-day__column-header"
            >
              <span class="sp-date-picker-pane-day__column-header-inner">四</span>
            </th>
            <th
              title="周五"
              class="sp-date-picker-pane-day__column-header"
            >
              <span class="sp-date-picker-pane-day__column-header-inner">五</span>
            </th>
            <th
              title="周六"
              class="sp-date-picker-pane-day__column-header"
            >
              <span class="sp-date-picker-pane-day__column-header-inner">六</span>
            </th>
            <th
              title="周日"
              class="sp-date-picker-pane-day__column-header"
            >
              <span class="sp-date-picker-pane-day__column-header-inner">日</span>
            </th>
          </tr>
        </thead>
        <tbody class="sp-date-picker-pane-day__tbody" @click="handleSelectDay($event)" @mousemove="handleMouseMove($event)">
          <tr
            v-for="(line, lineIndex) in 7"
            :key="line"
            class="sp-date-picker-pane-day__week"
          >
            <td
              v-for="(item, index) in dateList.slice((lineIndex - 1) * 7, lineIndex * 7)"
              :key="index"
              class="sp-date-picker-pane-day__cell"
              :class="getCellClass(item)"
            >
              <div class="sp-date-picker-pane-day__date">{{ item.value }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import format from 'sparta/common/js/utils/format'
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpDatePickerPaneDay',
  mixins: [Emitter],

  props: {
    value: [String, Array], // daterange是Array类型,date是string
    type: {
      type: String,
      default: 'date',
      validator(val) {
        return ['date', 'daterange'].indexOf(val) > -1
      }
    },
    calYear: [Number, String],
    calMonth: [Number, String],
    nowYear: [Number, String],
    nowMonth: [Number, String],
    nowDay: [Number, String],
    year: [Number, String],
    month: [Number, String],
    day: [Number, String],
    disabledDate: {
      type: Function,
      default: () => false
    }
  },
  computed: {
    /**
     * 获取当前月的天数和插入天数。
     * 如果想显示所有天数则一个月，需要多少行？
     * 最长的情况，第一行的周日才是月初1号；
     * 该月31天，则需要6行。
     * 其余空白部分用上月的月底，和下月的月初填充。
     */
    dateList() {
      let currentMonthLength = new Date(
        this.calYear,
        this.calMonth + 1,
        0
      ).getDate()
      // 先将当月的日期塞入dateList
      let dateList = Array.from(
        { length: currentMonthLength },
        (val, index) => {
          return {
            currentMonth: true,
            value: index + 1,
            disabled: this.disabledDate(new Date(this.calYear, this.calMonth, index + 1))
          }
        }
      )
      const result = dateList.some(item => item.currentMonth && !item.disabled) ? `${this.calYear}/${this.calMonth}` : ''
      if(result) this.dispatch('SpDatePicker', 'sp.datepikcer.enable', result) // 当前面板所在的月份和年份是否可选

      // 获取当月1号的星期是为了确定在1号前需要插多少天
      let startDay = new Date(this.calYear, this.calMonth, 1).getDay()
      startDay = startDay === 0 ? 6 : startDay - 1
      // 确认上个月一共多少天
      let lastMonthLength = new Date(
        this.calYear,
        this.calMonth,
        0
      ).getDate()
      // 在1号前插入上个月日期
      for (let i = 0, len = startDay; i < len; i++) {
        dateList = [
          {
            lastMonth: true,
            value: lastMonthLength - i,
            disabled: this.disabledDate(new Date(this.calYear, this.calMonth -1, lastMonthLength - i))
          }
        ].concat(dateList)
      }
      // 补全剩余位置,至少14天，则 i < 15
      for (let i = 1, item = 1; i < 15; i++, item++) {
        dateList[dateList.length] = {
          nextMonth: true,
          value: i,
          disabled: this.disabledDate(new Date(this.calYear, this.calMonth + 1, i))
        }
      }
      return dateList
    },
  },

  methods: {
    getCurrentDateValue(e) {
      let target = e.target
      if (target.tagName === 'DIV') {
        target = target.parentNode
      }
      if (target.tagName !== 'TD') return
      const row = target.parentNode.rowIndex - 2
      const column = target.cellIndex
      const item = this.dateList[row * 7 + column]
      
      if (!item.disabled) {
        // 选择了上个月
        let month = this.calMonth
        if (item.lastMonth) month--
        // 选择了下个月
        if (item.nextMonth) month++
        // 获取选中日期的 date
        let selectDay = new Date(this.calYear, month, item.value)
        // 赋值
        return format.formatDate(selectDay.getTime())
      }
    },
    handleSelectDay(e) {
      const dateValue = this.getCurrentDateValue(e)
      if(dateValue) {
        const pieces = dateValue.split('-')
        this.$emit('yearChange', +pieces[0])
        this.$emit('monthChange', +pieces[1] - 1)
        this.$emit('dayChange', +pieces[2])

        this.$emit('modelChange', { date: dateValue, type: 'click' })
        this.$emit('daySelect')
      }
    },
    
    handleMouseMove(e) {
      if(this.type !== 'daterange') return
      const dateValue = this.getCurrentDateValue(e)
      if(dateValue) {
        this.$emit('modelChange', { date: dateValue, type: 'hover' })
      }
    },

    handleLastMonth() {
      if (this.calMonth === 0) {
        this.$emit('calMonthChange', 11)
        this.handleLastYear()
      } else {
        this.$emit('calMonthChange', this.calMonth - 1)
      }
    },

    handleLastYear() {
      this.$emit('calYearChange', this.calYear - 1)
    },
    
    handleNextMonth() {
      if (this.calMonth === 11) {
        this.$emit('calMonthChange', 0)
        this.handleNextYear()
      } else {
        this.$emit('calMonthChange', this.calMonth + 1)
      }
    },
    
    handleNextYear() {
      this.$emit('calYearChange', this.calYear + 1)
    },

    handleSwitchYear() {
      this.$emit('switchYear')
    },

    handleSwitchMonth() {
      this.$emit('switchMonth')
    },
    getCellClass(item) {
      let checkedDayList = []
      const currentDate = `${this.calYear}-${format.formatNumberTo2digits(this.calMonth + 1)}-${format.formatNumberTo2digits(item.value)}`
      let currentTime = format.modifyDate(currentDate).getTime()
      if(this.type === 'daterange') { // 日期范围
        checkedDayList = this.value || []
        checkedDayList = checkedDayList.map(item => item.substr(0, 10))
      } else {
        checkedDayList = [`${this.year}-${format.formatNumberTo2digits(+this.month + 1)}-${format.formatNumberTo2digits(+this.day)}`]
      }

      return {
        'is--last-month-cell': item.lastMonth,
        'is--next-month-cell': item.nextMonth,
        'is--today': `${this.calYear}-${this.calMonth}-${item.value}` ===
                  `${this.nowYear}-${+this.nowMonth}-${+this.nowDay}` &&
                  !item.lastMonth &&
                  !item.nextMonth,
        'is--disabled': item.disabled,
        'is--enabled': !item.disabled,
        'is--checked': !item.disabled && checkedDayList.includes(currentDate) && !item.lastMonth && !item.nextMonth,
        'is--ranging': this.type !== 'daterange' || checkedDayList.length < 2
          ? false
          : currentTime < format.modifyDate(checkedDayList[1]).getTime() && currentTime > format.modifyDate(checkedDayList[0]).getTime() && !item.lastMonth && !item.nextMonth,
      }
    },
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/base/mixin";

.sp-date-picker-pane-day {
  padding: 5px 0;
  width: 100%;
  float: left;
  box-sizing: border-box;

  &__header {
    position: relative;
    height: $date-picker-pane__header-height;
    margin-bottom: 6px;
    text-align: center;

    a {
      color: $date-picker-pane__header-color;
      line-height: $date-picker-pane__header-height;
      font-size: 12px;
      cursor: pointer;
      transition: $transition-color-base;

      &:hover {
        color: $date-picker-pane__header-a-hover-color;
      }
    }

    span a {
      font-size: $date-picker-pane-font-size;
      color: $date-picker-pane__header-color;
      font-weight: 500;
    }

    .sp-icon-arrow-double-left,
    .sp-icon-arrow-left {
      position: absolute;
      display: inline-block;
      color: $date-picker-pane__header-icon-color;
    }

    .sp-icon-arrow-double-left {
      left: 7px;
    }

    .sp-icon-arrow-left {
      left: 29px;
    }

    .sp-icon-arrow-double-right,
    .sp-icon-arrow-right {
      position: absolute;
      display: inline-block;
      color: $date-picker-pane__header-icon-color;
    }

    .sp-icon-arrow-double-right {
      right: 7px;
    }

    .sp-icon-arrow-right {
      right: 29px;
    }

    &-ym-select {
      display: inline-block;
    }
  }

  &__body {
    font-size: $date-picker-pane-font-size;
  }

  &__table {
    width: 182px;
    margin: 0 6px;
  }

  &__column-header, &__cell {
    line-height: 17px;
    text-align: center;
  }

  &__cell {
    cursor: pointer;
    padding: 1px 0;
    width: 26px;
    &.is--next-month-cell,
    &.is--last-month-cell {
      color: $date-picker-pane__cell--is-ln-month-color;
    }
    &:first-child {
      border-radius: 50% 0 0 50%;
      overflow: hidden;
    }
    &:last-child {
      border-radius: 0 50% 50% 0;
    }
  }

  &__date {
    height: 21px;
    width: 21px;
    line-height: 21px;
    text-align: center;
    display: inline-block;
  }

  &__date:hover {
    color: $date-picker-pane__cell-color-hover;
  }

  &__cell.is--today &__date {
    color: $color-primary;
    border-radius: 50%;
  }
  &__cell.is--ranging {
    position: relative;
    &::before {
      position: absolute;
      top: 2px;
      right: 0;
      bottom: 2px;
      left: -6px;
      background: $date-picker-pane__cell--is-ranging-background;
      border-radius: 0 26px 26px 0;
      content: "";
    }
    + .is--checked {
      position: relative;
      &::before {
        position: absolute;
        top: 2px;
        right: 7px;
        bottom: 2px;
        left: -6px;
        background: $date-picker-pane__cell--is-ranging-background;
        content: "";
      }
    }
    > div {
      position: relative;
      z-index: 1;
    }
  }

  &__cell.is--checked {
    + .is--ranging {
      &::before {
        left: -7px;
      }
    }

    .sp-date-picker-pane-day__date {
      position: relative;
      z-index: 1;
      background-color: $date-picker-pane__cell--is-checked-background;
      color: $date-picker-pane__cell--is-checked-color;
      border-radius: 50%;
    }
  }

  &__cell.is--disabled {
    position: relative;
    cursor: not-allowed;
    &::before {
      position: absolute;
      top: 2px;
      right: 0;
      bottom: 2px;
      left: -6px;
      background: $date-picker-pane__cell--is-disabled-background;
      content: "";
      border-radius: 0 26px 26px 0;
    }
    > div {
      position: relative;
      z-index: 1;
      color: $date-picker-pane__cell--is-disabled-color;
    }
    &:hover {
      color: $date-picker-pane__cell--is-disabled-color;
      background: transparent;
    }
  }
  &__cell.is--enabled {
    + .is--disabled {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
      overflow: hidden;
    }
  }

  &__cell.is--last-month-cell {
    + .is--ranging {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
      overflow: hidden;
    }
  }
}
</style>
