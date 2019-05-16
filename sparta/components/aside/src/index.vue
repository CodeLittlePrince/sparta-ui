<template>
  <div
    class="sp-aside"
    :class="`sp-aside--${ pull }`"
    :style="{ width }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SpAside',
  props: {
    pull: {
      type: String,
      default: 'left',
      validator(val) {
        return [ 'left', 'right'].indexOf(val) > -1
      }
    },
    width: {
      type: String,
      default: '200px'
    }
  }
}
</script>

<style lang="scss">
.sp-aside {
  &--left {
    float: left;
  }
  &--right {
    float: right;
  }
}
</style>
