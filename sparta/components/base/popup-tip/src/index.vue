<template>
  <div
    ref="popupTip"
    class="sp-popup-tip"
    :class="[
      {'has--border': hasBorder},
      `is--theme-${theme}`
    ]"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    @click="handleToggleClick"
  >
    <div class="sp-popup-tip__content">
      <slot></slot>
    </div>
    <!-- 弹层 -->
    <sp-popup-tip-wrap
      v-model="visible"
      :class="[
        {'has--border': hasBorder},
        `is--theme-${theme}`,
        customClass
      ]"
      :placement="placement"
      :popper-scroll-bind-elem="popperScrollBindElem"
      :append-to-body="appendToBody"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseleave"
    >
      <transition name="sp-zoom-in-top">
        <div>
          <slot name="popup"></slot>
        </div>
      </transition>
    </sp-popup-tip-wrap>
  </div>
</template>

<script>
import SpPopupTipWrap from './popup-tip__wrap'
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpPopupTip',

  components: {
    'sp-popup-tip-wrap' : SpPopupTipWrap
  },

  mixins: [Emitter],

  provide() {
    return {
      'SpPopupTip': this
    }
  },

  props: {
    width: {
      type: [String, Number],
      default: '190'
    },

    theme: {
      type: String,
      default: 'white',
      validator(val) {
        return ['white', 'blue', 'red'].indexOf(val) !== -1
      }
    },

    color: {
      type: String,
      default: '#012257'
    },

    hasBorder: {
      type: Boolean,
      default: false
    },
    popperScrollBindElem: {},
    placement: {
      type: String,
      default: 'bottom',
      validator: val => {
        return ['top', 'bottom','left', 'right'].indexOf(val) !== -1
      }
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    // 自定义样式
    customClass: {
      type: String,
      default: ''
    },
    showPopupTipWhenSlot: {
      type: Boolean,
      default: false
    },
    // 消失通过click其它区域触发
    hideByClickOut: {
      type: Boolean,
      default: false
    },
    // freeze开启，mouseenter和mouseleave不再有效果，只能通过show方法显示
    freeze: {
      type: Boolean,
      default: false
    },

    trigger: {
      type: String,
      default: 'hover',
      validator(val) {
        return ['hover', 'click'].indexOf(val) !== -1
      }
    },
  },

  data() {
    return {
      visible: false
    }
  },

  watch: {
    // 监控下拉是否显示
    visible(val) {
      if (val) {
        // 为了每次弹出PopupTipWrap，都会根据处的环境做适应
        this.broadcast('SpPopupTipWrap', 'updatePopper')

        this.$emit('show')
      } else {
        this.broadcast('SpPopupTipWrap', 'destroyPopper')

        this.$emit('hide')
      }
    }
  },
  
  mounted() {
    document.addEventListener('click', this.handleOtherAreaClick)
  },

  beforeDestroy() {
    this._clearTimeId()
    document.removeEventListener('click', this.handleOtherAreaClick)
  },

  methods: {
    handleMouseenter() {
      if(this.trigger !== 'hover') {
        return
      }

      this.showHandle()
    },
    handleMouseleave() {
      if(this.trigger !== 'hover') {
        return
      }

      this.hideHandle()
    },

    handleToggleClick() {
      if (this.trigger === 'click') {
        if(this.visible) {
          this.hideHandle()
          return
        }
        this.showHandle()
      }
    },

    /**
     * 点击其他区域触发事件
     */
    handleOtherAreaClick(e) {
      if (!this.$el.contains(e.target)) {
        this.hide()
      }
    },

    showHandle() {
      if (this.freeze) {
        return
      }

      if(this.showPopupTipWhenSlot && !this.$slots.popup) {
        return
      }

      this._clearTimeId()
      
      this.show()
    },

    hideHandle() {
      if (this.hideByClickOut || this.freeze) {
        return
      }
      this.hide()
    },

    hide() {
      this.timeId = setTimeout(() => {
        this.visible = false
      }, 200)
    },

    show() {
      this.visible = true
    },

    _clearTimeId() {
      this.timeId && clearTimeout(this.timeId)
    }
  }
}
</script>

<style lang="scss">
.sp-popup-tip {
  display: inline-block;

  &__wrap {
    font-size: 12px;
    line-height: 1.5;
    color: $color-text-secondary;
    text-align: left;
    margin-top: 7px;
    padding: 6px 10px;
    border-radius: 2px;
    box-sizing: border-box;
    background-color: #fff;

    &.has--border {
      border: 1px solid $border-color-base;
      box-shadow: 0 4px 12px 0 rgb(1 34 87 / 9%);

      &::before {
        border-bottom-color: $border-color-base;
      }
    }
    &.is--theme-blue {
      background-color: #f0f3f7;
      &::after {
        border-bottom-color: #f0f3f7;
      }
    }
    &.is--theme-red {
      &.has--border {
        border: 1px solid #fb791b;
        box-shadow: none;
      }
      background-color: #ffeceb;
      &::before {
        border-bottom-color: #fb791b;
      }
      &::after {
        border-bottom-color: #ffeceb;
      }
    }

    &::before,
    &::after {
      position: absolute;
      top: -6px;
      content: "";
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
    }

    &::before {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 6px solid #fff;
    }

    &::after {
      top: -4px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 6px solid #fff;
    }

    &.arrow--bottom {
      margin-bottom: 6px;
      &::before, &::after {
        top: auto;
        bottom: -6px;
        border: none;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #fff;
      }
      &::after {
        bottom: -4px;
      }
      &.has--border {
        &::before {
          border-top-color: $border-color-base;
        }
      }
      &.is--theme-blue {
        &::after {
          border-top-color: #f0f3f7;
        }
      }
      &.is--theme-red {
        margin-bottom: 9px;
        &::before {
          border-top-color: #fb791b;
        }
        &::after {
          border-top-color: #ffeceb;
        }
      }
    }
    &.arrow--left {
      margin-left: 9px;
      margin-bottom: 8px;
      &::before, &::after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border: none;
        top: 50%;
        transform: translateY(-50%);
        left: -6px;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
      &::before {
        border-right: 6px solid $border-color-base;
      }
      &::after {
        border-right: 6px solid #fff;
      }
      &.has--border {
        &::after {
          left: -4px;
        }
        &::before {
          border-right-color: $border-color-base;
        }
      }
      &.is--theme-blue {
        &::after {
          border-right-color: #f0f3f7;
        }
      }
      &.is--theme-red {
        &::before {
          border-right-color: #fb791b;
        }
        &::after {
          border-right-color: #ffeceb;
        }
      }
    }
    &.arrow--right {
      margin-right: 8px;
      margin-bottom: 6px;
      &::before, &::after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border: none;
        top: 50%;
        left: auto;
        transform: translateY(-50%);
        right: -6px;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
      &::before {
        border-left: 6px solid $border-color-base;
      }
      &::after {
        border-left: 6px solid #fff;
      }
      &.has--border {
        &::after {
          right: -4px;
        }
        &::before {
          border-left-color: $border-color-base;
        }
      }
      &.is--theme-blue {
        &::after {
          border-left-color: #f0f3f7;
        }
      }
      &.is--theme-red {
        &::before {
          border-left-color: #fb791b;
        }
        &::after {
          border-left-color: #ffeceb;
        }
      }
    }

    a,
    i {
      font-size: 12px;
    }

    a {
      cursor: pointer;
    }
  }
}
</style>