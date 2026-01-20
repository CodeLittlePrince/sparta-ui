<template>
  <div class="sp-toast" :class="className">
    <div
      class="sp-toast__box"
      :class="`${toastAnimateClass}`"
      :style="`z-index: ${zIndex};`"
    >
      <!-- body -->
      <div class="sp-toast__content" :class="`sp-toast-${type}`">
        <slot>{{ message }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import PopManage from 'sparta/model/PopManage'

export default {
  name: 'SpToast',

  data() {
    return {
      visible: false,
      toastAnimateClass: 'toast-fade-in-down animated',
      duration: 3000,
      message: '',
      type: '',
      zIndex: 1,
      className: '',
    }
  },

  created() {
    const popManage = PopManage.getInstance()
    this.zIndex = popManage.getZIndex()
  },

  mounted() {
    this.startTimer()
  },

  beforeDestroy() {
    this.clearTimer()
  },

  methods: {
    clearTimer() {
      clearTimeout(this.timer)
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.toastAnimateClass = 'toast-fade-out-up animated'
          // 为了动画更自然，加个延时
          setTimeout(() => {
            this.visible = false
            this.destroyElement()
          }, 200)
        }, this.duration)
      }
    },

    destroyElement() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
      this.$destroy(true)
    }
  }
}
</script>

<style lang="scss">
.sp-toast {
  &__box {
    position: fixed;
    left: 50%;
    top: $toast-top;
    width: 520px;
    transform: $toast-transform;
    text-align: center;

    .sp-toast__content {
      display: inline-block;
      min-width: 160px;
      padding: $toast-padding;
      line-height: 1.5;
      border-radius: $toast-border-radius;
      border-style: solid;
      border-width: 1px;
      text-align: center;
      font-size: $toast-font-size;
      box-sizing: border-box;
      background-color: $toast-background-info;
      border-color: $border-color-base;
      color: $toast-color-info;
    }
  }
}
</style>