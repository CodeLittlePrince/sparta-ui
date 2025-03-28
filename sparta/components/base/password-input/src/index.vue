<template>
  <div class="sp-password-input">
    <ul class="sp-password-input__security" @click="handleClick">
      <li
        v-for="(item, index) in realLength"
        :key="index"
        class="sp-password-input__item"
        :index="index"
        :class="{ 'is--focus': isFocus && (cursorIndex === index || codeList[index]) }"
      >
        <i :class="{ 'is__animated': isFocus && cursorIndex === index }"></i>
        <i v-if="codeList[index] && type !=='number'" class="sp-password-input__dot"></i>
        <template v-if="type ==='number' ">
          {{ codeList[index] }}
        </template>
      </li>
    </ul>
    <input
      ref="input"
      v-model="code"
      type="text"
      :maxlength="realLength"
      class="sp-password-input__input"
      autocomplete="new-password"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    >
  </div>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'
export default {
  name: 'SpPasswordInput',

  mixins: [Emitter],
   
  props: {
    value: {
      type: [String,Number],
      default: ''
    },
    type: {
      type: String,
      default: 'password',
      validator: (val) => ['password', 'number', 'idCard'].includes(val)
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    length: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      code: '',
      isFocus: false,
    }
  },
  computed: {
    codeList() {
      return (this.code || '').toString().split('')
    },
    cursorIndex() {
      return this.code.length
    },
    realLength() {
      return this.type === 'idCard' ? 4 : this.length
    }
  },
  watch: {
    code(newVal, oldVal) {
      if (!this.isValidateCode(newVal)) {
        this.code = oldVal
        return false
      }
      this.$emit('input', newVal)
      this.dispatch('SpFormItem', 'sp.form.change', [newVal])
    },
    value(newVal) {
      this.setCurrentValue(newVal)
    }
  },
  mounted() {
    this.setCurrentValue(this.value)
    document.addEventListener('click', this.handleOtherAreaClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOtherAreaClick)
  },
  methods: {
    setCurrentValue(value) {
      this.code = this.isValidateCode(value) ? value?.toString().toUpperCase() : this.code
    },
    isValidateCode(value) {
      if(value && value.length > this.realLength) {
        return
      }
      if (value && ['password', 'number'].includes(this.type) && value.replace(/[^\d]/g, '') != value) {
        return
      }
      if(value && this.type === 'idCard' && !/^\d{1,3}$|^\d{3}[xX]$|^\d{4}$/.test(value)) {
        return
      }
      return true
    },
    handleFocus() {
      this.isFocus = true
      if(this.isIE9()) {
        const cursorPos = this.code.length
        this.$refs.input && ( this.$refs.input.selectionStart = cursorPos )
      }
    },
    isIE9() {
      return navigator.appVersion.indexOf('MSIE 9.0') > -1
    },
    handleOtherAreaClick(e) {
      if (!this.$el.contains(e.target)) {
        this.isFocus = false
      }
    },
    handleBlur() {
      this.isFocus = false
      if (this.validateEvent) {
        this.dispatch('SpFormItem', 'sp.form.blur', [this.code])
      }
    },
    handleClick() {
      this.focus()
    },

    focus() {
      this.$refs.input && this.$refs.input.focus()
    },

    handleKeydown(e) {
      const key = e.key && e.key.toLowerCase()
      // 限制键盘的上下左右键，避免影响光标
      if(['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/base/mixin";

.sp-password-input {
  position: relative;
  user-select: none;
  width: $password-input-width;
  height: $password-input-item-height;

  &__security {
    @include clearfix;
    width: 100%;
    cursor: pointer;
  }

  &__item {
    user-select: none;
    box-sizing: border-box;
    position: relative;
    height: $password-input-item-height;
    width: $password-input-item-width;
    border: $password-input-item-border;
    line-height: $password-input-item-height;
    font-size: 18px;
    text-align: center;
    border-radius: $border-radius-base;
    float: left;
    margin-right: 4px;
    transition: $transition-all;
    background-color: $password-input-item-background;
  }

  &__item:last-child {
    margin-right: 0;
  }

  &__item.is--focus {
    border-color: $password-box-border-focus;
    box-shadow: $password-box-shadow-focus;
  }

  &__input {
    opacity: 0;
    z-index: -1;
    font-size: 1;
    text-indent: -9999px;
    background: white;
    position: absolute;
    border: none;
    outline: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__dot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: $password-input-dot-size;
    height: $password-input-dot-size;
    background-color: $color-text-regular;
    border-radius: $border-radius-circle;
    transform: translate(-50%, -50%);
  }

  .is__animated {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: $password-input-caret-width;
    height: $password-input-caret-height;
    content: "";
    background-color: $password-input-caret-color;
    animation-name: coruscate;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }
  @keyframes coruscate {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}
</style>