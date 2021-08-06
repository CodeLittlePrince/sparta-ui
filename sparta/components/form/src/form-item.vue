<template>
  <div
    class="sp-form-item"
    :class="[
      {
        'sp-form-item--feedback': spForm && spForm.statusIcon,
        'is--error': validateState === 'error',
        'is--validating': validateState === 'validating',
        'is--success': validateState === 'success',
        'is--required': isRequired || required
      }
    ]"
  >
    <label
      v-if="label || $slots.label"
      :for="labelFor"
      class="sp-form-item__label"
      :class="{ 'is--two-line': twoLine }"
      :style="labelStyle"
    >
      <slot name="label">{{ label }}</slot>
    </label>
    <div
      class="sp-form-item__content"
      :style="contentStyle"
    >
      <slot></slot>
      <div v-if="$slots.tip" class="sp-form-item__content__tip">
        <slot name="tip"></slot>
      </div>
      <div class="sp-form-item__error">
        <transition name="sp-zoom-in-top">
          <div v-if="validateState === 'error' && showMessage && form.showMessage">
            <slot
              name="error"
              :error="validateMessage"
            >
              {{ validateMessage }}
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import Emitter from 'sparta/common/js/mixins/emitter'
import tool from 'sparta/common/js/utils/tool'

export default {
  name: 'SpFormItem',

  mixins: [Emitter],

  provide() {
    return {
      spFormItem: this
    }
  },

  inject: ['spForm'],

  props: {
    label: String,
    labelWidth: String,
    twoLine: {
      type: Boolean,
      dafault: false
    },
    prop: String,
    required: {
      type: Boolean,
      default: undefined
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false
    }
  },
  computed: {
    labelFor() {
      return this.for || this.prop
    },

    labelStyle() {
      const ret = {}
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth) {
        ret.width = labelWidth
      }
      return ret
    },

    contentStyle() {
      const ret = {}
      const label = this.label
      if (!label && !this.labelWidth && this.isNested) return ret
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth) {
        ret.marginLeft = labelWidth
      }
      return ret
    },

    form() {
      let parent = this.$parent
      let parentName = parent.$options.name
      while (parentName !== 'SpForm') {
        if (parentName === 'SpFormItem') {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.isNested = true
        }
        parent = parent.$parent
        parentName = parent.$options.name
      }
      return parent
    },

    fieldValue() {
      const model = this.form.model
      if (!model || !this.prop) { return }

      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      return tool.getPropByPath(model, path, true).v
    },

    isRequired() {
      let rules = this.getRules()
      let isRequired = false

      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            isRequired = true
            return false
          }
          return true
        })
      }
      return isRequired
    }
  },

  watch: {
    error: {
      immediate: true,
      handler(value) {
        this.validateMessage = value
        this.validateState = value ? 'error' : ''
      }
    },
    validateStatus(value) {
      this.validateState = value
    }
  },

  mounted() {
    if (this.prop) {
      this.dispatch('SpForm', 'sp.form.addField', [this])

      let initialValue = this.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      })

      let rules = this.getRules()
      if (rules.length || this.required !== undefined) {
        this.$on('sp.form.blur', this.onFieldBlur)
        this.$on('sp.form.change', this.onFieldChange)
      }
    }
  },

  beforeDestroy() {
    this.dispatch('SpForm', 'sp.form.removeField', [this])
  },

  methods: {
    validate(trigger, callback = tool.noop) {
      this.validateDisabled = false
      const rules = this.getFilteredRule(trigger)
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback()
        return true
      }

      this.validateState = 'validating'

      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      const model = {}

      model[this.prop] = this.fieldValue

      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage, invalidFields)
        this.spForm && this.spForm.$emit('validate', this.prop, !errors, this.validateMessage || null)
      })
    },

    clearValidate() {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = false
    },

    resetField() {
      this.validateState = ''
      this.validateMessage = ''

      let model = this.form.model
      let value = this.fieldValue
      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      let prop = tool.getPropByPath(model, path, true)

      this.validateDisabled = true
      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue)
      } else {
        prop.o[prop.k] = this.initialValue
      }

      this.broadcast('SpTimeSelect', 'fieldReset', this.initialValue)
    },

    getRules() {
      let formRules = this.form.rules
      const selfRules = this.rules
      const requiredRule = this.required !== undefined ? { required: !!this.required } : []

      const prop = tool.getPropByPath(formRules, this.prop || '')
      formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : []

      return [].concat(selfRules || formRules || []).concat(requiredRule)
    },

    getFilteredRule(trigger) {
      const rules = this.getRules()

      return rules.filter(rule => {
        if (!rule.trigger || trigger === '') return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      }).map(rule => Object.assign({}, rule))
    },

    onFieldBlur() {
      this.validate('blur')
    },

    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }

      this.validate('change')
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-form-item {
  @include clearfix();

  & .sp-form-item {
    margin-bottom: 0;
  }

  & .sp-input__validateIcon {
    display: none;
  }

  &__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: $color-text-secondary;
    line-height: 36px;
    padding-right: 56px;
    box-sizing: border-box;

    &.is--two-line {
      line-height: 1.2;
      padding-top: 4px;
    }
  }

  &__content {
    line-height: 36px;
    position: relative;
    font-size: 14px;
    @include clearfix();

    .sp-input-group {
      vertical-align: middle;
    }

    &__tip {
      font-size: 12px;
      line-height: 18px;
      color: $color-text-tip;
      padding-top: 3px;
    }

    .sp-upload {
      padding-top: 8px;
    }
  }

  &__error {
    color: $form-item-error-color;
    font-size: $form-item-error-font-size;
    line-height: 17px;
    padding: 3px 0 6px;
    min-height: 26px;
    box-sizing: border-box;
  }

  &.is--error {
    & .sp-input__inner,
    & .sp-textarea__inner {
      &, &:focus {
        border-color: $color-danger;
      }
      &:focus {
        box-shadow: $input-box-shadow-focus-error;
      }
    }

    & .sp-input-group__tip,
    & .sp-input-group__prepend {
      & .sp-input__inner {
        border-color: transparent;
      }
    }

    .sp-input__validateIcon {
      color: $color-danger;
    }

    .sp-select {
      &-input-box {
        border-color: $color-danger;
      }

      &.isFocus .sp-select-input-box {
        border-color: $color-danger;
        box-shadow: $input-box-shadow-focus-error;
      }
    }
  }

  &.is--required &__label.is--two-line::before {
    display: none;
  }

  &--feedback {
    .sp-input__validateIcon {
      display: inline-block;
    }
  }
}
</style>
