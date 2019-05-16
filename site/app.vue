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
        <sp-file-tree
          :indent="20"
          :data="menuData"
          :default-open="defaultOpen"
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
export default {
  data() {
    return {
      defaultOpen: '2-1',
      menuData: [
        {
          title: '标题1',
          link: '/1',
          index: '1'
        },
        {
          title: '标题2',
          link: '/2',
          index: '2',
          child: [
            {
              title: '标题2-1',
              link: '/2-1',
              index: '2-1',
              child: [
                {
                  title: '标题2-1-1',
                  link: '/2-1-1',
                  index: '2-1-1'
                }
              ]
            }
          ]
        }
      ]
    }
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
