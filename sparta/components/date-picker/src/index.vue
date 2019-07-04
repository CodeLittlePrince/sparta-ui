<template>
  <div
    ref="spDatePicker"
    class="sp-date-picker"
  >
    <sp-input
      ref="spInput"
      v-model="model"
      clearable
      :disabled="disabled"
      :placeholder="placeholder"
      suffix-icon="sp-icon-time"
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
          <div v-show="visiblePaneDate">
            <sp-date-picker-pane />
          </div>
          <div v-show="visiblePaneYear">
            <sp-date-picker-pane-year />
          </div>
          <div v-show="visiblePaneMonth">
            <sp-date-picker-pane-month />
          </div>
        </div>
      </transition>
    </sp-date-picker-dropdown>
  </div>
</template>

<script>
import tool from '../tool'
import Emitter from 'sparta/common/js/mixins/emitter'
import SpDatePickerDropdown from './dropdown'
import SpDatePickerPane from './pane'
import SpDatePickerPaneYear from './pane-year'
import SpDatePickerPaneMonth from './pane-month'

export default {
  name: 'SpDatePicker',

  components: {
    'sp-date-picker-dropdown': SpDatePickerDropdown,
    'sp-date-picker-pane': SpDatePickerPane,
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
    value: String,
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
    }
  },

  data() {
    return {
      visible: false,
      visiblePaneDate: true,
      visiblePaneYear: false,
      visiblePaneMonth: false,
      model: this.value,
      day: '',
      month: '',
      year: '',
      calDay: '',
      calMonth: '',
      calYear: '',
      todayDay: '',
      todayMonth: '',
      todayYear: ''
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
    }
  },

  created() {
    if (this.disabled) {
      return
    }
    this._setDefault()
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
        this.year = pieces[0]
        this.month = pieces[1] - 1
        this.day = pieces[2]
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

    /**
     * 点击其他区域触发事件
     */
    handleOtherAreaClick(e) {
      if (!this.$el.contains(e.target) && e.target != document.body){
        this.isFocus = false
        this.visible = false
        this.visiblePaneDate = true
        this.visiblePaneYear = false
        this.visiblePaneMonth = false
      }
    },
  },
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-date-picker {
  color: $date-picker-color;
}
</style>
