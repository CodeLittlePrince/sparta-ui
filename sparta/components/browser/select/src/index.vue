<script>
import Select from 'base/select'

export default {
  name: 'SpSelect',
  extends: Select
}
</script>

<style lang="scss">
.sp-select {
  .sp-select__suffix {
    background: transparent;
    border-color: transparent;
    i {
      color: $color-text-primary;
    }
  }
  &.isFocus {
    .sp-select__suffix {
      background: transparent;
      border-color: transparent;
      i {
        color: $color-primary;
      }
    }
  }
}
</style>