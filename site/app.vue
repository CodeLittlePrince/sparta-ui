<template>
  <sp-layout>
    <!-- 头部 -->
    <sp-header height="70px">
      <c-nav></c-nav>
    </sp-header>
    <!-- 主体 -->
    <sp-layout width="1200px">
      <!-- 左侧菜单 -->
      <sp-aside
        class="app--split"
        width="250px"
      >
        <sp-menu
          open-all
          :indent="20"
          :data="menuData"
          :default-open="defaultOpen"
          :parent-is-page="false"
          @select="handleMenuSelect"
          @open="handleMenuOpen"
          @close="handleMenuClose"
        />
      </sp-aside>
      <!-- 右边内容 -->
      <sp-main class="app--main">
        <router-view class="markdown-body"></router-view>
      </sp-main>
    </sp-layout>
  </sp-layout>
</template>

<script>
import menuConfig from 'site/config/menu'

export default {
  data() {
    return menuConfig
  },
  methods: {
    handleMenuSelect(index, itemData) {
      console.log(`menu select: ${index}`, itemData)
    },
    handleMenuClose(index, itemData) {
      console.log(`menu close: ${index}`, itemData)
    },
    handleMenuOpen(index, itemData) {
      console.log(`menu open: ${index}`, itemData)
    }
  }
}
</script>

<style lang="scss">
.app {
  &--split {
    border-right: 1px solid #eee;
  }
  &--main {
    padding: 20px;
  }
}
</style>
