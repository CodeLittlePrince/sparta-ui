<template>
  <div class="sp-radio-group">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpRadioGroup',

  mixins: [Emitter],

  inject: {
    spFormItem: {
      default: ''
    }
  },

  props: {
    value: {},
  },

  watch: {
    value() {
      this.dispatch('SpFormItem', 'sp.form.change', [this.value])
    }
  },

  created() {
    this.$on('handleChange', value => {
      this.$emit('change', value)
    })
  }
}
</script>

<style lang="scss">
.sp-radio-group {
  font-size: 0;
}
</style>

