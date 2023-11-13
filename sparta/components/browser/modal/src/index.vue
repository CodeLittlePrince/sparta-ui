<script>
import Modal from 'base/modal'

export default {
  name: 'SpModal',
  extends: Modal
}
</script>

<style lang="scss">
.sp-modal {

  &-wrap {

    .sp-modal-content {
      padding: 16px 20px 0;
      .sp-modal__head__close .sp-icon-close {
        color: $color-text-primary;
      }
    }
  }
}
</style>