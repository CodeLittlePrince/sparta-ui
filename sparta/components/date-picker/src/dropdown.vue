<template>
  <div
    v-show="value"
    class="sp-date-picker-dropdown"
    :style="{ minWidth }"
  >
    <slot></slot>
  </div>
</template>

<script>
import Popper from 'sparta/common/js/mixins/vue-popper'
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpDatePickerDropdown',

  mixins: [Popper, Emitter],
  
  provide() {
    return {
      'SpDatePickerDropdown': this
    }
  },

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
        this.broadcast('SpDatePickerPane', 'updateScroll')
      }
    }
  },

  mounted() {
    this.referenceElm = this.$parent.$refs.spDatePicker
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

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-date-picker__dropdown {
  box-sizing: border-box;
  margin: 5px 0;

  &__box {
    border: $date-picker-border;
    border-radius: $date-picker-border-radius;
    box-shadow: $float-box-shadow-box;
    background-color: $date-picker-pane-background;
    @include clearfix();

    > div {
      @include clearfix();
    }

    .sp-time-picker {
      width: 280px;
      height: 275px;

      &-pane {
        width: 33.3%;
        max-height: 275px;
      }
    }
  }
}
</style>