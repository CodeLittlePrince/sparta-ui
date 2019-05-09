<template>
  <div class="ev-checkbox">{{ text }}</div>
</template>

<script>
export default {
  name: 'EvCheckbox',
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

.ev-checkbox {
  font-size: 20px;
  i {
    font-size: 12px;
  }
}
</style>
