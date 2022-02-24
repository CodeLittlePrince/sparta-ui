<template>
  <div class="c-nav">
    <sp-row class="content">
      <h1 class="logo">
        Sparta
        <span class="tag">
          <span class="label">local</span><span class="version">v{{ version }}</span>
        </span>
      </h1>
      <ul class="menu">
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/components">组件</router-link>
        </li>
      </ul>
      <div>
      </div>
    </sp-row>
  </div>
</template>

<script>
export default {
  computed: {
    version() {
      return process.env.VERSION
    }
  }
}
</script>

<style lang="scss">
  @import '~site/common/scss/variable';

  .c-nav {
    position: relative;
    z-index: 10;
    max-width: 100%;
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    .content {
      padding: 0 20px;
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
      .tag {
        font-size: 12px;
        vertical-align: middle;

        .label {
          display: inline-block;
          padding: 5px;
          background: #5a5555;
          color: #fff;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .version {
          display: inline-block;
          padding: 5px;
          background: #0877b8;
          color: #fff;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }
    .menu {
      font-size: 0;
      float: right;
      li {
        font-size: 24px;
        line-height: 70px;
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
