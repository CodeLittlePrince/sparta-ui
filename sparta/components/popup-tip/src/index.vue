<template>
  <div
    class="sp-popup-tip"
    :class="[
      {'has--border': hasBorder},
      `is--theme-${theme}`
    ]"
  >
    <div class="sp-popup-tip__wrap">
      <slot></slot>
      <!-- 弹层 -->
      <div
        class="sp-popup-tip__modal"
        :style="{
          'width': widthComputed,
          'color': color,
          'z-index': modalZIndex
        }"
      >
        <slot name="popup"></slot>
        <!-- 优化hover效果 -->
        <div class="sp-popup-tip__modal__helper"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PopManage from 'sparta/model/PopManage'

export default {
  name: 'SpPopupTip',

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
  },

  data() {
    return {
      modalZIndex: 100
    }
  },

  computed: {
    widthComputed() {
      let rst = this.width

      if (!isNaN(+rst)) {
        rst += 'px'
      }
      return rst
    }
  },

  created() {
    const popManage = PopManage.getInstance()
    this.modalZIndex = popManage.getZIndex()
  }
}
</script>

<style lang="scss">
.sp-popup-tip {
  display: inline-block;

  &__wrap {
    position: relative;

    &:hover {
      .sp-popup-tip__modal {
        display: block;
      }
    }
  }

  &__modal {
    display: none;
    position: absolute;
    font-size: 12px;
    line-height: 1.5;
    color: $color-text-secondary;
    text-align: left;
    padding: 6px 10px;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
    box-sizing: border-box;
    background-color: #fff;

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

    a,
    i {
      font-size: 12px;
    }

    a {
      cursor: pointer;
    }

    &__helper {
      position: absolute;
      background-color: transparent;
      top: -7px;
      left: 0;
      right: 0;
      height: 10px;
    }
  }

  &.has--border &__modal {
    border: 1px solid $border-color-base;
    box-shadow: 0 4px 12px 0 rgb(1 34 87 / 9%);

    &::before {
      border-bottom-color: $border-color-base;
    }
  }

  &.is--theme-blue &__modal {
    background-color: #f0f3f7;
    &::after {
      border-bottom-color: #f0f3f7;
    }
  }
}
</style>