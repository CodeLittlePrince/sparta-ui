<template>
  <sp-modal
    v-model="visible"
    class="sp-confirm"
    :title="title"
    @after-leave="handleAfterLeave"
  >
    <div
      class="sp-confirm__body"
      :class="`align-${align}`"
    >
      {{ message }}
    </div>
    <div slot="foot">
      <sp-button
        type="default"
        @click="handleCancel"
      >{{ cancelText }}</sp-button>
      <sp-button
        type="primary"
        @click="handleConfirm"
      >{{ confirmText }}</sp-button>
    </div>
  </sp-modal>
</template>

<script>
import SpModal from 'sparta/components/modal'
import tool from 'sparta/common/js/utils/tool'

export default {
  name: 'SpMessage',

  components: {
    'sp-modal': SpModal
  },

  data() {
    return {
      visible: false,
      title: '提示',
      message: '',
      hideAfterConfirm: true,
      cancelFunc: tool.noop,
      confirmFunc: tool.noop,
      cancelText: '取消',
      confirmText: '确定',
      align: 'left'
    }
  },

  methods: {
    handleCancel() {
      this.visible = false
      this.cancelFunc && this.cancelFunc(this)
    },

    handleConfirm() {
      if (this.hideAfterConfirm) {
        this.visible = false
      }
      this.confirmFunc && this.confirmFunc(this)
    },

    handleAfterLeave() {
      this._destroyElement()
    },
    
    _destroyElement() {
      this.$destroy(true)
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-confirm {
  font-size: $confirm-font-size;

  &__body {
    color: $confirm-body-color;
    padding: 20px 0 30px;
    line-height: 1.4;

    &.align-left {
      text-align: left;
    }

    &.align-center {
      text-align: center;
    }

    &.align-right {
      text-align: right;
    }
  }
}
</style>