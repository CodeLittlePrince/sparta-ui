<template>
  <div class="sp-file-tree">
    <sp-file-tree-item
      v-for="item in data"
      :key="item.index"
      :data="item"
      :parent-is-page="parentIsPage"
      :active-index="activeIndex"
      :opened-indexes="openedIndexes"
      :title-key="titleKey"
      :child-key="childKey"
      :index-key="indexKey"
      :indent="indent"
      @select="_handleSelect"
      @open="_handleOpen"
      @close="_handleClose"
    ></sp-file-tree-item>
  </div>
</template>

<script>
import SpFileTreeItem from './item'
export default {
  name: 'SpFileTree',
  components: {
    SpFileTreeItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    parentIsPage: {
      type: Boolean,
      default: true
    },
    titleKey: {
      type: String,
      default: 'title'
    },
    childKey: {
      type: String,
      default: 'child'
    },
    indexKey: {
      type: String,
      default: 'index'
    },
    indent: {
      type: Number,
      default: 20
    },
    defaultOpen: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 点亮条目的索引
      activeIndex: this.defaultOpen,
      // 展开的条目集合
      openedIndexes: []
    }
  },
  watch: {
    defaultOpen(val) {
      this.activeIndex = val
      if (this.openedIndexes.indexOf(val) === -1) {
        this._initMenu()
      }
    }
  },
  mounted() {
    this._initMenu()
  },
  methods: {
    /**
     * 初始化菜单
     */
    _initMenu() {
      this._computeParents(this.data)
    },
    /**
     * 如果设置了defaultOpen，则将其、以及父菜单都打开
     */
    _computeParents(child) {
      for (let i = 0, len = child.length; i < len; i++) {
        // 如果该index不在openedIndexes中，且为父菜单，则推入openedIndexes
        if (
          this.defaultOpen.startsWith(child[i][this.indexKey]) &&
          this.openedIndexes.indexOf(child[i][this.indexKey]) === -1
        ) {
          this.openedIndexes.push(child[i][this.indexKey])
        }
      }
      // 为了触发openedIndexes
      this.openedIndexes.push('')
      this.openedIndexes.splice(-1, 1)
      // 递归
      for (let i = 0, len = child.length; i < len; i++) {
        if (child[i][this.childKey]) {
          this._computeParents(child[i][this.childKey])
        }
      }
    },
    /**
     * 一些事件处理器
     */
    _handleSelect(index, itemData) {
      this.activeIndex = index
      this.$emit('select', index, itemData)
    },
    _handleOpen(index, itemData) {
      if (this.openedIndexes.indexOf(index) === -1) {
        this.openedIndexes.push(index)
      }
      this.$emit('open', index, itemData)
    },
    _handleClose(index, position, itemData) {
      this.openedIndexes.splice(position, 1)
      this.$emit('close', index, itemData)
    }
  }
}
</script>

<style lang="scss">
.sp-file-tree {
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
}
</style>