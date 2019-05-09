<template>
  <transition name="ev-zoom-in-center">
    <span
      class="ev-tag"
      :class="`ev-tag--${type}`"
    >
      <slot></slot>
      <i
        v-if="closable"
        class="ev-icon-close"
        @click="handleClose"
      >X</i>
    </span>
  </transition>
</template>

<script>
export default {
  name: 'EvTag',
  props: {
    type: {
      type: String,
      default: '',
      validator(val) {
        return [ '', 'primary', 'success', 'warning', 'info', 'danger'].indexOf(val) > -1
      }
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose(e) {
      this.$emit('close', e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~scss/variable.scss";

.ev-tag {
  display: inline-block;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  border-radius: 4px;
  color: $color-primary;
  border: 1px solid $tag-border-color;
  background-color: $tag-background;
  white-space: nowrap;
  box-sizing: border-box;
  .ev-icon-close {
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    position: relative;
    font-size: 12px;
    height: 16px;
    width: 16px;
    line-height: 16px;
    vertical-align: middle;
    top: -1px;
    right: -5px;
    color: $color-primary;
    cursor: pointer;
    &:hover {
      background-color: $color-primary;
      color: #fff;
    }
  }
  &--success {
    color: $color-success;
    background-color: $tag-background--success;
    border-color: $tag-border-color--success;
    .ev-icon-close {
      color: $color-success;
      &:hover {
        background-color: $color-success;
      }
    }
  }
  &--warning {
    color: $color-warning;
    background-color: $tag-background--warning;
    border-color: $tag-border-color--warning;
    .ev-icon-close {
      color: $color-warning;
      &:hover {
        background-color: $color-warning;
      }
    }
  }
  &--info {
    color: $color-info;
    background-color: $tag-background--info;
    border-color: $tag-border-color--info;
    .ev-icon-close {
      color: $color-info;
      &:hover {
        background-color: $color-info;
      }
    }
  }
  &--danger {
    color: $color-danger;
    background-color: $tag-background--danger;
    border-color: $tag-border-color--danger;
    .ev-icon-close {
      color: $color-danger;
      &:hover {
        background-color: $color-danger;
      }
    }
  }
}
</style>

