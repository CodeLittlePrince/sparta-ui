<template>
  <div
    class="sp-checkbox__group"
    role="group"
    aria-label="checkbox-group"
  >
    <slot></slot>
  </div>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpCheckboxGroup',

  mixins: [Emitter],

  inject: {
    spFormItem: {
      default: ''
    }
  },

  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
  },

  watch: {
    value(value) {
      this.dispatch('SpFormItem', 'sp.form.change', [value])
    }
  }
}
</script>
