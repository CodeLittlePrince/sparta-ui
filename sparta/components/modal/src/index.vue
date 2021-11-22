<template>
  <div class="sp-modal" :class="{ 'is--fullscreen': fullscreen }">
    <transition
      :name="fullscreen ? 'sp-modal-fade-out' : 'sp-modal-fade'"
      @after-leave="handleAfterLeave"
    >
      <div
        v-show="visible"
        class="sp-modal-wrap"
        :style="`z-index: ${modalWrapperZIndex}`"
      >
        <div
          class="sp-modal-content"
          :style="{ width: fullscreen ? '1200px' : `${width}px` }"
        >
          <div
            v-if="hasClose"
            class="sp-modal__head__close"
            @click="modalValue = false"
          >
            <i class="sp-icon-close"></i>
          </div>
          <!-- head -->
          <div v-if="!fullscreen" class="sp-modal__head">
            <slot name="head">
              <div v-if="title" class="sp-modal__title">{{ title }}</div>
            </slot>
          </div>
          <!-- body -->
          <div class="sp-modal__body" :style="{ 'max-height': fullscreen ? `calc(100vh - 47px - 54px)` : maxBodyHeight }">
            <slot></slot>
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
import ModalManage from 'sparta/model/ModalManage'

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
    'title': {
      type: String,
      default: '提示'
    },
    'hasClose': {
      type: Boolean,
      default: true
    },
    'priority': {
      type: [String, Number],
      default: 0
    },
    'unique': {
      type: Boolean,
      default: false,
    },
    'fullscreen': {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      visible: this.value,
      modalValue: this.value,
      modalWrapperZIndex: 1,
      modalMaskZIndex: 1,
      maxBodyHeight: 'initial'
    }
  },
  
  watch: {
    value(newVal) {
      if (newVal === true) {
        this.modalValue = true
      } else {
        this.modalValue = false
      }

      if (this.unique) {
        this.modalManageHandle(newVal)
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

    this.modalManage = ModalManage.getInstance()
    this.modalManage.add(this)

    this.setModalContentMaxHeight()

    document.body.appendChild(this.$el)
  },

  beforeDestroy() {
    this.modalManage.remove(this)

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

    modalManageHandle(newVal) {
      const { quene } = this.modalManage

      if (newVal) {
        quene.forEach(modal => {
          if (this !== modal && modal.visible) {
            modal.toggleVisible(false)
          }
        })
      }
    },

    handleAfterLeave() {
      this.$emit('after-leave')
    },

    toggleVisible(val) {
      this.$emit('input', val)
    },

    setModalContentMaxHeight() {
      this.maxBodyHeight = `${ Math.round(window.innerHeight * 0.8) }px`
    },
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
      padding: 20px 20px 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: $modal-background;
      border-radius: $modal-border-radius;
      box-sizing: border-box;

      .sp-modal__head {
        .sp-modal__title {
          font-size: 16px;
          line-height: 22px;
          font-weight: 600;
          color: $color-text-regular;
        }
      }

      .sp-modal__head__close {
        position: absolute;
        top: 8px;
        right: 9px;
        padding: 0;
        border: none;
        outline: none;
        cursor: pointer;

        .sp-icon-close {
          font-size: 14px;
          color: $color-text-tip;
          font-weight: bold;
        }
      }

      .sp-modal__body {
        color: $color-text-regular;
        font-size: 14px;
        line-height: 20px;
        overflow-y: auto;
      }

      .sp-form  {
        padding-top: 20px;
        padding-bottom: 14px;

        .sp-form-submit-btns {
          margin-top: 4px;
        }
      }
    }
  }

  &__mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: $modal-mask-background;
  }

  &.is--fullscreen {

    .sp-modal-content {
      padding: 47px 0 54px 40px;
      top: 0;
      left: 50%;
      transform: translate(0, 0);
      margin-left: -600px; // 为了IE，没法用translate方式

      .sp-form  {
        padding-top: 26px;

        .sp-form-submit-btns {
          margin-top: 22px;
        }
      }
    }

    .sp-modal__head {
      .sp-modal__title {
        font-size: 20px;
        line-height: 28px;
        font-weight: 600;
        color: $color-text-regular;
      }
    }

    .sp-modal__head__close {
      right: -4px;
      .sp-icon-close {
        font-size: 26px;
        font-weight: normal;
      }
    }

    .sp-modal__mask {
      background-color: #fff;
    }
  }
}
</style>
