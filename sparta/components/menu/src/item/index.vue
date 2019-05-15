<template>
  <div
    class="sp-menu-item"
    :index="data[indexKey]"
  >
    <div
      class="sp-menu-item__text"
      :class="{ active: isActive }"
      :style="`padding-left: ${deep * indent}px`"
      @click="_handleSelect"
    >
      <!-- 折叠按钮 -->
      <div class="sp-menu-item__text__collapse">
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
      <!-- 文件夹和文件图标 -->
      <!-- 图标来源：http://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=6377 -->
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
        <sp-menu-item
          v-for="item in data[childKey]"
          v-show="isOpen"
          :key="item[indexKey]"
          :data="item"
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
export default {
  name: 'SpMenuItem',
  props: {
    data: {
      type: [Array, Object],
      default: () => []
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
    _handleSelect() {
      this.$emit('select', this.data[this.indexKey])
    },
    /**
     * 展开条目
     */
    _handleOpen(e) {
      e.stopPropagation()
      this.$emit('open', this.data[this.indexKey])
    },
    /**
     * 折叠条目
     */
    _handleClose(e) {
      e.stopPropagation()
      const openIndex = this.openedIndexes.indexOf(this.data[this.indexKey])
      this.$emit('close', this.data[this.indexKey], openIndex)
    },
    /**
     * 因为menu-item是递归组件，所以emit需要处理自身
     */
    _handleSelectSelf(index) {
      this.activeIndexSelf = index
      this.$emit('select', index)
    },
    _handleOpenSelf(index) {
      this.$emit('open', index)
    },
    _handleCloseSelf(index, position) {
      this.$emit('close', index, position)
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/transition.scss";

.sp-menu-item {
  user-select: none;
  white-space: nowrap;
  cursor: default;
  &__text {
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
      margin-left: 2px;
      transition: transform 0.2s;
      &.active {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
