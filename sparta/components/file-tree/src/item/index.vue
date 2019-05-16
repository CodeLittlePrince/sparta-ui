<template>
  <div
    class="sp-file-tree-item"
    :class="{ parentIsPage }"
    :index="data[indexKey]"
  >
    <div
      class="sp-file-tree-item__text"
      :class="{ active: isActive }"
      :style="{ 'padding-left': `${(deep - 1) * indent}px`, 'padding-right': hasChild ? '30px': '20px'}"
      @click="_handleSelect($event, hasChild)"
    >
      <!-- 折叠按钮 -->
      <div
        v-if="parentIsPage"
        class="sp-file-tree-item__text__collapse"
      >
        <i
          v-show="isOpen && hasChild"
          class="sp-icon-minus"
          @click="_handleClose($event)"
        />
        <i
          v-show="!isOpen && hasChild"
          class="sp-icon-plus"
          @click="_handleOpen($event)"
        />
      </div>
      <i
        v-if="!hasChild"
        class="sp-icon-document"
      />
      <i
        v-else
        class="sp-icon-message"
      />
      <!-- 标题 -->
      {{ data[titleKey] }}
      <!-- 上下箭头 -->
      <i
        v-if="hasChild"
        class="sp-icon-arrow-down"
        :class="{ active: isOpen }"
      ></i>
    </div>
    <transition-group name="sp-fade">
      <template v-if="data">
        <sp-file-tree-item
          v-for="item in data[childKey]"
          v-show="isOpen"
          :key="item[indexKey]"
          :data="item"
          :parent-is-page="parentIsPage"
          :deep="deep + 1"
          :active-index="activeIndexSelf"
          :opened-indexes="openedIndexes"
          @select="_handleSelectSelf"
          @open="_handleOpenSelf"
          @close="_handleCloseSelf"
        />
      </template>
    </transition-group>
  </div>
</template>

<script>
import tool from 'sparta/common/js/tool'

export default {
  name: 'SpFileTreeItem',
  props: {
    data: {
      type: [Array, Object],
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
    // 菜单深度
    deep: {
      type: Number,
      default: 1
    },
    // padding-left
    indent: {
      type: Number,
      default: 20
    },
    // 点亮的条目
    activeIndex: {
      type: String,
      default: ''
    },
    openedIndexes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeIndexSelf: this.activeIndex
    }
  },
  computed: {
    // 是否点亮
    isActive() {
      return this.activeIndexSelf === this.data[this.indexKey]
    },
    // 是否open该条目
    isOpen() {
      return -1 < this.openedIndexes.indexOf(this.data[this.indexKey])
    },
    // 是否有子项
    hasChild() {
      return this.data[this.childKey] && this.data[this.childKey].length
    }
  },
  watch: {
    activeIndex(val) {
      this.activeIndexSelf = val
    }
  },
  methods: {
    /**
     * 点击条目处理
     */
    _handleSelect(e, hasChild) {
      if (this.parentIsPage || !hasChild) {
        this.$emit('select', this.data[this.indexKey], tool.deepClone(this.data))
      } else {
        this._toggleCollapse(e)
      }
    },
    /**
     * 展开条目
     */
    _handleOpen(e) {
      e.stopPropagation()
      this.$emit('open', this.data[this.indexKey], tool.deepClone(this.data))
    },
    /**
     * 折叠条目
     */
    _handleClose(e) {
      e.stopPropagation()
      const openIndex = this.openedIndexes.indexOf(this.data[this.indexKey])
      this.$emit('close', this.data[this.indexKey], openIndex, tool.deepClone(this.data))
    },
    /**
     * 切换折叠
     */
    _toggleCollapse(e) {
      e.stopPropagation()
      if (this.isOpen) {
        this._handleClose(e)
      } else {
        this._handleOpen(e)
      }
    },
    /**
     * 因为menu-item是递归组件，所以emit需要处理自身
     */
    _handleSelectSelf(index, itemData) {
      this.activeIndexSelf = index
      this.$emit('select', index, itemData)
    },
    _handleOpenSelf(index, itemData) {
      this.$emit('open', index, itemData)
    },
    _handleCloseSelf(index, position, itemData) {
      this.$emit('close', index, position, itemData)
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/transition.scss";
@import "sparta/common/scss/mixin.scss";

.sp-file-tree-item {
  user-select: none;
  white-space: nowrap;
  cursor: pointer;
  .parentIsPage {
    cursor: default;
  }
  &__text {
    @include ellipsis();
    position: relative;
    padding: 16px 20px;
    transition: all 0.2s;
    &:hover, &.active {
      color: #409eff;
    }
    &__collapse {
      display: inline-block;
      width: 16px;
      margin: 5px;
      i {
        color: #2d527c;
        cursor: pointer;
      }
    }
    .sp-icon-document, .sp-icon-message {
      font-size: 20px;
      vertical-align: text-top;
    }
    .sp-icon-arrow-down {
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -8px;
      transition: transform 0.2s;
      &.active {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
