<template>
  <form class="sp-form">
    <slot></slot>
  </form>
</template>

<script>
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
    }
  },

  data() {
    return {
      fields: []
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
    this.$on('sp.form.addField', (field) => {
      if (field) {
        this.fields.push(field)
      }
    })
    /* istanbul ignore next */
    this.$on('sp.form.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    })
  },
  methods: {
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

    validate(callback) {
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
      this.fields.forEach(field => {
        field.validate('', (message, field) => {
          if (message) {
            valid = false
          }
          invalidFields = Object.assign({}, invalidFields, field)
          if (typeof callback === 'function' && ++count === this.fields.length) {
            callback(valid, invalidFields)
          }
        })
      })

      if (promise) {
        return promise
      }
    }
  }
}
</script>
