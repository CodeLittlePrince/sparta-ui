<template>
  <div
    :class="[
      type === 'textarea' ? 'sp-textarea' : 'sp-input',
      inputSize ? 'sp-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'sp-input-group': $slots.prepend || $slots.append,
        'sp-input-group--append': $slots.append,
        'sp-input-group--prepend': $slots.prepend,
        'sp-input--prefix': $slots.prefix || prefixIcon,
        'sp-input--suffix': $slots.suffix || suffixIcon || clearable
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @click="handleSpInputClick"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div
        v-if="$slots.prepend"
        class="sp-input-group__prepend"
      >
        <slot name="prepend"></slot>
      </div>
      <input
        v-if="type !== 'textarea'"
        ref="input"
        :tabindex="tabindex"
        class="sp-input__inner"
        v-bind="$attrs"
        :type="type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :value="currentValue"
        :aria-label="label"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
      <!-- 前置内容 -->
      <span
        v-if="$slots.prefix || prefixIcon"
        class="sp-input__prefix"
      >
        <slot name="prefix"></slot>
        <i
          v-if="prefixIcon"
          class="sp-input__icon"
          :class="prefixIcon"
        >
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon"
        class="sp-input__suffix"
      >
        <span class="sp-input__suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i
              v-if="suffixIcon"
              class="sp-input__icon"
              :class="suffixIcon"
            >
            </i>
          </template>
          <i
            v-else
            class="sp-input__icon sp-icon-circle-close sp-input__clear"
            @click.stop="handleClear"
          ></i>
        </span>
        <i
          v-if="validateState"
          class="sp-input__icon"
          :class="['sp-input__validateIcon', validateIcon]"
        >
        </i>
      </span>
      <!-- 后置元素 -->
      <div
        v-if="$slots.append"
        class="sp-input-group__append"
      >
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      ref="textarea"
      :tabindex="tabindex"
      class="sp-textarea__inner"
      :value="currentValue"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :style="textareaStyle"
      :aria-label="label"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >
    </textarea>
  </div>
</template>
<script>
import Emitter from 'sparta/common/js/mixins/emitter'
import calcTextareaHeight from './calcTextareaHeight'

