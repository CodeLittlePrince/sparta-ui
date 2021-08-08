<template>
  <div class="sp-password-input">
    <ul class="sp-password-input__security" @click="handleClick">
      <li
        v-for="(item, index) in codeLength"
        :key="index"
        class="sp-password-input__item"
        :index="index"
        :class="{ 'is--focus': isFocus && (cursorIndex === index || codeList[index]) }"
      >
        <i :class="{ 'is__animated': isFocus && cursorIndex === index }"></i>
        <i v-if="codeList[index] && type ==='password'" class="sp-password-input__dot"></i>
        <template v-if="type !=='password' ">
          {{ codeList[index] }}
        </template>
      </li>
    </ul>
    <input
      ref="input"
      v-model="code"
      type="text"
      :maxlength="codeLength"
      class="sp-password-input__input"
      autocomplete="new-password"
      @focus="handleFocus"
      @blur="handleBlur"
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
      validator: (val) => ['password', 'number'].includes(val)
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      code: this.value,
      isFocus: false,
      codeLength: 6
    }
  },
  computed: {
    codeList() {
      return (this.code || '').toString().split('')
    },
    cursorIndex() {
      return this.code.length
    }
  },
  watch: {
    code(newVal, oldVal) {
      if (newVal.replace(/[^\d]/g, '') != newVal || (newVal && newVal.length > this.codeLength)) {
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
    document.addEventListener('click', this.handleOtherAreaClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOtherAreaClick)
  },
  methods: {
    setCurrentValue(value) {
      this.code = value
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
      this.$refs.input && this.$refs.input.focus()
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/variable";
@import "sparta/common/scss/mixin";
.sp-password-input {
  position: relative;
  user-select: none;
  width: $password-input-width;
  height: $item-height;

  &__security {
    @include clearfix();
    width: 100%;
    cursor: pointer;
  }

  &__item {
    box-sizing: border-box;
    position: relative;
    height: $item-height;
    width: 34px;
    border: $border-base;
    line-height: $item-height;
    font-size: 18px;
    text-align: center;
    border-radius: $border-radius-base;
    float: left;
    margin-right: 4px;
    transition: $transition-all;
  }

  &__item:last-child {
    margin-right: 0;
  }

  &__item.is--focus {
    border-color: $color-primary;
    box-shadow: 0 0 0 1px rgba(25, 119, 234, 0.2);
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
    width: 6px;
    height: 6px;
    background-color: $color-text-regular;
    border-radius: $border-radius-circle;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .is__animated {
    display: block;
    position: absolute;
    left: 50%;
    top: 20%;
    width: 1px;
    height: 60%;
    content: "";
    background-color: #333;
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