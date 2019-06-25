<template>
  <div
    v-show="value"
    class="sp-time-picker-dropdown"
    :style="{ minWidth }"
  >
    <slot></slot>
  </div>
</template>

<script>
import Popper from 'sparta/common/js/mixins/vue-popper'
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpTimePickerDropdown',
  
  provide() {
    return {
      'SpTimePickerDropdown': this
    }
  },

  mixins: [Popper, Emitter],

  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      minWidth: ''
    }
  },

  watch: {
    value(val) {
      if (val) {
        this.broadcast('SpTimePickerPane', 'updateScroll')
      }
    }
  },

  mounted() {
    this.referenceElm = this.$parent.$refs.spTimePicker
    this.popperElm = this.$el
    // 根据父元素设置宽度
    // 监听select的事件（那边会广播下发）
    this.$on('updatePopper', () => {
      if (this.$parent.visible) {
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