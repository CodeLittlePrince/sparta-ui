<template>
  <div class="sp-date-picker-pane">
    <!-- 头部 -->
    <div class="sp-date-picker-pane__header">
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
      <span class="sp-date-picker-pane__header-ym-select">
        <a
          class="sp-date-picker-pane__header-year-select"
          title="选择年份"
          @click="handleSwitchYear"
        >{{ SpDatePicker.calYear }}年</a>
        <a
          class="sp-date-picker-pane__header-month-select"
          title="选择月份"
          @click="handleSwitchMonth"
        >{{ SpDatePicker.calMonth + 1 }}月</a>
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
    <div class="sp-date-picker-pane__body">
      <table
        class="sp-date-picker-pane__table"
        cellspacing="0"
        role="grid"
      >
        <thead>
          <tr>
            <th
              title="周一"
              class="sp-date-picker-pane__column-header"
            >
              <span class="sp-date-picker-pane__column-header-inner">一</span>
            </th>
            <th
              title="周二"
              class="sp-date-picker-pane__column-header"
            >
              <span class="sp-date-picker-pane__column-header-inner">二</span>
            </th>
            <th
              title="周三"
              class="sp-date-picker-pane__column-header"
            >
              <span class="sp-date-picker-pane__column-header-inner">三</span>
            </th>
            <th
              title="周四"
              class="sp-date-picker-pane__column-header"
            >
              <span class="sp-date-picker-pane__column-header-inner">四</span>
            </th>
            <th
              title="周五"
              class="sp-date-picker-pane__column-header"
            >
              <span class="sp-date-picker-pane__column-header-inner">五</span>
            </th>
            <th
              title="周六"
              class="sp-date-picker-pane__column-header"
            >
              <span class="sp-date-picker-pane__column-header-inner">六</span>
            </th>
            <th
              title="周日"
              class="sp-date-picker-pane__column-header"
            >
              <span class="sp-date-picker-pane__column-header-inner">日</span>
            </th>
          </tr>
        </thead>
        <tbody class="sp-date-picker-pane__tbody">
          <tr
            v-for="(line, lineIndex) in 7"
            :key="line"
            class="sp-date-picker-pane__week"
          >
            <td
              v-for="(item, index) in dateList.slice((lineIndex - 1) * 7, lineIndex * 7)"
              :key="index"
              class="sp-date-picker-pane__cell"
              :class="{
                'is-last-month-cell': item.lastMonth,
                'is-next-month-cell': item.nextMonth,
                'is-today': `${SpDatePicker.calYear}-${SpDatePicker.calMonth}-${item.value}` ===
                  `${SpDatePicker.todayYear}-${+SpDatePicker.todayMonth}-${+SpDatePicker.todayDay}`,
                'is-disabled': item.disabled,
                'is-checked':
                  `${SpDatePicker.calYear}-${SpDatePicker.calMonth}-${item.value}` ===
                  `${SpDatePicker.year}-${+SpDatePicker.month}-${+SpDatePicker.day}` &&
                  !item.lastMonth &&
                  !item.nextMonth
              }"
              @click="handleSelectDate(item)"
            >
              <div class="sp-date-picker-pane__date">{{ item.value }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 底部 -->
    <div class="sp-date-picker-pane__footer">
      
    </div>
  </div>
</template>

<script>
import tool from '../tool'
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpDatePickerPane',

  inject: {
    SpDatePicker: {
      default: ''
    }
  },

  mixins: [Emitter],
  
  props: {
    value: String,
    visible: {
      type: Boolean,
      default: true
    }
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
        this.SpDatePicker.calYear,
        this.SpDatePicker.calMonth + 1,
        0
      ).getDate()
      //先将当月的日期塞入dateList
      let dateList = Array.from(
        { length: currentMonthLength },
        (val, index) => {
          return {
            currentMonth: true,
            value: index + 1,
            disabled:
              this.SpDatePicker.disableYear(this.SpDatePicker.calYear) ||
              this.SpDatePicker.disableMonth(this.SpDatePicker.calMonth + 1) ||
              this.SpDatePicker.disableDay(index + 1)
          }
        }
      )
      // 获取当月1号的星期是为了确定在1号前需要插多少天
      let startDay = new Date(this.SpDatePicker.calYear, this.SpDatePicker.calMonth, 1).getDay()
      // 确认上个月一共多少天
      let lastMonthLength = new Date(
        this.SpDatePicker.calYear,
        this.SpDatePicker.calMonth,
        0
      ).getDate()
      // 在1号前插入上个月日期
      for (let i = 0, len = startDay; i < len; i++) {
        dateList = [
          {
            lastMonth: true,
            value: lastMonthLength - i,
            disabled:
              this.SpDatePicker.disableYear(this.SpDatePicker.calYear) ||
              this.SpDatePicker.disableMonth(this.SpDatePicker.calMonth) ||
              this.SpDatePicker.disableDay(lastMonthLength - i)
          }
        ].concat(dateList)
      }
      // 补全剩余位置,至少14天，则 i < 15
      for (let i = 1, item = 1; i < 15; i++, item++) {
        dateList[dateList.length] = {
          nextMonth: true,
          value: i,
          disabled:
              this.SpDatePicker.disableYear(this.SpDatePicker.calYear) ||
              this.SpDatePicker.disableMonth(this.SpDatePicker.calMonth + 2) ||
              this.SpDatePicker.disableDay(i)
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
    handleSelectDate(item) {
      if (!item.disabled) {
        // 赋值 当前 nowValue,用于控制样式突出显示当前月份日期
        this.SpDatePicker.calDay = item.value
        // 选择了上个月
        if (item.lastMonth) this.SpDatePicker.calMonth--
        // 选择了下个月
        if (item.nextMonth) this.SpDatePicker.calMonth++
        // 获取选中日期的 date
        let selectDay = new Date(this.SpDatePicker.calYear, this.SpDatePicker.calMonth, this.SpDatePicker.calDay)
        // 赋值
        this.dateValue = tool.formatDate(selectDay.getTime())
        const pieces = this.dateValue.split('-')
        this.SpDatePicker.year = pieces[0]
        this.SpDatePicker.month = pieces[1]
        this.SpDatePicker.day = pieces[2]
        this.SpDatePicker.model = this.dateValue
        this.SpDatePicker.visible = false
        this.SpDatePicker.$refs.spInput.focus()
      }
    },

    // 确认是否为当前月份
    validateDate(item) {
      if (this.nowValue === item.value && item.currentMonth) return true
    },

    handleLastMonth() {
      if (this.panelType === 'year') this.SpDatePicker.calYear--
      else {
        if (this.SpDatePicker.calMonth === 0) {
          this.SpDatePicker.calMonth = 11
          this.SpDatePicker.calYear--
        } else {
          this.SpDatePicker.calMonth--
        }
      }
    },

    handleLastYear() {
      if (this.panelType === 'year') this.SpDatePicker.calYear -= 12
      else this.SpDatePicker.calYear--
    },
    
    handleNextMonth() {
      if (this.panelType === 'year') this.SpDatePicker.calYear++
      else {
        if (this.SpDatePicker.calMonth === 11) {
          this.SpDatePicker.calYear++
          this.SpDatePicker.calMonth = 0
        } else this.SpDatePicker.calMonth++
      }
    },
    
    handleNextYear() {
      if (this.panelType === 'year') this.SpDatePicker.calYear += 12
      else this.SpDatePicker.calYear++
    },

    handleSwitchYear() {
      this.SpDatePicker.visiblePaneDate = false
      this.SpDatePicker.visiblePaneYear = true
    },

    handleSwitchMonth() {
      this.SpDatePicker.visiblePaneDate = false
      this.SpDatePicker.visiblePaneMonth = true
    }
  },
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-date-picker-pane {
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
