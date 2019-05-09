<template>
  <div class="ev-input">{{ text }}</div>
</template>

<script>
export default {
  name: 'EvInput',
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

.ev-input {
  font-size: 20px;
  i {
    font-size: 12px;
  }
}
</style>
