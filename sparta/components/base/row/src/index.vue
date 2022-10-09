<script>
export default {
  name: 'SpRow',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: Number
  },

  computed: {
    style() {
      const ret = {}

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }

      return ret
    }
  },

  render(h) {
    return h(this.tag, {
      class: [
        'sp-row'
      ],
      style: this.style
    }, this.$slots.default)
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/mixin";

.sp-row {
  position: relative;
  box-sizing: border-box;
  @include clearfix;
}
</style>
