<template>
  <div
    ref="spTimePicker"
    class="sp-time-select"
    :class="{ 'is--focus': isTimeSelectFocus, 'is--range': isRangeType }"
  >
    <!-- 非范围型time-pick -->
    <div v-if="!isRangeType">
      <div class="sp-time-select__single">
        <sp-input
          v-model="time"
          :disabled="disabled"
          :placeholder="placeholder"
          prefix-icon="sp-icon-clock"
          :clearable="clearable"
          @focus="handleInputFocus"
          @blur="handleTimeInputBlur"
          @input="handleTimeInput"
          @clear="handleClear"
        />
      </div>
      <sp-time-picker-dropdown
        ref="sp-time-select__dropdown"
        v-model="visible"
        class="sp-time-select__dropdown is--single-dropdown"
      >
        <transition name="sp-zoom-in-top">
          <div v-show="visible" class="sp-time-picker-dropdown__box">
            <sp-time-picker-pane :index="timeIndex(inputTimeIndex)">
              <sp-time-picker-option
                v-for="(item, index) in timeList"
                :key="item"
                :disabled="_disableTime(item)"
                :text="item"
                :index="index"
                @click="handleTimeClick(item)"
              />
            </sp-time-picker-pane>
          </div>
        </transition>
      </sp-time-picker-dropdown>
    </div>
    <!-- 范围 -->
    <div
      v-else class="sp-time-select__content"
    >
      <!-- 开始input -->
      <div
        class="sp-time-select__range"
        :class="{'is--disabled': disabled}"
        @click="handleRangeClick"
      >
        <div class="sp-time-select__range-start">
          <sp-input
            v-model="timeStart"
            :disabled="disabled"
            :validate-event="false"
            :placeholder="startPlaceholder"
            prefix-icon="sp-icon-clock"
            @blur="handleTimeStartInputBlur"
            @input="handleTimeStartInput"
          />
        </div>
        <div class="sp-time-select__range-end">
          <sp-input
            v-model="timeEnd"
            :disabled="disabled"
            :validate-event="false"
            :placeholder="endPlaceholder"
            :clearable="clearable"
            @clear="handleRangeClear"
            @blur="handleTimeEndInputBlur"
            @input="handleTimeEndInput"
          />
        </div>
      </div>
      <sp-time-picker-dropdown
        ref="sp-time-select__dropdown"
        v-model="visibleTimeRange"
        class="sp-time-select__dropdown is--range-dropdown"
      >
        <transition name="sp-zoom-in-top">
          <div v-show="visibleTimeRange" class="sp-time-picker-dropdown__box">
            <sp-time-picker-pane :index="timeIndex(inputTimeStartIndex)">
              <sp-time-picker-option
                v-for="(item, index) in timeList"
                :key="item"
                :disabled="_disableTimeStart(item)"
                :text="item"
                :index="index"
                @click="handleTimeStartClick(item)"
              />
            </sp-time-picker-pane>
            <sp-time-picker-pane :index="timeIndex(inputTimeEndIndex)">
              <sp-time-picker-option
                v-for="(item, index) in timeList"
                :key="item"
                :disabled="_disableTimeEnd(item)"
                :text="item"
                :index="index"
                @click="handleTimeEndClick(item)"
              />
            </sp-time-picker-pane>
          </div>
        </transition>
      </sp-time-picker-dropdown>
    </div>
  </div>
</template>

