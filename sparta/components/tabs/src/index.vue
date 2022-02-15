<template>
  <div class="sp-tabs">
    <div class="sp-tabs__head">
      <ul class="sp-tabs__items">
        <li
          v-for="item in SpTabPane"
          :key="item.value"
          class="sp-tabs__item"
          :class="{
            'is--checked': value === item.value,
            'is--disabled': item.disabled
          }"
          @click="handleTabSelect(item.value, item.disabled)"
        >{{ item.tab }}</li>
      </ul>
      <div class="sp-tabs__line"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SpTabs',
  
  provide() {
    return {
      'spTabs': this
    }
  },

  props: {
    value: {
      type: [Number, String, Boolean],
      default: ''
    },
  },

  data() {
    return {
      SpTabPane: []
    }
  },

  methods: {
    handleTabSelect(val, isDisabled) {
      if (!isDisabled) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-tabs {
  &__head {
    position: relative;
  }

  &__items {
    position: relative;
    z-index: 2;
    @include clearfix();
    font-size: 0;
  }

  &__line {
    position: absolute;
    z-index: 1;
    width: 100%;
    bottom: 0;
    height: 1px;
    background-color: $tabs-line-color;
  }

  &__item {
    display: inline-block;
    box-sizing: border-box;
    margin-left: 32px;
    padding: 0 20px;
    line-height: 22px;
    transition: $transition-all;
    font-size: $tabs-font-size;
    text-decoration: none;
    border-bottom: $tabs-border-bottom;
    padding-bottom: 18px;
    color: #747d8c;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    &.is--checked {
      color: $tabs-item-color-active;
      border-color: $tabs-item-border-color-active;
    }

    &.is--disabled {
      color: $tabs-item-color-disabled;
      cursor: not-allowed;
    }
  }
}
</style>

