<template>
  <div class="sp-toast">
    <div
      class="toast"
      :class="`toast-${type} ${toastAnimateClass}`"
      :style="`top: ${top};z-index: ${zIndex};`"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <!-- body -->
      <div class="body">
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
      toastAnimateClass: 'toastFadeInDown animated',
      duration: 3000,
      message: '',
      type: '',
      zIndex: 1,
      top: '35px'
    }
  },

  mounted() {
    this.zIndex = PopManage.zIndex
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
          this.toastAnimateClass = 'toastFadeOutUp animated'
          // 为了动画更自然，加个延时
          setTimeout(() => {
            this.visible = false
            this.destroyElement()
          }, 200)
        }, this.duration)
      }
    },

    destroyElement() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-toast {
  .toast {
    position: fixed;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
    min-width: 160px;
    max-width: 680px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    text-align: center;
    font-size: $toast-font-size;
    box-sizing: border-box;
    .body {
      padding: 11px;
      line-height: 1.2;
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
}
</style>