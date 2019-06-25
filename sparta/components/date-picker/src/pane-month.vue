<template>
  <div class="sp-date-picker-pane-month">
    <!-- 头部 -->
    <div class="sp-date-picker-pane-month__header">
      <a
        class="sp-icon-d-arrow-left"
        title="上一年"
        @click="handleSwitchLastDecade"
      ></a>

      <span class="sp-date-picker-pane-month__header">
        {{ SpDatePicker.calYear }}
      </span>

      <a
        class="sp-icon-d-arrow-right"
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
        <tbody class="sp-date-picker-pane-month__tbody">
          <tr
            v-for="(line, lineIndex) in 5"
            :key="line"
            class="sp-date-picker-pane-month__week"
          >
            <td
              v-for="(item, index) in yearList.slice((lineIndex - 1) * 3, lineIndex * 3)"
              :key="index"
              class="sp-date-picker-pane-month__cell"
              :class="{
                'is-currentMonth':
                  SpDatePicker.calYear == currentYear &&
                  item.value == currentMonth,
                'is-disabled': item.disabled,
                'is-checked':
                  SpDatePicker.calYear == SpDatePicker.year &&
                  item.value == SpDatePicker.month &&
                  !item.lastYearEndMonth &&
                  !item.nextYearStartMonth
              }"
              @click="handleSelectDate(item)"
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
    yearList() {
      let rst = []
      if (this.calMonthValue) {
        rst = [
          { name: '一月' },
          { name: '二月' },
          { name: '三月' },
          { name: '四月' },
          { name: '五月' },
          { name: '六月' },
          { name: '七月' },
          { name: '八月' },
          { name: '九月' },
          { name: '十月' },
          { name: '十一月' },
          { name: '十二月' }
        ]
        rst.forEach((item, index) => {
          item.value = index
          item.disabled =
            this.SpDatePicker.disableYear(this.SpDatePicker.calYear) ||
            this.SpDatePicker.disableMonth(index + 1)
        })
      }
      return rst
    }
  },

  created() {
    this.calMonthValue = this.SpDatePicker.calMonth
  },

  methods: {
    handleSelectDate(item) {
      if (!item.disabled) {
        this.SpDatePicker.calMonth = item.value
        this.SpDatePicker.visiblePaneDate = true
        this.SpDatePicker.visiblePaneMonth = false
      }
    },
    handleSwitchLastDecade() {
      this.SpDatePicker.calYear--
    },
    handleSwitchNextDecade() {
      this.SpDatePicker.calYear++
    }
  },
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-date-picker-pane-month {
  width: $date-picker-pane-width;
  float: left;
  box-sizing: border-box;
  border-left: $date-picker-pane-border;

  &__header {
    position: relative;
    height: $date-picker-pane__header-height;
    text-align: center;
    border-bottom: $date-picker-pane__header-border;
    font-size: 16px;

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

  &__table {
    width: 100%;
  }

  &__column-header, &__cell {
    width: 37px;
    padding: 15px 0;
    line-height: 18px;
    text-align: center;
  }

  &__cell {
    cursor: pointer;
  }

  &__date {
    margin: 0 6px;
    padding: 3px 0;
  }

  &__date:hover {
    background-color: $date-picker-pane__cell-background-hover;
    color: $date-picker-pane__cell-color-hover;
  }

  &__cell.is-currentMonth &__date {
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
