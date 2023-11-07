<template>
  <PopupTip
    ref="popupTip"
    :color="color"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
  </PopupTip>
</template>

<script>
import PopupTip from 'base/popup-tip'

export default {
  name: 'SpPopupTip',
  components: {
    PopupTip
  },
  props: {
    color: {
      type: String,
      default: '#0d1233'
    },
  },
}
</script>

<style lang="scss">
.sp-popup-tip {

  &__wrap {
    border-radius: 4px;
  }
}
</style>