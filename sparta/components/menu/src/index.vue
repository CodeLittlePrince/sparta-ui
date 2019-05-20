<template>
  <div
    class="sp-menu"
    :class="`sp-menu--${theme}`"
  >
    <sp-menu-item
      v-for="item in data"
      :key="item.index"
      :data="item"
      :theme="theme"
      :unique="unique"
      :parent-is-page="parentIsPage"
      :active-index="activeIndex"
      :opened-indexes="openedIndexes"
      :title-key="titleKey"
      :group-key="groupKey"
      :child-key="childKey"
      :index-key="indexKey"
      :indent="indent"
      @select="_handleSelect"
      @open="_handleOpen"
      @close="_handleClose"
    ></sp-menu-item>
  </div>
</template>

<script>
import SpMenuItem from './item'
export default {
  name: 'SpMenu',
  components: {
    SpMenuItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: 'common',
      validator(val) {
        return ['common', 'file'].indexOf(val) > -1
      }
    },
    unique: {
      type: Boolean,
      default: false
    },
    parentIsPage: {
      type: Boolean,
      default: false
    },
    titleKey: {
      type: String,
      default: 'title'
    },
    groupKey: {
      type: String,
      default: 'group'
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
    },
    openAll: {
      type: Boolean,
      default: false
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
      this._computeOpenItems(this.data)
    },
    _computeOpenItems(child) {
      for (let i = 0, len = child.length; i < len; i++) {
        const hasChild = child[i][this.childKey] && child[i][this.childKey].length
        
        /* 如果openAll为true，则打开所有含有子项的条目 */
        if (hasChild && this.openAll) {
          this.openedIndexes.push(child[i][this.indexKey])
        }

        /* 如果设置了defaultOpen，则将其、以及父菜单都打开 */
        // 如果该index不在openedIndexes中，且为父菜单，则推入openedIndexes
        if (
          this.defaultOpen.startsWith(child[i][this.indexKey]) &&
          this.openedIndexes.indexOf(child[i][this.indexKey]) === -1
        ) {
          this.openedIndexes.push(child[i][this.indexKey])
        }

        /* 打开所有为group的条目 */
        // 如果该index不在openedIndexes中，且为group类型，则推入openedIndexes
        if (hasChild && child[i][this.groupKey]) {
          this.openedIndexes.push(child[i][this.indexKey])
        }
      }
      // 为了触发openedIndexes
      this.openedIndexes.push('')
      this.openedIndexes.splice(-1, 1)
      // 递归
      for (let i = 0, len = child.length; i < len; i++) {
        if (child[i][this.childKey]) {
          this._computeOpenItems(child[i][this.childKey])
        }
      }
    },
    /**
     * 打开所有为group的条目
     */
    _openAllGroupItems(child) {
      for (let i = 0, len = child.length; i < len; i++) {
        // 如果该index不在openedIndexes中，且为group类型，则推入openedIndexes
        if (child[i][this.childKey] && child[i][this.groupKey]) {
          this.openedIndexes.push(child[i][this.indexKey])
        }
      }
      // 为了触发openedIndexes
      this.openedIndexes.push('')
      this.openedIndexes.splice(-1, 1)
      // 递归
      for (let i = 0, len = child.length; i < len; i++) {
        if (child[i][this.childKey]) {
          this._openAllGroupItems(child[i][this.childKey])
        }
      }
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
    _handleClose(index, itemData) {
      const position = this.openedIndexes.indexOf(index)
      if (position > -1) {
        this.openedIndexes.splice(position, 1)
      }
      this.$emit('close', index, itemData)
    }
  }
}
</script>

<style lang="scss">
.sp-menu {
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  font-size: 16px;
}
</style>