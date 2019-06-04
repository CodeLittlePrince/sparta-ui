<template>
  <ul class="sp-option-group">
    <li class="sp-option-group-title">{{ title }}</li>
    <li>
      <ul class="sp-option-group-content">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SpOptionGroup',

  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.sp-option-group {
  padding: 0;
  margin: 0;
  &-title {
    padding-left: 20px;
    font-size: 12px;
    color: #909399;
    line-height: 30px;
  }
  &-content {
    padding: 0;
    margin: 0;
  }
}
</style>
