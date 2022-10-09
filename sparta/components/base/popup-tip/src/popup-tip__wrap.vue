<template>
  <div
    v-show="value"
    class="sp-popup-tip__wrap"
    :class="{'arrow--bottom': placementIsTop }"
    :style="{
      'width': widthComputed,
      'color': SpPopupTip.color
    }"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <slot></slot>
  </div>
</template>

<script>
import Popper from 'sparta/common/js/mixins/vue-popper'
export default {
  name: 'SpPopupTipWrap',

  mixins: [Popper],

  inject: ['SpPopupTip'],


  data() {
    return {
      placementIsTop: false
    }
  },
   
  computed: {
    widthComputed() {
      let rst = this.SpPopupTip.width

      if (!isNaN(+rst)) {
        rst += 'px'
      }
      return rst
    }
  },

  mounted() {
    this.referenceElm = this.$parent.$refs.popupTip
    this.popperElm = this.$el
    // 监听popupTip的事件（那边会广播下发）
    this.$on('updatePopper', () => {
      if (this.$parent.visible) {
        this.$nextTick(() => {
          this.updatePopper()
          // 修改箭头显示方向
          this.$el && (this.placementIsTop = this.$el.getAttribute('x-placement') === 'top')
        })
      }
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