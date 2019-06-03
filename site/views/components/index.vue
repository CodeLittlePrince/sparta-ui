<template>
  <!-- 主体 -->
  <sp-layout class="components">
    <!-- 左侧菜单 -->
    <div class="components--split">
      <sp-menu
        open-all
        :indent="20"
        :data="menuData"
        :default-open="defaultOpen"
        :parent-is-page="false"
        @select="handleMenuSelect"
      />
    </div>
    <!-- 右边内容 -->
    <div class="components--main">
      <!-- doc展示区 -->
      <router-view />
    </div>
  </sp-layout>
</template>

<script>
import menuConfig from 'site/config/menu'

export default {
  data() {
    return {
      menuData: menuConfig.menuData,
      defaultOpen: ''
    }
  },
  mounted() {
    this.setDefaultOpen()
    window.addEventListener('hashchange', (e) => {
      console.log(e)
    })
  },
  methods: {
    setDefaultOpen() {
      const path = this.$route.path
      if (path.length > 12) {
        this.defaultOpen = this.findIndexByName(path.slice(11), menuConfig.menuData)
      } else {
        this.defaultOpen = menuConfig.defaultOpen
      }
    },
    findIndexByName(name, menuData) {
      let rst = ''
      for (let i = 0; i < menuData.length; i++) {
        const item = menuData[i]
        if (item.link === name) {
          return item.index
        } else if (item.child && item.child.length) {
          rst = this.findIndexByName(name, item.child)
          if (rst) {
            return rst
          }
        }
      }
      return rst
    },
    handleMenuSelect(index, { link }) {
      this.$router.push(`/components${link}`)
    }
  }
}
</script>

<style lang="scss">
.components {
  padding-bottom: 50px;
  &--split {
    position: fixed;
    width: 300px;
    top: 70px;
    bottom: 0;
    left: 0;
    border-right: 1px solid #eee;
    overflow-y: auto;
  }
  &--main {
    position: fixed;
    right: 0;
    top: 70px;
    bottom: 0;
    left: 300px;
    padding: 0 20px 50px;
    overflow-y: auto;
  }
  &.markdown-body table th {
    min-width: 150px;
  }
  &.markdown-body hr {
    display: none;
  }
}
</style>
