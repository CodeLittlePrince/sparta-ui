<template>
  <sp-modal
    v-model="visible"
    :width="width"
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
    <div class="sp-confirm__foot">
      <sp-button
        v-if="cancelText"
        plain
        size="mini"
        :loading="cancelBtnLoading"
        @click="handleCancel"
      >{{ cancelText }}</sp-button>
      <sp-button
        v-if="confirmText"
        type="primary"
        size="mini"
        :loading="confirmBtnLoading"
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
      hideAfterCancel: true,
      hideAfterConfirm: true,
      width: 418,
      cancelFunc: tool.noop,
      confirmFunc: tool.noop,
      cancelText: '取消',
      confirmText: '确定',
      align: 'center',
      cancelBtnLoading: false,
      confirmBtnLoading: false,
    }
  },

  methods: {
    handleCancel() {
      if (this.hideAfterCancel) {
        this.visible = false
      }
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

  &__body {
    font-size: $confirm-font-size;
    color: $confirm-body-color;
    line-height: 1.5;
    padding: 32px 0;

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

  &__foot {
    text-align: center;
    padding-bottom: 16px;
    font-size: 0;
    height: 28px;

    .sp-button {
      min-width: 72px;
      height: 28px;
    }
  }
}
</style>