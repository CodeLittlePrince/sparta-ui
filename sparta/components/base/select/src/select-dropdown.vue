<template>
  <div
    v-show="value"
    class="sp-select-dropdown"
    :style="{ minWidth, maxWidth }"
  >
    <slot></slot>
  </div>
</template>

<script>
import Popper from 'sparta/common/js/mixins/vue-popper'

export default {
  name: 'SpSelectDropdown',

  mixins: [Popper],

  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    visibleArrow: {
      type: Boolean,
      default: false
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      minWidth: 'none',
      maxWidth: 'none'
    }
  },

  mounted() {
    this.referenceElm = this.$parent.$refs['sp-select-input-box']
    this.popperElm = this.$el
    // 根据父元素设置宽度
    // 监听select的事件（那边会广播下发）
    this.$on('updatePopper', () => {
      if (this.$parent.visible) {
        // Popper有可能并不是一开始就出现在dom里的，所以放在更新时候
        const width = this.$parent.$el.getBoundingClientRect().width
        this.minWidth = width + 'px'
        if(this.$parent.limitDropdownWidth) {
          this.maxWidth = (width * 1.5) + 'px'
        }
        // 更新Popper
        this.$nextTick(() => {
          this.updatePopper()
        })
      }
    })
    this.$on('destroyPopper', this.destroyPopper)
  }
}
</script>