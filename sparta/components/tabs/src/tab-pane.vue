<template>
  <div
    class="sp-tab-pane"
  >
    <div v-show="show">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpTabPane',
  
  inject: ['spTabs'],

  props: {
    tab: {
      type: String,
      default: ''
    },
    
    value: {
      type: [Number, String, Boolean],
      default: ''
    },
    
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    show() {
      return this.spTabs.value === this.value
    }
  },

  created() {
    this.spTabs.SpTabPane.push(this)
  }
}
</script>