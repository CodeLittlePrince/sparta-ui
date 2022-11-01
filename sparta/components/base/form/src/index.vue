<template>
  <form
    ref="form"
    class="sp-form"
    @submit.prevent
    @keydown="handleKeydown"
  >
    <slot></slot>
  </form>
</template>

<script>
import Toast from 'base/toast'

export default {
  name: 'SpForm',

  provide() {
    return {
      spForm: this
    }
  },

  props: {
    model: Object,
    rules: Object,
    labelWidth: String,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    validateFailTip: {
      type: Boolean,
      default: true
    },
    scrollWhenError: {
      type: Boolean,
      default: false
    },
    scrollOffsetTop: {
      type: [Number, String],
      default: 0
    },
  },

  data() {
    return {
      fields: [],
      firstErrorText: ''
    }
  },
  
  watch: {
    rules() {
      if (this.validateOnRuleChange) {
        this.validate(() => {})
      }
    }
  },

  created() {
    this.toastError = Toast('error')
    this.$on('sp.form.addField', (field) => {
      if (field) {
        this.fields.push(field)
      }
    })
    this.$on('sp.form.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    })
  },
  
  methods: {
    handleKeydown(e) {
      if(
        e.keyCode === 13 &&
        e.target.tagName !== 'TEXTAREA' &&
        -1 === e.target.className.indexOf('sp-select__input')
      ) {
        this.$emit('enter')
      }
    },

    resetFields() {
      if (!this.model) {
        process.env.NODE_ENV !== 'production' &&
          console.warn('[Sparta Warn][Form]model is required for resetFields to work.')
        return
      }
      this.fields.forEach(field => {
        field.resetField()
      })
    },

    clearValidate(props = []) {
      const fields = props.length
        ? (typeof props === 'string'
          ? this.fields.filter(field => props === field.prop)
          : this.fields.filter(field => props.indexOf(field.prop) > -1)
        ) : this.fields
      fields.forEach(field => {
        field.clearValidate()
      })
    },

    validate(callback, partFields) {
      this.firstErrorText = ''

      if (!this.model) {
        console.warn('[Sparta Warn][Form]model is required for validate to work!')
        return
      }

      let promise
      // 如果没有callback, 返回promise
      if (typeof callback !== 'function' && Promise) {
        promise = new Promise((resolve, reject) => {
          callback = function(valid) {
            valid ? resolve(valid) : reject(valid)
          }
        })
      }

      let valid = true
      let count = 0
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true)
      }
      let invalidFields = {}
      
      let fields = this.fields
      // 支持部分校验，传入prop的数组即可
      const hasPartFields = partFields && partFields.length
      if (hasPartFields) {
        fields = fields.filter(vm => partFields.includes(vm.prop))
      }
      fields.forEach(field => {
        field.validate('', (message, field) => {
          if (message) {
            valid = false
          }
          invalidFields = Object.assign({}, invalidFields, field)
          if (typeof callback === 'function' && ++count === fields.length) {
            callback(valid, invalidFields)
          }
        })
      })

      if (!valid) {
        this.$nextTick(() => {
          if (this.$refs.form) {
            const errorItems = this.$refs.form.getElementsByClassName('is--error')
            if (errorItems.length) {
              // 错误提示
              const errorTipElem = errorItems[0].querySelector('.sp-form-item__error')
              if (errorTipElem && errorTipElem.innerText) {
                this.firstErrorText = errorTipElem.innerText
                
                if (this.validateFailTip && !hasPartFields) {
                  this.toastError(errorTipElem.innerText)
                }
              }
              // 滚动到错误位置;部分校验就不用滚动了(因为场景基本都是输入或者选择完后立马触发)
              if (this.scrollWhenError && !hasPartFields) {
                const supportSmoothScroll = 'scrollBehavior' in document.documentElement.style
                // 如果有scrollOffsetTop，说明scrollIntoView不满足需求，比如网易跨境顶部有个fixed的head，需要额外滚动一定距离
                if (this.scrollOffsetTop) {
                  const distance = this._getDistanceToBody(errorItems[0]) + Number(this.scrollOffsetTop)
                  
                  if (supportSmoothScroll) {
                    window.scrollTo({
                      top: distance,
                      behavior: 'smooth'
                    })
                  } else {
                    window.scrollTo(0, distance)
                  }
                } else {
                  if (supportSmoothScroll) {
                    errorItems[0].scrollIntoView({
                      behavior: 'smooth'
                    })
                  } else {
                    errorItems[0].scrollIntoView()
                  }
                }
              }
            }
          }
        })
      }

      if (promise) {
        return promise
      }
    },

    showErrors(errors) {
      this.fields.forEach(field => {
        if (errors[field.prop]) {
          field.showError(errors[field.prop])
        }
      })
    },

    getFirstErrorText() {
      return this.firstErrorText
    },

    _getDistanceToBody(element) {
      let distance = element.offsetTop

      if (element.offsetParent !== null) {
        distance += this._getDistanceToBody(element.offsetParent)
      }

      return distance
    }
  }
}
</script>