<script>
const parseTime = function(time) {
  const values = (time || '').split(':')
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10)
    const minutes = parseInt(values[1], 10)
    return {
      hours,
      minutes
    }
  }
  return null
}
const compareTime = function(time1, time2) {
  const value1 = parseTime(time1)
  const value2 = parseTime(time2)
  const minutes1 = value1.minutes + value1.hours * 60
  const minutes2 = value2.minutes + value2.hours * 60
  if (minutes1 === minutes2) {
    return 0
  }
  return minutes1 > minutes2 ? 1 : -1
}
const formatTime = function(time) {
  return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes)
}
const nextTime = function(time, step) {
  const timeValue = parseTime(time)
  const stepValue = parseTime(step)
  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  }
  next.minutes += stepValue.minutes
  next.hours += stepValue.hours
  next.hours += Math.floor(next.minutes / 60)
  next.minutes = next.minutes % 60
  return formatTime(next)
}
const defaultPickerOption = () => ({
  start: '00:00',
  end: '24:00',
  step: '01:00',
  minTime: '',
  maxTime: '',
}
)
import SpTimePickerDropdown from 'sparta/components/time-picker/src/dropdown'
import SpTimePickerPane from 'sparta/components/time-picker/src/pane'
import SpTimePickerOption from 'sparta/components/time-picker/src/option'
import Emitter from 'sparta/common/js/mixins/emitter'
export default {
  name: 'SpTimeSelect',
  components: {
    'sp-time-picker-dropdown': SpTimePickerDropdown,
    'sp-time-picker-pane': SpTimePickerPane,
    'sp-time-picker-option': SpTimePickerOption
  },
  mixins: [Emitter],
  props: {
    value: {},
    type: {
      type: String,
      default: '',
      validator(val) {
        return ['', 'range'].includes(val)
      }
    },
    clearable: { // 是否显示清除按钮
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    pickerOptions: {
      type: Object,
      default: () => defaultPickerOption()
    },
    placeholder: {
      type: String,
      default: '请选择时间'
    },
    // 范围型时间选择框
    startPlaceholder: {
      type: String,
      default: '开始时间'
    },
    endPlaceholder: {
      type: String,
      default: '结束时间'
    },
    disabledTime: {
      type: Function,
      default: () => {
        return false
      }
    },
    disabledTimeStart: {
      type: Function,
      default: () => {
        return false
      }
    },
    disabledTimeEnd: {
      type: Function,
      default: () => {
        return false
      }
    },
  },
  data() {
    return {
      visible: false,
      time: '',
      oldTime: '',
      visibleTimeRange: false, // 控制时间范围选择面板是否显示
      timeStart: '',
      oldTimeStart: '',
      paneTimeStart: '',
      timeEnd: '',
      oldTimeEnd: '',
      isTimeSelectFocus: false,
    }
  },
  computed: {
    isRangeType() {
      return this.type === 'range'
    },
    minTime() {
      return this.pickerOptions.minTime || defaultPickerOption().minTime
    },
    maxTime() {
      return this.pickerOptions.maxTime || defaultPickerOption().maxTime
    },
    timeList() {
      let { start, end, step, minTime, maxTime } = this.pickerOptions
      if(!start) start = defaultPickerOption().start
      if(!end) end = defaultPickerOption().end
      if(!step) step = defaultPickerOption().step
      if(!minTime) minTime = defaultPickerOption().minTime
      if(!maxTime) maxTime = defaultPickerOption().maxTime
      const result = []
      if (start && end && step) {
        let current = start
        while (compareTime(current, end) <= 0) {
          result.push({
            value: current,
          })
          current = nextTime(current, step)
        }
      }
      return result.map(item => item.value)
    },
    availableTimeList() {
      return this.timeList.filter(item => !this._compareTimeWithMinAndMax(item))
    },
    inputTimeIndex() {
      return this.isValidTimeData(this.time) ? this.time : this.oldTime
    },
    inputTimeStartIndex() {
      return this.isValidTimeStartData(this.paneTimeStart) ? this.paneTimeStart : this.oldTimeStart
    },
    inputTimeEndIndex() {
      return this.isValidTimeEndData(this.timeEnd) ? this.timeEnd : this.oldTimeEnd
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if(this.isRangeType) {
          if(Array.isArray(newVal)) {
            if(this.isValidTimeStartData(newVal[0]) || !newVal[0]) {
              this.timeStart = newVal[0] || ''
              this.paneTimeStart = this.timeStart
              this.oldTimeStart = this.timeStart
            }
            if(this.isValidTimeEndData(newVal[1]) || !newVal[1]) {
              this.timeEnd = newVal[1] || ''
              this.oldTimeEnd = this.timeEnd
            }
          } else {
            this.handleRangeClear()
          }
        } else {
          if(this.isValidTimeData(newVal) || !newVal) {
            this.time = newVal || ''
            this.oldTime = this.time
          }
        }
      }
    },
    oldTime() {
      this.$emit('input', this.oldTime)
    },
    oldTimeEnd() {
      this._setRangeValChange()
    }
  },
  created() {
    document.addEventListener('click', this.handleOtherAreaClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOtherAreaClick)
  },
  methods: {
    _disableTime(item) {
      return this.disabledTime(item) || this._compareTimeWithMinAndMax(item)
    },
    _disableTimeStart(item) {
      return this.disabledTimeStart(item) || this._compareTimeWithMinAndMax(item)
    },
    _disableTimeEnd(item) {
      if(!this.paneTimeStart || !this.availableTimeList.includes(this.paneTimeStart)) return true
      return this.disabledTimeEnd(item) || compareTime(item, this.paneTimeStart) <= 0 || this._compareTimeWithMinAndMax(item)
    },
    _compareTimeWithMinAndMax(item) {
      return compareTime(item, this.minTime || '-1:-1') <= 0 || compareTime(item, this.maxTime || '100:100') >= 0
    },
    /**
     * 单个选择，时间选择框聚焦显示下拉面板
     */
    handleInputFocus() {
      if (!this.disabled) {
        this.visible = true
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpTimePickerDropdown', 'updatePopper')
      }
    },
    /**
     * 单个选择，清除不符合格式的时间值
     */
    handleTimeInputBlur() {
      if(!this.isValidTimeData(this.time)) {
        this.time = this.oldTime
      }
    },
    /**
     * 单个选择，保存旧值，方便当用户输入不符合规范的值时恢复之前的值
     */
    handleTimeClick(time) {
      this.time = time
      this.oldTime = time
      this._hideSingleDropdown()
    },
    /**
     * 单个选择, 用户主动输入监听
     */
    handleTimeInput() {
      if(this.isValidTimeData(this.time)) {
        this.oldTime = this.time
      }
    },
    /**
     * 单个选择, 清空时间
     */
    handleClear() {
      this.time = ''
      this.oldTime = ''
    },
    /**
     * 单个选择, 验证时间值是否是符合格式的
     */
    isValidTimeData(val) {
      return this.availableTimeList.includes(val) && !this._disableTime(val)
    },

    /**
     * 范围选择，范围值开始时间点击
     */
    handleTimeStartClick(timeStart) {
      this.paneTimeStart = timeStart
    },
    /**
     * 范围选择，范围值结束时间点击
     */
    handleTimeEndClick(timeEnd) {
      // 只有当结束时间选择的时候才算一次完整的选择，这个时候给开始值赋值
      this.timeStart = this.paneTimeStart
      this.oldTimeStart = this.paneTimeStart

      // 当用户只修改了前面的值的时候，watcher oldTimeEnd 不会触发值更新，需要手动触发一下
      if(this.oldTimeEnd === timeEnd) {
        this.timeEnd = timeEnd
        this.oldTimeEnd = timeEnd
        this._setRangeValChange()
      } else {
        this.timeEnd = timeEnd
        this.oldTimeEnd = timeEnd
      }
      this._restRangeRelative()
    },
    /**
     * 单个选择/范围选择，点击其他区域触发事件
     */
    handleOtherAreaClick(e) {
      if(!this.$el.contains(e.target) && e.target != document.body) {
        if(this.isRangeType) {
          this.visibleTimeRange && this._restRangeRelative()
        } else {
          this.visible && this._hideSingleDropdown()
        }
      }
    },
    /**
     * 范围选择，范围开始时间输入监听
     */
    handleTimeStartInput() {
      if(this.isValidTimeStartData(this.timeStart)) {
        if(this.oldTimeEnd && compareTime(this.timeStart, this.oldTimeEnd) >= 0 ) return
        this.oldTimeStart = this.timeStart
        this.paneTimeStart = this.timeStart
        
        this._setRangeValChange()
      }
    },
    /**
     * 范围选择，结束时间输入监听
     */
    handleTimeEndInput() {
      if(this.isValidTimeEndData(this.timeEnd)) {
        this.oldTimeEnd = this.timeEnd
      }
    },
    /**
     * 范围选择，范围点击显示下拉面板
     */
    handleRangeClick() {
      if (!this.disabled) {
        this.isTimeSelectFocus = true
        this.visibleTimeRange = true
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpTimePickerDropdown', 'updatePopper')
      }
    },
   
    /**
    * 范围选择，清除不符合格式的时间范围开始值
    */
    handleTimeStartInputBlur() {
      if(this.isValidTimeStartData(this.timeStart)) {
        if(this.oldTimeEnd && compareTime(this.timeStart, this.oldTimeEnd) >= 0 ) {
          this.timeStart = this.oldTimeStart
          return
        }
        this.oldTimeStart = this.timeStart
        this.paneTimeStart = this.timeStart
      } else {
        this.timeStart = this.oldTimeStart
      }
    },
    /**
    * 范围选择，清除不符合格式的时间范围结束值
    */
    handleTimeEndInputBlur() {
      if(!this.isValidTimeEndData(this.timeEnd)) {
        this.timeEnd = this.oldTimeEnd
      }
    },
    /**
    * 范围选择，验证开始时间值是否是符合格式的
    */
    isValidTimeStartData(val) {
      return this.availableTimeList.includes(val) && !this._disableTimeStart(val)
    },
    /**
    * 范围选择，验证结束时间值是否是符合格式的
    */
    isValidTimeEndData(val) {
      const result = this.availableTimeList.includes(val) && !this._disableTimeEnd(val)
      if(val && this.timeStart) {
        return result && compareTime(val, this.oldTimeStart) > 0
      }
      return result
    },
    /**
     * 清空时间范围的数据
     */
    handleRangeClear() {
      this.timeStart = ''
      this.timeEnd = ''
      this.paneTimeStart = ''
      this.oldTimeStart = ''
      this.oldTimeEnd = ''
    },
    /**
     * 单个选择/范围选择，点亮选择的值
     */
    timeIndex(val) {
      return this.timeList.findIndex(item => item === val)
    },
    /**
     * 范围，触发值校验
     */
    _dispatchRangeTimeValidate(type) {
      const rangeVal = !this.oldTimeStart && !this.oldTimeEnd ? [] : [this.oldTimeStart, this.oldTimeEnd]
      this.dispatch('SpFormItem', type === 'blur' ? 'sp.form.blur' : 'sp.form.change', rangeVal)
    },
    /**
     * 单个选择，重置时间选择状态
     */
    _hideSingleDropdown() {
      this.visible = false
    },
    /**
     * 范围选择，重置时间范围选择状态
     */
    _restRangeRelative() {
      this.isTimeSelectFocus = false
      this.visibleTimeRange = false
      // 重置范围的临时值
      this.paneTimeStart = this.oldTimeStart
      this._dispatchRangeTimeValidate('blur')
    },
    /**
     * 范围选择，触发值更新
     */
    _setRangeValChange() {
      const rangeVal = !this.oldTimeStart && !this.oldTimeEnd ? [] : [this.oldTimeStart, this.oldTimeEnd]
      this.$emit('input', rangeVal)
      this._dispatchRangeTimeValidate('change')
    },
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/mixin";
@import "~sparta/common/scss/variable";
.sp-time-select {
  &.is--focus  {
    .sp-time-select__range {
      outline: none;
      border-color: $color-primary;
      box-shadow: $input-box-shadow-focus;
    }
  }
  &__range {
    @include clearfix();
    border: $data-picker-range-border;
    border-radius: $input-border-radius;
    transition: $transition-all;
    &.is--disabled {
      background-color: #f0f3f7;
      border-color: #d5d9e0;
      color: #c7cbd1;
      cursor: not-allowed;
    }
  }
  &__range-start {
    float: left;
    left: 50%;
  }
  &__range-start, &__range-end {
    width: 50%;
    float: left;
    overflow: hidden;
    .sp-input .sp-input__inner {
      border: none;
      &:focus {
        box-shadow: none;
      }
    }
  }
  &__range-end {
    .sp-input {
     display: inline-table;
      &::before {
        content: '一';
        width: 10px;
        color: #d5d9e0;
        display: table-cell;
      }
    }
  }
  &__dropdown {
    &.is--single-dropdown {
      .sp-time-picker-pane {
        width: 100%;
      }
    }
    &.is--range-dropdown {
      .sp-time-picker-pane {
        width: 50%;
      }
    }
  }
}
</style>