<template>
  <button
    class="sp-button"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'sp-button--' + type : '',
      buttonSize ? 'sp-button--' + buttonSize : '',
      {
        'is--disabled': buttonDisabled,
        'is--loading': loading,
        'is--plain': plain,
      }
    ]"
    @click="handleClick"
  >
    <i
      v-if="loading && !isIE9"
      class="sp-icon-loading"
    />
    <i
      v-if="icon && !loading"
      :class="icon"
    />
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: 'SpButton',

  inject: {
    spForm: {
      default: ''
    },
    spFormItem: {
      default: ''
    }
  },

  props: {
    type: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'primary', 'danger', 'text', 'info'].indexOf(val) > -1
      }
    },
    size: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    frequencyTimeout: {
      type: Number,
      default: 300,
    }
  },

  computed: {
    _spFormItemSize() {
      return (this.spFormItem || {}).spFormItemSize
    },
    buttonSize() {
      return this.size || this._spFormItemSize || ''
    },
    buttonDisabled() {
      return this.disabled || (this.spForm || {}).disabled
    },
    isIE9() {
      return navigator.appVersion.indexOf('MSIE 9.0') > -1
    }
  },

  beforeDestroy() {
    this.timerId && clearTimeout(this.timerId)
  },

  methods: {
    handleClick(evt) {
      if (this.frequencyFlag || this.buttonDisabled || this.loading) {
        return
      }
      // 防止重复点击
      this.frequencyFlag = true
      this.timerId = setTimeout(() => {
        this.frequencyFlag = false
      }, this.frequencyTimeout)
    
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/base/mixin";

.sp-button {
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  background: $button-default-fill;
  border: $border-base;
  border-color: $button-default-border;
  color: $button-default-color;
  appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: $transition-all-quick;
  font-weight: $button-font-weight;
  user-select: none;
  padding: 0 10px;
  border-radius: $button-border-radius;

  & + & {
    margin-left: 10px;
  }

  @include button-size($button-font-size, $button-min-width, $button-height);

  &:hover {
    background-color: $button-default-fill--hover;
  }

  &:active,
  &:active:focus {
    background-color: $button-default-fill--active;
  }

  &:focus {
    background-color: $button-default-fill--focus;
  }

  &::-moz-focus-inner {
    border: 0;
  }

  & [class*="sp-icon-"] {
    color: inherit;
    font-size: 14px;
  }

  &.is--plain {
    border-color: $button-plain-border;
    background-color: $button-plain-fill;

    &:hover {
      background: $button-plain-fill--hover;
      color: $color-primary;
      opacity: $button-plain-opacity--hover;
    }

    &:active,
    &:active:focus {
      background-color: $button-plain-fill--active;
      opacity: 1;
    }

    &:focus {
      background-color: $button-plain-fill--focus;
    }
  }

  &.is--disabled {
    &,
    &:hover,
    &:focus {
      color: $button-color--disabled;
      cursor: not-allowed;
      background-image: none;
      background-color: $button-fill--disabled;
      border-color: $button-fill--disabled;
    }

    &.is--plain {
      &,
      &:hover,
      &:focus {
        background-color: #fff;
        border-color: $button-plain-border--disabled;
        color: $button-plain-color--disabled;
        opacity: 1;
      }
    }
  }

  &.is--loading {
    position: relative;
    pointer-events: none;
    color: rgba(#fff, 0.5);

    &::before {
      pointer-events: none;
      content: "";
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: inherit;
    }
  }

  &.is--plain.is--loading {
    position: relative;
    pointer-events: none;
    color: rgba($color-primary, 0.5);
  }

  &--primary {
    background-color: $button-primary-fill;
    border-color: $button-primary-border;
    color: $button-primary-color;

    &:hover {
      background-color: $button-primary-fill--hover;
      border-color: $button-primary-border--hover;
    }

    &:focus,
    &:active {
      background-color: $button-primary-fill--focus;
      border-color: $button-primary-border--focus;
    }

    &:active,
    &:active:focus {
      background-color: $button-primary-fill--active;
      border-color: $button-primary-border--active;
    }

    &:focus {
      background-color: $button-primary-fill--focus;
      border-color: $button-primary-border--focus;
    }
  }

  &--info {
    background-color: $button-info-fill;
    border-color: $button-info-border;
    color: $button-info-color;

    &:hover {
      background-color: $button-info-fill--hover;
      border-color: $button-info-border--hover;
    }

    &:focus,
    &:active {
      background-color: $button-info-fill--focus;
      border-color: $button-info-border--focus;
    }

    &:active,
    &:active:focus {
      background-color: $button-info-fill--active;
      border-color: $button-info-border--active;
    }

    &:focus {
      background-color: $button-info-fill--focus;
      border-color: $button-info-border--focus;
    }

    &.is--plain {
      border-color: $button-info-plain-border;
      color: $button-info-plain-text;
      background-color: $button-info-plain-fill;

      &:hover {
        background-color: $button-info-plain-fill--hover;
        border-color: $button-info-plain-border--hover;
        color: $button-info-plain-text;
      }

      &:focus,
      &:active {
        background-color: $button-info-plain-fill--hover;
        border-color: $button-info-plain-border--hover;
        color: $button-info-plain-text;
      }

      &:active,
      &:active:focus {
        background-color: $button-info-plain-fill--hover;
        border-color: $button-info-plain-border--hover;
        color: $button-info-plain-text;
      }

      &:focus {
        background-color: $button-info-plain-fill--hover;
        border-color: $button-info-plain-border--hover;
        color: $button-info-plain-text;
      }

      &.is--loading {
        color: $color-text-disabled;
      }
    }
  }

  &--medium {
    @include button-size($button-medium-font-size, $button-medium-min-width, $button-medium-height);
  }
  &--small {
    @include button-size($button-small-font-size, $button-small-min-width, $button-small-height);
  }
  &--mini {
    @include button-size($button-mini-font-size, $button-mini-min-width, $button-mini-height);
    & [class*="sp-icon-"] {
      font-size: 12px;
    }
  }
  &--text {
    border-color: transparent;
    background: transparent;
    color: $button-text-color;
    padding: 0;
    min-width: auto;
    height: auto;
    font-weight: normal;

    &:hover {
      border-color: transparent;
      background-color: transparent;
      color: $button-text-color--hover;
    }

    &:active,
    &:active:focus {
      border-color: transparent;
      background-color: transparent;
      color: $button-text-color--active;
    }

    &:focus {
      background-color: transparent;
      border-color: transparent;
      color: $button-text-color--focus;
    }

    &.is--disabled,
    &.is--disabled:hover,
    &.is--disabled:focus {
      border-color: transparent;
      background-color: transparent;
      color: $button-text-color--disabled;
    }
  }
}
</style>

