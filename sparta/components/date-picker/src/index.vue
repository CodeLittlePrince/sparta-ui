<template>
  <div
    ref="spDatePicker"
    class="sp-date-picker"
    :class="{'is--focus': isDateFocus, 'is--range': isRangeType }"
  >
    <!-- 非范围型date-picker -->
    <div
      v-if="!isRangeType"
      class="sp-date-picker-content"
    >
      <sp-input
        v-model="model"
        class="sp-date-picker-sigle-input"
        :clearable="clearable"
        :disabled="disabled"
        :placeholder="placeholder"
        prefix-icon="sp-icon-calendar"
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
            <template v-if="type === 'date'">
              <div v-show="visiblePaneDay">
                <sp-date-picker-pane-day
                  :year="year"
                  :month="month"
                  :day="day"
                  :cal-year="calYear"
                  :cal-month="calMonth"
                  :disable-date="disableDate"
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
            </template>
            <div v-show="visiblePaneMonth">
              <sp-date-picker-pane-month
                :year="year"
                :month="month"
                :cal-year="calYear"
                :cal-month="calMonth"
                :disable-date="disableDate"
                @calYearChange="handleCalYearChange"
                @calMonthChange="handleCalMonthChange"
                @switchYear="handleSwitchYear"
                @monthSelect="handleMonthSelect"
              />
            </div>
            <div v-show="visiblePaneYear">
              <sp-date-picker-pane-year
                :year="year"
                :cal-year="calYear"
                :disable-date="disableDate"
                @calYearChange="handleCalYearChange"
                @yearSelect="handleYearSelect"
              />
            </div>
            <div v-show="visiblePaneTime">
              <sp-date-picker-pane-time
                v-model="time" :disable-hour="disableTime().disableHour" :disable-minute="disableTime().disableMinute"
                :disable-second="disableTime().disableSecond"
              />
            </div>
            <!-- 底部 -->
            <div
              v-if="showTime && type === 'date'"
              class="sp-date-picker__foot"
            >
              <a
                href="javascript:void(0);"
                @click="handleClickCurrentTime"
              >此刻</a>
              <sp-button
                type="primary"
                size="mini"
                @click="handleSubmitTime"
              >确认</sp-button>
              <a
                v-show="visibleSelectTimeBtn"
                href="javascript:void(0);"
                class="sp-date-picker__select-time-btn"
                @click="handleClickSelectTime"
              >选择时间</a>
              <a
                v-show="visibleSelectDayBtn"
                href="javascript:void(0);"
                class="sp-date-picker__select-time-btn"
                @click="handleClickSelectDay"
              >选择日期</a>
            </div>
          </div>
        </transition>
      </sp-date-picker-dropdown>
    </div>
    <!-- 范围型date-picker -->
    <div
      v-else
      class="sp-date-picker-content"
      @click="handleRangeClick"
      @mouseover="isHover = true"
      @mouseout="isHover = false"
    >
      <!-- 开始input -->
      <div class="sp-date-picker-range-start">
        <sp-input
          v-model="modelStart"
          :disabled="disabled"
          :placeholder="startPlaceholder"
          prefix-icon="sp-icon-calendar"
        />
      </div>
      <!-- 结束input -->
      <div class="sp-date-picker-range-end">
        <sp-input
          v-model="modelEnd"
          :disabled="disabled"
          :clearable="clearable"
          :placeholder="endPlaceholder"
          @clear="handleRangeClear"
        />
      </div>
      <!-- 下拉 -->
      <sp-date-picker-dropdown
        ref="sp-date-picker__dropdown"
        v-model="visibleDateRange"
        class="sp-date-picker__dropdown is--range"
        :class="{'is--show-time': visiblePaneTimeStart}"
      >
        <transition name="sp-zoom-in-top">
          <div v-show="visibleDateRange">
            <div class="sp-date-picker__dropdown__box">
              <!-- 开始日期模板 -->
              <div class="sp-date-picker-range__pane">
                <template v-if="type === 'daterange'">
                  <div v-show="visiblePaneDayStart">
                    <sp-date-picker-pane-day
                      :value="rangeDateList"
                      :type="type"
                      :year="yearStart"
                      :month="monthStart"
                      :day="dayStart"
                      :cal-year="calYearStart"
                      :cal-month="calMonthStart"
                      :disable-date="disableDate"
                      :now-year="nowYear"
                      :now-month="nowMonth"
                      :now-day="nowDay"
                      @calYearChange="handleCalYearStartChange"
                      @calMonthChange="handleCalMonthStartChange"
                      @yearChange="handleYearStartChange"
                      @monthChange="handleMonthStartChange"
                      @dayChange="handleDayStartChange"
                      @modelChange="handleRangeModelChange"
                      @switchYear="handleSwitchYearStart"
                      @switchMonth="handleSwitchMonthStart"
                    />
                  </div>
                </template>
                <div v-show="visiblePaneMonthStart">
                  <sp-date-picker-pane-month
                    :year="yearStart"
                    :month="monthStart"
                    :cal-year="calYearStart"
                    :cal-month="calMonthStart"
                    :disable-date="disableDate"
                    @calYearChange="handleCalYearStartChange"
                    @calMonthChange="handleCalMonthStartChange"
                    @monthSelect="handleMonthStartSelect"
                    @switchYear="handleSwitchYearStart"
                  />
                </div>
                <div v-show="visiblePaneYearStart">
                  <sp-date-picker-pane-year
                    :year="yearStart"
                    :cal-year="calYearStart"
                    :disable-date="disableDate"
                    @calYearChange="handleCalYearStartChange"
                    @yearSelect="handleYearStartSelect"
                  />
                </div>
                <div v-show="visiblePaneTimeStart">
                  <sp-date-picker-pane-time
                    v-model="timeStart" :disable-hour="disableTime('start').disableHour" :disable-minute="disableTime('start').disableMinute"
                    :disable-second="disableTime('start').disableSecond"
                  />
                </div>
              </div>
              <!-- 结束日期模板 -->
              <div class="sp-date-picker-range__pane">
                <template v-if="type === 'daterange'">
                  <div v-show="visiblePaneDayEnd">
                    <sp-date-picker-pane-day
                      :value="rangeDateList"
                      :type="type"
                      :year="yearEnd"
                      :month="monthEnd"
                      :day="dayEnd"
                      :cal-year="calYearEnd"
                      :cal-month="calMonthEnd"
                      :disable-date="disableDate"
                      :now-year="nowYear"
                      :now-month="nowMonth"
                      :now-day="nowDay"
                      @calYearChange="handleCalYearEndChange"
                      @calMonthChange="handleCalMonthEndChange"
                      @calDayChange="handleCalDayEndChange"
                      @yearChange="handleYearEndChange"
                      @monthChange="handleMonthEndChange"
                      @dayChange="handleDayEndChange"
                      @switchYear="handleSwitchYearEnd"
                      @switchMonth="handleSwitchMonthEnd"
                      @modelChange="handleRangeModelChange"
                    />
                  </div>
                </template>
                <div v-show="visiblePaneMonthEnd">
                  <sp-date-picker-pane-month
                    :year="yearEnd"
                    :month="monthEnd"
                    :cal-year="calYearEnd"
                    :cal-month="calMonthEnd"
                    :disable-date="disableDate"
                    @calYearChange="handleCalYearEndChange"
                    @calMonthChange="handleCalMonthEndChange"
                    @monthSelect="handleMonthEndSelect"
                    @switchYear="handleSwitchYearEnd"
                  />
                </div>
                <div v-show="visiblePaneYearEnd">
                  <sp-date-picker-pane-year
                    :year="yearEnd"
                    :cal-year="calYearEnd"
                    :disable-date="disableDate"
                    @calYearChange="handleCalYearEndChange"
                    @yearSelect="handleYearEndSelect"
                  />
                </div>
                <div v-show="visiblePaneTimeEnd">
                  <sp-date-picker-pane-time
                    v-model="timeEnd" :disable-hour="disableTime('end').disableHour" :disable-minute="disableTime('end').disableMinute"
                    :disable-second="disableTime('end').disableSecond"
                  />
                </div>
              </div>
              <!-- 底部 -->
              <div v-if="showTime" class="sp-date-picker__foot">
                <sp-button
                  type="primary"
                  size="mini"
                  @click="handleSubmitTimeRange"
                >确认</sp-button>
                <a
                  v-show="visibleSelectTimeRangeBtn && showTime"
                  href="javascript:;"
                  class="sp-date-picker__select-time-btn"
                  @click="handleClickSelectRangeTime"
                >选择时间</a>
                <a
                  v-show="visibleSelectDayRangeBtn & showTime"
                  href="javascript:;"
                  class="sp-date-picker__select-time-btn"
                  @click="handleClickSelectRangeDay"
                >选择日期</a>
              </div>
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
    value: [String,Number, Array],
    type: {
      type: String,
      default: 'date',
      validator(val) {
        return ['year', 'month', 'date', 'daterange'].indexOf(val) > -1
      }
    },
    showTime: {
      type: Boolean,
      default: false
    },
    disableDate: {
      type: Function,
      default: () => false
    },
    /**
     *  date : () => {
          disableHour: () => [10, 20], // 0-23
          disableMinute: () => [20, 30], // 0-59
          disableSecond: () => [55, 56] // 0-59
        }
        daterange: function(type) {
          if (type === 'start') {
            return {
              disableHour: () => [13, 16],
              disableMinute: () => [20, 30],
              disableSecond: () => [55, 56]
            }
          }
          return {
            disableHour: () => [20, 22],
            disableMinute: () => [30, 59],
            disableSecond: () => [55, 56]
          }
        }
     */
    disableTime: {
      type: Function,
      default: () => { return {} }
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
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    valueFormat: { //绑定值的格式。不指定则绑定值为 new Date().getTime() long类型
      type: String,
      default: ''
    },
    defaultTime: { // 选中日期后的默认具体时刻
      type:  [String, Array],
      default: ''
    }
  },

  data() {
    return {
      nowDay: '',
      nowMonth: '',
      nowYear: '',
      isHover: false,
      // 普通日期选择框
      model: '',
      lastModel: '',
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
      visible: false,
      visiblePaneDay: true,
      visiblePaneMonth: this.type === 'month',
      visiblePaneYear: this.type === 'year',
      visiblePaneTime: false,
      visibleSelectTimeBtn: true,
      visibleSelectDayBtn: false,
      // 范围型日期选择框
      visibleDateRange: false,
      isDateFocus: false,
      visibleSelectTimeRangeBtn: true,
      visibleSelectDayRangeBtn: false,
      // 范围型日期选择框 - 开始
      modelStart:  '',
      timeStart: '',
      dayStart: '',
      monthStart: '',
      yearStart: '',
      hourStart: '00',
      minuteStart: '00',
      secondStart: '00',
      calMonthStart: '',
      calYearStart: '',
      calHourStart: '',
      calMinuteStart: '',
      calSecondStart: '',
      visiblePaneDayStart: true,
      visiblePaneMonthStart: false,
      visiblePaneYearStart: false,
      visiblePaneTimeStart: false,
      // 范围型日期选择框 - 结束
      modelEnd: '',
      timeEnd: '',
      dayEnd: '',
      monthEnd: '',
      yearEnd: '',
      hourEnd: '23',
      minuteEnd: '59',
      secondEnd: '59',
      calDayEnd: '',
      calMonthEnd: '',
      calYearEnd: '',
      visiblePaneDayEnd: true,
      visiblePaneMonthEnd: false,
      visiblePaneYearEnd: false,
      visiblePaneTimeEnd: false,
      isRangeSelecting: false, // 日期范围是否在选择中,即只选中了一个日期
      rangeDateList: [], // daterange 传递给pane-day组件的值
      lastRangeDateList: []
    }
  },

  computed: {
    showClear() {
      return (!this.disabled) &&
        (this.modelStart !== '' || this.modelEnd !== '') &&
        this.isHover
    },
    isRangeDateInSamePane() { // 是否选择了同一个月份中的2个日期
      if(!this.modelEnd || !this.modelStart) return false
      const endDate = format.modifyDate(this.modelEnd)
      const startDate = format.modifyDate(this.modelStart)
      const endYear = endDate.getFullYear()
      const endMonth = endDate.getMonth()
      const startYear = startDate.getFullYear()
      const startMonth = startDate.getMonth()
      return endYear === startYear && startMonth === endMonth
    },
    isRangeType() {
      return ['daterange'].includes(this.type)
    },
    isMonthType() {
      return ['month'].includes(this.type)
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        const format = this.type === 'year' ? 'yyyy' : this.isMonthType ? 'yyyy-MM' : this.showTime ? 'yyyy-MM-dd hh:mm:ss' : 'yyyy-MM-dd'
        const displayValue = this.formatDisplayValue(val, format)
        // 范围类型
        if (
          this.isRangeType &&
          val &&
          val instanceof Array &&
          this._valiate(displayValue[0]) &&
          this._valiate(displayValue[1])
        ) {
          const [start, end] = displayValue
          this.modelStart = start
          this.modelEnd = end
          this.rangeDateList = displayValue
          return
        }
        // 普通类型
        if (
          !this.isRangeType &&
          val &&
          this._valiate(displayValue)
        ) {
          this.model = displayValue
          return
        }
        // 其它
        if (this.isRangeType) {
          this.modelStart = ''
          this.modelEnd = ''
        } else {
          this.model = ''
        }
      }
    },
    type(value) {
      this.visiblePaneMonth = value === 'month'
      this.visiblePaneYear = value === 'year'
    },
    defaultTime: {
      immediate: true,
      handler(val) {
        if(!val) return
        if(this.isRangeType && Array.isArray(val) && val.length) {
          const [ [hourStart,minuteStart,secondStart], [hourEnd,minuteEnd,secondEnd] ] = val.map(item => item.split(':'))
          this.hourStart = hourStart || '00'
          this.minuteStart = minuteStart || '00'
          this.secondStart = secondStart || '00'
          this.hourEnd = hourEnd || '23'
          this.minuteEnd = minuteEnd || '59'
          this.secondEnd = secondEnd || '59'
        } else if(this.type === 'date' && typeof val === 'string') {
          const [hour, minute, second] = val.split(':')
          this.hour = hour || '00'
          this.minute = minute || '00'
          this.second = second || '00'
        }
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
      if(!val) return
      const year = this.year || this.nowYear
      const month = format.formatNumberTo2digits(+(this.month === '' ? this.nowMonth : this.month) + 1)
      const day = format.formatNumberTo2digits(this.day || this.nowDay)
      const date = [year, month, day].join('-')
      this.model = `${date} ${val}`
      const result = this.formatValue(this.model)
      this.$emit('input', result)
      this.dispatch('SpFormItem', 'sp.form.change', result)
    },
    timeStart(val) {
      if(!val) return
      const year = this.yearStart || this.nowYear
      const month = format.formatNumberTo2digits(+(this.monthStart === '' ? this.nowMonth : this.monthStart) + 1)
      const day = format.formatNumberTo2digits(this.dayStart || this.nowDay)
      const date = [year, month, day].join('-')
      this.modelStart = `${date} ${val}`
    },
    timeEnd(val) {
      if(!val) return
      const year = this.yearEnd || this.nowYear
      const month = format.formatNumberTo2digits(+(this.monthEnd === '' ? this.nowMonth : this.monthEnd) + 1)
      const day = format.formatNumberTo2digits(this.dayEnd || this.nowDay)
      const date = [year, month, day].join('-')
      this.modelEnd = `${date} ${val}`
    },
    isDateFocus(val) {
      if (!val) {
        if(this.isRangeType) {
          this.handleRangeBlur()
        }
        this.emitChangeEvent()
      } else {
        this.lastModel = this.model
        this.lastRangeDateList = [...this.rangeDateList]
      }
    }
  },

  created() {
    if (this.disabled) {
      return
    }
    // 设置默认值
    this._setNow()
    if (this.isRangeType) {
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
      if (this.model && this._valiate(this.model)) {
        this._calDate()
      } else {
        this._resetDate()
      }
    },
    _setDefaultRange() {
      if (this.modelStart && this._valiate(this.modelStart)) {
        this._calDateStart()
      } else {
        this._resetDateStart()
      }
      if (this.modelEnd && !this.isRangeDateInSamePane && this._valiate(this.modelEnd)) {
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
      const {hour, minute, second} = this.formatDefaultTime()
      if (this.showTime) {
        this.hour = hour
        this.minute = minute
        this.second = second
      }
      this.time = ''
    },
    _resetDateStart() {
      this.dayStart = ''
      this.monthStart = ''
      this.yearStart = ''
      this.calMonthStart = new Date().getMonth()
      this.calYearStart = new Date().getFullYear()
      const {hour, minute, second} = this.formatDefaultTime(0)
      if (this.showTime) {
        this.hourStart = hour
        this.minuteStart = minute
        this.secondStart = second
      }
      this.timeStart = ''
    },
    _resetDateEnd() {
      this.dayEnd = ''
      this.monthEnd = ''
      this.yearEnd = ''
      this.calDayEnd = new Date().getDate()
      this.calMonthEnd = new Date().getMonth() + 1 // 结束默认比开始多一个月
      this.calYearEnd = new Date().getFullYear()
      const {hour, minute, second} = this.formatDefaultTime(1)
      if (this.showTime) {
        this.hourEnd = hour
        this.minuteEnd = minute
        this.secondEnd = second
      }
      this.timeEnd = ''
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
        if(!this.isRangeDateInSamePane && !this.isRangeSelecting) this._setCalValuesStart()
      }
    },
    _calDateEnd() {
      if (this._valiate(this.modelEnd)) {
        this._setValuesEnd()
        if(!this.isRangeDateInSamePane) this._setCalValuesEnd()
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
        this.hour = timePieces[0]
        this.minute = timePieces[1]
        this.second = timePieces[2]
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
        this.hourStart = timePieces[0]
        this.minuteStart = timePieces[1]
        this.secondStart = timePieces[2]
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
        this.hourEnd = timePieces[0]
        this.minuteEnd = timePieces[1]
        this.secondEnd = timePieces[2]
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
      const now = format.formatDate(+new Date)
      const datePieces = now.split('-')
      this.nowYear = datePieces[0]
      this.nowMonth = datePieces[1] - 1
      this.nowDay = datePieces[2]
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
      if (['date','daterange'].includes(this.type) && this.showTime && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(time)) {
        pieces = time.split(' ')
        datePieces = pieces[0].split('-')
        timePieces = pieces[1].split(':')
      } else if(this.isMonthType && /^\d{4}-\d{2}$/.test(time)) {
        datePieces = time.split('-')
        datePieces.push(1) // 月份选择器，默认1号
      } else if(this.type === 'year' && /^\d{4}$/.test(time)) {
        datePieces = [time, 1, 1]
      } else if ((!this.showTime) && /^\d{4}-\d{2}-\d{2}$/.test(time)) {
        datePieces = time.split('-')
      } else {
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
      const hour = +timePieces[0]
      const minute = +timePieces[1]
      const second = +timePieces[2]
      if (this.showTime) {
        if (
          hour < 0 || 23 < hour ||
          minute < 0 || 59 < minute ||
          second < 0 || 59 < second
        ) {
          return false
        }
      }

      // 防止用户自主输入disabled的条目
      return !this.disableDate(new Date(year, month - 1, day, hour || 0, minute || 0, second || 0))
    },
    handleInput() {
      if (this._valiate(this.model)) {
        const result = this.formatValue(this.model)
        this.$emit('input', result)
        this.dispatch('SpFormItem', 'sp.form.change', result)
      }
    },
    /**
     * 点击处理
     */
    handleInputClick() {
      if (!this.disabled) {
        this.isDateFocus = true
        this.visible = true
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpDatePickerDropdown', 'updatePopper')
      }
    },

    handleRangeClick() {
      if (!this.disabled) {
        this.isDateFocus = true
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
        this.year && this.month !== '' && this.day
      ) {
        const year = this.year
        const month = format.formatNumberTo2digits(+this.month + 1)
        const day = format.formatNumberTo2digits(this.day)
        const date = this.isMonthType ? [year, month].join('-') : [year, month, day].join('-')
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
        !(this.year && this.month !== '' && this.day)
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
        this.yearStart && this.monthStart !== '' && this.dayStart
      ) {
        const year = this.yearStart
        const month = format.formatNumberTo2digits(+this.monthStart + 1)
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
        !(this.yearStart && this.monthStart !== '' && this.dayStart)
      ) {
        this.modelStart = ''
        this.modelEnd = ''
      }
      // end
      if (
        !this._valiate(this.modelEnd) &&
        this.yearEnd && this.monthEnd !== '' && this.dayEnd
      ) {
        const year = this.yearEnd
        const month = format.formatNumberTo2digits(+this.monthEnd + 1)
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
        !(this.yearEnd && this.monthEnd !== '' && this.dayEnd)
      ) {
        this.modelEnd = ''
        this.modelStart = ''
      }

      const startDate = this.modelStart ? format.modifyDate(this.modelStart).getTime() : 0
      const endDate = this.modelEnd ? format.modifyDate(this.modelEnd).getTime() : 0
      // 如果modelStart或modelEnd有一个为空，则清除两者
      if (!this.modelStart || !this.modelEnd) {
        this.modelStart = ''
        this.modelEnd = ''
      }
      // 如果modelStart，modelEnd有值，且比 modelEnd大，则交换（以防用户手动输入的情况）
      else if (this.modelStart && this.modelEnd && startDate > endDate) {
        const temp = this.modelStart
        this.modelStart = this.modelEnd
        this.modelEnd = temp
      }
      let rst = []
      if (this.modelStart && this.modelEnd) {
        this.rangeDateList = rst = [this.modelStart, this.modelEnd]
      } else {
        this.rangeDateList = rst = []
      }
      const result = this.formatValue(rst)
      this.$emit('input', result)
      this.dispatch('SpFormItem', 'sp.form.change', result)
    },

    handleCalYearChange(val) {
      this.calYear = val
      if(this.type === 'year') {
        this.year = val
        this.handleModelChange({date: val.toString() })
        this._resetAllVisible()
      }
    },
    handleCalMonthChange(val) {
      this.calMonth = val
      if(this.type === 'month') {
        this.handleModelChange({date: [this.calYear || this.nowYear, format.formatNumberTo2digits(val + 1)].join('-')})
        this._resetAllVisible()
      }
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
    handleModelChange({date}) {
      let rst = date
      if (this.showTime) {
        const hour = format.formatNumberTo2digits(this.hour)
        const minute = format.formatNumberTo2digits(this.minute)
        const second = format.formatNumberTo2digits(this.second)
        const time = [hour, minute, second].join(':')
        rst = `${date} ${time}`
      }
      this.model = rst
      const result = this.formatValue(rst)
      this.$emit('input', result)
      this.dispatch('SpFormItem', 'sp.form.change', result)
    },
    handleDaySelect() {
      if (!this.showTime) {
        this._resetAllVisible()
      }
    },
    handleMonthSelect() {
      this.visiblePaneDay = true
      this.visiblePaneMonth = this.type === 'month'
    },
    handleYearSelect() {
      this.visiblePaneDay = true
      this.visiblePaneMonth = this.type === 'month'
      this.visiblePaneYear = this.type === 'year'
    },
    handleSwitchYear() {
      this.visiblePaneDay = false
      this.visiblePaneMonth = false
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
    handleYearStartChange(val) {
      this.yearStart = val
    },
    handleMonthStartChange(val) {
      this.monthStart = val
    },
    handleDayStartChange(val) {
      this.dayStart = val
    },
    handleRangeModelChange({date, type}) {
      let rst = date
      const compareDate = () => {
        const firstSelectDate = format.modifyDate(this.startDate).getTime()
        const secondSelectDate = format.modifyDate(rst).getTime()
        if(firstSelectDate > secondSelectDate) {
          this.rangeDateList[0] = rst
          this.rangeDateList[1] = this.startDate
        } else {
          this.rangeDateList[0] = this.startDate
          this.rangeDateList[1] = rst
        }
      }
      if(type === 'click') {
        this.isRangeSelecting = !this.isRangeSelecting
        if(this.isRangeSelecting) {
          this.rangeDateList = []
          this.rangeDateList.push(rst)
          this.startDate = rst
        } else {
          compareDate()
          const [start, end] = this.rangeDateList
        
          this.modelStart = this.showTime ? start + ' ' +[this.hourStart, this.minuteStart, this.secondStart].join(':') : start
          this.modelEnd = this.showTime ? end + ' ' +[this.hourEnd, this.minuteEnd, this.secondEnd].join(':') : end
          if(!this.showTime) {
            this._resetRangeAllVisible()
          }
          this.startDate = undefined
        }
      } else if(type === 'hover' && this.isRangeSelecting && this.startDate) {
        this.rangeDateList = []
        compareDate()
      }
      
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
      this.visiblePaneMonthStart = false
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
      this.visiblePaneMonthEnd = false
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
      const result = this.formatValue(now)
      this.$emit('input', result)
      this.dispatch('SpFormItem', 'sp.form.change', result)
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
      this.rangeDateList = []
      this.$emit('input', [])
      this.dispatch('SpFormItem', 'sp.form.change', [])
    },
    /**
     * 点击其他区域触发事件
     */
    handleOtherAreaClick(e) {
      if (
        !this.isRangeType &&
        !this.$el.contains(e.target) &&
        e.target != document.body &&
        this.visible
      ) {
        this._resetAllVisible()
      }
      // daterange 类型
      if (
        this.isRangeType &&
        !this.$el.contains(e.target) &&
        e.target != document.body &&
        this.visibleDateRange
      ) {
        this._resetRangeAllVisible()
      }
    },
    _resetRangeAllVisible() {
      this.isDateFocus = false
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
      if(this.isRangeSelecting) {
        this.rangeDateList = [this.modelStart, this.modelEnd]
      }
      this.isRangeSelecting = false
    },
    _resetAllVisible() {
      this.isFocus = false
      this.visible = false
      this.visiblePaneDay = true
      this.visiblePaneMonth = this.type === 'month'
      this.visiblePaneYear = this.type === 'year'
      this.visiblePaneTime = false
      this.visibleSelectTimeBtn = true
      this.visibleSelectDayBtn = false
      this.isDateFocus = false
    },
    formatValue(value, index) {
      if(!value) return value
      if(Array.isArray(value)) {
        return value.map((item, i) => this.formatValue(item, i))
      }
      if(!this.showTime && this.defaultTime) {
        const { hour, minute, second } = this.formatDefaultTime(index)
        value += ` ${hour}:${minute}:${second}`
      }
      const standardDate = format.modifyDate(value).getTime()
      return !this.valueFormat ? standardDate : format.formatDate(standardDate, this.valueFormat)
    },
    formatDisplayValue(value, type) {
      if(!value) return value
      if(Array.isArray(value)) {
        return value.map(item => this.formatDisplayValue(item, type))
      }
      return this.isValidDate(value) ? format.formatDate(new Date(value).getTime(), type) : value
    },
    formatDefaultTime(index) {
      let time = ''
      let defaultHour = '00'
      let defaultMinute = '00'
      let defaultSecond = '00'
      if(index === 0 && Array.isArray(this.defaultTime)) {
        time = this.defaultTime[0]
      } else if (index === 1 && Array.isArray(this.defaultTime)) {
        time = this.defaultTime[1]
        defaultHour = '23'
        defaultMinute = '59'
        defaultSecond = '59'
      } else if(index === undefined && this.defaultTime && typeof this.defaultTime === 'string') {
        time = this.defaultTime
      }
      const [hour, minute, second] = time ? time.split(':') : []
      return { hour: hour || defaultHour, minute: minute || defaultMinute, second: second || defaultSecond }
    },
    isValidDate(d) {
      return d instanceof Date || !isNaN(d)
    },
    emitChangeEvent() {
      let isSame = true // 值是否变化，没有变化不派发change事件
      let result
      if(this.isRangeType) {
        isSame = this.lastRangeDateList[0] === this.rangeDateList[0] && this.lastRangeDateList[1] === this.rangeDateList[1]
        result = !isSame ? this.formatValue(this.rangeDateList) : ''
      }else {
        isSame = this.lastModel === this.model
        result = !isSame ? this.formatValue(this.model) : ''
      }
      if(!isSame) this.$emit('change', result)
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
  width: $date-picker-pane-width;
  box-sizing: border-box;

  &__dropdown__box {
    width: $date-picker-pane-width;
    user-select: none;
    box-sizing: border-box;
    color: $date-picker-color;
  }

  &-range, &.is--range {
    &.is--focus  {
      outline: none;
      border-color: $color-primary;
      box-shadow: $input-box-shadow-focus;
    }
    width: 400px;
    background-image: none;
    border: $data-picker-range-border;
    border-radius: $input-border-radius;
    transition: $transition-all;

    &:hover {
      border-color: $color-primary-light-2;
    }

    &-split {
      line-height: 34px;
      display: inline-block;
      vertical-align: middle;
    }
    &-start, &-end {
      width: 50%;
      float: left;
      .sp-input .sp-input__inner {
        border: none;
        &:focus {
          box-shadow: none;
        }
      }
    }
    &-end {
      .sp-input, .sp-input__inner {
        width: 172px;
      }
      &::before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 1px;
        vertical-align: middle;
        margin-left: 8px;
        background: $border-color-base;
      }
    }
    &__pane {
      float: left;

      .sp-time-picker {
        box-sizing: border-box;
      }

      &:last-child {
        padding-left: 5px;
        .sp-time-picker {
          border-left: $data-picker-range-border;
        }
      }

      &:first-child {
        padding-right: 4px;
        border-right: $data-picker-range-border;
        .sp-date-picker-pane-year,
        .sp-date-picker-pane-month,
        .sp-date-picker-pane-day {
          border-left: none;
        }
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
    padding: 5px;
    font-size: 12px;
    line-height: 28px;
    clear: both;

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

    .sp-date-picker__select-time-btn {
      float: right;
      margin-right: 10px;
    }
  }

  &__dropdown{
    &.is--range {
      box-shadow: $float-box-shadow-box;
      .sp-date-picker__dropdown__box {
        width: 400px;
      }
    }
    &.is--show-time {
      .sp-date-picker-range__pane {
        box-sizing: border-box;
        width: 199px;
        &:first-child {
          padding-right: 0;
        }
        &:last-child {
          padding-left: 0;
        }
      }
    }
  }
}
</style>
