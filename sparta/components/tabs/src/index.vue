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
    border-bottom: 1px solid $tabs-line-color;
    padding-left: 40px;
  }

  &__item {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    padding: 18px 0;
    margin: 0 20px;
    line-height: 22px;
    font-size: $tabs-font-size;
    text-decoration: none;
    color: #747d8c;
    cursor: pointer;

    &::after {
      position: absolute;
      z-index: 3;
      content: "";
      display: inline-block;
      left: 0;
      bottom: -1px;
      width: 100%;
      transition: $transition-all;
      height: 2px;
      background-color: transparent;
    }

    &:first-child {
      margin-left: 0;
    }

    &.is--checked {
      color: $tabs-item-color-active;

      &::after {
        background-color: $color-primary;
      }
    }

    &.is--disabled {
      color: $tabs-item-color-disabled;
      cursor: not-allowed;
    }
  }
}
</style>

