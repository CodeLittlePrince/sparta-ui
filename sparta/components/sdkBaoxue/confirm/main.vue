<script>
import SpModal from 'base/modal'
import { noop } from 'sparta/common/js/utils/tool'

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
      style: 'noraml', // normal, error
      hideAfterCancel: true,
      hideAfterConfirm: true,
      width: 380,
      cancelFunc: noop,
      confirmFunc: noop,
      cancelText: '取消',
      confirmText: '确定',
      align: 'center',
      cancelBtnLoading: false,
      confirmBtnLoading: false,
      closeOnHashChange: true,
      closeOnPopstate: true,
      hasClose: false,
    }
  },

  mounted() {
    this._addUrlChangeListener()
  },

  methods: {
    handleCancel() {
      if (this.hideAfterCancel) {
        this.visible = false
      }
      this.cancel('cancel')
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

    handleCloseBtnClick() {
      this.visible = false
      this.cancel('close')
    },

    close() {
      this.handleCloseBtnClick()
    },

    cancel(action) {
      this.cancelFunc && this.cancelFunc(this, action)
    },
    
    _destroyElement() {
      this.$destroy(true)
    },
    
    _handleInput(val) {
      this.visible = val
    },

    _addUrlChangeListener() {
      if (this.closeOnHashChange) {
        window.addEventListener('hashchange', this._destroyElement)
      }
      if (this.closeOnPopstate) {
        window.addEventListener('popstate', this._destroyElement)
      }
    },

    _removeUrlChangeListener() {
      if (this.closeOnHashChange) {
        window.removeEventListener('hashchange', this._destroyElement)
      }
      if (this.closeOnPopstate) {
        window.removeEventListener('popstate', this._destroyElement)
      }
    }
  },

  render() {
    return (
      <sp-modal
        value={ this.visible }
        on-input={ this._handleInput }
        width={ this.width }
        class={ 'sp-confirm' + (this.style ? (' is--' + this.style) : '') }
        title={ this.title }
        on-after-leave={ this.handleAfterLeave }
        has-close={ false }
      >
        {
          this.hasClose ?
            <div
              class="sp-modal__head__close"
              on-click={ this.handleCloseBtnClick }
            >
              <i class="sp-icon-close"></i>
            </div>
            : ''
        }
        {
          this.style === 'error' ?
            <div class="sp-confirm__error">
              <i class="sp-icon-close"></i>
            </div>
            : ''
        }
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
                type="info"
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
.sp-confirm {

  &__body {
    font-size: $confirm-font-size;
    color: $confirm-body-color;
    line-height: 1.5;
    padding: $confirm-body-padding;

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
    padding-bottom: $confirm-foot-padding-bottom;

    .sp-button {
      min-width: $confirm-foot-button-min-width;
      height: $confirm-foot-button-height;
      font-size: $confirm-foot-button-font-size;
      line-height: 1;

      & + .sp-button {
        margin-left: $confirm-foot-button-margin;
      }
    }
  }

  &.is--error {
    .sp-modal__title {
      margin-top: 13px;
      margin-left: 34px;
    }

    .sp-confirm__body {
      margin-left: 34px;
    }
  }

  &__error {
    position: absolute;
    top: 29px;
    left: 18px;
    width: 24px;
    height: 24px;
    background-color: #d83024;
    text-align: center;
    line-height: 24px;
    border-radius: 50%;

    .sp-icon-close {
      font-size: 12px;
      font-weight: bold;
    }
  }
}
</style>