<template>
  <div
    class="sp-form-item"
    :class="[
      {
        'sp-form-item--feedback': spForm && spForm.statusIcon,
        'is--error': validateState === 'error',
        'is--validating': validateState === 'validating',
        'is--success': validateState === 'success',
        'is--required': isRequired || required,
        'is--two-line': $slots.labelSecondLine
      }
    ]"
  >
    <label
      v-if="label || $slots.label"
      :for="labelFor"
      class="sp-form-item__label"
      :style="labelStyle"
    >
      <slot name="label">{{ label }}</slot>
      <p v-if="$slots.labelSecondLine" class="sp-form-item__label__second-line">
        <slot name="labelSecondLine"></slot>
      </p>
      <sp-popup-tip
        v-if="$slots.labelTip"
        class="sp-form-item__label__tip"
        :width="labelTipWidth"
        color="#747d8c"
        theme="blue"
        has-border
        :placement="labelTipPlacement"
      >
        <i class="sp-icon-ques" />
        <template slot="popup">
          <slot name="labelTip"></slot>
        </template>
      </sp-popup-tip>
    </label>
    <div
      class="sp-form-item__content"
      :style="contentStyle"
    >
      <slot></slot>
      <div v-if="tipShown" class="sp-form-item__content__tip">
        <slot name="tip"></slot>
      </div>
      <div v-if="floatError" class="sp-form-item__floatError">
        <transition name="sp-zoom-in-top">
          <div v-show="errShown">
            <slot
              name="errorFloat"
              :error="validateMessage"
            >{{ validateMessage }}</slot>
          </div>
        </transition>
      </div>
      <div v-else class="sp-form-item__error">
        <transition name="sp-zoom-in-top">
          <div v-show="errShown">
            <slot
              name="error"
              :error="validateMessage"
            >{{ validateMessage }}</slot>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import Emitter from 'sparta/common/js/mixins/emitter'
