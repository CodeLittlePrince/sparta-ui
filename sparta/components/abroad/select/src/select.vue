<template>
  <Select
    :class="`sp-select--${size}`"
    :height="size === 'small' ? 32 : 48"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template slot="prepend">
      <slot name="prepend"></slot>
    </template>
    <template slot="center">
      <slot name="center"></slot>
    </template>
    <slot></slot>
  </Select>
</template>

<script>
import Select from 'base/Select'

export default {
  name: 'SpSelect',
  components: {
    Select
  },
  props: {
    size: {
      type: String,
      default: 'default', // normal、small
      validator(val) {
        return ['default', 'small'].includes(val)
      }
    }
  }
}
</script>

<style lang="scss">
$select-height-small: 32px;
$select-height-normal: 48px;
.sp-select {
  // 得到焦点时高亮
  &.isFocus &__input-box, &.isFocus &__input-placeholder, &.isFocus &__input::placeholder {
    color: $color-primary;
  }
  &.isFocus &__input-box {
    border-color: $select-input-border-color-focus;
    box-shadow: $select-input-box-shadow-focus;
  }
  &.isFocus &__suffix, &.isFocus &__prefix, &.isFocus &__prepend {
    i {
      color: $color-primary;
    }
  }
  &__input-box {
    font-size: 16px;
    min-height: 48px;
    .sp-select__input {
      line-height: $select-height-normal - 2;
    }
    .sp-select__input, .sp-select__center {
      height: $select-height-normal - 2;
      line-height: $select-height-normal - 2;
    }
  }
  &-dropdown {
    // 选项边距及下边框
    & .sp-option {
      padding: 0 12px;
      border-bottom: solid 1px $border-color-base;
      height: $select-height-normal - 2;
      line-height: $select-height-normal - 2;
    }
  }

  // 下拉列表
  &-dropdown &-list {
    margin: 8px 0;
    padding: 0;
  }
  &__suffix {
    padding: 0 16px;
    i {
      font-size: 14px;
    }
    .sp-icon-arrow-down-bold.rotate {
      transition: $transition-all;
      transform: rotate(180deg);
    }
  }

  // 小尺寸
  &--small & {
    &__input-box {
      min-height: 32px;
      font-size: 14px;
      .sp-select__input {
        line-height: $select-height-small - 2;
      }
      .sp-select__input, .sp-select__center {
        height: $select-height-small - 2;
        line-height: $select-height-small - 2;
      }
    }
  }
}
</style>