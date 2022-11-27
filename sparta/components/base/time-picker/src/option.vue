<template>
  <li
    class="sp-time-picker-option"
    :class="{
      'is--selected': isSelect,
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

  mixins: [Emitter],

  inject: {
    'SpTimePickerPane': {
      default: ''
    }
  },

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
        if (!this.disabled) {
          this.isSelect = this.SpTimePickerPane.activeIndex == this.index
        } else if (this.SpTimePickerPane.activeIndex == this.index) {
          this.$emit('indexChange', this.type)
        }
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
        // 点亮条目
        this.SpTimePickerPane.activeIndex = this.index
      }
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/base/mixin";

.sp-time-picker-option {
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

  &.is--selected {
    color: $time-picker-option-color--is-selected;
    font-weight: bold;
  }

  &.is-disabled {
    color: $time-picker-option-color--is-disabled;
    cursor: not-allowed;
  }
}
</style>