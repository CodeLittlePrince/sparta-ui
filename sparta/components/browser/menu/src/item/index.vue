<template>
  <div
    class="sp-menu-item"
    :class="[`sp-menu-item--${theme}`]"
    :index="data[indexKey]"
  >
    <div
      class="sp-menu-item__text"
      :class="{ parentIsPage: hasChild && parentIsPage, active: isActive, group: data[groupKey], root: showRootClass }"
      :style="{ 'padding-left': `${deep * indent}px`, 'padding-right': hasChild ? '30px': '20px'}"
      @click="_handleSelect($event, hasChild, !!data[groupKey])"
    >
      <!-- 折叠按钮 -->
      <div
        v-if="parentIsPage"
        class="sp-menu-item__text__collapse"
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
      <template v-if="theme === 'file'">
        <i
          v-if="!hasChild"
          class="sp-icon-file"
        />
        <i
          v-else
          class="sp-icon-message"
        />
      </template>
      <!-- 标题 -->
      {{ data[groupKey] ? data[groupKey] : data[titleKey] }}
      <!-- 上下箭头 -->
      <i
        v-if="hasChild && !data[groupKey]"
        class="sp-icon-arrow-down-bold"
        :class="{ active: isOpen }"
      ></i>
      <!-- 副标题 -->
      <span v-if="data[subTitleKey] || data[subTitleKey]===0" class="sp-menu-item__text__subtitle">{{ data[subTitleKey] }}</span>
    </div>
    <template v-if="data">
      <sp-menu-item
        v-for="item in data[childKey]"
        v-show="isOpen"
        :key="item[indexKey]"
        :data="item"
        :theme="theme"
        :unique="unique"
        :parent-is-page="parentIsPage"
        :deep="deep + 1"
        :active-index="activeIndexSelf"
        :opened-indexes="openedIndexes"
        @select="_handleSelectSelf"
        @open="_handleOpenSelf"
        @close="_handleCloseSelf"
      />
    </template>
  </div>
</template>

<script>
import { clonedeep } from 'sparta/common/js/utils/tool'

export default {
  name: 'SpMenuItem',
  props: {
    data: {
      type: [Array, Object],
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
    subTitleKey: {
      type: String,
      default: 'subTitle'
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
      return this.activeIndexSelf === this.data[this.indexKey] || this.hasChild && this.showRootClass && this.hasActiveChild(this.data, this.childKey, this.activeIndexSelf)
    },
    // 是否该条目已打开
    isOpen() {
      return -1 < this.openedIndexes.indexOf(this.data[this.indexKey])
    },
    // 是否有子项
    hasChild() {
      return this.data[this.childKey] && this.data[this.childKey].length
    },
    showRootClass() {
      return this.deep === 1
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
    _handleSelect(e, hasChild, isGroupType) {
      // 如果该项为group类型，则不做任何处理
      if (isGroupType) {
        return
      }
      if (this.parentIsPage || !hasChild) {
        this.$emit('select', this.data[this.indexKey], clonedeep(this.data))
      } else {
        this._toggleCollapse(e)
      }
    },
    /**
     * 展开条目
     */
    _handleOpen(e) {
      e.stopPropagation()
      this.$emit('open', this.data[this.indexKey], clonedeep(this.data))
    },
    /**
     * 折叠条目
     */
    _handleClose(e) {
      e.stopPropagation()
      this.$emit('close', this.data[this.indexKey], clonedeep(this.data))
    },
    /**
     * 切换折叠
     */
    _toggleCollapse(e) {
      e.stopPropagation()
      // 切换折叠
      if (this.isOpen) {
        this._handleClose(e)
      } else {
        this._handleOpen(e)
      }
      // 如果unique为true，则需要收起同级的菜单项目
      if (this.unique) {
        this.$parent.$children.forEach(vc => {
          if (vc !== this) {
            this.$emit('close', vc.data.index, clonedeep(vc.data))
          }
        })
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
    _handleCloseSelf(index, itemData) {
      this.$emit('close', index, itemData)
    },
    // 递归遍历，如果有子项，则只要有一个子项被点亮，则该条目也被点亮
    hasActiveChild(data, childKey, activeIndex) {
      return data[childKey].some(item => {
        if (item.index === activeIndex) {
          return true
        }
        if (item[childKey] && item[childKey].length) {
          return this.hasActiveChild(item, childKey, activeIndex)
        }
        return false
      })
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/base/transition";
@import "sparta/common/scss/base/mixin";

.sp-menu-item {
  user-select: none;
  white-space: nowrap;
  cursor: pointer;
  .parentIsPage {
    cursor: default;
  }
  &__text {
    @include ellipsis;
    position: relative;
    padding: 7px 20px;
    margin: 4px 0;
    line-height: 22px;
    transition: all 0.2s;
    color: $menu-root-item-color;
    &:hover {
      font-weight: $menu-item--is--hover-font-weight;
      background-color: $menu-item--is-active-background;
      .sp-menu-item__text__subtitle {
        font-weight: $menu-item--is--hover-font-weight;
      }
    }
    &.active {
      color: $menu-item--is-active-color;
      font-weight: $menu-item--is--hover-font-weight;
      background-color: $menu-item--is-active-background;
      .sp-menu-item__text__subtitle {
        font-weight: $menu-item--is--hover-font-weight;
      }
    }
    &.group {
      color: $color-info;
      font-size: 14px;
      cursor: default;
    }
    &.root {
      font-size: $menu-root-item-font-size;
      font-weight: $menu-root-item-font-weight;
      color: $menu-root-item-color;
      margin: 10px 0;
      padding-left: 20px;
      &:hover,
      &.active {
        color: $menu-root-item--is-hover-color;
        font-weight: $menu-root-item--is-hover-font-weight;
        background-color: $menu-root-item--is-active-background;
      }
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
    .sp-icon-file, .sp-icon-message {
      font-size: 18px;
      vertical-align: text-top;
    }
    .sp-icon-arrow-down-bold {
      position: absolute;
      right: 20px;
      margin-top: 0;
      top: 8px;
      width: 20px;
      text-align: center;
      transition: transform 0.2s;
      font-size: $menu-item-arrow-font-size;
      color: $menu-item-arrow-color;
      &.active {
        transform: rotate(180deg);
      }
    }
    &__subtitle {
      position: absolute;
      right: 20px;
      margin-top: 0;
      top: 8px;
      width: 20px;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
