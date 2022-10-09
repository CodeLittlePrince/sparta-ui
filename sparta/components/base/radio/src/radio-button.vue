<template>
  <label
    class="sp-radio-button__wrap"
    :class="[
      { 'is--disabled': disabled },
      { 'is--checked': checked },
      { 'is--text': text },
    ]"
  >
    <span class="sp-radio-button">
      <input
        v-model="model"
        type="radio"
        :disabled="disabled"
        :value="label"
        @change="handleChange"
      >
    </span>
    <span class="sp-radio-button__text"><slot></slot></span>
  </label>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpRadioButton',
  mixins: [Emitter],
  props: {
    value: {},
    label: {
      type: [String, Boolean, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    }
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
    }
  }
}
</script>

<style lang="scss">
.sp-radio-button {
  position: absolute;
  z-index: -1;
  outline: none;
  line-height: 1;

  &__text {
    display: inline-block;
    vertical-align: middle;
    font-size: $radio-font-size;
    color: $color-text-regular;
    transition: $transition-all;
  }

  &__wrap {
    position: relative;
    cursor: pointer;
    color: $radio-color;
    line-height: 34px;
    height: 36px;
    min-width: 136px;
    padding: 0 10px;
    border-radius: 18px;
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border: solid 1px $radio-border-color;
    white-space: nowrap;
    text-align: center;
    font-size: 0;
    transition: $transition-all;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      border-color: $color-primary;
    }
  }

  input {
    opacity: 0;
  }

  &__wrap.is--checked {
    border-color: $color-primary;
    background-color: $radio-button-background-color-active;
    .sp-radio-button__text {
      color: $color-primary;
      font-weight: 600;
    }
  }

  &__wrap.is--disabled {
    border-color: $radio-button-border-color-disabled;
    background-color: #fff;
    cursor: not-allowed;
    .sp-radio-button__text {
      color: $radio-color-disabled;
    }
  }

  &__wrap.is--text {
    border-color: transparent;
    background-color: transparent;
    min-width: 98px;
    &:hover {
      background-color: $radio-button-background-color-hover;
      .sp-radio-button__text {
        color: $radio-button-text-hover;
      }
    }
    &.is--checked, &.is--checked:hover {
      border-color: $radio-button-background-color-active;
      background-color: $radio-button-background-color-active;
      .sp-radio-button__text {
        color: $color-primary;
        font-weight: 600;
      }
    }
    &.is--disabled {
      border-color: transparent;
      background-color: #fff;
      .sp-radio-button__text {
        color: $radio-color-disabled;
        font-weight: normal;
      }
    }
    .sp-radio-button__text {
      color: $radio-button-color;
    }
  }
}
</style>
