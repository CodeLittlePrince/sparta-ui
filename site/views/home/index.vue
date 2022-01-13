<template>
  <div class="home">
    <div class="content">
      <h1>Sparta</h1>
      <h2>网易支付PC组件库</h2>
      <div class="cover"></div>
    </div>
  </div>
</template>

<style lang="scss">
@import '~site/common/scss/variable';
@import '~site/common/scss/mixin';

.home {
  .content {
    position: relative;
    width: 1200px;
    height: 400px;
    margin: 0 auto;

    h1, h2 {
      text-align: center;
      font-size: 180px;
      margin-top: 80px;
      font-weight: 300;
      color: #555;
    }

    h2 {
      font-size: 40px;
    }
  }
}
</style>
