<template>
  <div class="ev-radio">{{ text }}</div>
</template>

<script>
export default {
  name: 'EvRadio',
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

.ev-radio {
  font-size: 20px;
  i {
    font-size: 12px;
  }
}
</style>
