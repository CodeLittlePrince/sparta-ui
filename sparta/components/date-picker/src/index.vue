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
                :now-year="nowYear"
                :now-month="nowMonth"
                :now-day="nowDay"
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
            <div v-show="visiblePaneTime">
              <sp-date-picker-pane-time v-model="time" />
            </div>
            <!-- 底部 -->
            <div
              v-if="showTime"
              class="sp-date-picker__foot"
            >
              <a
                href="javascript:;"
                @click="handleClickCurrentTime"
              >此刻</a>
              <sp-button
                type="primary"
                size="mini"
                @click="handleSubmitTime"
              >确认</sp-button>
              <a
                v-show="visibleSelectTimeBtn"
                href="javascript:;"
                class="sp-date-picker__selectTimeBtn"
                @click="handleClickSelectTime"
              >选择时间</a>
              <a
                v-show="visibleSelectDayBtn"
                href="javascript:;"
                class="sp-date-picker__selectTimeBtn"
                @click="handleClickSelectDay"
              >选择日期</a>
            </div>
          </div>
        </transition>
      </sp-date-picker-dropdown>
    </div>
    <!-- 范围型date-picker -->
    <div
      v-if="type === 'daterange'"
      class="sp-date-picker-content sp-date-picker-range"
      :class="{'is-focus': isDateRangeFocus, 'is-showTime': showTime }"
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
          <div v-show="visibleDateRange">
            <div class="sp-date-picker__dropdown__box">
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
                    :now-year="nowYear"
                    :now-month="nowMonth"
                    :now-day="nowDay"
                    :end="modelEnd.split(' ')[0]"
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
                <div v-show="visiblePaneTimeStart">
                  <sp-date-picker-pane-time v-model="timeStart" />
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
                    :now-year="nowYear"
                    :now-month="nowMonth"
                    :now-day="nowDay"
                    :start="modelStart.split(' ')[0]"
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
                <div v-show="visiblePaneTimeEnd">
                  <sp-date-picker-pane-time v-model="timeEnd" />
                </div>
              </div>
            </div>
            <!-- 底部 -->
            <div class="sp-date-picker__foot is-range">
              <sp-button
                type="primary"
                size="mini"
                @click="handleSubmitTimeRange"
              >确认</sp-button>
              <a
                v-show="visibleSelectTimeRangeBtn && showTime"
                href="javascript:;"
                class="sp-date-picker__selectTimeBtn"
                @click="handleClickSelectRangeTime"
              >选择时间</a>
              <a
                v-show="visibleSelectDayRangeBtn & showTime"
                href="javascript:;"
                class="sp-date-picker__selectTimeBtn"
                @click="handleClickSelectRangeDay"
              >选择日期</a>
            </div>
          </div>
        </transition>
      </sp-date-picker-dropdown>
    </div>
  </div>
</template>

<script>
import format from 'sparta/common/js/utils/format'
import Emitter from 'sparta/common/js/mixins/emitter'
import SpDatePickerDropdown from './dropdown'
import SpDatePickerPaneDay from './pane-day'
import SpDatePickerPaneYear from './pane-year'
import SpDatePickerPaneMonth from './pane-month'
import SpDatePickerPaneTime from './pane-time'

