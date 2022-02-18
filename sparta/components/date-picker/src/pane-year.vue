<template>
  <div class="sp-date-picker-pane-year">
    <!-- 头部 -->
    <div class="sp-date-picker-pane-year__header">
      <a
        class="sp-icon-arrow-double-left"
        title="上一年代"
        @click="handleSwitchLastDecade"
      ></a>

      <span>
        {{ lastDecadeEndYear + 1 }}
        -
        {{ nextDecadeStartYear - 1 }}
      </span>

      <a
        class="sp-icon-arrow-double-right"
        title="下一年代"
        @click="handleSwitchNextDecade"
      ></a>
    </div>
    <!-- 内容 -->
    <div class="sp-date-picker-pane-year__body">
      <table
        class="sp-date-picker-pane-year__table"
        cellspacing="0"
        role="grid"
      >
        <tbody class="sp-date-picker-pane-year__tbody" @click="handleSelectDate($event)">
          <tr
            v-for="(line, lineIndex) in 5"
            :key="line"
            class="sp-date-picker-pane-year__week"
          >
            <td
              v-for="(item, index) in yearList.slice((lineIndex - 1) * 3, lineIndex * 3)"
              :key="index"
              class="sp-date-picker-pane-year__cell"
              :class="{
                'is--current-year': item.value == currentYear,
                'is--disabled': item.disabled,
                'is--checked':
                  item.value == year &&
                  !item.lastDecadeEndYear &&
                  !item.nextDecadeStartYear
              }"
            >
              <div class="sp-date-picker-pane-year__date">{{ item.value }}</div>
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
  name: 'SpDatePickerPaneYear',

  mixins: [Emitter],
  
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    year: [Number, String],
    calYear: [Number, String],
    disabledDate: {
      type: Function,
      default: () => false
    },
  },

  data() {
    return {
      calYearValue: this.calYear,
      lastDecadeEndYear: '',
      nextDecadeStartYear: ''
    }
  },

  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    yearList() {
      let rst = []
      if (this.calYearValue) {
        for (let i = 0; i <= this.nextDecadeStartYear - this.lastDecadeEndYear; i++) {
          const year = this.lastDecadeEndYear + i
          rst.push({
            disabled: this.disabledDate(new Date(year, 0, 1)) && this.disabledDate(new Date(year, 11, 31)),
            lastDecadeEndYear: i === 0,
            nextDecadeStartYear: i === this.nextDecadeStartYear - this.lastDecadeEndYear,
            value: year
          })
        }
      }
      return rst
    }
  },

  watch: {
    calYear(newValue) {
      this.calYearValue = newValue
    },
    calYearValue: {
      immediate: true,
      handler(newVal) {
        let remainder = +newVal % 10
        this.lastDecadeEndYear = +newVal - remainder - 1
        this.nextDecadeStartYear = +newVal + 10 - remainder
      }
    },
  },

  methods: {
    handleSelectDate(e) {
      let target = e.target
      if (target.tagName === 'DIV') {
        target = target.parentNode
      }
      if (target.tagName !== 'TD') return
      const row = target.parentNode.rowIndex - 1
      const column = target.cellIndex
      const item = this.yearList[row * 3 + column]
      if (!item.disabled) {
        this.$emit('calYearChange', item.value)
        this.$emit('yearSelect')
      }
    },
    handleSwitchLastDecade() {
      this.calYearValue = +this.calYearValue - 10
    },
    handleSwitchNextDecade() {
      this.calYearValue = +this.calYearValue + 10
    }
  },
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-date-picker-pane-year {
  padding: 6px 0 4px;
  width: $date-picker-pane-width;
  float: left;
  box-sizing: border-box;

  &__header {
    position: relative;
    height: $date-picker-pane__header-height;
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

    .sp-icon-arrow-double-right,
    .sp-icon-arrow-double-left {
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

    &-ym-select {
      display: inline-block;
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

  &__cell.is--current-year &__date {
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
