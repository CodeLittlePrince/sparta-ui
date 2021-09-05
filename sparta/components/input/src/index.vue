<template>
  <div
    :class="[
      type === 'textarea' ? 'sp-textarea' : 'sp-input',
      inputSize ? 'sp-input--' + inputSize : '',
      {
        'is--disabled': inputDisabled,
        'is--readonly': readonly,
        'sp-input-group': $slots.prepend || $slots.append,
        'sp-input-group--append': $slots.append,
        'sp-input-group--prepend': $slots.prepend,
        'sp-input-group--append-submit': $slots.appendSubmit,
        'sp-input--prefix': $slots.prefix || prefixIcon,
        'sp-input--suffix': $slots.suffix || suffixIcon || clearable
      },
      `sp-input-group--prepend--${prependType}`
    ]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
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
      <template v-if="tipFormat && tipFormat(value)">
        <transition name="sp-fade">
          <div
            v-show="isFocus"
            class="sp-input-group__format-tip"
            :style="{
              'z-index': formatTipZIndex
            }"
          >{{ tipFormat(value) }}</div>
        </transition>
      </template>
      <input
        v-if="type !== 'textarea'"
        ref="input"
        :tabindex="tabindex"
        class="sp-input__inner"
        v-bind="$attrs"
        :placeholder="placeholderText"
        :type="type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :value="currentValue"
        :aria-label="label"
        :maxlength="maxlength"
        :minlength="minlength"
        :max="max"
        :min="min"
        :step="step"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
      <!-- 为了万恶的IE -->
      <p
        v-show="isIE && currentValue === ''"
        class="sp-input__placeholder"
        @click="handleFocusInput"
      >
        {{ placeholder }}
      </p>
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
            />
          </template>
          <i
            v-else
            class="sp-input__icon sp-icon-close-bold sp-input__clear"
            @click.stop="handleClear"
          />
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
      <div
        v-if="$slots.appendSubmit"
        class="sp-input-group__append-submit"
      >
        <slot name="appendSubmit"></slot>
      </div>
    </template>
    <template v-else>
      <textarea
        ref="textarea"
        :tabindex="tabindex"
        class="sp-textarea__inner"
        :value="currentValue"
        v-bind="$attrs"
        :placeholder="placeholderText"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :style="textareaStyle"
        :aria-label="label"
        :maxlength="maxlength"
        :minlength="minlength"
        :max="max"
        :min="min"
        :step="step"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
      </textarea>
      <!-- 为了万恶的IE -->
      <p
        v-show="isIE && currentValue === ''"
        class="sp-textarea__placeholder"
        @click="handleFocusInput"
      >
        {{ placeholder }}
      </p>
    </template>
  </div>
</template>
<script>
import Emitter from 'sparta/common/js/mixins/emitter'
import calcTextareaHeight from './calcTextareaHeight'
import PopManage from 'sparta/model/PopManage'