export default {
  name: 'SpDatePicker',

  components: {
    'sp-date-picker-dropdown': SpDatePickerDropdown,
    'sp-date-picker-pane-day': SpDatePickerPaneDay,
    'sp-date-picker-pane-year': SpDatePickerPaneYear,
    'sp-date-picker-pane-month': SpDatePickerPaneMonth,
    'sp-date-picker-pane-time': SpDatePickerPaneTime
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
    showTime: {
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
    }
  },

  data() {
    return {
      nowDay: '',
      nowMonth: '',
      nowYear: '',
      nowHour: '',
      nowMinute: '',
      nowSecond: '',
      isHover: false,
      // 普通日期选择框
      model: this.value,
      time: '',
      day: '',
      month: '',
      year: '',
      hour: '00',
      minute: '00',
      second: '00',
      calDay: '',
      calMonth: '',
      calYear: '',
      calHour: '',
      calMinute: '',
      calSecond: '',
      visible: false,
      visiblePaneDay: true,
      visiblePaneYear: false,
      visiblePaneMonth: false,
      visiblePaneTime: false,
      visibleSelectTimeBtn: true,
      visibleSelectDayBtn: false,
      // 范围型日期选择框
      visibleDateRange: false,
      isDateRangeFocus: false,
      visibleSelectTimeRangeBtn: true,
      visibleSelectDayRangeBtn: false,
      // 范围型日期选择框 - 开始
      modelStart: this.value[0] || '',
      timeStart: '',
      dayStart: '',
      monthStart: '',
      yearStart: '',
      hourStart: '00',
      minuteStart: '00',
      secondStart: '00',
      calDayStart: '',
      calMonthStart: '',
      calYearStart: '',
      calHourStart: '',
      calMinuteStart: '',
      calSecondStart: '',
      visiblePaneDayStart: true,
      visiblePaneYearStart: false,
      visiblePaneMonthStart: false,
      visiblePaneTimeStart: false,
      // 范围型日期选择框 - 结束
      modelEnd: this.value[1] || '',
      timeEnd: '',
      dayEnd: '',
      monthEnd: '',
      yearEnd: '',
      hourEnd: '00',
      minuteEnd: '00',
      secondEnd: '00',
      calDayEnd: '',
      calMonthEnd: '',
      calYearEnd: '',
      calHourEnd: '',
      calMinuteEnd: '',
      calSecondEnd: '',
      visiblePaneDayEnd: true,
      visiblePaneYearEnd: false,
      visiblePaneMonthEnd: false,
      visiblePaneTimeEnd: false
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
        this.modelStart = ''
        this.modelEnd = ''
      } else {
        this.model = ''
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
    time(val) {
      const year = this.year || this.nowYear
      const month = format.formatNumberTo2digits((this.month || this.nowMonth) + 1)
      const day = format.formatNumberTo2digits(this.day || this.nowDay)
      const date = [year, month, day].join('-')
      this.model = `${date} ${val}`
      this.$emit('input', this.model)
      this.dispatch('SpFormItem', 'sp.form.change', this.model)
    },
    timeStart(val) {
      const year = this.yearStart || this.nowYear
      const month = format.formatNumberTo2digits((this.monthStart || this.nowMonth) + 1)
      const day = format.formatNumberTo2digits(this.dayStart || this.nowDay)
      const date = [year, month, day].join('-')
      this.modelStart = `${date} ${val}`
    },
    timeEnd(val) {
      const year = this.yearEnd || this.nowYear
      const month = format.formatNumberTo2digits((this.monthEnd || this.nowMonth) + 1)
      const day = format.formatNumberTo2digits(this.dayEnd || this.nowDay)
      const date = [year, month, day].join('-')
      this.modelEnd = `${date} ${val}`
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
      this._setNow()
      if (this.model && this._valiate(this.model)) {
        this._calDate()
      } else {
        this._resetDate()
      }
    },
    _setDefaultRange() {
      const now = format.formatDate(+new Date)
      const pieces = now.split('-')
      this.nowYear = pieces[0]
      this.nowMonth = pieces[1] - 1
      this.nowDay = pieces[2]
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
      if (this.showTime) {
        this.hour = '00'
        this.minute = '00'
        this.second = '00'
      }
    },
    _resetDateStart() {
      this.dayStart = ''
      this.monthStart = ''
      this.yearStart = ''
      this.calDayStart = new Date().getDate()
      this.calMonthStart = new Date().getMonth()
      this.calYearStart = new Date().getFullYear()
      if (this.showTime) {
        this.hourStart = '00'
        this.minuteStart = '00'
        this.secondStart = '00'
      }
    },
    _resetDateEnd() {
      this.dayEnd = ''
      this.monthEnd = ''
      this.yearEnd = ''
      this.calDayEnd = new Date().getDate()
      this.calMonthEnd = new Date().getMonth() + 1 // 结束默认比开始多一个月
      this.calYearEnd = new Date().getFullYear()
      if (this.showTime) {
        this.hourEnd = '00'
        this.minuteEnd = '00'
        this.secondEnd = '00'
      }
    },

    _calDate() {
      if (this._valiate(this.model)) {
        this._setValues()
        this._setCalValues()
      }
    },
    _calDateStart() {
      if (this._valiate(this.modelStart)) {
        this._setValuesStart()
        this._setCalValuesStart()
      }
    },
    _calDateEnd() {
      if (this._valiate(this.modelEnd)) {
        this._setValuesEnd()
        this._setCalValuesEnd()
      }
    },

    _setValues() {
      // 如果是showTime，则说明this.model的格式为yyyy-MM-dd hh:mm:ss;
      // 否则为yyyy-MM-dd
      if (this.showTime) {
        const pieces = this.model.split(' ')
        const datePieces = pieces[0].split('-')
        const timePieces = pieces[1].split(':')
        this.year = +datePieces[0]
        this.month = +datePieces[1] - 1
        this.day = +datePieces[2]
        this.hour = +timePieces[0]
        this.minute = +timePieces[1]
        this.second = +timePieces[2]
        this.time = pieces[1]
      } else {
        const pieces = this.model.split('-')
        this.year = +pieces[0]
        this.month = +pieces[1] - 1
        this.day = +pieces[2]
      }
    },

    _setCalValues() {
      this.calYear = this.year
      this.calMonth = this.month
      this.calDay = this.day
      if (this.showTime) {
        this.calHour = this.hour
        this.calMinute = this.minute
        this.calSecond = this.second
      }
    },

    _setValuesStart() {
      // 如果是showTime，则说明this.model的格式为yyyy-MM-dd hh:mm:ss;
      // 否则为yyyy-MM-dd
      if (this.showTime) {
        const pieces = this.modelStart.split(' ')
        const datePieces = pieces[0].split('-')
        const timePieces = pieces[1].split(':')
        this.yearStart = +datePieces[0]
        this.monthStart = +datePieces[1] - 1
        this.dayStart = +datePieces[2]
        this.hourStart = +timePieces[0]
        this.minuteStart = +timePieces[1]
        this.secondStart = +timePieces[2]
        this.timeStart = pieces[1]
      } else {
        const pieces = this.modelStart.split('-')
        this.yearStart = +pieces[0]
        this.monthStart = +pieces[1] - 1
        this.dayStart = +pieces[2]
      }
    },

    _setCalValuesStart() {
      this.calYearStart = this.yearStart
      this.calMonthStart = this.monthStart
      this.calDayStart = this.dayStart
    },

    _setValuesEnd() {
      // 如果是showTime，则说明this.model的格式为yyyy-MM-dd hh:mm:ss;
      // 否则为yyyy-MM-dd
      if (this.showTime) {
        const pieces = this.modelEnd.split(' ')
        const datePieces = pieces[0].split('-')
        const timePieces = pieces[1].split(':')
        this.yearEnd = +datePieces[0]
        this.monthEnd = +datePieces[1] - 1
        this.dayEnd = +datePieces[2]
        this.hourEnd = +timePieces[0]
        this.minuteEnd = +timePieces[1]
        this.secondEnd = +timePieces[2]
        this.timeEnd = pieces[1]
      } else {
        const pieces = this.modelEnd.split('-')
        this.yearEnd = +pieces[0]
        this.monthEnd = +pieces[1] - 1
        this.dayEnd = +pieces[2]
      }
    },

    _setCalValuesEnd() {
      this.calYearEnd = this.yearEnd
      this.calMonthEnd = this.monthEnd
      this.calDayEnd = this.dayEnd
    },

    /**
     * 设置为当前时间
     */
    _setNow() {
      const now = format.formatDate(+new Date, 'yyyy-MM-dd hh:mm:ss')
      const pieces = now.split(' ')
      const datePieces = pieces[0].split('-')
      const timePieces = pieces[1].split(':')
      this.nowYear = datePieces[0]
      this.nowMonth = datePieces[1] - 1
      this.nowDay = datePieces[2]
      this.nowHour = timePieces[0]
      this.nowMinute = timePieces[1]
      this.nowSecond = timePieces[2]
    },
    /**
     * 校验时间格式
     */
    _valiate(time) {
      if (!time) {
        return false
      }
      let pieces = []
      let datePieces = []
      let timePieces = []
      // 判断格式是否正确（大致格式，因为年，月，日，时，分，秒还要进一步判断）
      if (this.showTime && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(time)) {
        pieces = time.split(' ')
        datePieces = pieces[0].split('-')
        timePieces = pieces[1].split(':')
      } else if ((!this.showTime) && /^\d{4}-\d{2}-\d{2}$/.test(time)) {
        datePieces = time.split('-')
      } else {
        return false
      }
      // 防止用户自主输入disabled的条目
      if (
        this.disableYear(datePieces[0]) ||
        this.disableMonth(datePieces[1]) ||
        this.disableDay(datePieces[2])
      ) {
        return false
      }
      // 判断年，月，日
      const year = +datePieces[0]
      const month = +datePieces[1]
      const day = +datePieces[2]
      if (
        year < 1 ||
        month < 1 || 12 < month ||
        day < 1 || 31 < day
      ) {
        return false
      }
      // showTime情况还需要判断时，分，秒
      if (this.showTime) {
        const hour = +timePieces[0]
        const minute = +timePieces[1]
        const second = +timePieces[2]
        if (
          hour < 0 || 23 < hour ||
          minute < 0 || 59 < minute ||
          second < 0 || 59 < second
        ) {
          return false
        }
      }
      return true
    },
    handleInput() {
      // this.visible = true
      if (this._valiate(this.model)) {
        this.$emit('input', this.model)
        this.dispatch('SpFormItem', 'sp.form.change', this.model)
      }
    },
    handleStartInput() {
      // this.visibleDateRange = true
    },
    handleEndInput() {
      // this.visibleDateRange = true
    },
    /**
     * 点击处理
     */
    handleInputClick() {
      if (!this.disabled) {
        this.visible = true
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpDatePickerDropdown', 'updatePopper')
      }
    },

    handleRangeClick() {
      if (!this.disabled) {
        this.isDateRangeFocus = true
        this.visibleDateRange = true
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
        const month = format.formatNumberTo2digits(this.month + 1)
        const day = format.formatNumberTo2digits(this.day)
        const date = [year, month, day].join('-')
        let rst = date
        if (this.showTime) {
          const hour = format.formatNumberTo2digits(this.hour)
          const minute = format.formatNumberTo2digits(this.minute)
          const second = format.formatNumberTo2digits(this.second)
          const time = [hour, minute, second].join(':')
          rst = `${date} ${time}`
        }
        this.model = rst
      } else if (
        !this._valiate(this.model) &&
        !(this.year && this.month && this.day)
      ) {
        this.model = ''
      }
    },

    handleClear() {
      this._resetDate()
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
        const month = format.formatNumberTo2digits(this.monthStart + 1)
        const day = format.formatNumberTo2digits(this.dayStart)
        const date = [year, month, day].join('-')
        let rst = date
        if (this.showTime) {
          const hour = format.formatNumberTo2digits(this.hourStart)
          const minute = format.formatNumberTo2digits(this.minuteStart)
          const second = format.formatNumberTo2digits(this.secondStart)
          const time = [hour, minute, second].join(':')
          rst = `${date} ${time}`
        }
        this.modelStart = rst
      } else if (
        !this._valiate(this.modelStart) &&
        !(this.yearStart && this.monthStart && this.dayStart)
      ) {
        this.modelStart = ''
        this.modelEnd = ''
      }
      // end
      if (
        !this._valiate(this.modelEnd) &&
        this.yearEnd && this.monthEnd && this.dayEnd
      ) {
        const year = this.yearEnd
        const month = format.formatNumberTo2digits(this.monthEnd + 1)
        const day = format.formatNumberTo2digits(this.dayEnd)
        const date = [year, month, day].join('-')
        let rst = date
        if (this.showTime) {
          const hour = format.formatNumberTo2digits(this.hourEnd)
          const minute = format.formatNumberTo2digits(this.minuteEnd)
          const second = format.formatNumberTo2digits(this.secondEnd)
          const time = [hour, minute, second].join(':')
          rst = `${date} ${time}`
        }
        this.modelEnd = rst
      } else if (
        !this._valiate(this.modelEnd) &&
        !(this.yearEnd && this.monthEnd && this.dayEnd)
      ) {
        this.modelEnd = ''
        this.modelStart = ''
      }
      // 如果modelStart有值，但越界则清空
      if (this.modelEnd < this.modelStart) {
        this.modelStart = ''
        this.modelEnd = ''
      }
      // 如果modelEnd有值，但越界则清空
      if (this.modelEnd < this.modelStart) {
        this.modelEnd = ''
        this.modelStart = ''
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
      const date = val
      let rst = date
      if (this.showTime) {
        const hour = format.formatNumberTo2digits(this.hour)
        const minute = format.formatNumberTo2digits(this.minute)
        const second = format.formatNumberTo2digits(this.second)
        const time = [hour, minute, second].join(':')
        rst = `${date} ${time}`
      }
      this.model = rst
      this.$emit('input', rst)
      this.dispatch('SpFormItem', 'sp.form.change', rst)
    },
    handleDaySelect() {
      if (!this.showTime) {
        this.visible = false
      }
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
      const date = val
      let rst = date
      if (this.showTime) {
        const hour = format.formatNumberTo2digits(this.hourStart)
        const minute = format.formatNumberTo2digits(this.minuteStart)
        const second = format.formatNumberTo2digits(this.secondStart)
        const time = [hour, minute, second].join(':')
        rst = `${date} ${time}`
      }
      this.modelStart = rst
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
      const date = val
      let rst = date
      if (this.showTime) {
        const hour = format.formatNumberTo2digits(this.hourEnd)
        const minute = format.formatNumberTo2digits(this.minuteEnd)
        const second = format.formatNumberTo2digits(this.secondEnd)
        const time = [hour, minute, second].join(':')
        rst = `${date} ${time}`
      }
      this.modelEnd = rst
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
    handleSubmitTimeRange() {
      this._resetRangeAllVisible()
    },
    handleSubmitTime() {
      this._resetAllVisible()
    },
    /**
     * 点击此刻
     */
    handleClickCurrentTime() {
      const now = format.formatDate(+new Date, 'yyyy-MM-dd hh:mm:ss')
      this.model = now
      this.$emit('input', now)
      this.dispatch('SpFormItem', 'sp.form.change', now)
      this._resetAllVisible()
    },
    /**
     * 点击选择时间
     */
    handleClickSelectTime() {
      this.visiblePaneTime = true
      this.visiblePaneDay = false
      this.visibleSelectTimeBtn = false
      this.visibleSelectDayBtn = true
      this.broadcast('SpTimePickerPane', 'updateScroll')
    },
    /**
     * 点击选择时间 - 范围形
     */
    handleClickSelectRangeTime() {
      this.visiblePaneTimeStart = true
      this.visiblePaneTimeEnd = true
      this.visiblePaneDayStart = false
      this.visiblePaneDayEnd = false
      this.visibleSelectTimeRangeBtn = false
      this.visibleSelectDayRangeBtn = true
      this.broadcast('SpTimePickerPane', 'updateScroll')
    },
    /**
     * 点击选择日期
     */
    handleClickSelectDay() {
      this.visiblePaneTime = false
      this.visiblePaneDay = true
      this.visibleSelectTimeBtn = true
      this.visibleSelectDayBtn = false
    },
    /**
     * 点击选择日期 - 范围形
     */
    handleClickSelectRangeDay() {
      this.visiblePaneTimeStart = false
      this.visiblePaneTimeEnd = false
      this.visiblePaneDayStart = true
      this.visiblePaneDayEnd = true
      this.visibleSelectTimeRangeBtn = true
      this.visibleSelectDayRangeBtn = false
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
      ) {
        this._resetAllVisible()
      }
      // daterange 类型
      if (
        this.type === 'daterange' &&
        !this.$el.contains(e.target) &&
        e.target != document.body
      ) {
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
      this.visiblePaneTimeStart = false
      this.visiblePaneTimeEnd = false
      this.visibleSelectTimeRangeBtn = true
      this.visibleSelectDayRangeBtn = false
    },
    _resetAllVisible() {
      this.isFocus = false
      this.visible = false
      this.visiblePaneDay = true
      this.visiblePaneYear = false
      this.visiblePaneMonth = false
      this.visiblePaneTime = false
      this.visibleSelectTimeBtn = true
      this.visibleSelectDayBtn = false
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

    &.is-showTime .sp-input .sp-input__inner {
      width: 175px;
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

      .sp-time-picker {
        box-sizing: border-box;
      }

      &:last-child .sp-time-picker {
        border-left: $data-picker-range-border;
      }

      &:first-child .sp-time-picker {
        border-right: $data-picker-range-border;
      }
    }

    &__pane:first-child {
      .sp-date-picker-pane-year,
      .sp-date-picker-pane-month,
      .sp-date-picker-pane-day {
        border-left: none;
      }
    }
  }

  &__foot {
    @include clearfix();
    background-color: #fff;
    border-top: $data-picker-range-border;
    border-radius: $date-picker-border-radius;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 5px 10px;
    font-size: 14px;
    line-height: 28px;

    &.is-range {
      border: $data-picker-range-border;
      border-top: none;
    }

    .sp-button {
      float: right;
    }

    a {
      color: $date-picker__footer-a;
      transition: $transition-color-base;
      &:hover {
        color: $date-picker__footer-a-hover;
      }
    }

    .sp-date-picker__selectTimeBtn {
      float: right;
      margin-right: 10px;
    }
  }
}
</style>
