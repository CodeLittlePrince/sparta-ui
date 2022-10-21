<template>
  <Radio v-bind="$attrs" :class="'sp-radio--' + size" v-on="$listeners">
    <slot></slot>
  </Radio>
</template>

<script>
import Radio from 'base/radio'

export default {
  name: 'SpRadio',
  components: {
    Radio
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
.sp-radio {
  &--default & {
    &__inner {
      &::after {
        top: 3px;
        left: 3px;
        width: 8px;
        height: 8px;
      }
    }
  }
  &--small & {
    width: 12px;
    height: 12px;
    &__inner {
      &::after {
        top: 2px;
        left: 2px;
        width: 6px;
        height: 6px;
      }
    }
  }
}
</style>