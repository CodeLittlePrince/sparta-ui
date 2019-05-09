<template>
  <div class="sp-radio">{{ text }}</div>
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
@import "~scss/variable.scss";

.sp-radio {
  font-size: 20px;
  i {
    font-size: 12px;
  }
}
</style>
