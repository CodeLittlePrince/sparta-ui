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
import tool from '../tool'
import Emitter from 'sparta/common/js/mixins/emitter'
import SpTimePickerDropdown from './time-picker-dropdown'
import SpTimePickerPane from './time-picker-pane'
import SpTimePickerOption from './time-picker-option'

export default {
  name: 'SpTimePicker',

  components: {
    'sp-time-picker-dropdown': SpTimePickerDropdown,
    'sp-time-picker-pane': SpTimePickerPane,
    'sp-time-picker-option': SpTimePickerOption
  },

  provide() {
    return {
      'SpTimePicker': this
    }
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
        rst.push(tool.formatNumberTo2digits(i))
      }
      return rst
    },

    // 分列表
    minuteList() {
      let rst = []
      for (let i = 0; i < 60; i++) {
        rst.push(tool.formatNumberTo2digits(i))
      }
      return rst
    },

    // 秒列表
    secondList() {
      let rst = []
      for (let i = 0; i < 60; i++) {
        rst.push(tool.formatNumberTo2digits(i))
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
    _valiate() {
      const pieces = this.model.split(':')
      const len = pieces.length
      for (let i = 0; i < len; i++) {
        if (pieces[i].length !== 2) {
          return false
        }
      }
      if (this.needSecond && len === 3) {
        return true
      } else if ((!this.needSecond) && len === 2) {
        return true
      } else {
        return false
      }
    },
    /**
     * 初始化时间
     */
    _calTime() {
      if (this._valiate()) {
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
      if (this.currentValue !== undefined) {
        this.$nextTick(() => this.scrollToView())
      }
      // 为了每次弹出dropdown，都会根据处的环境做适应
      this.broadcast('SpTimePickerDropdown', 'updatePopper')
    },
    
    /**
     * 清除不符合格式的值
     */
    handleInputBlur() {
      if (!this._valiate()) {
        this.$emit('input', '')
        this.model = ''
      }
    },

    /**
     * 点击其他区域触发事件
     */
    handleOtherAreaClick(e) {
      if (!this.$el.contains(e.target)){
        this.isFocus = false
        this.visible = false
      }
    },

    handleHourClick(hour) {
      this.hour = hour
    },

    handleMinuteClick(minute) {
      this.minute = minute
    },

    handleSecondClick(second) {
      this.second = second
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-time-picker {
  &__dropdown {
    border: $time-picker-border;
    border-radius: $time-picker-border-radius;
    box-shadow: $flot-box-shadow-box;
    box-sizing: border-box;
    background-color: $time-picker-pane-background;
    margin: 5px 0;

    &__box {
      @include clearfix();
    }
  }

  &-pane {
    width: $time-picker-pane-width;
    float: left;
    max-height: $time-picker-pane-max-height;
    box-sizing: border-box;
    border-left: $time-picker-pane-border;
    overflow-y: hidden;
    overflow-x: hidden;

    &:first-child {
      border-left: none;
    }

    &__list {
      width: 100%;
    }

    &:hover {
      overflow-y: auto;
    }
  }

  &-option {
    width: 100%;
    height: $time-picker-option-height;
    line-height: $time-picker-option-height;
    text-align: left;
    padding-left: 10px;
    user-select: none;
    transition: $transition-all;
    color: $time-picker-option-color;
    box-sizing: border-box;
    font-size: $time-picker-option-font-size;
    cursor: pointer;

    &.is-hover {
      background-color: $select-dropdown-item-background-hover;
    }

    &.is-selected {
      color: $time-picker-option-color--is-selected;
      font-weight: bold;
    }

    &.is-disabled {
      color: $time-picker-option-color--is-disabled;
      cursor: not-allowed;
    }
  }
}
</style>
