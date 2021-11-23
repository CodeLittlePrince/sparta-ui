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
    },
    
    _handleInput(val) {
      this.visible = val
    }
  },

  render() {
    return (
      <sp-modal
        value={ this.visible }
        onInput={ this._handleInput }
        width={ this.width }
        class="sp-confirm"
        title={ this.title }
        onAfterLeave={ this.handleAfterLeave }
      >
        <div
          class={`sp-confirm__body align-${this.align}`}
        >
          { this.message }
        </div>
        <div class="sp-confirm__foot">
          {
            this.cancelText ?
              <sp-button
                plain
                size="mini"
                loading={ this.cancelBtnLoading }
                onClick={ this.handleCancel }
              >{ this.cancelText }</sp-button>
              : ''
          }
          {
            this.confirmText ?
              <sp-button
                type="primary"
                size="mini"
                loading={ this.confirmBtnLoading }
                onClick={ this.handleConfirm }
              >{ this.confirmText }</sp-button>
              : ''
          }
        </div>
      </sp-modal>
    )
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