<template>
  <div class="sp-time-picker-pane">
    <ul
      ref="dropdown"
      class="sp-time-picker-pane__list"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpTimePickerPane',

  mixins: [Emitter],

  provide() {
    return {
      'SpTimePickerPane': this
    }
  },

  props: {
    index: {
      type: [Number],
      default: 0
    }
  },

  data() {
    return {
      activeIndex: this.index
    }
  },

  watch: {
    index(val) {
      this.activeIndex = val
      this.broadcast('SpTimePickerOption', 'IndexChange')
      val !== -1 && this._scrollToView()
    }
  },

  mounted() {
    this._scrollToView()

    this.$on('updateScroll', () => {
      this._scrollToView()
    })
  },

  methods: {
    /**
     * 将点亮的条目滚入可见区域
     */
    _scrollToView() {
      this.$nextTick(() => {
        const dropdown = this.$refs.dropdown
        const children = dropdown?.children
        const dropdownTop = dropdown.parentNode.scrollTop
        const dropdownStyle = window.getComputedStyle(dropdown.parentNode)
        const dropdownHeight = parseFloat(dropdownStyle.height)
        let stepDistance = 0
        let offset = 0
        if (children && children.length) {
          stepDistance = parseFloat(window.getComputedStyle(dropdown.children[0]).height)
        }
        if (this.activeIndex !== -1) {
          const indexOptionTop = stepDistance * (this.activeIndex + 1)
          // 1 index在视窗之下 indexOptionTop - dropdownHeight + fix padding
          // 2 index在视窗之上 indexOptionTop - stepDistance + fix padding
          // 3 index在视窗之中 dropdownTop
          if (indexOptionTop - dropdownHeight - dropdownTop > 0) {
            offset = indexOptionTop - dropdownHeight + parseInt(dropdownStyle.paddingTop)
          } else if (dropdownTop - indexOptionTop + stepDistance >= 0) {
            offset = indexOptionTop - stepDistance + parseInt(dropdownStyle.paddingBottom)
          } else {
            offset = dropdownTop
          }
        }
        dropdown.parentNode.scrollTop = offset
      })
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/mixin";

.sp-time-picker-pane {
  width: 33.3%;
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
</style>
