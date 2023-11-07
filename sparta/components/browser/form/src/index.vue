<template>
  <Form
    ref="form"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
  </Form>
</template>

<script>
import Form from 'base/form'

export default {
  name: 'SpForm',
  components: {
    Form
  },
  methods: {
    resetFields() {
      this.$refs.form.resetFields()
    },

    clearValidate(props = []) {
      this.$refs.form.clearValidate(props)
    },

    validate(callback, partFields) {
      return this.$refs.form.validate(callback, partFields)
    },

    showErrors(errors) {
      this.$refs.form.showErrors(errors)
    },

    getFirstErrorText() {
      return this.$refs.form.getFirstErrorText()
    },
  }
}
</script>

<style lang="scss">
.sp-form {
  .sp-form-item__label__tip {
    .sp-icon-ques {
      margin-left: 4px;
      color: $color-text-primary;
    }
  }
}
</style>