<script>
import FormItem from 'base/form-item'

export default {
  name: 'SpFormItem',
  extends: FormItem,
  render(h) {
    if (!this.$slots.label && this.label) {
      // 修改默认的label插槽
      if (this.isRequired || this.required) {
        this.$slots.label = [
          h('span', { class: 'sp-form-item__label-required' }, '*'),
          this.label
        ]
      }
    }
    return FormItem.render.call(this, h)
  }
}
</script>

<style lang="scss">
.sp-form-item {
  &__label {
    &-required {
      color: $color-danger;
      margin-right: 4px;
    }
  }
}
</style>