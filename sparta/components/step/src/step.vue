<template>
  <ul class="sp-step">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'SpStep',

  provide() {
    return {
      'spStep': this
    }
  },

  props: {
    position: {
      type: [Number, String],
      default: 0
    },
  },

  data() {
    return {
      SpStepItem: []
    }
  },
}
</script>

<style lang="scss">
@import "sparta/common/scss/mixin";

.sp-step {
  @include clearfix();
}
</style>

