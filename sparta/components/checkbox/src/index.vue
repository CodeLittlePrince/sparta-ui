<template>
  <div class="sp-checkbox">{{ text }}</div>
</template>

<script>
export default {
  name: 'SpCheckbox',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-checkbox {
  font-size: 20px;
  i {
    font-size: 12px;
  }
}
</style>
