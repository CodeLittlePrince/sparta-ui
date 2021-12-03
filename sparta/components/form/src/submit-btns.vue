<template>
  <div class="sp-form-submit-btns">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SpFormSubmitBtns',
}
</script>

<style lang="scss">
@import "sparta/common/scss/variable";

.sp-form-submit-btns {
  font-size: 0;
  margin-top: 22px;

  .sp-checkbox__wrap {
    display: block;
    margin-bottom: 8px;

    .sp-checkbox__text {
      font-size: 12px;
      color: #97a2b5;

      a {
        color: $color-primary;
      }
    }
  }

  .sp-form-item__content {
    font-size: 0;
    line-height: inherit;
  }
}
</style>