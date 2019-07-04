<template>
  <div class="sp-date-picker-pane-year">
    <!-- 头部 -->
    <div class="sp-date-picker-pane-year__header">
      <a
        class="sp-icon-d-arrow-left"
        title="上一年代"
        @click="handleSwitchLastDecade"
      ></a>

      <span class="sp-date-picker-pane-year__header">
        {{ lastDecadeEndYear + 1 }}
        -
        {{ nextDecadeStartYear - 1 }}
      </span>

      <a
        class="sp-icon-d-arrow-right"
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
        <tbody class="sp-date-picker-pane-year__tbody">
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
                'is-last-decode-cell': item.lastDecadeEndYear,
                'is-next-decode-cell': item.nextDecadeStartYear,
                'is-currentYear': item.value == currentYear,
                'is-disabled': item.disabled,
                'is-checked':
                  item.value == year &&
                  !item.lastDecadeEndYear &&
                  !item.nextDecadeStartYear
              }"
              @click="handleSelectDate(item)"
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
    value: String,
    visible: {
      type: Boolean,
      default: true
    },
    year: [Number, String],
    calYear: [Number, String],
    disableYear: {
      type: Function,
      default: () => false
    }
  },

  data() {
    return {
      calYearValue: this.value,
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
          rst.push({
            disabled: this.disableYear(this.lastDecadeEndYear + i),
            lastDecadeEndYear: i === 0,
            nextDecadeStartYear: i === this.nextDecadeStartYear - this.lastDecadeEndYear,
            value: this.lastDecadeEndYear + i
          })
        }
      }
      return rst
    }
  },

  watch: {
    calYearValue() {
      let remainder = +this.calYearValue % 10
      this.lastDecadeEndYear = +this.calYearValue - remainder - 1
      this.nextDecadeStartYear = +this.calYearValue + 10 - remainder
    }
  },

  created() {
    this.calYearValue = this.calYear
  },

  methods: {
    handleSelectDate(item) {
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

  &__cell.is-currentYear &__date {
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
