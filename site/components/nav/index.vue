<template>
  <div class="c-nav">
    <div class="clearfix content">
      <h1 class="logo">Sparta</h1>
      <ul class="menu">
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
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
    height: 70px;
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    .content {
      width: 1200px;
      margin: 0 auto;
    }
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
      margin-top: 14px;
      font-size: 30px;
      font-weight: 300;
      &::before {
        content: '';
        display: inline-block;
        width: 40px;
        height: 40px;
        background-image: url('~site/common/img/logo.svg');
        background-size: contain;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .menu {
      font-size: 0;
      float: right;
      line-height: 70px;
      li {
        font-size: 24px;
        text-align: center;
        display: inline-block;
        padding: 0 20px;
        animation-duration: 1.5s;
        a {
          font-weight: 300;
        }
      }
    }
  }
</style>
