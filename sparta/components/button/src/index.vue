<template>
  <button
    class="ev-button"
    :class="`ev-button--${type}`"
    @click="handleClick"
  >{{ text }}</button>
</template>

<script>
export default {
  name: 'EvButton',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      text: 'click me'
    }
  },
  created() {
    if (this.type === 'default') {
      console.log('hello')
    }
  },
  methods: {
    handleClick() {
      this.text = 'clicked'
      return true
    }
  }
}
</script>

<style lang="scss">
@import "~scss/variable.scss";

.ev-button {
  color: $color-primary;
  font-size: 20px;
  i {
    font-size: 12px;
  }
  &--primary {
    background: $button-background-primary;
  }
}
</style>
