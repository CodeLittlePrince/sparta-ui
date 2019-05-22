<template>
  <label class="sp-checkbox-wrapper">
    <span
      :id="id"
      class="sp-checkbox"
      :class="[
        { 'is-disabled': isDisabled },
        { 'is-checked': isChecked }
      ]"
      role="checkbox"
      :aria-checked="indeterminate ? 'mixed': isChecked"
      :aria-disabled="isDisabled"
    >
      <input
        v-if="trueLabel || falseLabel"
        v-model="model"
        type="checkbox"
        class="sp-checkbox-input"
        :true-value="trueLabel"
        :false-value="falseLabel"
        :disabled="isDisabled"
        :value="label"
        @change="handleChange"
      />
      <input
        v-model="model"
        type="checkbox"
        class="sp-checkbox-input"
        :disabled="isDisabled"
        :value="label"
        @change="handleChange"
      />
      <span
        class="sp-checkbox-inner"
        :class="{
          'is-disabled': isDisabled,
          'is-checked': isChecked,
          'is-indeterminate': indeterminate,
        }"
        aria-checked="mixed"
      />
    </span>
    <span v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
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
    falseLabel: [String, Number],
    id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    controls: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
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
          (this._checkboxGroup.min !== undefined &&
              val.length < this._checkboxGroup.min &&
              (this.isLimitExceeded = true));

          (this._checkboxGroup.max !== undefined &&
              val.length > this._checkboxGroup.max &&
              (this.isLimitExceeded = true))

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
        ? this._checkboxGroup.disabled || this.disabled || (this.elForm || {}).disabled
        : this.disabled || (this.elForm || {}).disabled
    },

    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },

    checkboxSize() {
      const temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
      return this.isGroup
        ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
        : temCheckboxSize
    }
  },
  watch: {
    value(value) {
      this.dispatch('SpFormItem', 'sp.form.change', value)
    }
  },
  created() {
    this.checked && this.addToStore()
  },
  mounted() { // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls)
    }
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

.sp-checkbox-wrapper {
  font-size: 14px;
  .sp-checkbox {
    position: relative;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    margin: 0;
    padding: 0;
    list-style: none;
    top: -0.09em;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    outline: none;
    cursor: pointer;

    & + span {
      padding-right: 8px;
      padding-left: 8px;
      cursor: pointer;
    }

    &-input {
      opacity: 0;
    }

    &-inner {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 16px;
      height: 16px;
      background-color: $checkbox-background;
      border: 1px solid $checkbox-border-color;
      border-radius: 2px;
      transition: all 0.3s;

      &::after {
        content: "";
        position: absolute;
        top: 20%;
        left: 54%;
        display: inline-block;
        height: 6px;
        width: 9px;
        border-left: 2px solid $checkbox-checkmark-color;
        border-bottom: 2px solid $checkbox-checkmark-color;
        box-sizing: border-box;
        transform: rotate(-45deg) scale(1) translate(-50%, -50%);
        transition: $transition-all;
        opacity: 0;
      }

      &.is-indeterminate::after {
        width: 8px;
        height: 8px;
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

    &-input:focus + span {
      border-color: $color-primary;
    }

    &.is-checked {
      .sp-checkbox-inner {
        background-color: $color-primary;
        border-color: $color-primary;
        &::after {
          opacity: 1;
        }
      }
    }

    &.is-disabled {
      cursor: not-allowed;
      .sp-checkbox-inner {
        background-color: $checkbox-background-disabled;
        border-color: $checkbox-border-color;
        &::after {
          border-color: $checkbox-checkmark-color-disabled;
        }
      }
      & + span {
        cursor: not-allowed;
      }
    }
  }
}
</style>
