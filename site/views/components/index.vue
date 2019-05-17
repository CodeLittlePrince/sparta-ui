<template>
  <!-- 主体 -->
  <sp-layout
    class="components"
    width="1200px"
  >
    <!-- 左侧菜单 -->
    <sp-aside
      class="components--split"
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
    <sp-main class="components--main">
      <!-- doc展示区 -->
      <install-doc></install-doc>
    </sp-main>
  </sp-layout>
</template>

<script>
import menuConfig from 'site/config/menu'
import InstallDoc from 'doc/install'

export default {
  components: {
    InstallDoc
  },
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
.components {
  &--split {
    border-right: 1px solid #eee;
  }
  &--main {
    padding: 0 20px;
  }
}
</style>
