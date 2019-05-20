<template>
  <div
    class="sp-menu-item"
    :class="[`sp-menu-item--${theme}`]"
    :index="data[indexKey]"
  >
    <div
      class="sp-menu-item__text"
      :class="{ parentIsPage: hasChild && parentIsPage, active: isActive, group: data[groupKey] }"
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
          class="sp-icon-document"
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
        class="sp-icon-arrow-down"
        :class="{ active: isOpen }"
      ></i>
    </div>
    <transition-group name="sp-slide-fade-in-top">
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
    </transition-group>
  </div>
</template>

<script>
import tool from 'sparta/common/js/tool'

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
      return this.activeIndexSelf === this.data[this.indexKey]
    },
    // 是否该条目已打开
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
    _handleSelect(e, hasChild, isGroupType) {
      // 如果该项为group类型，则不做任何处理
      if (isGroupType) {
        return
      }
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
      this.$emit('close', this.data[this.indexKey], tool.deepClone(this.data))
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
            this.$emit('close', vc.data.index, tool.deepClone(vc.data))
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
    }
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/transition";
@import "sparta/common/scss/mixin";
@import "sparta/common/scss/variable";

.sp-menu-item {
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
    &:hover {
      color: #409eff;
    }
    &.active {
      color: #409eff;
      background-color: $color-primary-light-9;
    }
    &.group {
      color: $color-info;
      font-size: 14px;
      cursor: default;
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
