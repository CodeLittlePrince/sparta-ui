<template>
  <div class="home">
    <div class="content">
      <sp-menu
        :data="menuData"
        :default-open="defaultOpen"
        @select="handleMenuSelect"
        @open="handleMenuOpen"
        @close="handleMenuClose"
      />
    </div>
  </div>
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
              index: '2-1'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleMenuSelect(index) {
      console.log(`menu select: ${index}`)
    },
    handleMenuClose(index) {
      console.log(`menu close: ${index}`)
    },
    handleMenuOpen(index) {
      console.log(`menu open: ${index}`)
    }
  }
}
</script>

<style lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';

.home {
  .content {
    position: relative;
    width: 1200px;
    height: 400px;
    margin: 0 auto;
    animation-duration: 1s;
  }
}
</style>
