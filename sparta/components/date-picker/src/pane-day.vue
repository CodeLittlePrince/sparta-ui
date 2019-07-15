<template>
  <div class="sp-date-picker-pane-day">
    <!-- 头部 -->
    <div class="sp-date-picker-pane-day__header">
      <a
        class="sp-icon-d-arrow-left"
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
        class="sp-icon-d-arrow-right"
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
        <tbody class="sp-date-picker-pane-day__tbody">
          <tr
            v-for="(line, lineIndex) in 7"
            :key="line"
            class="sp-date-picker-pane-day__week"
          >
            <td
              v-for="(item, index) in dateList.slice((lineIndex - 1) * 7, lineIndex * 7)"
              :key="index"
              class="sp-date-picker-pane-day__cell"
              :class="{
                'is-last-month-cell': item.lastMonth,
                'is-next-month-cell': item.nextMonth,
                'is-today': `${calYear}-${calMonth}-${item.value}` ===
                  `${nowYear}-${+nowMonth}-${+nowDay}` &&
                  !item.lastMonth &&
                  !item.nextMonth,
                'is-disabled': item.disabled,
                'is-checked':
                  `${calYear}-${calMonth}-${item.value}` ===
                  `${year}-${+month}-${+day}` &&
                  !item.lastMonth &&
                  !item.nextMonth
              }"
              @click="handleSelectDay(item, $event)"
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
    value: String,
    visible: {
      type: Boolean,
      default: true
    },
    calYear: [Number, String],
    calMonth: [Number, String],
    nowYear: [Number, String],
    nowMonth: [Number, String],
    nowDay: [Number, String],
    year: [Number, String],
    month: [Number, String],
    day: [Number, String],
    disableYear: {
      type: Function,
      default: () => false
    },
    disableMonth: {
      type: Function,
      default: () => false
    },
    disableDay: {
      type: Function,
      default: () => false
    },
    // 以start为起始，此前的项全都disable
    start: {
      type: String,
      default: ''
    },
    // 以end为结尾，此后的项全都disable
    end: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      dateValue: this.value,
      weekList: [
        { label: '一', value: 0 },
        { label: '二', value: 1 },
        { label: '三', value: 2 },
        { label: '四', value: 3 },
        { label: '五', value: 4 },
        { label: '六', value: 5 },
        { label: '日', value: 6 }
      ]
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
      //先将当月的日期塞入dateList
      let dateList = Array.from(
        { length: currentMonthLength },
        (val, index) => {
          let beforeStart = false
          let afterEnd = false
          let formatTime = `${this.calYear}-${format.formatNumberTo2digits(this.calMonth + 1)}-${format.formatNumberTo2digits(index + 1)}`
          if (this.start && formatTime < this.start) {
            // 在start之前的项目需要disable
            beforeStart = true
          }
          if (this.end && this.end < formatTime) {
            // 在end后的项目需要disable
            afterEnd = true
          }
          return {
            currentMonth: true,
            value: index + 1,
            disabled:
              this.disableYear(this.calYear) ||
              this.disableMonth(this.calMonth + 1) ||
              this.disableDay(index + 1) ||
              beforeStart ||
              afterEnd
          }
        }
      )
      // 获取当月1号的星期是为了确定在1号前需要插多少天
      let startDay = new Date(this.calYear, this.calMonth, 1).getDay()
      // 确认上个月一共多少天
      let lastMonthLength = new Date(
        this.calYear,
        this.calMonth,
        0
      ).getDate()
      // 在1号前插入上个月日期
      for (let i = 0, len = startDay; i < len; i++) {
        let beforeStart = false
        let afterEnd = false
        let formatTime = `${this.calYear}-${format.formatNumberTo2digits(this.calMonth)}-${format.formatNumberTo2digits(lastMonthLength - i)}`
        if (this.start && formatTime < this.start) {
          // 在start之前的项目需要disable
          beforeStart = true
        }
        if (this.end && this.end < formatTime) {
          // 在end后的项目需要disable
          afterEnd = true
        }
        dateList = [
          {
            lastMonth: true,
            value: lastMonthLength - i,
            disabled:
              this.disableYear(this.calYear) ||
              this.disableMonth(this.calMonth) ||
              this.disableDay(lastMonthLength - i) ||
              beforeStart ||
              afterEnd
          }
        ].concat(dateList)
      }
      // 补全剩余位置,至少14天，则 i < 15
      for (let i = 1, item = 1; i < 15; i++, item++) {
        let beforeStart = false
        let afterEnd = false
        let formatTime = `${this.calYear}-${format.formatNumberTo2digits(this.calMonth + 2)}-${format.formatNumberTo2digits(i)}`
        if (this.start && formatTime < this.start) {
          // 在start之前的项目需要disable
          beforeStart = true
        }
        if (this.end && this.end < formatTime) {
          // 在end后的项目需要disable
          afterEnd = true
        }
        dateList[dateList.length] = {
          nextMonth: true,
          value: i,
          disabled:
            this.disableYear(this.calYear) ||
            this.disableMonth(this.calMonth + 2) ||
            this.disableDay(i) ||
            beforeStart ||
            afterEnd
        }
      }
      return dateList
    }
  },

  watch: {
    value(val) {
      this.dateValue = val
    }
  },

  methods: {
    handleSelectDay(item, e) {
      if (!item.disabled && -1 === e.target.parentNode.className.indexOf('is-checked')) {
        // 赋值 当前 nowValue,用于控制样式突出显示当前月份日期
        this.$emit('calDayChange', item.value)
        // 选择了上个月
        let month = this.calMonth
        if (item.lastMonth) month--
        // 选择了下个月
        if (item.nextMonth) month++
        this.$emit('calMonthChange', month)
        // 获取选中日期的 date
        let selectDay = new Date(this.calYear, month, item.value)
        // 赋值
        this.dateValue = format.formatDate(selectDay.getTime())
        const pieces = this.dateValue.split('-')
        this.$emit('yearChange', +pieces[0])
        this.$emit('monthChange', +pieces[1])
        this.$emit('dayChange', +pieces[2])
        this.$emit('modelChange', this.dateValue)
        this.$emit('daySelect')
      }
    },

    // 确认是否为当前月份
    validateDate(item) {
      if (this.nowValue === item.value && item.currentMonth) {
        return true
      }
    },

    handleLastMonth() {
      if (this.panelType === 'year') {
        this.$emit('calYearChange', this.calYear - 1)
      } else {
        if (this.calMonth === 0) {
          this.$emit('calMonthChange', 11)
          this.$emit('calYearChange', this.calYear - 1)
        } else {
          this.$emit('calMonthChange', this.calMonth - 1)
        }
      }
    },

    handleLastYear() {
      if (this.panelType === 'year') {
        this.$emit('calYearChange', this.calYear - 12)
      } else {
        this.$emit('calYearChange', this.calYear - 1)
      }
    },
    
    handleNextMonth() {
      if (this.panelType === 'year') {
        this.$emit('calYearChange', this.calYear + 1)
      } else {
        if (this.calMonth === 11) {
          this.$emit('calMonthChange', 0)
          this.$emit('calYearChange', this.calYear + 1)
        } else {
          this.$emit('calMonthChange', this.calMonth + 1)
        }
      }
    },
    
    handleNextYear() {
      if (this.panelType === 'year') {
        this.$emit('calYearChange', this.calYear + 12)
      } else {
        this.$emit('calYearChange', this.calYear + 1)
      }
    },

    handleSwitchYear() {
      this.$emit('switchYear')
    },

    handleSwitchMonth() {
      this.$emit('switchMonth')
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-date-picker-pane-day {
  width: $date-picker-pane-width;
  float: left;
  box-sizing: border-box;
  border-left: $date-picker-pane-border;

  &__header {
    position: relative;
    height: $date-picker-pane__header-height;
    text-align: center;
    border-bottom: $date-picker-pane__header-border;

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
      font-size: 16px;
      color: $date-picker-pane__header-color;
      font-weight: 500;
    }

    .sp-icon-d-arrow-left,
    .sp-icon-arrow-left {
      position: absolute;
      display: inline-block;
    }

    .sp-icon-d-arrow-left {
      left: 7px;
    }

    .sp-icon-arrow-left {
      left: 29px;
    }

    .sp-icon-d-arrow-right,
    .sp-icon-arrow-right {
      position: absolute;
      display: inline-block;
    }

    .sp-icon-d-arrow-right {
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
    padding: 8px 12px;
    font-size: 14px;
  }

  &__column-header, &__cell {
    width: 37px;
    padding: 4px 0;
    line-height: 18px;
    text-align: center;
  }

  &__cell {
    cursor: pointer;

    &.is-next-month-cell,
    &.is-last-month-cell {
      color: $date-picker-pane__cell--is-ln-month-color;
    }
  }

  &__date {
    margin: 0 6px;
    padding: 3px 0;
  }

  &__date:hover {
    background-color: $date-picker-pane__cell-background-hover;
    color: $date-picker-pane__cell-color-hover;
  }

  &__cell.is-today &__date {
    background-color: $date-picker-pane__cell--is-today-background;
    color: $date-picker-color;
    border-radius: $date-picker-pane__cell--is-today-border-radius;
  }

  &__cell.is-checked &__date {
    background-color: $date-picker-pane__cell--is-checked-background;
    color: $date-picker-pane__cell--is-checked-color;
    border-radius: $date-picker-pane__cell--is-checked-border-radius;
  }

  &__cell.is-disabled &__date {
    color: $date-picker-pane__cell--is-disabled-color;
    cursor: not-allowed;
  }
}
</style>
