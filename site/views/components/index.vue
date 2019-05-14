<template>
  <div class="home">
    <div class="content jello">
      <SelectDoc />
    </div>
  </div>
</template>

<script>
import SelectDoc from 'doc/select'

export default {
  components: {
    SelectDoc
  }
}
</script>

<style lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';

.home {
  .content {
    position: relative;
    width: 1200px;
    height: 400px;
    margin: 0 auto;
    animation-duration: 1s;
  }
}
</style>
