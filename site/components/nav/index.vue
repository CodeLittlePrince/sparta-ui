<template>
  <div class="c-nav">
    <div class="clearfix">
      <h1 class="logo">Sparta</h1>
      <ul class="menu">
        <li class="rubberBand">
          <router-link to="/">首页</router-link>
        </li>
        <li class="rubberBand">
          <router-link to="/components">组件</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  @import '~common/scss/variable';

  .c-nav {
    position: relative;
    z-index: 10;
    max-width: 100%;
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    .clearfix {
      zoom: 1;
      &::before,
      &::after {
        content: '';
        display: table;
      }
      &::after {
        clear: both;
      }
    }
    .logo {
      float: left;
      line-height: 68px;
      font-size: 24px;
      padding-left: 20px;
    }
    .menu {
      font-size: 0;
      float: right;
      li {
        font-size: 24px;
        text-align: center;
        display: inline-block;
        padding: 20px;
        animation-duration: 1.5s;
      }
    }
  }
</style>
