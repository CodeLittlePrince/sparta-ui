<template>
  <div
    v-show="value"
    class="sp-select-dropdown"
    :style="{ minWidth: minWidth }"
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
      default: 'bottom'
    },

    boundariesPadding: {
      default: 0
    },

    visibleArrow: {
      default: true
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

  mounted() {
    this.referenceElm = this.$parent.$refs.selectInput
    this.$parent.popperElm = this.popperElm = this.$el
    // 根据父元素设置高度
    this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px'
    // 监听select的事件（那边会广播下发）
    this.$on('updatePopper', () => {
      if (this.$parent.visible) this.updatePopper()
    })
    this.$on('destroyPopper', this.destroyPopper)
  }
}
</script>

<style lang="scss">

</style>