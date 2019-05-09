<template>
  <ul class="ev-option-group">
    <li class="ev-option-group-title">标题</li>
    <li>
      <ul class="ev-option-group-content">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'EvOptionGroup'
}
</script>

<style lang="scss">
.ev-option-group {
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
