<template>
  <label class="sp-checkbox__wrap">
    <span
      class="sp-checkbox"
      :class="[
        { 'is--disabled': isDisabled },
        { 'is--checked': isChecked }
      ]"
    >
      <input
        v-if="trueLabel || falseLabel"
        v-model="model"
        type="checkbox"
        class="sp-checkbox__input"
        :true-value="trueLabel"
        :false-value="falseLabel"
        :disabled="isDisabled"
        :value="label"
        @change="handleChange"
      />
      <input
        v-else
        v-model="model"
        type="checkbox"
        class="sp-checkbox__input"
        :disabled="isDisabled"
        :value="label"
        @change="handleChange"
      />
      <span
        class="sp-checkbox__icon iconfont"
        :class="{'sp-icon-check': isChecked, 'is--indeterminate': indeterminate}"
      ></span>
    </span>
    <span v-if="$slots.default || label" class="sp-checkbox__text">
      <template v-if="!$slots.default">{{ label }}</template>
      <slot></slot>
    </span>
  </label>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpCheckbox',

  mixins: [Emitter],

  inject: {
    SpForm: {
      default: ''
    },
    SpFormItem: {
      default: ''
    }
  },

  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    trueLabel: [String, Number],
    falseLabel: [String, Number]
  },

  data() {
    return {
      selfModel: false,
      isLimitExceeded: false
    }
  },

  computed: {
    model: {
      get() {
        return this.isGroup
          ? this.store : this.value !== undefined
            ? this.value : this.selfModel
      },

      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          (
            this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (this.isLimitExceeded = true)
          );

          (
            this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (this.isLimitExceeded = true)
          )

          this.isLimitExceeded === false &&
            this.dispatch('SpCheckboxGroup', 'input', [val])
        } else {
          this.$emit('input', val)
          this.selfModel = val
        }
      }
    },

    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel
      }
      return false
    },

    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.name !== 'SpCheckboxGroup') {
          parent = parent.$parent
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this._checkboxGroup = parent
          return true
        }
      }
      return false
    },

    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value
    },

    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled || this.disabled || (this.spForm || {}).disabled
        : this.disabled || (this.spForm || {}).disabled
    }
  },

  watch: {
    value(value) {
      this.dispatch('SpFormItem', 'sp.form.change', value)
    }
  },

  mounted() {
    this.checked && this.addToStore()
  },

  methods: {
    addToStore() {
      if (
        Array.isArray(this.model) &&
        this.model.indexOf(this.label) === -1
      ) {
        this.model.push(this.label)
      } else {
        this.model = this.trueLabel || true
      }
    },

    handleChange(ev) {
      if (this.isLimitExceeded) return
      let value
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel
      }
      this.$emit('change', value, ev)
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch('SpCheckboxGroup', 'change', [this._checkboxGroup.value])
        }
      })
    }
  },
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-checkbox {
  position: relative;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
  vertical-align: middle;
  line-height: 20px;
  white-space: nowrap;
  outline: none;
  cursor: pointer;

  &__wrap {
    font-size: 0;
    height: 20px;
    line-height: 20px;
    margin-right: 40px;
    display: inline-block;
    &:last-child {
      margin-right: 0;
    }
  }

  & + span {
    font-size: 14px;
    padding-left: 6px;
    cursor: pointer;
    vertical-align: middle;
    display: inline-block;
  }

  &__input {
    opacity: 0;
    width: 14px;
    height: 14px;
  }

  &__icon {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 12px;
    height: 12px;
    font-size: 14px;
    background-color: $checkbox-background;
    border: 1px solid $checkbox-border-color;
    border-radius: 2px;
    transition: all 0.3s;

    &.is--indeterminate::after {
      content: "";
      width: 6px;
      height: 6px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
      border: none;
      background-color: $color-primary;
    }

    &:hover {
      border-color: $color-primary;
    }
  }
  &__text {
    font-size: 14px;
  }

  &__input:focus + span {
    border-color: $color-primary;
  }

  &.is--checked {
    .sp-checkbox__icon {
      color: $checkbox-checkmark-color;
      font-size: 12px;
      background-color: $color-primary;
      border-color: $color-primary;
    }
  }

  &.is--disabled {
    cursor: not-allowed;
    .sp-checkbox__icon {
      background-color: $checkbox-background-disabled;
      border-color: $checkbox-border-color;
    }
    &.is--checked {
      .sp-checkbox__icon {
        color: $checkbox-checkmark-color-disabled;
        border-color: $checkbox-background-disabled;
      }
    }
    & + span {
      color: $checkbox-font-color-disabled;
      cursor: not-allowed;
    }
  }
}
</style>
