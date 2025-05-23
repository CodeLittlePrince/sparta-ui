<template>
  <label
    class="sp-radio__wrap"
    :class="[
      { 'is--disabled': disabled },
      { 'is--checked': checked },
      { 'is--check': isCheck },
    ]"
    @click="handleClick"
  >
    <!-- 小圆圈 -->
    <span class="sp-radio">
      <input
        v-model="model"
        type="radio"
        :disabled="disabled"
        :value="label"
        @change="handleChange"
        @click.stop
      >
      <span class="sp-radio__inner" :class="{'sp-icon-check': checked && isCheck }" />
    </span>
    <span class="sp-radio__text"><slot></slot></span>
  </label>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpRadio',
  mixins: [Emitter],
  props: {
    value: {},
    label: {
      type: [String, Boolean, Number, Array],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'round',
      validator(val) {
        return ['check', 'round'].indexOf(val) !== -1
      }
    },
  },
  computed: {
    checked() {
      return this.model === this.label
    },
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.name !== 'SpRadioGroup') {
          parent = parent.$parent
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this._radioGroup = parent
          return true
        }
      }
      return false
    },
    isCheck() {
      return this.type === 'check'
    },
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('SpRadioGroup', 'input', [val])
        } else {
          this.$emit('input', val)
        }
      }
    }
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit('change', this.model)
        this.isGroup && this.dispatch('SpRadioGroup', 'handleChange', this.model)
      })
    },

    handleClick() {
      this.$emit('click', this.model)
    }
  }
}
</script>

<style lang="scss">
.sp-radio {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: $radio-size;
  height: $radio-size;
  line-height: 20px;
  white-space: nowrap;
  outline: none;
  font-size: $radio-font-size;

  &__text {
    display: inline-block;
    vertical-align: middle;
    line-height: 20px;
    font-size: $radio-font-size;
    margin-left: 6px;
    color: $color-text-regular;
  }

  &__wrap {
    position: relative;
    cursor: pointer;
    font-size: 0;
    color: $radio-color;
    margin-right: 40px;
    line-height: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    &:last-child {
      margin-right: 0;
    }

    &.is--check {
      .sp-radio {
        text-align: center;

        .sp-radio__inner {
          color: white;
          font-size: $radio-inner-font-size;
          line-height: $radio-size - 2px;
          font-weight: $radio-inner-font-weight;
          &::after {
            opacity: 0;
          }
        }
      }
    }
  }

  input {
    opacity: 0;
  }

  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: $radio-background-color;
    border: 1px solid $radio-border-color;
    border-radius: 50%;
    vertical-align: middle;
    transition: opacity;
    box-sizing: border-box;
    font-size: $radio-font-size;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 6px;
      height: 6px;
      background-color: $radio-inner-background-color;
      border-top: 0;
      border-left: 0;
      border-radius: 50%;
      opacity: 0;
      transition: $transition-all;
    }
  }

  &__wrap.is--checked &__inner {
    border-color: $radio-border-color-active;
    background-color: $radio-background-color-active;

    &::after {
      opacity: 1;
    }
  }

  &__wrap.is--disabled &__inner {
    border-color: $radio-border-color-disabled;
    background-color: $radio-background-color-disabled;
  }

  &__wrap.is--disabled {
    cursor: not-allowed;
    color: $radio-color-disabled;
  }

  &__wrap.is--disabled &__text {
    color: $radio-color-disabled;
  }

  &__wrap.is--disabled.is--checked &__inner {
    &::after {
      background: $radio-border-color-disabled;
    }
  }
}
</style>
