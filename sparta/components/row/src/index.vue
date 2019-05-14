<template>
  <div class="sp-row">{{ text }}</div>
</template>

<script>
export default {
  name: 'SpRadio',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable.scss";

.sp-row {
  font-size: 20px;
  i {
    font-size: 12px;
  }
}
</style>
