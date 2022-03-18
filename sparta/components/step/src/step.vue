<template>
  <div class="sp-step" :class="{'need-Arrow': needArrow, 'align-center': alignCenter}">
    <ul class="sp-step-ul">
      <slot></slot>
    </ul>
    <div v-if="needArrow" class="sp-step-line"></div>
  </div>
</template>

<script>
export default {
  name: 'SpStep',

  provide() {
    return {
      'spStep': this
    }
  },

  props: {
    position: {
      type: [Number, String],
      default: 0
    },

    space: {
      type: [Number, String],
      default: 80
    },

    needArrow: {
      type: Boolean,
      default: false
    },

    alignCenter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      SpStepItem: []
    }
  },
}
</script>

<style lang="scss">
@import "sparta/common/scss/mixin";
.sp-step {
  font-size: 0;

  &.align-center {
    text-align: center;
    vertical-align: top;
    .sp-step-ul {
      display: inline-block;
    }
  }

  &.need-Arrow {
    .sp-step-ul {
      margin: 36px auto 33px;
    }
    .sp-step-item.is--current .sp-step-item__tag {
      position: relative;
      &::before,
      &::after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 0;
        height: 0;
      }
      &::before {
        top: 49px;
        left: 3px;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 9px solid #dbdfe6;
        z-index: 1;
      }
      &::after {
        top: 50px;
        left: 4px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 9px solid #fff;
        z-index: 2;
      }
      .sp-step-item__desc {
        height: 26px;
      }
    }
  }

  .sp-step-ul {
    @include clearfix;
  }

  &-line {
    height: 0;
    border-top: 1px solid #e4e8ef;
    margin: 0 auto;
  }
}
</style>