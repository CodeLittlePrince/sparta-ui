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
      />
    </sp-aside>
    <!-- 右边内容 -->
    <sp-main class="components--main">
      <!-- doc展示区 -->
      <router-view />
    </sp-main>
  </sp-layout>
</template>

<script>
import menuConfig from 'site/config/menu'

export default {
  data() {
    return menuConfig
  },
  methods: {
    handleMenuSelect(index, { link }) {
      this.$router.push(`/components${link}`)
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
  &.markdown-body table th {
    min-width: 150px;
  }
}
</style>