export default {
  name: 'SpInput',

  mixins: [Emitter],

  inheritAttrs: false,

  inject: {
    spForm: {
      default: ''
    },
    spFormItem: {
      default: ''
    }
  },

  props: {
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },

  data() {
    return {
      currentValue: this.value === undefined || this.value === null
        ? ''
        : this.value,
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isOnComposition: false,
      valueBeforeComposition: null
    }
  },

  computed: {
    _spFormItemSize() {
      return (this.spFormItem || {}).spFormItemSize
    },
    validateState() {
      return this.spFormItem ? this.spFormItem.validateState : ''
    },
    needStatusIcon() {
      return this.spForm ? this.spForm.statusIcon : false
    },
    validateIcon() {
      return {
        validating: 'sp-icon-loading',
        success: 'sp-icon-circle-check',
        error: 'sp-icon-circle-close'
      }[this.validateState]
    },
    textareaStyle() {
      return Object.assign({}, this.textareaCalcStyle, { resize: this.resize })
    },
    inputSize() {
      return this.size
    },
    inputDisabled() {
      return this.disabled || (this.spForm || {}).disabled
    },
    showClear() {
      return this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.currentValue !== '' &&
        (this.focused || this.hovering)
    }
  },

  watch: {
    value(val) {
      this.setCurrentValue(val)
    }
  },

  created() {
    this.$on('inputSelect', this.select)
  },

  mounted() {
    this.resizeTextarea()
    this.updateIconOffset()
  },

  updated() {
    this.$nextTick(this.updateIconOffset)
  },

  methods: {
    focus() {
      (this.$refs.input || this.$refs.textarea).focus()
    },
    blur() {
      (this.$refs.input || this.$refs.textarea).blur()
    },
    handleBlur(event) {
      this.focused = false
      this.$emit('blur', event)
      if (this.validateEvent) {
        this.dispatch('SpFormItem', 'sp.form.blur', [this.currentValue])
      }
    },
    select() {
      (this.$refs.input || this.$refs.textarea).select()
    },
    resizeTextarea() {
      if (this.$isServer) return
      const { autosize, type } = this
      if (type !== 'textarea') return
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        }
        return
      }
      const minRows = autosize.minRows
      const maxRows = autosize.maxRows

      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
    },

    handleSpInputClick(e) {
      this.$emit('click', e)
    },

    handleFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },

    handleComposition(event) {
      if (event.type === 'compositionend') {
        this.isOnComposition = false
        this.currentValue = this.valueBeforeComposition
        this.valueBeforeComposition = null
        this.handleInput(event)
      } else {
        const text = event.target.value
        const lastCharacter = text[text.length - 1] || ''
        const koreanReg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi
        const isKorean = koreanReg.test(lastCharacter)
        this.isOnComposition = !isKorean
        if (this.isOnComposition && event.type === 'compositionstart') {
          this.valueBeforeComposition = text
        }
      }
    },

    handleInput(event) {
      const value = event.target.value
      this.setCurrentValue(value)
      if (this.isOnComposition) return
      this.$emit('input', value)
    },

    handleChange(event) {
      this.$emit('change', event.target.value)
    },

    setCurrentValue(value) {
      if (this.isOnComposition && value === this.valueBeforeComposition) return
      this.currentValue = value
      if (this.isOnComposition) return
      this.$nextTick(this.resizeTextarea)
      if (this.validateEvent && this.currentValue === this.value) {
        this.dispatch('SpFormItem', 'sp.form.change', [value])
      }
    },

    calcIconOffset(place) {
      let elList = [].slice.call(this.$el.querySelectorAll(`.sp-input__${place}`) || [])
      if (!elList.length) return
      let el = null
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i]
          break
        }
      }
      if (!el) return
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      }

      const pendant = pendantMap[place]
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$el.querySelector(`.sp-input-group__${pendant}`).offsetWidth}px)`
      } else {
        el.removeAttribute('style')
      }
    },

    updateIconOffset() {
      this.calcIconOffset('prefix')
      this.calcIconOffset('suffix')
    },

    handleClear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
      this.setCurrentValue('')
      // this.focus()
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-textarea {
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;

  .sp-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: $input-color;
    background-color: $input-background;
    border-width: 1px;
    background-image: none;
    border-color: #d9d9d9;
    border-radius: $input-border-radus;
    transition: $transition-all;

    &::placeholder {
      color: $color-text-placeholder;
    }

    &:hover {
      border-color: $color-primary-light-2;
    }

    &:focus {
      outline: none;
      border-color: $input-box-shadow-focus;
    }
  }

  .sp-textarea.is-disabled {
    .sp-textarea__inner {
      background-color: $input-background-disabled;
      border-color: #e4e7ed;
      color: $color-text-placeholder;
      cursor: not-allowed;

      &::placeholder {
        color: $color-text-placeholder;
      }
    }
  }
}

.sp-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;

  & .sp-input__clear {
    color: $color-text-placeholder;
    font-size: 14px;
    line-height: 16px;
    transition: $transition-all;
    cursor: pointer;

    &:hover {
      color: $color-text-secondary;
    }
  }

  &__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: $input-border-radus;
    border: $input-border-color;
    box-sizing: border-box;
    color: $input-color;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: $transition-all;
    width: 100%;

    &::placeholder {
      color: $color-text-placeholder;
    }

    &:hover {
      border-color: $input-border-color-hover;
    }

    &:focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: $input-box-shadow-focus;
    }
  }

  &__suffix {
    position: absolute;
    height: 100%;
    right: 5px;
    top: 0;
    text-align: center;
    color: $color-text-placeholder;
    transition: all 0.3s;
    pointer-events: none;
  }

  &__suffix-inner {
    pointer-events: all;
  }

  &__prefix {
    position: absolute;
    height: 100%;
    left: 5px;
    top: 0;
    text-align: center;
    color: $color-text-placeholder;
    transition: all 0.3s;
  }

  &__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    transition: all 0.3s;
    line-height: 40px;

    &::after {
      content: '';
      height: 100%;
      width: 0;
      display: inline-block;
      vertical-align: middle;
    }
  }

  &__validateIcon {
    pointer-events: none;
  }

  &.is-active {
    .sp-input__inner {
      outline: none;
      border-color: $color-primary;
      box-shadow: $input-box-shadow-focus;
    }
  }

  &.is-disabled {
    .sp-input__inner {
      background-color: $input-background-disabled;
      border-color: #e4e7ed;
      color: $color-text-placeholder;
      cursor: not-allowed;

      &::placeholder {
        color: $color-text-placeholder;
      }
    }

    .sp-input__icon {
      cursor: not-allowed;
    }
  }

  &--suffix {
    .sp-input__inner {
      padding-right: 30px;
    }
  }

  &--prefix {
    .sp-input__inner {
      padding-left: 30px;
    }
  }

  &--medium {
    font-size: $input-medium-font-size;

    .sp-input__inner {
      height: $input-medium-height;
      line-height: $input-medium-height;
    }

    .sp-input__icon {
      line-height: $input-medium-height;
    }
  }
  &--small {
    font-size: $input-small-font-size;

    .sp-input__inner {
      height: $input-small-height;
      line-height: $input-small-height;
    }

    .sp-input__icon {
      line-height: $input-small-height;
    }
  }
  &--mini {
    font-size: $input-mini-font-size;

    .sp-input__inner {
      height: $input-mini-height;
      line-height: $input-mini-height;
    }

    .sp-input__icon {
      line-height: $input-mini-height;
    }
  }
}

.sp-input-group {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  > .sp-input__inner {
    vertical-align: middle;
    display: table-cell;
  }

  &__append, &__prepend {
    background-color: $input-background-disabled;
    color: $color-info;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: $border-base;
    border-radius: $input-border-radus;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;

    &:focus {
      outline: none;
    }

    .sp-button {
      display: inline-block;
      margin: -5px -20px;
    }

    .sp-select {
      display: inline-block;
      margin: -5px -20px;
      top: 5px;
    }

    button.sp-button,
    div.sp-select .sp-select-input-box,
    div.sp-select:hover .sp-select-input-box {
      border-color: transparent;
      background-color: transparent;
      color: inherit;
      border-top: 0;
      border-bottom: 0;
    }

    .sp-button,
    .sp-input {
      font-size: inherit;
    }
  }

  &__prepend {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__append {
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &--prepend {
    .sp-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .sp-select .sp-input.is-focus .sp-input__inner {
      border-color: transparent;
    }
  }

  &--append {
    .sp-input__inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .sp-select .sp-input.is-focus .sp-input__inner {
      border-color: transparent;
    }
  }
}
</style>
