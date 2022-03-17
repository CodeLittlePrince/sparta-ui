<template>
  <div class="sp-time-picker">
    <!-- 时 -->
    <sp-time-picker-pane :index="hourIndex">
      <sp-time-picker-option
        v-for="(item, index) in hourList"
        :key="item"
        :disabled="_disabledHour(item)"
        type="hour"
        :text="item"
        :index="index"
        @click="handleHourClick(item)"
      />
    </sp-time-picker-pane>
    <!-- 分 -->
    <sp-time-picker-pane :index="minuteIndex">
      <sp-time-picker-option
        v-for="(item, index) in minuteList"
        :key="item"
        :disabled="_disabledMinute(item)"
        type="minute"
        :text="item"
        :index="index"
        @click="handleMinuteClick(item)"
        @indexChange="handleIndexChange"
      />
    </sp-time-picker-pane>
    <!-- 秒 -->
    <sp-time-picker-pane
      v-if="needSecond"
      :index="secondIndex"
    >
      <sp-time-picker-option
        v-for="(item, index) in secondList"
        :key="item"
        :disabled="_disabledSecond(item)"
        type="second"
        :text="item"
        :index="index"
        @click="handleSecondClick(item)"
      />
    </sp-time-picker-pane>
  </div>
</template>

<script>
import format from 'sparta/common/js/utils/format'
import Emitter from 'sparta/common/js/mixins/emitter'
import SpTimePickerPane from 'sparta/components/time-picker/src/pane'
import SpTimePickerOption from 'sparta/components/time-picker/src/option'

export default {
  name: 'SpDatePickerPaneTime',

  components: {
    'sp-time-picker-pane': SpTimePickerPane,
    'sp-time-picker-option': SpTimePickerOption
  },

  mixins: [Emitter],

  props: {
    value: String,
    needSecond: {
      type: Boolean,
      default: true
    },
    disabledHour: {
      type: Function,
      default: () => []
    },
    disabledMinute: {
      type: Function,
      default: () => []
    },
    disabledSecond: {
      type: Function,
      default: () => []
    }
  },

  data() {
    return {
      hour: '00',
      minute: '00',
      second: '00',
      model: this.value,
      hourIndex: -1,
      secondIndex: -1,
      minuteIndex: -1
    }
  },

  computed: {
    // 时列表
    hourList() {
      let rst = []
      for (let i = 0; i < 24; i++) {
        rst.push(format.formatNumberTo2digits(i))
      }
      return rst
    },

    // 分列表
    minuteList() {
      let rst = []
      for (let i = 0; i < 60; i++) {
        rst.push(format.formatNumberTo2digits(i))
      }
      return rst
    },

    // 秒列表
    secondList() {
      let rst = []
      for (let i = 0; i < 60; i++) {
        rst.push(format.formatNumberTo2digits(i))
      }
      return rst
    }
  },

  watch: {
    value(val) {
      this.model = val
    },

    model(val) {
      this.$emit('input', val)
      // 如果没有值则取消各项点亮
      if (!val) {
        this.broadcast('SpTimePickerOption', 'clearSelect')
        this._zeroTime()
      } else {
        this._calTime()
      }
    }
  },

  created() {
    if (this.model) {
      this._calTime()
    }
  },

  methods: {
    /**
     * 校验时间格式
     */
    _validate() {
      const pieces = this.model.split(':')
      const len = pieces.length
      for (let i = 0; i < len; i++) {
        if (pieces[i].length !== 2) {
          return false
        }
      }
      if (
        this.needSecond &&
        len === 3 &&
        (-1 < +pieces[0] && +pieces[0] < 24) &&
        (-1 < +pieces[1] && +pieces[1] < 60) &&
        (-1 < +pieces[2] && +pieces[2] < 60)
      ) {
        return true
      } else if (
        (!this.needSecond) &&
        len === 2 &&
        (-1 < +pieces[0] && +pieces[0] < 24) &&
        (-1 < +pieces[1] && +pieces[1] < 60)
      ) {
        return true
      } else {
        return false
      }
    },
    /**
     * 初始化时间
     */
    _calTime() {
      if (this._validate()) {
        const pieces = this.model.split(':')
        
        this.hour = pieces[0]
        this.minute = pieces[1]
        if (this.needSecond) {
          this.second = pieces[2]
        }
        this.hourIndex = +this.hour
        this.minuteIndex = +this.minute
        this.secondIndex = +this.second
      }
    },
    /**
     * 设置时间
     */
    _setTime() {
      if (this.needSecond) {
        this.model = `${this.hour}:${this.minute}:${this.second}`
      } else {
        this.model = `${this.hour}:${this.minute}`
      }
    },

    /**
     * 时间清零
     */
    _zeroTime() {
      this.hourIndex = -1
      this.minuteIndex = -1
      this.secondIndex = -1
      this.hour = '00'
      this.minute = '00'
      this.second = '00'
    },

    handleHourClick(hour) {
      this.hour = hour
      this._setTime()
    },

    handleMinuteClick(minute) {
      this.minute = minute
      this._setTime()
    },

    handleSecondClick(second) {
      this.second = second
      this._setTime()
    },

    handleIndexChange(type) {
      if (type === 'hour' ) {
        this.hourIndex = -1
      }
      if (type === 'minute') {
        this.minuteIndex = -1
      }
      if (type === 'second') {
        this.secondIndex = -1
      }
    },
    _disabledHour(item) {
      const disableList = this.disabledHour() || []
      return disableList.includes(+item)
    },
    _disabledMinute(item) {
      const disableList = this.disabledMinute() || []
      return disableList.includes(+item)
    },
    _disabledSecond(item) {
      const disableList = this.disabledSecond() || []
      return disableList.includes(+item)
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/mixin";

.sp-time-picker {
  @include clearfix();
  color: $time-picker-color;
}
</style>
