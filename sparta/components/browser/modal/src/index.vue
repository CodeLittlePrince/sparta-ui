<template>
  <Modal
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
  </Modal>
</template>

<script>
import Modal from 'base/modal'

export default {
  name: 'SpModal',
  components: {
    Modal
  },
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