<template>
  <div
    ref="spDatePicker"
    class="sp-date-picker"
  >
    <!-- 非范围型date-picker -->
    <div
      v-if="type !== 'daterange'"
      class="sp-date-picker-content"
    >
      <sp-input
        v-model="model"
        clearable
        :disabled="disabled"
        :placeholder="placeholder"
        suffix-icon="sp-icon-date"
        @click="handleInputClick"
        @blur="handleInputBlur"
        @input="handleInput"
      />
      <!-- 下拉 -->
      <sp-date-picker-dropdown
        ref="sp-date-picker__dropdown"
        v-model="visible"
        class="sp-date-picker__dropdown"
      >
        <transition name="sp-zoom-in-top">
          <div
            v-show="visible"
            class="sp-date-picker__dropdown__box"
          >
            <div v-show="visiblePaneDay">
              <sp-date-picker-pane-day
                :year="year"
                :month="month"
                :day="day"
                :cal-year="calYear"
                :cal-month="calMonth"
                :disable-year="disableYear"
                :disable-month="disableMonth"
                :disable-day="disableDay"
                :today-year="todayYear"
                :today-month="todayMonth"
                :today-day="todayDay"
                @calYearChange="handleCalYearChange"
                @calMonthChange="handleCalMonthChange"
                @calDayChange="handleCalDayChange"
                @yearChange="handleYearChange"
                @monthChange="handleMonthChange"
                @dayChange="handleDayChange"
                @daySelect="handleDaySelect"
                @switchYear="handleSwitchYear"
                @switchMonth="handleSwitchMonth"
                @modelChange="handleModelChange"
              />
            </div>
            <div v-show="visiblePaneMonth">
              <sp-date-picker-pane-month
                :year="year"
                :month="month"
                :cal-year="calYear"
                :cal-month="calMonth"
                :disable-year="disableYear"
                :disable-month="disableMonth"
                @calYearChange="handleCalYearChange"
                @calMonthChange="handleCalMonthChange"
                @monthSelect="handleMonthSelect"
              />
            </div>
            <div v-show="visiblePaneYear">
              <sp-date-picker-pane-year
                :year="year"
                :cal-year="calYear"
                :disable-year="disableYear"
                @calYearChange="handleCalYearChange"
                @yearSelect="handleYearSelect"
              />
            </div>
          </div>
        </transition>
      </sp-date-picker-dropdown>
    </div>
    <!-- 范围型date-picker -->
    <div
      v-if="type === 'daterange'"
      class="sp-date-picker-content sp-date-picker-range"
      :class="{'is-focus': isDateRangeFocus}"
      @click="handleRangeClick"
      @blur="handleRangeBlur"
    >
      <!-- 开始input -->
      <div class="sp-date-picker-range-start">
        <sp-input
          v-model="modelStart"
          :disabled="disabledStart"
          :placeholder="placeholderStart"
          @input="handleStartInput"
        />
        
      </div>
      <span>~</span>
      <!-- 结束input -->
      <div class="sp-date-picker-range-end">
        <sp-input
          v-model="modelEnd"
          :disabled="disabledEnd"
          :placeholder="placeholderEnd"
          @input="handleEndInput"
        />
      </div>
      <!-- 后缀icon -->
      <div class="sp-date-picker-range-suffix">
        <i
          v-show="showClear"
          class="sp-icon-close"
        />
        <i
          v-show="!showClear"
          class="sp-icon-date"
        />
      </div>
      <!-- 下拉 -->
      <sp-date-picker-dropdown
        ref="sp-date-picker__dropdown"
        v-model="visibleDateRange"
        class="sp-date-picker__dropdown"
      >
        <transition name="sp-zoom-in-top">
          <div
            class="sp-date-picker__dropdown__box"
          >
            <!-- 开始日期模板 -->
            <div class="sp-date-picker-range__pane">
              <div v-show="visiblePaneDayStart">
                <sp-date-picker-pane-day />
              </div>
              <div v-show="visiblePaneYearStart">
                <sp-date-picker-pane-year />
              </div>
              <div v-show="visiblePaneMonthStart">
                <sp-date-picker-pane-month />
              </div>
            </div>
            <!-- 结束日期模板 -->
            <div class="sp-date-picker-range__pane">
              <div v-show="visiblePaneDayEnd">
                <sp-date-picker-pane-day />
              </div>
              <div v-show="visiblePaneYearEnd">
                <sp-date-picker-pane-year />
              </div>
              <div v-show="visiblePaneMonthEnd">
                <sp-date-picker-pane-month />
              </div>
            </div>
          </div>
        </transition>
      </sp-date-picker-dropdown>
    </div>
  </div>
