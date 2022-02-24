<template>
  <div class="c-nav">
    <sp-row class="content">
      <h1 class="logo">
        Sparta
        <span class="tag">
          <span class="label">local</span><span class="version">v{{ version }}</span>
        </span>
        <span class="tag">
          <img src="https://camo.githubusercontent.com/85514bb046f9cf80df055cc8f770d41fb85af6814f02e110590434eb5f8e7d68/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7370617274612d75692e737667" alt="">
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

        img {
          vertical-align: middle;
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
