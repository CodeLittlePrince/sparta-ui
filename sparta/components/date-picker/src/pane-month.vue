<template>
  <div class="sp-date-picker-pane-month">
    <!-- 头部 -->
    <div class="sp-date-picker-pane-month__header">
      <a
        class="sp-icon-arrow-double-left"
        title="上一年"
        @click="handleSwitchLastDecade"
      ></a>

      <a
        title="选择年份"
        @click="handleSwitchYear"
      >
        {{ calYear }}
      </a>

      <a
        class="sp-icon-arrow-double-right"
        title="下一年"
        @click="handleSwitchNextDecade"
      ></a>
    </div>
    <!-- 内容 -->
    <div class="sp-date-picker-pane-month__body">
      <table
        class="sp-date-picker-pane-month__table"
        cellspacing="0"
        role="grid"
      >
        <tbody class="sp-date-picker-pane-month__tbody" @click="handleMonthSelect($event)">
          <tr
            v-for="(line, lineIndex) in 5"
            :key="line"
            class="sp-date-picker-pane-month__week"
          >
            <td
              v-for="(item, index) in monthList.slice((lineIndex - 1) * 3, lineIndex * 3)"
              :key="index"
              class="sp-date-picker-pane-month__cell"
              :class="{
                'is--currentMonth':
                  calYear == currentYear &&
                  item.value == currentMonth,
                'is--disabled': item.disabled,
                'is--checked':
                  calYear == year &&
                  item.value == month &&
                  !item.lastYearEndMonth &&
                  !item.nextYearStartMonth
              }"
            >
              <div class="sp-date-picker-pane-month__date">{{ item.name }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpDatePickerPaneMonth',

  mixins: [Emitter],
  
  props: {
    value: String,
    visible: {
      type: Boolean,
      default: true
    },
    calYear: [Number, String],
    calMonth: [Number, String],
    year: [Number, String],
    month: [Number, String],
    disableDate: {
      type: Function,
      default: () => false
    }
  },

  data() {
    return {
      calMonthValue: this.value
    }
  },

  computed: {
    currentMonth() {
      return new Date().getMonth()
    },
    currentYear() {
      return new Date().getFullYear()
    },
    monthList() {
      let rst = []
      if (this.calMonthValue) {
        rst = [
          { name: '1月' },
          { name: '2月' },
          { name: '3月' },
          { name: '4月' },
          { name: '5月' },
          { name: '6月' },
          { name: '7月' },
          { name: '8月' },
          { name: '9月' },
          { name: '10月' },
          { name: '11月' },
          { name: '12月' }
        ]
        rst.forEach((item, index) => {
          item.value = index
          item.disabled =
            this.disableDate(new Date(this.calYear, index, 1)) &&
            this.disableDate(new Date(this.calYear, index, this._getDayCountOfMonth(this.calYear, index)))
        })
      }
      return rst
    }
  },

  created() {
    this.calMonthValue = this.calMonth
  },

  methods: {
    handleMonthSelect(e) {
      let target = e.target
      if (target.tagName === 'DIV') {
        target = target.parentNode
      }
      if (target.tagName !== 'TD') return
      const row = target.parentNode.rowIndex - 1
      const column = target.cellIndex
      const item = this.monthList[row * 3 + column]
      if (!item.disabled) {
        this.$emit('calMonthChange', item.value)
        this.$emit('monthSelect')
      }
    },
    handleSwitchLastDecade() {
      this.$emit('calYearChange', this.calYear - 1)
    },
    handleSwitchNextDecade() {
      this.$emit('calYearChange', this.calYear + 1)
    },
    handleSwitchYear() {
      this.$emit('switchYear')
    },
    _getDayCountOfMonth(year, month) {
      if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30
      }
      if (month === 1) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
          return 29
        } else {
          return 28
        }
      }
      return 31
    }
  },
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-date-picker-pane-month {
  padding: 6px 0 4px;
  width: $date-picker-pane-width;
  float: left;
  box-sizing: border-box;

  &__header {
    position: relative;
    height: $date-picker-pane__header-height;
    line-height: $date-picker-pane__header-height;
    text-align: center;
    font-size: 12px;
    margin-bottom: 6px;

    span, a {
      color: $date-picker-pane__header-color;
      line-height: $date-picker-pane__header-height;
    }

    a {
      font-size: 12px;
      cursor: pointer;
      transition: $transition-color-base;

      &:hover {
        color: $date-picker-pane__header-a-hover-color;
      }
    }

    .sp-icon-arrow-double-left,
    .sp-icon-arrow-double-right {
      position: absolute;
      display: inline-block;
      color: $date-picker-pane__header-icon-color;
    }

    .sp-icon-arrow-double-left {
      left: 7px;
    }

    .sp-icon-arrow-double-right {
      right: 7px;
    }
  }

  &__body {
    font-size: 12px;
  }

  &__table {
    width: $date-picker-pane-width;
    height: 155px;
  }

  &__column-header, &__cell {
    text-align: center;
  }

  &__date {
    width: 42px;
    height: 20px;
    line-height: 20px;
    margin: 9px 10px;
    cursor: pointer;
  }

  &__date:hover {
    background-color: $date-picker-pane__cell-background-hover;
    color: $date-picker-pane__cell-color-hover;
    border-radius: $date-picker-pane__cell--is-checked-border-radius;
  }

  &__cell.is--currentMonth &__date {
    color: $date-picker-pane__cell-color-hover;
  }

  &__cell.is--checked &__date {
    background-color: $date-picker-pane__cell--is-checked-background;
    color: $date-picker-pane__cell--is-checked-color;
    border-radius: $date-picker-pane__cell--is-checked-border-radius;
  }

  &__cell.is--disabled &__date {
    color: $date-picker-pane__cell--is-disabled-color;
    background-color: $date-picker-pane__cell--is-disabled-background;
    border-radius: $date-picker-pane__cell--is-checked-border-radius;
    cursor: not-allowed;
  }
}
</style>
