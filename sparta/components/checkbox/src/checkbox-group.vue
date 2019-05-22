<template>
  <div
    class="sp-checkbox-group"
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

  componentName: 'SpCheckboxGroup',

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
    size: String,
    fill: String,
    textColor: String
  },

  computed: {
    _spFormItemSize() {
      return (this.spFormItem || {}).spFormItemSize
    },
    checkboxGroupSize() {
      return this.size || this._spFormItemSize || (this.$ELEMENT || {}).size
    }
  },

  watch: {
    value(value) {
      this.dispatch('SpFormItem', 'sp.form.change', [value])
    }
  }
}
</script>
