<template>
  <div class="sp-toast" :class="className">
    <div
      class="sp-toast__contain"
      :class="`sp-toast-${type} ${toastAnimateClass}`"
      :style="`z-index: ${zIndex};`"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <!-- body -->
      <div class="sp-toast__body">
        <i :class="`sp-icon-${type}`"></i>
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
  &__contain {
    position: fixed;
    display: inline-block;
    left: 50%;
    top: $toast-top;
    transform: $toast-transform;
    min-width: 160px;
    max-width: 680px;
    border-radius: $toast-border-radius;
    border-style: solid;
    border-width: 1px;
    text-align: center;
    font-size: $toast-font-size;
    box-sizing: border-box;
    .sp-toast__body {
      padding: $toast-padding;
      line-height: 1.2;
    }
  }
  &-error {
    background-color: $toast-background-error;
    border-color: $toast-color-error;
    color: $toast-color-error;
  }
  &-success {
    background-color: $toast-background-success;
    border-color: $toast-color-success;
    color: $toast-color-success;
  }
  &-warning {
    background-color: $toast-background-warning;
    border-color: $toast-color-warning;
    color: $toast-color-warning;
  }
  &-info {
    background-color: $toast-background-info;
    border-color: $toast-color-info;
    color: $toast-color-info;
  }
}
</style>