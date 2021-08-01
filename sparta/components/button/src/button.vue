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
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
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
        return ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text'].indexOf(val) > -1
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
    round: Boolean,
    circle: Boolean
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

  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: $button-default-fill;
  border: $border-base;
  border-color: $button-default-border;
  color: $button-default-color;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: $button-font-weight;
  user-select: none;
  & + & {
    margin-left: 10px;
  }

  @include button-size($button-padding-vertical, $button-padding-horizontal, $button-font-size, $button-border-radius);

  &:hover,
  &:focus {
    color: $color-primary;
    border-color: $color-primary-light-7;
    background-color: $color-primary-light-9;
  }

  &:active {
    color: mix($color-black, $color-primary, $button-active-shade-percent);
    border-color: mix($color-black, $color-primary, $button-active-shade-percent);
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }

  & [class*="sp-icon-"] {
    font-weight: bold;
    & + span {
      margin-left: 5px;
    }
  }

  &.is-plain {
    &:hover,
    &:focus {
      background: $color-white;
      border-color: $color-primary;
      color: $color-primary;
    }

    &:active {
      background: $color-white;
      border-color: mix($color-black, $color-primary, $button-active-shade-percent);
      color: mix($color-black, $color-primary, $button-active-shade-percent);
      outline: none;
    }
  }

  &.is-active {
    color: mix($color-black, $color-primary, $button-active-shade-percent);
    border-color: mix($color-black, $color-primary, $button-active-shade-percent);
  }

  &.is-disabled {
    &,
    &:hover,
    &:focus {
      color: $button-disabled-color;
      cursor: not-allowed;
      background-image: none;
      background-color: $button-disabled-fill;
      border-color: $button-disabled-border;
    }

    &.sp-button--text {
      background-color: transparent;
    }

    &.is-plain {
      &,
      &:hover,
      &:focus {
        background-color: $color-white;
        border-color: $button-disabled-border;
        color: $button-disabled-color;
      }
    }
  }

  &.is-loading {
    position: relative;
    pointer-events: none;

    &:before {
      pointer-events: none;
      content: '';
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: inherit;
      background-color: rgba(255,255,255,.35);
    }
  }
  &.is-round {
    border-radius: 20px;
    padding: 12px 23px;
  }
  &.is-circle {
    border-radius: 50%;
    padding: $button-padding-vertical;
  }
  &--primary {
    @include button-variant($button-primary-color, $button-primary-fill, $button-primary-border);
  }
  &--success {
    @include button-variant($button-success-color, $button-success-fill, $button-success-border);
  }
  &--warning {
    @include button-variant($button-warning-color, $button-warning-fill, $button-warning-border);
  }
  &--danger {
    @include button-variant($button-danger-color, $button-danger-fill, $button-danger-border);
  }
  &--info {
    @include button-variant($button-info-color, $button-info-fill, $button-info-border);
  }
  &--medium {
    @include button-size($button-medium-padding-vertical, $button-medium-padding-horizontal, $button-medium-font-size, $button-medium-border-radius);
    @at-root &.is-circle {
      padding: $button-medium-padding-vertical;
    }
  }
  &--small {
    @include button-size($button-small-padding-vertical, $button-small-padding-horizontal, $button-small-font-size, $button-small-border-radius);
    @at-root &.is-circle {
      padding: $button-small-padding-vertical;
    }
  }
  &--mini {
    @include button-size($button-mini-padding-vertical, $button-mini-padding-horizontal, $button-mini-font-size, $button-mini-border-radius);
    @at-root &.is-circle {
      padding: $button-mini-padding-vertical;
    }
  }
  &--text {
    border-color: transparent;
    color: $color-primary;
    background: transparent;
    padding-left: 0;
    padding-right: 0;

    &:hover,
    &:focus {
      color: mix($color-white, $color-primary, $button-hover-tint-percent);
      border-color: transparent;
      background-color: transparent;
    }
    &:active {
      color: mix($color-black, $color-primary, $button-active-shade-percent);
      border-color: transparent;
      background-color: transparent;
    }

    &.is-disabled,
    &.is-disabled:hover,
    &.is-disabled:focus {
      border-color: transparent;
    }
  }
}

.sp-button-group {
  @include clearfix();
  display: inline-block;
  vertical-align: middle;

  & > .sp-button {
    float: left;
    position: relative;
    & + .sp-button {
      margin-left: 0;
    }
    &.is-disabled {
      z-index: 1;
    }
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:first-child:last-child {
      border-top-right-radius: $button-border-radius;
      border-bottom-right-radius: $button-border-radius;
      border-top-left-radius: $button-border-radius;
      border-bottom-left-radius: $button-border-radius;

      &.is-round {
        border-radius: 20px;
      }

      &.is-circle {
        border-radius: 50%;
      }
    }
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    &:not(:last-child) {
      margin-right: -1px;
    }

    &:hover,
    &:focus,
    &:active {
      z-index: 1;
    }

    @at-root &.is-active {
      z-index: 1;
    }
  }
  
  & > .sp-dropdown {
    & > .sp-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left-color: rgba($color-white, 0.5);
    }
  }

  @each $type in (primary, success, warning, danger, info) {
    .sp-button--#{$type} {
      &:first-child {
        border-right-color: rgba($color-white, 0.5);
      }
      &:last-child {
        border-left-color: rgba($color-white, 0.5);
      }
      &:not(:first-child):not(:last-child) {
        border-left-color: rgba($color-white, 0.5);
        border-right-color: rgba($color-white, 0.5);
      }
    }
  }
}
</style>

