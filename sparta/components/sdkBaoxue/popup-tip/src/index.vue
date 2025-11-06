<template>
  <div
    ref="popupTip"
    class="sp-popup-tip"
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
        customClass,
        'sp-popup-tip__popup'
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
    font-size: 14px;
    line-height: 1.5;
    color: rgb(255 255 255 / 80%);
    text-align: left;
    margin-top: 16px;
    padding: 14px 20px;
    box-sizing: border-box;
    border-radius: 6px;
    box-shadow: $float-box-shadow-box;
    background-color: #252627;

    &::before,
    &::after {
      position: absolute;
      top: -12px;
      content: "";
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 12px solid #4d4d4d;
    }
    &::after {
      top: -11px;
      border-bottom: 12px solid #252627;
    }

    &.arrow--bottom {
      margin-bottom: 14px;
      &::before,
      &::after {
        top: auto;
        bottom: -12px;
        border: none;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 12px solid #4d4d4d;
      }
      &::after {
        bottom: -11px;
        border-top: 12px solid #252627;
      }
    }
    &.arrow--left {
      margin-left: 14px;
      margin-bottom: 17px;
      &::before,
      &::after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border: none;
        top: 50%;
        transform: translateY(-50%);
        left: -12px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 12px solid #848181;
      }
      &::after {
        left: -11px;
        border-right: 12px solid #252627;
      }
    }
    &.arrow--right {
      margin-right: 13px;
      margin-bottom: 16px;
      &::before,
      &::after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border: none;
        top: 50%;
        left: auto;
        transform: translateY(-50%);
        right: -12px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 12px solid #848181;
      }
      &::after {
        right: -11px;
        border-left: 12px solid #252627;
      }
    }

    a,
    i {
      font-size: 16px;
    }

    a {
      cursor: pointer;
    }
  }

  &__popup {
    border: 1px solid #4d4d4d;
    box-shadow: $float-box-shadow-box;
  }
}
</style>