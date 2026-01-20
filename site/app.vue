<template>
  <sp-layout :class="{ 'darkTheme': darkTheme }">
    <!-- 头部 -->
    <sp-header height="70px">
      <c-nav />
    </sp-header>
    <!-- 主体 -->
    <router-view />
  </sp-layout>
</template>

<script>
export default {
  computed: {
    darkTheme() {
      return process.env.THEME === 'dark' || process.env.THEME === 'sdkBaoxue'
    }
  }
}

</script>

<style lang="scss">
.darkTheme {
  .demo-content {
    background-color: #14181d;
    color: #fff;
  }
}
</style>
