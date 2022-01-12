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
            <sp-time-picker-pane :index="timeIndex(oldTime)">
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
            :placeholder="startPlaceholder"
            prefix-icon="sp-icon-clock"
            @blur="handleTimeStartInputBlur"
          />
        </div>
        <div class="sp-time-select__range-end">
          <sp-input
            v-model="timeEnd"
            :disabled="disabled"
            :placeholder="endPlaceholder"
            :clearable="clearable"
            @clear="handleRangeClear"
            @blur="handleTimeEndInputBlur"
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
            <sp-time-picker-pane :index="timeIndex(oldTimeStart)">
              <sp-time-picker-option
                v-for="(item, index) in timeList"
                :key="item"
                :disabled="_disableTimeStart(item)"
                :text="item"
                :index="index"
                @click="handleTimeStartClick(item)"
              />
            </sp-time-picker-pane>
            <sp-time-picker-pane :index="timeIndex(oldTimeEnd)">
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
      default: 'timeselect',
      validator(val) {
        return ['timeselect', 'timeselectrange'].includes(val)
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
      timeEnd: '',
      oldTimeEnd: '',
      isTimeSelectFocus: false,
    }
  },

  computed: {
    isRangeType() {
      return this.type === 'timeselectrange'
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
  },

  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if(this.isRangeType && Array.isArray(newVal)) {
          if(this.isValidData(newVal[0],'start')) {
            this.timeStart = newVal[0]
            this.oldTimeStart = newVal[0]
          }
          if(this.isValidData(newVal[1],'end')) {
            this.timeEnd = newVal[1]
            this.oldTimeEnd = newVal[1]
          }
        } else {
          if(this.isValidData(newVal,'start')) {
            this.time = newVal
            this.oldTime = newVal
          }
        }
      }
    },
    oldTime() {
      this.$emit('input', this.oldTime)
      this.dispatch('SpFormItem', 'sp.form.change', this.oldTime)
    },
    oldTimeStart() {
      this.$emit('input', [this.oldTimeStart, this.oldTimeEnd])
      this.dispatch('SpFormItem', 'sp.form.change', [this.oldTimeStart, this.oldTimeEnd])
    },
    oldTimeEnd() {
      this.$emit('input', [this.oldTimeStart, this.oldTimeEnd])
      this.dispatch('SpFormItem', 'sp.form.change', [this.oldTimeStart, this.oldTimeEnd])
    },
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
      if(!this.timeStart || !this.isValidData(this.timeStart, 'start')) return true
      return this.disabledTimeEnd(item) || compareTime(item, this.timeStart) <= 0 || this._compareTimeWithMinAndMax(item)
    },

    _compareTimeWithMinAndMax(item) {
      return compareTime(item, this.minTime || '-1:-1') <= 0 || compareTime(item, this.maxTime || '100:100') >= 0
    },
    /**
     * 单个选择，保存旧值，方便当用户输入不符合规范的值时恢复之前的值
     */
    handleTimeClick(time) {
      this.time = time
      this.oldTime = time
      this._resetAllVisible()
    },
    /**
     * 范围值开始时间点击
     */
    handleTimeStartClick(timeStart) {
      this.timeStart = timeStart
      this.oldTimeStart = timeStart

      if(this.oldTimeEnd || this.timeEnd) {
        this.timeEnd = ''
        this.oldTimeEnd = ''
      }
    },
    /**
     * 范围值结束时间点击
     */
    handleTimeEndClick(timeEnd) {
      this.timeEnd = timeEnd
      this.oldTimeEnd = timeEnd

      this._resetRangeAllVisible()
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
      // timeselectrange 类型
      if (
        this.isRangeType &&
        !this.$el.contains(e.target) &&
        e.target != document.body &&
        this.visibleTimeRange
      ) {
        this._resetRangeAllVisible()
      }
    },
    handleInputFocus() {
      if (!this.disabled) {
        this.visible = true
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpTimePickerDropdown', 'updatePopper')
      }
    },
    /**
     * 范围点击
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
    * 清除不符合格式的时间值
    */
    handleTimeInputBlur() {
      if(this.isValidData(this.time, 'start')) {
        this.oldTime = this.time
      } else if(this.time) {
        this.time = this.oldTime
      }
    },
    /**
    * 清除不符合格式的时间范围开始值
    */
    handleTimeStartInputBlur() {
      if(this.isValidData(this.timeStart, 'start')) {
        this.oldTimeStart = this.timeStart
      } else if(this.timeStart) {
        this.timeStart = this.oldTimeStart
      }
    },
    /**
    * 清除不符合格式的时间范围结束值
    */
    handleTimeEndInputBlur() {
      if(this.isValidData(this.timeEnd, 'end')) {
        this.oldTimeEnd = this.timeEnd
      } else if(this.timeEnd) {
        this.timeEnd = this.oldTimeEnd
      }
    },
    /**
     * 验证时间值是否是符合格式的
     */
    isValidData(val, type) {
      const inTimeList = this.availableTimeList.includes(val)
      if(type === 'end' && val && this.timeStart) {
        return inTimeList && compareTime(val, this.timeStart) > 0
      }
      return inTimeList
    },
    /**
     * 清空时间
     */
    handleClear() {
      this.time = ''
      this.oldTime = ''
    },
    /**
     * 清空时间范围的数据
     */
    handleRangeClear() {
      this.timeStart = ''
      this.timeEnd = ''
      this.oldTimeStart = ''
      this.oldTimeEnd = ''
    },
    /**
     * 点亮选择的值
     */
    timeIndex(val) {
      return this.timeList.findIndex(item => item === val)
    },
    /**
     * 重置时间选择状态
     */
    _resetAllVisible() {
      this.visible = false
    },
    /**
     * 重置时间范围选择状态
     */
    _resetRangeAllVisible() {
      this.isTimeSelectFocus = false
      this.visibleTimeRange = false
    }
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