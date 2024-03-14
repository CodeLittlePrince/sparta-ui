<script>
export default {
  name: 'SpTag',
  props: {
    text: String,
    type: {
      type: String,
      default: '',
      validator(val) {
        return [ '', 'primary', 'success', 'warning', 'info', 'danger'].indexOf(val) > -1
      }
    },
    closable: {
      type: Boolean,
      default: false
    },
    disableTransitions: Boolean,
    color: String,
  },
  methods: {
    handleClose(event) {
      event.stopPropagation()
      this.$emit('close', event)
    },
    handleClick(event) {
      this.$emit('click', event)
    }
  },

  render() {
    const { type } = this
    const classes = [
      'sp-tag',
      type ? `sp-tag--${type}` : ''
    ]
    const tagEl = (
      <span
        class={ classes }
        style={{ backgroundColor: this.color }}
        on-click={ this.handleClick }>
        { this.$slots.default }
        {
          this.closable && <i class="sp-tag__close sp-icon-close" on-click={ this.handleClose }></i>
        }
      </span>
    )

    return this.disableTransitions ? tagEl : <transition name="sp-zoom-in-center">{ tagEl }</transition>
  }
}
</script>


<style lang="scss">
.sp-tag {
  display: inline-block;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  border-radius: 4px;
  color: $color-white;
  background-color: $tag-background;
  white-space: nowrap;
  box-sizing: border-box;
  .sp-icon-close {
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    position: relative;
    font-size: 14px;
    width: 16px;
    height: 14px;
    line-height: 14px;
    vertical-align: middle;
    right: -5px;
    color: $color-white;
    cursor: pointer;
    font-weight: bold;
  }
  &--success {
    background-color: $tag-background--success;
    border-color: $tag-border-color--success;
  }
  &--warning {
    background-color: $tag-background--warning;
    border-color: $tag-border-color--warning;
  }
  &--info {
    background-color: $tag-background--info;
    border-color: $tag-border-color--info;
  }
  &--danger {
    background-color: $tag-background--danger;
    border-color: $tag-border-color--danger;
  }
}
</style>

