<template>
  <div class="sp-input">{{ text }}</div>
</template>

<script>
export default {
  name: 'SpInput',
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

.sp-input {
  font-size: 20px;
  i {
    font-size: 12px;
  }
}
</style>