export default {
  name: 'SpInput',

  mixins: [Emitter],

  inject: {
    spForm: {
      default: ''
    },
    spFormItem: {
      default: ''
    }
  },

  inheritAttrs: false,

  props: {
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    maxlength: [String, Number],
    minlength: [String, Number],
    max: [String, Number],
    min: [String, Number],
    step: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    prependType: {
      type: String,
      default: '',
      validator(val) {
        return ['', 'white'].indexOf(val) > -1
      }
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
    tabindex: String,
    tipFormat: {
      type: Function,
      default: null
    },
    filterChar: {
      type: [RegExp, Array],
      default: null
    }
  },

  data() {
    return {
      currentValue: this.value === undefined || this.value === null
        ? ''
        : this.value,
      textareaCalcStyle: {},
      isHover: false,
      isFocus: false,
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
        success: 'sp-icon-check',
        error: 'sp-icon-close-bold'
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
        (this.isFocus || this.isHover)
    },
    isIE() {
      return window.ActiveXObject || 'ActiveXObject' in window
    },
    placeholderText() {
      // IE10和IE11上，如果有placeholder，input显示以后IE辣鸡浏览器会自动触发input事件
      return this.isIE ? '' : this.placeholder
    }
  },

  watch: {
    value(val) {
      this.setCurrentValue(val)
    },

    currentValue(newVal) {
      this.filterCharForValue(newVal)
    }
  },

  created() {
    this.$on('inputSelect', this.select)
  },

  mounted() {
    this.resizeTextarea()
    this.updateIconOffset()
    this.setFormatTipZIndex()
  },

  updated() {
    this.$nextTick(this.updateIconOffset)
  },

  methods: {
    filterCharForValue(newVal) {
      if (newVal === '') return

      const filterChar = this.filterChar

      if (filterChar) {
        const isArray = filterChar instanceof Array
        const isRegExp = filterChar instanceof RegExp
        let matched = false
        
        if (isArray) {
          for (let i = 0; i < this.filterChar.length; i++) {
            const ele = this.filterChar[i]
            const regrex = new RegExp(ele, 'g')

            if (regrex.test(ele)) {
              matched = true
            }

            newVal = newVal.replace(regrex, '')
          }
        } else if (isRegExp) {
          if (filterChar.test(newVal)) {
            matched = true
          }

          newVal = newVal.replace(filterChar, '')
        }

        if (matched) {
          this.$emit('input', newVal)
          this.setCurrentValue(newVal)
        }
      }
    },
    focus() {
      (this.$refs.input || this.$refs.textarea).focus()
    },
    blur() {
      (this.$refs.input || this.$refs.textarea).blur()
    },
    handleBlur(event) {
      this.isFocus = false
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
      this.isFocus = true
      this.$emit('focus', event)
    },

    handleFocusInput() {
      if (this.type === 'textarea') {
        this.$refs.textarea.focus()
      } else {
        this.$refs.input.focus()
      }
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
      this.currentValue = value
      if (this.isOnComposition && value === this.valueBeforeComposition) return
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

    setFormatTipZIndex() {
      new PopManage()
      this.formatTipZIndex = PopManage.zIndex
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
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;

  .sp-textarea__inner {
    position: relative;
    display: block;
    resize: vertical;
    padding: 7px 10px;
    line-height: 20px;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: $input-color;
    background-color: $input-background;
    background-image: none;
    border: $border-base;
    border-radius: $input-border-radius;
    transition: $transition-all;

    &::placeholder {
      color: $color-text-placeholder;
    }

    &:hover {
      border-color: $color-primary-light-2;
    }

    &:focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: $input-box-shadow-focus;
    }
  }

  .sp-textarea {
    &.is--disabled {
      .sp-textarea__inner {
        background-color: $input-background-disabled;
        border-color: $border-color-base;
        color: $color-text-placeholder;
        cursor: not-allowed;

        &::placeholder {
          color: $color-text-placeholder;
        }
      }
    }

    &.is--readonly {
      .sp-textarea__inner {
        background-color: $input-background-readonly;
        color: $color-text-regular;

        &:hover,
        &:focus {
          border: 1px solid $border-color-base;
          box-shadow: none;
        }
      }
    }
  }

  &__placeholder {
    position: absolute;
    top: 7px;
    bottom: 7px;
    right: 10px;
    font-size: inherit;
    color: $color-text-placeholder;
    line-height: 1.5;
    outline: none;
    padding: 0 10px;
    user-select: none;
    overflow: hidden;
  }
}

.sp-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;

  & .sp-input__clear {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border-radius: 50%;
    color: #fff;
    background-color: $color-text-tip;
    font-size: 12px;
    line-height: 16px;
    cursor: pointer;
  }

  &__inner {
    position: relative;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: $input-border-radius;
    border: $input-border;
    box-sizing: border-box;
    color: $input-color;
    display: inline-block;
    font-size: inherit;
    height: $input-height;
    line-height: $input-height;
    outline: none;
    padding: 0 10px;
    transition: $transition-all;
    width: 100%;

    &::placeholder {
      color: $color-text-placeholder;
    }

    &:hover {
      border-color: $color-primary;
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
    right: 0;
    top: 0;
    width: 36px;
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
    left: 0;
    top: 0;
    width: 36px;
    text-align: center;
    color: $color-text-placeholder;
    transition: all 0.3s;
  }

  &__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    transition: all 0.3s;
    line-height: $input-height;

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

  &.is--active {
    .sp-input__inner {
      outline: none;
      border-color: $color-primary;
      box-shadow: $input-box-shadow-focus;
    }
  }

  &.is--disabled {
    .sp-input__inner {
      background-color: $input-background-disabled;
      border-color: $border-color-base;
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

  &.is--readonly {
    .sp-input__inner {
      background-color: $input-background-readonly;
      color: $color-text-regular;

      &:hover,
      &:focus {
        border: 1px solid $border-color-base;
        box-shadow: none;
      }
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

  &__placeholder {
    position: absolute;
    top: 0;
    bottom: 0;
    font-size: inherit;
    color: $color-text-placeholder;
    line-height: $input-height;
    outline: none;
    padding: 0 10px;
    user-select: none;
  }

  &--prefix &__placeholder {
    padding-left: 30px;
  }

  &--suffix &__placeholder {
    padding-right: 30px;
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
    color: $color-text-regular;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: $border-base;
    border-radius: $input-border-radius;
    padding: 0 10px;
    width: 1px;
    white-space: nowrap;
    overflow: hidden;

    &:focus {
      outline: none;
    }

    .sp-button {
      display: inline-block;
      margin: -5px -20px;
    }

    .sp-select {
      margin: -1px -11px;
      float: left;

      .sp-select__input-box {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    button.sp-button,
    div.sp-select .sp-select__input-box,
    div.sp-select:hover .sp-select__input-box {
      border-color: transparent;
      background-color: transparent;
      color: inherit;
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

  &--prepend--white &__prepend {
    background-color: #fff;
  }

  &--prepend {
    .sp-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .sp-select .sp-input.is--focus .sp-input__inner {
      border-color: transparent;
    }
  }

  &--append {
    .sp-input__inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .sp-select .sp-input.is--focus .sp-input__inner {
      border-color: transparent;
    }
  }

  &--append-submit {

    .sp-input__inner {
      padding-right: 75px;
    }
  }

  &__append-submit {
    position: absolute;
    top: 5px;
    right: 5px;

    .sp-button {
      width: 60px;
      height: 26px;
      padding: 4px 0;
    }
  }

  &__format-tip {
    position: absolute;
    bottom: $input-height + 4px;
    left: 0;
    right: 0;
    background-color: #e6f1ff;
    border-radius: $input-border-radius;
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
    color: $color-text-regular;
    box-sizing: border-box;
    padding: 7px 10px;
  }
}
</style>