import {getPropByPath,clonedeep,noop} from 'sparta/common/js/utils/tool'

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
    prop: String,
    required: {
      type: Boolean,
      default: undefined
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    floatError: {
      type: Boolean,
      default: false
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    labelTipWidth: {
      type: [String, Number],
      default: '230'
    },
    labelTipPlacement: {
      type: String,
      default: 'bottom'
    },
    forUpload: {
      type: Boolean,
      default: false
    },
    hideTipWhenErrShow: {
      type: Boolean,
      default: false
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
    errShown() {
      return this.validateState === 'error' && this.showMessage && this.form.showMessage
    },

    tipShown() {
      return (this.$slots.tip && !(this.hideTipWhenErrShow || this.form.hideTipWhenErrShow)) ||
        ( this.$slots.tip && (this.hideTipWhenErrShow || this.form.hideTipWhenErrShow) && !this.errShown )
    },
    
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

      return getPropByPath(model, path, true).v
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
    validate(trigger, callback = noop) {
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

      let fieldValueCopy = clonedeep(this.fieldValue)

      // 上传文件只应该看已经上传成功的
      if (this.forUpload) {
        fieldValueCopy = fieldValueCopy.filter(item => item.status === 'success')
      }
      model[this.prop] = fieldValueCopy
      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage, invalidFields)
        this.spForm && this.spForm.$emit('validate', this.prop, !errors, this.validateMessage || null)
      })
    },

    showError(error) {
      this.validateState = 'error'
      this.validateMessage = error || '校验失败'
      this.spForm && this.spForm.$emit('validate', this.prop, false, this.validateMessage)
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

      let prop = getPropByPath(model, path, true)

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

      const prop = getPropByPath(formRules, this.prop || '')
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
@import "sparta/common/scss/base/mixin";

.sp-form-item {
  @include clearfix;

  & .sp-form-item {
    margin-bottom: 0;
  }

  & .sp-input__validateIcon {
    display: none;
  }

  &__label {
    position: relative;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: $form-item-label-font-size;
    color: $form-item-label-color;
    line-height: $input-height;
    padding-right: $form-item-label-padding-right;
    box-sizing: border-box;

    &__second-line {
      font-size: 12px;
      line-height: 17px;
    }

    &__tip {
      position: absolute;
      line-height: 1;
      top: $form-item-ques-top;
      margin-left: $form-item-ques-margin-left;

      .sp-icon-ques {
        color: $color-text-tip;
        font-size: $form-item-ques-font-size;
      }

      .sp-popup-tip__modal {
        top: 32px;
      }
    }
  }

  &.is--two-line &__label {
    line-height: 20px;

    &__tip {
      top: 3px;
    }

    .sp-popup-tip__modal {
      top: 24px;
    }
  }

  &__content {
    line-height: $input-height;
    position: relative;
    font-size: $input-font-size;
    @include clearfix;

    .sp-input-group {
      vertical-align: middle;
    }

    &__tip {
      font-size: $form-item-tip-font-size;
      line-height: 1.5;
      color: $color-text-tip;
      padding-top: $form-item-tip-padding;
    }

    .sp-upload {
      padding-top: 8px;
    }

    .sp-time-select {
      width: 194px;
      &.is--range {
        width: 240px;
        .sp-input {
          width: 100%;
        }
      }
      &__single {
        .sp-input {
          width: 194px;
        }
      }
    }

    .sp-input-group__append-submit {
      line-height: 1;
    }

    .sp-input,
    .sp-select,
    .sp-textarea {
      width: 400px;
    }

    // 这种是在form-item里又套form-item的情况，一般都是为了在一行里面能放多个组件
    .sp-form-item {
      float: left;

      + .sp-form-item {
        margin-left: 10px;
      }

      ~ .sp-form-item__error {
        display: none;
      }

      .sp-input,
      .sp-select {
        width: 195px;
      }

      .sp-input ~ .sp-select,
      .sp-select ~ .sp-input {
        margin-left: 10px;
      }
    }
  }

  &.is--two-line &__content {
    .sp-upload {
      padding-top: 0;
    }
  }

  &__error {
    color: $form-item-error-color;
    font-size: $form-item-error-font-size;
    line-height: $form-item-error-line-height;
    padding: $form-item-error-padding;
    min-height: $form-item-error-min-height;
    box-sizing: border-box;
    will-change: transform;
  }

  &__floatError {
    height: 16px;

    > div {
      position: absolute;
      top: $input-height;
      z-index: 1;
      background-color: rgb(0 0 0 / 85%);
      font-size: 16px;
      line-height: 1.5;
      color: #fff;
      text-align: left;
      margin-top: 10px;
      padding: 9px 12px;
      box-sizing: border-box;
      border-radius: 6px;
      word-break: break-all;

      &::before {
        position: absolute;
        top: -5.5px;
        content: "";
        left: 15px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 6px solid rgb(0 0 0 / 85%);
      }
    }
  }

  &.is--error &__label {
    color: $form-item-label-error-color;
  }

  &.is--error {
    & .sp-input__inner,
    & .sp-date-picker.is--range,
    & .sp-textarea__inner {
      &, &:focus {
        border-color: $color-danger;
      }
      &:focus {
        box-shadow: $input-box-shadow-focus-error;
      }
    }

    & .sp-date-picker.is--range .sp-input__inner {
      &, &:focus {
        border-color: transparent;
        box-shadow: none;
      }
    }

    & .sp-password-input__item {
      border-color: $color-danger;
    }
    & .sp-password-input__item.is--focus {
      box-shadow: $input-box-shadow-focus-error;
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
      &__input-box {
        border-color: $color-danger;
      }

      &.isFocus .sp-select__input-box {
        border-color: $color-danger;
        box-shadow: $input-box-shadow-focus-error;
      }
    }

    .sp-time-select__range {
      border-color: $color-danger;
      box-shadow: $input-box-shadow-focus-error;
    }
  }

  &--feedback {
    .sp-input__validateIcon {
      display: inline-block;
    }
  }
}
</style>
