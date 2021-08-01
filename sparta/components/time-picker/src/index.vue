<template>
  <div
    ref="spTimePicker"
    class="sp-time-picker"
  >
    <sp-input
      v-model="model"
      clearable
      :disabled="disabled"
      :placeholder="placeholder"
      suffix-icon="sp-icon-time"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
    />
    <!-- 下拉 -->
    <sp-time-picker-dropdown
      ref="sp-time-picker__dropdown"
      v-model="visible"
      class="sp-time-picker__dropdown"
    >
      <transition name="sp-zoom-in-top">
        <div
          v-show="visible"
          class="sp-time-picker__dropdown__box"
        >
          <!-- 时 -->
          <sp-time-picker-pane :index="hourIndex">
            <sp-time-picker-option
              v-for="(item, index) in hourList"
              :key="item"
              :disabled="disableHour(item)"
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
              :disabled="disableMinute(item)"
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
              :disabled="disableSecond(item)"
              type="second"
              :text="item"
              :index="index"
              @click="handleSecondClick(item)"
            />
          </sp-time-picker-pane>
        </div>
      </transition>
    </sp-time-picker-dropdown>
  </div>
</template>

<script>
import format from 'sparta/common/js/utils/format'
import Emitter from 'sparta/common/js/mixins/emitter'
import SpTimePickerDropdown from './dropdown'
import SpTimePickerPane from './pane'
import SpTimePickerOption from './option'

export default {
  name: 'SpTimePicker',

  components: {
    'sp-time-picker-dropdown': SpTimePickerDropdown,
    'sp-time-picker-pane': SpTimePickerPane,
    'sp-time-picker-option': SpTimePickerOption
  },

  mixins: [Emitter],

  props: {
    value: String,
    placeholder: {
      type: String,
      default: '请选择时间'
    },
    needSecond: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disableHour: {
      type: Function,
      default: () => false
    },
    disableMinute: {
      type: Function,
      default: () => false
    },
    disableSecond: {
      type: Function,
      default: () => false
    }
  },

  data() {
    return {
      visible: false,
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
    if (this.disabled) {
      return
    }
    if (this.model) {
      this._calTime()
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

    /**
     * 聚焦处理
     */
    handleInputFocus() {
      this.visible = true
      // 为了每次弹出dropdown，都会根据处的环境做适应
      this.broadcast('SpTimePickerDropdown', 'updatePopper')
    },
    
    /**
     * 清除不符合格式的值
     */
    handleInputBlur() {
      if ((!this._validate()) ||
        this.hourIndex === -1 ||
        this.minuteIndex === -1 ||
        this.secondIndex === -1
      ) {
        this.$emit('input', '')
        this.model = ''
      }
    },

    /**
     * 点击其他区域触发事件
     */
    handleOtherAreaClick(e) {
      if (!this.$el.contains(e.target) && e.target != document.body) {
        this.isFocus = false
        this.visible = false
      }
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
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-time-picker {
  color: $time-picker-color;
}
</style>
