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
            @click="handleCloseClick"
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
          <div class="sp-modal__body" :style="{ 'max-height': fullscreen ? `calc(100vh - 47px - 54px)` : maxBodyHeightInner }">
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

// 触发自定义事件
const eventOfModalShow = new Event('sp-modal--show')
const eventOfModalHide = new Event('sp-modal--hide')

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
    'unique': {
      type: Boolean,
      default: false,
    },
    // priority是unique的一种特殊方式，它会通过判断优先级来决定是否关闭已经出现了的弹窗
    'priority': {
      type: [String, Number],
      default: 0
    },
    'fullscreen': {
      type: Boolean,
      default: false
    },
    'beforeClose': {
      type: Function,
      default: null
    },
    'maxBodyHeight': {
      type: String,
      default: ''
    }
  },
  
  data() {
    return {
      visible: this.value,
      modalValue: this.value,
      modalWrapperZIndex: 1,
      modalMaskZIndex: 1,
      maxBodyHeightInner: this.maxBodyHeight || 'initial'
    }
  },
  
  watch: {
    value(newVal) {
      if (newVal) {
        if (this.hasPriorityModalShown()) {
          this.showByPriority()
        } else if (this.unique) {
          this.modalManageHandle()
        } else {
          this.modalValue = true
        }
      } else {
        this.modalValue = false
      }
    },
    
    modalValue(newVal) {
      if (newVal) {
        const popManage = PopManage.getInstance()
        this.modalWrapperZIndex = popManage.getZIndex()

        this.visible = newVal
        this.openHandle()

        window.dispatchEvent(eventOfModalShow)
      } else {
        this.closeHandle()

        window.dispatchEvent(eventOfModalHide)
      }
    }
  },

  created() {
    // 控制z-index
    const popManage = PopManage.getInstance()
    this.modalMaskZIndex = popManage.getZIndex()
    this.modalWrapperZIndex = popManage.getZIndex()
    // 控制唯一弹窗或者弹窗优先级
    this.modalManage = ModalManage.getInstance()
    this.modalManage.add(this)
  },

  mounted() {
    this.setModalContentMaxHeight()

    document.body.appendChild(this.$el)
  },

  beforeDestroy() {
    this.modalManage.remove(this)

    if(this.visible) {
      this.closeHandle()
    }

    try {
      document.body.removeChild(this.$el)
    } catch {
      // 防止父级容器dom消失后导致removeChild报错
    }
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
      // 所以其实当modalCount为1的时候说明所有modal都要消失了，有一种特殊情况：如果调用者主动将dom移除了modalCount就为0
      const isAllModalHide = modalCount <= 1
      if (isAllModalHide) {
        document.body.style.overflow = 'inherit'
      }
      // 传出close事件
      this.$emit('close')
      this.visible = false
      // 配合model
      this.$emit('input', this.visible)
    },

    handleCloseClick() {
      if (this.beforeClose) {
        this.beforeClose(() => {
          this.modalValue = false
        })
      } else {
        this.modalValue = false
      }
    },

    openHandle() {
      this.visible = true
      // 传出show事件
      this.$emit('show')
      // 配合v-model
      this.$emit('input', this.visible)
      document.body.style.overflow = 'hidden'
    },

    modalManageHandle() {
      this.closeOtherModals()
    },

    hasPriorityModalShown() {
      const { quene } = this.modalManage

      return quene.some(item => {
        return 0 < item.priority && item.visible
      })
    },

    showByPriority() {
      const { quene } = this.modalManage

      const hasHigherPriority = quene.some(item => {
        if (this === item) {
          return false
        } else {
          return item.visible && (this.priority < item.priority)
        }
      })

      if (hasHigherPriority) {
        this.modalValue = false
      } else {
        this.closeOtherModals()
      }
    },

    closeOtherModals() {
      const { quene } = this.modalManage

      quene.forEach(modal => {
        if (this !== modal && modal.visible) {
          modal.toggleVisible(false)
        }
      })

      this.modalValue = true
    },

    handleAfterLeave() {
      this.$emit('after-leave')
    },

    toggleVisible(val) {
      this.$emit('input', val)
    },

    setModalContentMaxHeight() {
      this.maxBodyHeightInner = this.maxBodyHeight || `${ Math.round(window.innerHeight * 0.8) }px`
    },
  }
}
</script>

<style lang="scss">
.sp-modal {

  &-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;

    .sp-modal-content {
      padding: $modal-content-padding;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: $modal-background;
      border-radius: $modal-border-radius;
      box-sizing: border-box;

      .sp-modal__head {
        .sp-modal__title {
          text-align: $modal-head-text-align;
          font-size: $modal-head-font-size;
          line-height: $modal-head-line-height;
          font-weight: 600;
          color: $color-text-regular;
        }
      }

      .sp-modal__head__close {
        position: absolute;
        top: $modal-close-top;
        right: $modal-close-right;
        padding: 0;
        border: none;
        outline: none;
        cursor: pointer;

        .sp-icon-close {
          font-size: $modal-close-font-size;
          color: $modal-close-font-color;
          font-weight: bold;
        }
      }

      .sp-modal__body {
        color: $color-text-regular;
        font-size: 14px;
        line-height: 20px;
        overflow-y: auto;
      }

      .sp-form {
        padding-top: $modal-form-padding-top;
        padding-bottom: $modal-form-padding-bottom;

        .sp-form-item__label {
          padding-right: $modal-form-item-label-padding-right;
        }

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
}
</style>
