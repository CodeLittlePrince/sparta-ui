<template>
  <div class="home">
    <div class="content jello">
      <h1>
        组件 &nbsp;
        <span>- by 咻</span>
      </h1>
      <div class="cover"></div>
    </div>
  </div>
</template>

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
