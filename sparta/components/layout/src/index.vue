<template>
  <div
    class="sp-layout"
    :style="{ width }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SpLayout',
  props: {
    width: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/mixin";

.sp-layout {
  @include clearfix();
  margin: 0 auto;
}
</style>
