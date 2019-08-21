<template>
  <div class="sp-modal">
    <transition
      name="sp-modal-fade"
      @after-leave="handleAfterLeave"
    >
      <div
        v-show="visible"
        class="sp-modal-wrap"
        :style="`z-index: ${modalWrapperZIndex}`"
      >
        <div
          class="sp-modal-content"
          :style="`margin-top: ${top}; width: ${width}px`"
        >
          <!-- head -->
          <div class="sp-modal__head">
            <span>{{ title }}</span>
            <div
              v-if="hasClose"
              class="sp-modal__head__close"
              @click="modalValue = false"
            >
              <i class="sp-icon-close"></i>
            </div>
          </div>
          <!-- body -->
          <div class="sp-modal__body">
            <slot></slot>
          </div>
          <!-- foot -->
          <div class="sp-modal__foot">
            <slot name="foot"></slot>
          </div>
        </div>
      </div>
    </transition>
    <!-- mask -->
    <transition name="sp-fade">
      <div
        v-show="visible"
        class="sp-modal__mask"
        :style="`z-index: ${modalMaskZIndex}`"
      ></div>
    </transition>
  </div>
</template>

<script>
import PopManage from 'sparta/model/PopManage'

export default {
  name: 'SpModal',

  props: {
    'value': {
      type: Boolean,
      default: false,
    },
    'width': {
      type: [String, Number],
      default: 500,
    },
    'top': {
      type: String,
      default: '15vh'
    },
    'title': {
      type: String,
      default: '提示'
    },
    'hasClose': {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: this.value,
      modalValue: this.value,
      modalWrapperZIndex: 1,
      modalMaskZIndex: 1,
    }
  },
  watch: {
    value(newVal) {
      if (newVal === true) {
        this.modalValue = true
      } else {
        this.modalValue = false
      }
    },
    modalValue(newVal) {
      if (newVal === true) {
        this.visible = newVal
        this.openHandle()
      } else {
        this.closeHandle()
      }
    }
  },
  mounted() {
    const popManage = new PopManage()
    this.modalMaskZIndex = PopManage.zIndex
    popManage.zIndexIncrease()
    this.modalWrapperZIndex = PopManage.zIndex
    document.body.appendChild(this.$el)
  },
  beforeDestroy() {
    document.body.removeChild(this.$el)
  },
  methods: {
    closeHandle() {
      // 是否所有的modal都已经为不可见了
      const modals = Array.from(document.getElementsByClassName('sp-modal-wrap'))
      let modalCount = modals.length
      Array.from(document.getElementsByClassName('sp-modal-wrap')).forEach(item => {
        if (item.style.display) {
          modalCount --
        }
      })
      // 因为是这时还没完全关闭当前弹窗
      // 所以其实当modalCount为1的时候说明所有modal都要消失了
      const isAllModalHide = modalCount === 1
      if (isAllModalHide) {
        document.body.style.overflow = 'inherit'
      }
      // 传出close事件
      this.$emit('close')
      this.visible = false
      // 配合model
      this.$emit('input', this.visible)
    },
    openHandle() {
      this.visible = true
      // 传出show事件
      this.$emit('show')
      // 配合v-model
      this.$emit('input', this.visible)
      document.body.style.overflow = 'hidden'
    },
    handleAfterLeave() {
      this.$emit('after-leave')
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-modal {
  &-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    .sp-modal-content {
      position: relative;
      margin: 0 auto 50px;
      background: $modal-background;
      border-radius: $modal-border-radius;
      box-sizing: border-box;
      .sp-modal__head {
        padding: 10px 12px 9px;
        span {
          font-size: $modal-head-font-size;
          color: $color-text-secondary;
        }
        .sp-modal__head__close {
          position: absolute;
          top: 9px;
          right: 10px;
          padding: 0;
          border: none;
          outline: none;
          cursor: pointer;
          .sp-icon-close {
            font-size: $modal-icon-font-size;
            color: $modal-icon-color;
          }
        }
      }
      .sp-modal__body {
        padding: 0 26px;
      }
      .sp-modal__foot {
        text-align: center;
        padding: 0 26px 19px;
      }
    }
  }
}
.sp-modal__mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: $modal-mask-background;
}
</style>
