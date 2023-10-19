<template>
  <Button
    ref="table"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
  </Button>
</template>

<script>
import Button from 'base/button'

export default {
  name: 'SpButton',
  components: {
    Button
  },
}
</script>

<style lang="scss">
@import "sparta/common/scss/base/mixin";

.sp-button {

  &.is--plain {
    border-color: $button-plain-border;
    background-color: $button-plain-fill;
    color: $button-plain-color;

    &:hover {
      background: $button-plain-fill--hover;
      opacity: $button-plain-opacity--hover;
      color: $button-plain-color;
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
      color: $button-default-color--disabled;
      cursor: not-allowed;
      background-image: none;
      background-color: $button-default-fill--disabled;
      border-color: $button-default-border--disabled;
    }
    &.sp-button--primary {
      &,
      &:hover,
      &:focus {
        color: $button-primary-color--disabled;
        cursor: not-allowed;
        background-image: none;
        background-color: $button-primary-fill--disabled;
        border-color: $button-primary-border--disabled;
      }
    }
    &.sp-button--text {
      border: none;
    }
  }
  &.is--loading {
    &.sp-button--default {
      color: $color-primary;
    }
  }
}
</style>