</template>

<script>
import tool from '../tool'
import Emitter from 'sparta/common/js/mixins/emitter'
import SpDatePickerDropdown from './dropdown'
import SpDatePickerPaneDay from './pane-day'
import SpDatePickerPaneYear from './pane-year'
import SpDatePickerPaneMonth from './pane-month'

export default {
  name: 'SpDatePicker',

  components: {
    'sp-date-picker-dropdown': SpDatePickerDropdown,
    'sp-date-picker-pane-day': SpDatePickerPaneDay,
    'sp-date-picker-pane-year': SpDatePickerPaneYear,
    'sp-date-picker-pane-month': SpDatePickerPaneMonth
  },

  provide() {
    return {
      'SpDatePicker': this
    }
  },

  mixins: [Emitter],

  props: {
    value: [String, Array],
    placeholder: {
      type: String,
      default: '请选择时间'
    },
    disabled: {
      type: Boolean,
      default: false
    },
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
    disabledStart: {
      type: Boolean,
      default: false
    },
    placeholderStart: {
      type: Boolean,
      default: false
    },
    disabledEnd: {
      type: Boolean,
      default: false
    },
    placeholderEnd: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'date',
      validator(val) {
        return ['date', 'daterange'].indexOf(val) > -1
      }
    },
  },

  data() {
    return {
      visible: false,
      visiblePaneDay: true,
      visiblePaneYear: false,
      visiblePaneMonth: false,
      visibleDateRange: false,
      visiblePaneDayStart: true,
      visiblePaneYearStart: false,
      visiblePaneMonthStart: false,
      visiblePaneDayEnd: true,
      visiblePaneYearEnd: false,
      visiblePaneMonthEnd: false,
      isDateRangeFocus: false,
      model: this.value,
      day: '',
      month: '',
      year: '',
      calDay: '',
      calMonth: '',
      calYear: '',
      todayDay: '',
      todayMonth: '',
      todayYear: '',
      modelStart: this.value[0],
      modelEnd: this.value[1]
    }
  },

  computed: {
    showClear() {
      return !this.disabled &&
        (this.modelStart !== '' || this.modelStart !== '') &&
        this.isHover
    }
  },

  watch: {
    model(val) {
      this.$emit('input', val)
      if (!val) {
        this._resetDate()
      } else {
        this._calDate()
      }
    },
    modelStart(val) {
      this.$emit('input', val)
      // if (!val) {
      //   this._resetDate()
      // } else {
      //   this._calDate()
      // }
    },
    modelEnd(val) {
      this.$emit('input', val)
      // if (!val) {
      //   this._resetDate()
      // } else {
      //   this._calDate()
      // }
    }
  },

  created() {
    if (this.disabled) {
      return
    }
    if (this.type === 'daterange') {
      this._setDefaultRange()
    } else {
      this._setDefault()
    }
    document.addEventListener('click', this.handleOtherAreaClick)
  },

  beforeDestroy() {
    if (this.disabled) {
      return
    }
    document.removeEventListener('click', this.handleOtherAreaClick)
  },

  methods: {
    _setDefaultRange() {

    },
    _setDefault() {
      const now = tool.formatDate(+new Date)
      const pieces = now.split('-')
      this.todayYear = pieces[0]
      this.todayMonth = pieces[1] - 1
      this.todayDay = pieces[2]
      if (this.model && this._valiate()) {
        this._calDate()
      } else {
        this._resetDate()
      }
    },
    _resetDate() {
      this.day = ''
      this.month = ''
      this.year = ''
      this.calDay = new Date().getDate()
      this.calMonth = new Date().getMonth()
      this.calYear = new Date().getFullYear()
    },
    _calDate() {
      if (this._valiate()) {
        const pieces = this.model.split('-')
        this.year = +pieces[0]
        this.month = +pieces[1] - 1
        this.day = +pieces[2]
        this._setCalValues()
      }
    },
    _setCalValues() {
      this.calYear = this.year
      this.calMonth = this.month
      this.calDay = this.day
    },
    /**
     * 校验时间格式
     */
    _valiate() {
      const pieces = this.model.split('-')
      const len = pieces.length
      if (len === 3) {
        // 防止用户自主输入disabled的条目
        if (
          this.disableYear(pieces[0]) ||
          this.disableMonth(pieces[1]) ||
          this.disableDay(pieces[2])) {
          return false
        }
        // 年
        // 长度为4；必须数字；不能为0000；
        if (
          pieces[0].length !== 4 ||
          !/\d{4}/.test(pieces[0]) ||
          +pieces[0] <= 0
        ) {
          return false
        }
        // 月、日
        for (let i = 1; i < 3; i++) {
          if (
            pieces[i].length !== 2 ||
            !/\d{2}/.test(pieces[i]) ||
            +pieces[i] <= 0
          ) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    },
    handleInput() {
      this.visible = true
    },
    /**
     * 点击处理
     */
    handleInputClick() {
      if (!this.disabled) {
        this.visible = true
        if (this.currentValue !== undefined) {
          this.$nextTick(() => this.scrollToView())
        }
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpDatePickerDropdown', 'updatePopper')
      }
    },

    handleRangeClick() {
      if (!this.disabled) {
        this.isDateRangeFocus = true
        this.visibleDateRange = true
        if (this.currentValue !== undefined) {
          this.$nextTick(() => this.scrollToView())
        }
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpDatePickerDropdown', 'updatePopper')
      }
    },
    
    handleRangeBlur() {

    },

    handleStartInput() {
      this.visibleDateRange = true
    },
    handleEndInput() {
      this.visibleDateRange = true
    },
    
    /**
     * 清除不符合格式的值
     */
    handleInputBlur() {
      if (!this._valiate() && this.year && this.month && this.day) {
        const year = this.year
        const month = tool.formatNumberTo2digits(this.month + 1)
        const day = tool.formatNumberTo2digits(this.day)
        this.model = [year, month, day].join('-')
      } else if (!this._valiate() && !(this.year && this.month && this.day)) {
        this.model = ''
      }
    },

    handleCalYearChange(val) {
      this.calYear = val
    },
    handleCalMonthChange(val) {
      this.calMonth = val
    },
    handleCalDayChange(val) {
      this.calDay = val
    },
    handleYearChange(val) {
      this.year = val
    },
    handleMonthChange(val) {
      this.month = val
    },
    handleDayChange(val) {
      this.day = val
    },
    handleModelChange(val) {
      this.model = val
    },
    handleDaySelect() {
      this.visible = false
    },

    handleMonthSelect() {
      this.visiblePaneDay = true
      this.visiblePaneMonth = false
    },

    handleYearSelect() {
      this.visiblePaneDay = true
      this.visiblePaneYear = false
    },

    handleSwitchYear() {
      this.visiblePaneDay = false
      this.visiblePaneYear = true
    },

    handleSwitchMonth() {
      this.visiblePaneDay = false
      this.visiblePaneMonth = true
    },
    /**
     * 点击其他区域触发事件
     */
    handleOtherAreaClick(e) {
      if (
        this.type !== 'daterange' &&
        !this.$el.contains(e.target) &&
        e.target != document.body
      ){
        this.isFocus = false
        this.visible = false
        this.visiblePaneDay = true
        this.visiblePaneYear = false
        this.visiblePaneMonth = false
      }
      // daterange 类型
      if (
        this.type === 'daterange' &&
        !this.$el.contains(e.target) &&
        e.target != document.body
      ){
        this.isDateRangeFocus = false
        this.visibleDateRange = false
        this.visiblePaneDayStart = true
        this.visiblePaneYearStart = false
        this.visiblePaneMonthStart = false
        this.visiblePaneDayEnd = true
        this.visiblePaneYearEnd = false
        this.visiblePaneMonthEnd = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-date-picker {
  color: $date-picker-color;
  display: inline-block;

  &-content {
    display: inline-block;
  }

  &-range {
    border-width: 1px;
    background-image: none;
    border: $input-border-color;
    border-radius: $input-border-radus;
    transition: $transition-all;

    &:hover {
      border-color: $color-primary-light-2;
    }

    &.is-focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: $input-box-shadow-focus;
    }

    &-start, &-end {
      display: inline-block;

      .sp-input .sp-input__inner {
        border: none;

        &:focus {
          box-shadow: none;
        }
      }
    }

    &-suffix {
      display: inline-block;
      margin-right: 10px;
      i {
        color: $date-picker-range-icon-color;
      }
    }

    &__pane {
      float: left;
    }
  }
}
</style>
