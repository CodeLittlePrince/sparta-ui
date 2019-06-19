<template>
  <li
    class="sp-time-picker-option"
    :class="{
      'is-selected': isSelect,
      'is-disabled': disabled,
      'is-hover': hover
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    {{ text }}
  </li>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpTimePickerOption',

  inject: {
    'SpTimePicker': {
      default: ''
    },
    'SpTimePickerPane': {
      default: ''
    }
  },

  mixins: [Emitter],

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      hover: false,
      isSelect: false
    }
  },

  mounted() {
    this._initActive()
  },

  methods: {
    _initActive() {
      // 默认点亮
      if (this.SpTimePickerPane.activeIndex === this.index) {
        this.isSelect = true
      }
      // 监听clear
      this.$on('clearSelect', () => {
        this._clearAllSelect()
        // 滚回顶部
        this.SpTimePickerPane.$el.scrollTop = 0
      })
      // 监听activeIndex变化了
      this.$on('IndexChange', () => {
        this.isSelect = this.SpTimePickerPane.activeIndex == this.index
      })
    },

    /**
     * 把兄弟节点的点亮状态全部清空
     */
    _clearAllSelect() {
      this.SpTimePickerPane.$children.forEach(item => {
        item.isSelect = false
      })
    },

    handleMouseEnter() {
      this.hover = true
    },

    handleMouseLeave() {
      this.hover = false
    },

    handleClick() {
      if (!this.disabled) {
        this.$emit('click')
        this.SpTimePicker._setTime()
        // 点亮条目
        this.SpTimePickerPane.activeIndex = this.index
      }
    }
  }
}
</script>
