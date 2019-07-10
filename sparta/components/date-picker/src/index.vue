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
        @clear="handleClear"
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
      @mouseover="isHover = true"
      @mouseout="isHover = false"
    >
      <!-- 开始input -->
      <div class="sp-date-picker-range-start">
        <sp-input
          v-model="modelStart"
          :disabled="disabled"
          :placeholder="placeholderStart"
          @input="handleStartInput"
        />
      </div>
      <span>~</span>
      <!-- 结束input -->
      <div class="sp-date-picker-range-end">
        <sp-input
          v-model="modelEnd"
          :disabled="disabled"
          :placeholder="placeholderEnd"
          @input="handleEndInput"
        />
      </div>
      <!-- 后缀icon -->
      <div class="sp-date-picker-range-suffix">
        <i
          v-show="showClear"
          class="sp-icon-circle-close"
          @click="handleRangeClear"
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
          <div>
            <div
              class="sp-date-picker__dropdown__box"
            >
              <!-- 开始日期模板 -->
              <div class="sp-date-picker-range__pane">
                <div v-show="visiblePaneDayStart">
                  <sp-date-picker-pane-day
                    :year="yearStart"
                    :month="monthStart"
                    :day="dayStart"
                    :cal-year="calYearStart"
                    :cal-month="calMonthStart"
                    :disable-year="disableYear"
                    :disable-month="disableMonth"
                    :disable-day="disableDay"
                    :today-year="todayYear"
                    :today-month="todayMonth"
                    :today-day="todayDay"
                    :end="end"
                    @calYearChange="handleCalYearStartChange"
                    @calMonthChange="handleCalMonthStartChange"
                    @calDayChange="handleCalDayStartChange"
                    @yearChange="handleYearStartChange"
                    @monthChange="handleMonthStartChange"
                    @dayChange="handleDayStartChange"
                    @daySelect="handleDayStartSelect"
                    @switchYear="handleSwitchYearStart"
                    @switchMonth="handleSwitchMonthStart"
                    @modelChange="handleModelStartChange"
                  />
                </div>
                <div v-show="visiblePaneMonthStart">
                  <sp-date-picker-pane-month
                    :year="yearStart"
                    :month="monthStart"
                    :cal-year="calYearStart"
                    :cal-month="calMonthStart"
                    :disable-year="disableYear"
                    :disable-month="disableMonth"
                    @calYearChange="handleCalYearStartChange"
                    @calMonthChange="handleCalMonthStartChange"
                    @monthSelect="handleMonthStartSelect"
                  />
                </div>
                <div v-show="visiblePaneYearStart">
                  <sp-date-picker-pane-year
                    :year="yearStart"
                    :cal-year="calYearStart"
                    :disable-year="disableYear"
                    @calYearChange="handleCalYearStartChange"
                    @yearSelect="handleYearStartSelect"
                  />
                </div>
              </div>
              <!-- 结束日期模板 -->
              <div class="sp-date-picker-range__pane">
                <div v-show="visiblePaneDayEnd">
                  <sp-date-picker-pane-day
                    :year="yearEnd"
                    :month="monthEnd"
                    :day="dayEnd"
                    :cal-year="calYearEnd"
                    :cal-month="calMonthEnd"
                    :disable-year="disableYear"
                    :disable-month="disableMonth"
                    :disable-day="disableDay"
                    :today-year="todayYear"
                    :today-month="todayMonth"
                    :today-day="todayDay"
                    :start="start"
                    @calYearChange="handleCalYearEndChange"
                    @calMonthChange="handleCalMonthEndChange"
                    @calDayChange="handleCalDayEndChange"
                    @yearChange="handleYearEndChange"
                    @monthChange="handleMonthEndChange"
                    @dayChange="handleDayEndChange"
                    @daySelect="handleDayEndSelect"
                    @switchYear="handleSwitchYearEnd"
                    @switchMonth="handleSwitchMonthEnd"
                    @modelChange="handleModelEndChange"
                  />
                </div>
                <div v-show="visiblePaneMonthEnd">
                  <sp-date-picker-pane-month
                    :year="yearEnd"
                    :month="monthEnd"
                    :cal-year="calYearEnd"
                    :cal-month="calMonthEnd"
                    :disable-year="disableYear"
                    :disable-month="disableMonth"
                    @calYearChange="handleCalYearEndChange"
                    @calMonthChange="handleCalMonthEndChange"
                    @monthSelect="handleMonthEndSelect"
                  />
                </div>
                <div v-show="visiblePaneYearEnd">
                  <sp-date-picker-pane-year
                    :year="yearEnd"
                    :cal-year="calYearEnd"
                    :disable-year="disableYear"
                    @calYearChange="handleCalYearEndChange"
                    @yearSelect="handleYearEndSelect"
                  />
                </div>
              </div>
            </div>
            <!-- 底部 -->
            <div class="sp-date-picker-range__foot">
              <sp-button
                type="primary"
                size="mini"
                @click="handleSubmitTime"
              >确认</sp-button>
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
    type: {
      type: String,
      default: 'date',
      validator(val) {
        return ['date', 'daterange'].indexOf(val) > -1
      }
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
    disabled: {
      type: Boolean,
      default: false
    },
    // 普通日期选择框
    placeholder: {
      type: String,
      default: '请选择日期'
    },
    // 范围型日期选择框
    placeholderStart: {
      type: String,
      default: '开始日期'
    },
    placeholderEnd: {
      type: String,
      default: '结束日期'
    },
  },

  data() {
    return {
      todayDay: '',
      todayMonth: '',
      todayYear: '',
      start: '',
      end: '',
      // 普通日期选择框
      model: this.value,
      day: '',
      month: '',
      year: '',
      calDay: '',
      calMonth: '',
      calYear: '',
      visible: false,
      visiblePaneDay: true,
      visiblePaneYear: false,
      visiblePaneMonth: false,
      // 范围型日期选择框
      visibleDateRange: false,
      isDateRangeFocus: false,
      // 范围型日期选择框 - 开始
      modelStart: this.value[0],
      dayStart: '',
      monthStart: '',
      yearStart: '',
      calDayStart: '',
      calMonthStart: '',
      calYearStart: '',
      visiblePaneDayStart: true,
      visiblePaneYearStart: false,
      visiblePaneMonthStart: false,
      // 范围型日期选择框 - 结束
      modelEnd: this.value[1],
      dayEnd: '',
      monthEnd: '',
      yearEnd: '',
      calDayEnd: '',
      calMonthEnd: '',
      calYearEnd: '',
      visiblePaneDayEnd: true,
      visiblePaneYearEnd: false,
      visiblePaneMonthEnd: false,
      isHover: false
    }
  },

  computed: {
    showClear() {
      return (!this.disabled) &&
        (this.modelStart !== '' || this.modelEnd !== '') &&
        this.isHover
    }
  },

  watch: {
    value(val) {
      // 范围类型
      if (
        this.type === 'daterange' &&
        val &&
        val instanceof Array &&
        this._valiate(val[0]) &&
        this._valiate(val[1])
      ) {
        this.modelStart = val[0]
        this.modelEnd = val[1]
        return
      }
      // 普通类型
      if (
        this.type !== 'daterange' &&
        val &&
        typeof val === 'string' &&
        this._valiate(val)
      ) {
        this.model = val
        return
      }
      // 其它
      if (this.type === 'datarange') {
        this.modelStart = val[0]
        this.modelEnd = val[1]
      } else {
        this.modelStart = ''
        this.modelEnd = ''
      }
    },
    model(val) {
      if (!val) {
        this._resetDate()
      } else {
        this._calDate()
      }
    },
    modelStart(val) {
      if (!val) {
        this._resetDateStart()
      } else {
        this._calDateStart()
      }
    },
    modelEnd(val) {
      if (!val) {
        this._resetDateEnd()
      } else {
        this._calDateEnd()
      }
    },
    isDateRangeFocus(val) {
      if (!val) {
        this.handleRangeBlur()
      }
    }
  },

  created() {
    if (this.disabled) {
      return
    }
    // 设置默认值
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
    _setDefault() {
      const now = tool.formatDate(+new Date)
      const pieces = now.split('-')
      this.todayYear = pieces[0]
      this.todayMonth = pieces[1] - 1
      this.todayDay = pieces[2]
      if (this.model && this._valiate(this.model)) {
        this._calDate()
      } else {
        this._resetDate()
      }
    },
    _setDefaultRange() {
      const now = tool.formatDate(+new Date)
      const pieces = now.split('-')
      this.todayYear = pieces[0]
      this.todayMonth = pieces[1] - 1
      this.todayDay = pieces[2]
      if (this.modelStart && this._valiate(this.modelStart)) {
        this._calDateStart()
      } else {
        this._resetDateStart()
      }
      if (this.modelEnd && this._valiate(this.modelEnd)) {
        this._calDateEnd()
      } else {
        this._resetDateEnd()
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
    _resetDateStart() {
      this.dayStart = ''
      this.monthStart = ''
      this.yearStart = ''
      this.calDayStart = new Date().getDate()
      this.calMonthStart = new Date().getMonth()
      this.calYearStart = new Date().getFullYear()
    },
    _resetDateEnd() {
      this.dayEnd = ''
      this.monthEnd = ''
      this.yearEnd = ''
      this.calDayEnd = new Date().getDate()
      this.calMonthEnd = new Date().getMonth() + 1 // 结束默认比开始多一个月
      this.calYearEnd = new Date().getFullYear()
    },

    _calDate() {
      if (this._valiate(this.model)) {
        const pieces = this.model.split('-')
        this.year = +pieces[0]
        this.month = +pieces[1] - 1
        this.day = +pieces[2]
        this._setCalValues()
      }
    },
    _calDateStart() {
      if (this._valiate(this.modelStart)) {
        const pieces = this.modelStart.split('-')
        this.yearStart = +pieces[0]
        this.monthStart = +pieces[1] - 1
        this.dayStart = +pieces[2]
        this._setCalValuesStart()
      }
    },
    _calDateEnd() {
      if (this._valiate(this.modelEnd)) {
        const pieces = this.modelEnd.split('-')
        this.yearEnd = +pieces[0]
        this.monthEnd = +pieces[1] - 1
        this.dayEnd = +pieces[2]
        this._setCalValuesEnd()
      }
    },

    _setCalValues() {
      this.calYear = this.year
      this.calMonth = this.month
      this.calDay = this.day
    },
    _setCalValuesStart() {
      this.calYearStart = this.yearStart
      this.calMonthStart = this.monthStart
      this.calDayStart = this.dayStart
    },
    _setCalValuesEnd() {
      this.calYearEnd = this.yearEnd
      this.calMonthEnd = this.monthEnd
      this.calDayEnd = this.dayEnd
    },
    /**
     * 校验时间格式
     */
    _valiate(time) {
      if (!time) {
        return false
      }
      const pieces = time.split('-')
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
    handleStartInput() {
      this.visibleDateRange = true
    },
    handleEndInput() {
      this.visibleDateRange = true
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
    

    /**
     * 不符合格式的值，如果之前有值则用之前的值，否则清除
     */
    handleInputBlur() {
      if (
        !this._valiate(this.model) &&
        this.year && this.month && this.day
      ) {
        const year = this.year
        const month = tool.formatNumberTo2digits(this.month + 1)
        const day = tool.formatNumberTo2digits(this.day)
        this.model = [year, month, day].join('-')
      } else if (
        !this._valiate(this.model) &&
        !(this.year && this.month && this.day)
      ) {
        this.model = ''
      }
    },

    handleClear() {
      this.$emit('input', '')
      this.dispatch('SpFormItem', 'sp.form.change', '')
    },

    handleRangeBlur() {
      // start
      // 如果有yearStart，monthStart，dayStart
      // 且格式验证未通过，则用之前保存的值
      if (
        !this._valiate(this.modelStart) &&
        this.yearStart && this.monthStart && this.dayStart
      ) {
        const year = this.yearStart
        const month = tool.formatNumberTo2digits(this.monthStart + 1)
        const day = tool.formatNumberTo2digits(this.dayStart)
        this.modelStart = [year, month, day].join('-')
      } else if (
        !this._valiate(this.modelStart) &&
        !(this.yearStart && this.monthStart && this.dayStart)
      ) {
        this.modelStart = ''
      }
      // end
      if (
        !this._valiate(this.modelEnd) &&
        this.yearEnd && this.monthEnd && this.dayEnd
      ) {
        const year = this.yearEnd
        const month = tool.formatNumberTo2digits(this.monthEnd + 1)
        const day = tool.formatNumberTo2digits(this.dayEnd)
        this.modelEnd = [year, month, day].join('-')
      } else if (
        !this._valiate(this.modelEnd) &&
        !(this.yearEnd && this.monthEnd && this.dayEnd)
      ) {
        this.modelEnd = ''
      }
      // 如果modelStart有值，但越界则清空
      if (this.end < this.modelStart) {
        this.modelStart = ''
      }
      // 如果modelEnd有值，但越界则清空
      if (this.modelEnd < this.start) {
        this.modelEnd = ''
      }
      // 如果modelStart，modelEnd有值，且比 modelEnd大，则交换（以防用户手动输入的情况）
      if (this.modelStart && this.modelEnd && this.modelStart > this.modelEnd) {
        const temp = this.modelStart
        this.modelStart = this.modelEnd
        this.modelEnd = temp
      }
      // 如果modelStart或modelEnd有一个为空，则清除两者
      if (!this.modelStart || !this.modelEnd) {
        this.modelStart = ''
        this.modelEnd = ''
      }
      let rst = []
      if (this.modelStart && this.modelEnd) {
        rst = [this.modelStart, this.modelEnd]
      } else {
        rst = []
      }
      this.$emit('input', rst)
      this.dispatch('SpFormItem', 'sp.form.change', rst)
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
      this.$emit('input', val)
      this.dispatch('SpFormItem', 'sp.form.change', val)
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

    // start
    handleCalYearStartChange(val) {
      this.calYearStart = val
    },
    handleCalMonthStartChange(val) {
      this.calMonthStart = val
    },
    handleCalDayStartChange(val) {
      this.calDayStart = val
    },
    handleYearStartChange(val) {
      this.yearStart = val
    },
    handleMonthStartChange(val) {
      this.monthStart = val
    },
    handleDayStartChange(val) {
      this.dayStart = val
    },
    handleModelStartChange(val) {
      this.modelStart = val
      this.start = val
    },
    handleDayStartSelect() {
      // this.visible = false
    },
    handleMonthStartSelect() {
      this.visiblePaneDayStart = true
      this.visiblePaneMonthStart = false
    },
    handleYearStartSelect() {
      this.visiblePaneDayStart = true
      this.visiblePaneYearStart = false
    },
    handleSwitchYearStart() {
      this.visiblePaneDayStart = false
      this.visiblePaneYearStart = true
    },
    handleSwitchMonthStart() {
      this.visiblePaneDayStart = false
      this.visiblePaneMonthStart = true
    },

    // end
    handleCalYearEndChange(val) {
      this.calYearEnd = val
    },
    handleCalMonthEndChange(val) {
      this.calMonthEnd = val
    },
    handleCalDayEndChange(val) {
      this.calDayEnd = val
    },
    handleYearEndChange(val) {
      this.yearEnd = val
    },
    handleMonthEndChange(val) {
      this.monthEnd = val
    },
    handleDayEndChange(val) {
      this.dayEnd = val
    },
    handleModelEndChange(val) {
      this.modelEnd = val
      this.end = val
    },
    handleDayEndSelect() {
      // this.visible = false
    },
    handleMonthEndSelect() {
      this.visiblePaneDayEnd = true
      this.visiblePaneMonthEnd = false
    },
    handleYearEndSelect() {
      this.visiblePaneDayEnd = true
      this.visiblePaneYearEnd = false
    },
    handleSwitchYearEnd() {
      this.visiblePaneDayEnd = false
      this.visiblePaneYearEnd = true
    },
    handleSwitchMonthEnd() {
      this.visiblePaneDayEnd = false
      this.visiblePaneMonthEnd = true
    },
    handleSubmitTime() {
      this._resetRangeAllVisible()
    },
    /**
     * 范围型清除日期
     */
    handleRangeClear() {
      this.modelStart = ''
      this.modelEnd = ''
      this.$emit('input', [])
      this.dispatch('SpFormItem', 'sp.form.change', [])
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
        this._resetRangeAllVisible()
      }
    },
    _resetRangeAllVisible() {
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
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "~sparta/common/scss/mixin";

.sp-date-picker {
  color: $date-picker-color;
  display: inline-block;

  &-content {
    display: inline-block;
  }

  &-range {
    border-width: 1px;
    background-image: none;
    border: $data-picker-range-border;
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
        width: 120px;

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
        cursor: pointer;
      }
    }

    &__pane {
      float: left;
    }

    &__pane:first-child {
      .sp-date-picker-pane-year,
      .sp-date-picker-pane-month,
      .sp-date-picker-pane-day {
        border-left: none;
      }
    }

    &__foot {
      @include clearfix();
      background-color: #fff;
      border: $data-picker-range-border;
      border-top: 0;
      border-radius: $date-picker-border-radius;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      padding: 5px 10px;

      .sp-button {
        float: right;
      }
    }
  }
}
</style>
