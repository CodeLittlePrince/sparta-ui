<template>
  <div
    v-show="value"
    class="sp-dropdown-item-wrap"
    :style="{ minWidth }"
    @click="handleClick"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <slot></slot>
  </div>
</template>

<script>
import Popper from 'sparta/common/js/mixins/vue-popper'

export default {
  name: 'SpDropdownItemWrap',

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
      minWidth: ''
    }
  },

  mounted() {
    this.referenceElm = this.$parent.$refs.dropdown
    this.popperElm = this.$el
    // 监听dropdown的事件（那边会广播下发）
    this.$on('updatePopper', () => {
      if (this.$parent.visible) this.updatePopper()
    })
    this.$on('destroyPopper', this.destroyPopper)
  },

  methods: {
    handleMouseenter() {
      this.$emit('mouseenter')
    },
    handleMouseleave() {
      this.$emit('mouseleave')
    },
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
