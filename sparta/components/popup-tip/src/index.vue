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
  >
    <div class="sp-popup-tip__content">
      <slot></slot>
    </div>
    <!-- 弹层 -->
    <sp-popup-tip-wrap
      v-model="visible"
      :class="[
        {'has--border': hasBorder},
        `is--theme-${theme}`
      ]"
      :scroll-bing-element="scrollBingElement"
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
        return ['white', 'blue'].indexOf(val) !== -1
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

    scrollBingElement: {}
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
      } else {
        this.broadcast('SpPopupTipWrap', 'destroyPopper')
      }
    }
  },

  methods: {
    handleMouseenter() {
      this.visible = true
      this.timeId && clearTimeout(this.timeId)
    },
    handleMouseleave() {
      this.timeId = setTimeout(() => {
        this.visible = false
      }, 200)
    },
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