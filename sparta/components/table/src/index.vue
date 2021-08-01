<template>
  <div class="sp-table">
    <!-- 表格头部 -->
    <div
      class="sp-table__head"
      :class="{ borderBox: !showVScroll }"
      :style="`width: ${tableWidth}`"
    >
      <table :style="`width: ${tableWidth}`">
        <colgroup>
          <col
            v-if="selection"
            :width="selectionWidth"
          >
          <col
            v-for="(item, index) in children"
            :key="index"
            :width="item.componentOptions.propsData.width"
          >
        </colgroup>
        <thead>
          <tr>
            <th v-if="selection">
              <sp-checkbox
                v-if="selection"
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              />
            </th>
            <th
              v-for="(item, index) in children"
              :key="index"
            >{{ item.componentOptions.propsData.label }}</th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- 表格主体 -->
    <div
      class="sp-table__body"
      :style="`width: ${tableWidth}`"
    >
      <!-- 有数据情况 -->
      <table
        v-show="list && list.length"
        :style="`width: ${tableWidth}`"
      >
        <colgroup>
          <col
            v-if="selection"
            :width="selectionWidth"
          >
          <col
            v-for="(item, index) in children"
            :key="index"
            :width="item.componentOptions.propsData.width"
          >
        </colgroup>
        <tbody>
          <tr
            v-for="(item, rIndex) in list"
            :key="rIndex"
          >
            <td v-if="selection">
              <div class="sp-table-cell">
                <sp-checkbox
                  v-model="checkedList[rIndex]"
                  @change="handleCheck(rIndex, $event)"
                />
              </div>
            </td>
            <td
              v-for="(tdItem, cIndex ) in children"
              :key="cIndex"
            >
              <sp-table-cell
                :column="tdItem"
                :list="list"
                :c-index="cIndex"
                :r-index="rIndex"
              ></sp-table-cell>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 没有数据情况 -->
      <div
        v-show="(!list || !list.length) && !loading"
        class="sp-table__empty"
      >
        <span>
          <slot name="empty">{{ emptyText }}</slot>
        </span>
      </div>
      <!-- loading情况 -->
      <div
        v-show="loading"
        class="sp-table__loading-wrap"
      >
        <div class="sp-table__loading">
          <i
            v-if="!isIE9"
            class="sp-icon-loading"
          ></i>
          加载中...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpCheckbox from '../../checkbox'

export default {
  name: 'SpTable',

  components: {
    SpCheckbox
  },

  props: {
    list: {
      type: Array,
      default: () => []
    },
    emptyText: {
      type: String,
      default: '无相关数据'
    },
    loading: {
      type: Boolean,
      default: false
    },
    cellEmptyText: {
      type: String,
      default: '--'
    },
    selection: {
      type: Boolean,
      default: false
    },
    selectionWidth: {
      type: String,
      default: '60'
    }
  },

  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      checkedIndexs: [],
      checkedList: [],
      tableWidth: '100%',
      showVScroll: false
    }
  },

  computed: {
    children() {
      return this.$slots.default.filter(item => {
        return /SpTableColumn/.test(item.tag)
      })
    },
    isIE9() {
      return navigator.appVersion.indexOf('MSIE 9.0') > -1
    }
  },

  watch: {
    list() {
      // 数据变化后清除所有点亮状态
      this.checkAll = false
      this.isIndeterminate = false
      this.checkedIndexs = []
      this.checkedList = []
      this._initCheckedList()
      this._emitChange()
    }
  },

  mounted() {
    if (this.selection) {
      this._initCheckedList()
    }
    this._initTableWidth()
  },
  
  methods: {
    _initTableWidth() {
      let width = 0
      for (let i = 0, len = this.children.length; i < len; i++) {
        const w = this.children[i].componentOptions.propsData.width
        if (w) {
          width += +w
        }
      }
      // 如果width大于容器宽度，则使用累加的w来处理table;
      // 否则table 100%
      const parentW = parseInt(window.getComputedStyle(this.$el).width)
      if (this.selection) {
        width += +this.selectionWidth
      }
      if (width <= parentW) {
        width = '100%'
        this.showVScroll = false
      } else {
        this.showVScroll = true
      }
      this.tableWidth = width + 'px'
    },

    _initCheckedList() {
      let len = this.list.length
      while(len) {
        len--
        this.checkedList[len] = false
      }
    },

    _emitChange() {
      // 过滤出打勾了的值给上层
      const result = []
      this.checkedList.forEach((isChecked, index) => {
        if (isChecked) {
          result.push(this.list[index])
        }
      })
      this.$emit('selection-change', result)
    },

    /**
     * 处理checkbox的关联
     */
    _processCheckBoxRelation() {
      const checkedAccount = this.checkedList.filter(item => {
        return item
      }).length
      if (checkedAccount === this.list.length) {
        this.checkAll = true
        this.isIndeterminate = false
      } else if (0 < checkedAccount && checkedAccount < this.list.length) {
        this.isIndeterminate = true
        this.checkAll = false
      } else {
        this.isIndeterminate = false
        this.checkAll = false
      }
    },
    /**
     * 全选单选框点击
     */
    handleCheckAllChange(isChecked) {
      let len = this.list.length
      while(len) {
        len--
        this.checkedList[len] = isChecked
      }
      this.isIndeterminate = false
      this._emitChange()
    },
    /**
     * 单选框单独点击
     */
    handleCheck(index, isChecked) {
      // 更新checkedList
      this.checkedList[index] = isChecked
      this._processCheckBoxRelation()
      this._emitChange()
    }
  },
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-table {
  width: 100%;
  overflow-x: auto;
  font-size: $table-font-size;

  &__head {
    padding: 15px 24px;
    text-align: left;
    color: $table-thead-color;
    border-bottom: $table-border;
    background-color: $table-background;

    &.borderBox {
      box-sizing: border-box;
    }

    th {
      text-align: left; /* 为了IE */
      &:first-child {
        padding-left: 16px;
      }
    }
  }
  &__body {
    position: relative;
    padding: 0 24px;
    text-align: left;
    color: $table-tbody-color;
    min-height: $table-min-height;
    box-sizing: border-box;

    tr {
      border-bottom: $table-border;

      &:last-child {
        border-bottom: none;
      }

      td {
        vertical-align: middle;
        line-height: 1.2;
        padding: 10px 0;

        &:first-child {
          .sp-table-cell {
            padding-left: 16px;
          }
        }
      }
    }
    .ellipsis {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  &__empty {
    height: $table-min-height;
    line-height: $table-min-height;
    text-align: center;
  }
  &__loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: $color-text-secondary;

    .sp-icon-loading {
      font-size: 30px;
      vertical-align: sub;
    }

    &-wrap {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  &-cell {
    position: relative;
    padding-right: 13px;
    box-sizing: border-box;
    word-break: break-all;
    line-height: 1.2;
  }
}
</style>
