<template>
  <li
    class="sp-step-item"
    :class="{
      'is--finish': isFinish,
      'is--comming': spStep.position < index,
      'is--current': spStep.position == index
    }"
  >
    <div class="sp-step-item__line" :style="{'width': `${ spStep.space }px`}"></div>
    <div class="sp-step-item__tag">
      <i v-if="isFinish" class="sp-icon-check" />
      <template v-else>{{ index + 1 }}</template>
    </div>
    <div class="sp-step-item__desc"><slot></slot></div>
  </li>
</template>

<script>
export default {
  name: 'SpStepItem',
  
  inject: ['spStep'],

  data() {
    return {
      index: 0
    }
  },

  computed: {
    isFinish() {
      return this.index < this.spStep.position
    }
  },

  created() {
    this.index = this.spStep.SpStepItem.length
    this.spStep.SpStepItem.push(this)
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-step-item {
  float: left;
  font-size: 0;
  @include clearfix();
  &:last-child {
    .sp-step-item__line {
      display: none;
    }
  }

  &__tag {
    float: left;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid $color-primary;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    line-height: 22px;
    text-align: center;
    box-sizing: border-box;
    background-color: $color-primary;

    .sp-icon-check {
      color: #00cf64;
      font-size: 14px;
      vertical-align: top;
    }
  }

  &__desc {
    float: left;
    font-size: 16px;
    color: $color-text-regular;
    margin-left: 10px;
    line-height: 26px;
  }

  &.is--finish &__tag {
    border: 2px solid #00cf64;
    background-color: transparent;
  }

  &.is--comming &__tag {
    border: 2px solid #c7cbd1;
    background-color: #c7cbd1;
  }
  &.is--comming &__desc {
    color: #b6babf;
  }

  &__line {
    float: right;
    width: 80px;
    height: 2px;
    background-color: #c7cbd1;
    opacity: 0.5;
    margin: 12px 30px 0;
  }

  &:first-child::before {
    display: none;
  }
}
</style>