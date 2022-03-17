<template>
  <li
    class="sp-dropdown-item"
    :class="{
      'is-disabled': disabled
    }"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'SpDropdownItem',

  inject: ['SpDropdown'],

  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleClick() {
      if (!this.disabled) {
        this.SpDropdown.visible = false
      }
    }
  }
}
</script>

<style lang="scss">
.sp-dropdown-item {
  position: relative;
  padding: 10px 15px;
  font-size: 14px;
  text-align: left;
  margin: 0;
  color: $dropdown-color;
  transition: background-color 0.1s;
  background-color: $dropdown-item-background;
  cursor: pointer;
  &:hover {
    background-color: $dropdown-item-background-hover;
    color: $dropdown-item-color-hover;
  }
  &.is-disabled {
    color: $dropdown-color-disabled;
    cursor: not-allowed;
  }
}
</style>