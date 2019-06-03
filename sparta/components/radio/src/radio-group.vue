<template>
  <div class="sp-radio-group">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpRadioGroup',

  inject: {
    spFormItem: {
      default: ''
    }
  },

  mixins: [Emitter],

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

