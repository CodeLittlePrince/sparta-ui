<template>
  <div
    class="sp-table"
    :class="{
      'is--no-footer': !hasFooter && !hasMore && !$slots.append,
      'is--disabled': disabled,
      'is--selection': selection,
      'need--scroll': needScroll }"
  >
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
              <div></div>
            </th>
            <th
              v-for="(item, index) in children"
              :key="index"
            >
              <slot :name="item.data.attrs['slot-name']">
                {{ item.componentOptions.propsData.label }}
              </slot>
            </th>
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
        v-show="hasData"
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
            :class="{ 'is--striped': rIndex%2 !== 0 }"
          >
            <td v-if="selection">
              <div class="sp-table-cell">
                <sp-checkbox
                  v-if="checkedList[rIndex]"
                  v-model="checkedList[rIndex].isChecked"
                  :disabled="isSelectDisable(item, rIndex)"
                  @change="handleCheck(rIndex, $event)"
                />
              </div>
            </td>
            <td
              v-for="(tdItem, cIndex) in children"
              :key="cIndex"
            >
              <sp-table-cell
                :key="cIndex + tableKey"
                :column="tdItem"
                :list="list"
                :c-index="cIndex"
                :r-index="rIndex"
              ></sp-table-cell>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- append 插入至表格最后一行之后的内容 -->
      <div v-if="hasMore || $slots.append" class="sp-table__append">
        <slot name="append">
          <div class="sp-table__append-show-more">
            <sp-button
              type="text"
              :disabled="disabled"
              @click="handleViewMore"
            >
              查看更多
              <i class="sp-icon-arrow-down-bold"></i></sp-button>
          </div>
        </slot>
      </div>
      <!-- 没有数据情况 -->
      <div
        v-show="!hasData && !loading"
        class="sp-table__empty"
      >
        <slot name="empty">
          <div class="sp-table__empty-text">
            {{ emptyText }}
          </div>
        </slot>
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
          ></i>加载中
        </div>
      </div>
    </div>
    <!-- 表格底部 -->
    <div
      v-if="hasFooter"
      class="sp-table__footer"
      :style="`width: ${tableWidth}`"
    >
      <div v-if="hasData" class="sp-table__footer-left">
        <div class="sp-table__footer-left-content">
          <sp-checkbox
            v-if="selection && showAllSelect"
            v-model="checkAll"
            :disabled="disabled || loading"
            :indeterminate="isIndeterminate"
            :label="selectionAllLabel"
            @change="handleCheckAllChange"
          />
          <div class="sp-table__footer-left-operation">
            <slot name="footerLeftContent"></slot>
          </div>
        </div>
      </div>
      <div
        v-if="pagination && (paginationTotal > paginationPageSize)"
        class="sp-table__footer-center"
      >
        <sp-pagination
          :align="paginationAlign"
          :per-pages="paginationPerPages"
          :page-index="paginationPageIndex"
          :disabled="loading"
          :total="paginationTotal"
          :page-size="paginationPageSize"
          @change="handlePageChange"
        >
        </sp-pagination>
      </div>
      <div class="sp-table__footer-right">
        <div class="sp-table__footer-right-content">
          <slot name="footerRightContent"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpCheckbox from '../../checkbox'

/**
 * 判断两个一维数据是否相等
 * @param {*} array1
 * @param {*} array2
 * @returns
 */
function scalarArrayEquals(array1, array2) {
  return array1.length === array2.length && array1.every(function(v,i) { return v === array2[i]})
}

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
      default: '暂无搜索结果'
    },
    loading: {
      type: Boolean,
      default: false
    },
    cellEmptyText: {
      type: String,
      default: '--'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    },
    selectable: Function,
    selectionWidth: {
      type: String,
      default: '33'
    },
    pagination: {
      type: Boolean,
      default: false
    },
    paginationOption: {
      type: Object,
      default: () => ({})
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    selectionAllLabel: {
      type: String,
      default: '全选'
    },
    enableUpdate: {
      type: Boolean,
      default: false
    },
    showAllSelect: {
      type: Boolean,
      default: true
    },
    needScroll: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      checkedList: [],
      tableWidth: '100%',
      showVScroll: false,
      children: [],
      tableKey: 0
    }
  },

  computed: {
    isIE9() {
      return navigator.appVersion.indexOf('MSIE 9.0') > -1
    },
    paginationPerPages() {
      return this.paginationOption && this.paginationOption.perPages || 7
    },
    paginationPageIndex() {
      return this.paginationOption && this.paginationOption.queryPageNo || 1
    },
    paginationPageSize() {
      return this.paginationOption && this.paginationOption.pageSize || 10
    },
    paginationTotal() {
      return this.paginationOption && this.paginationOption.totalSize || 1
    },
    paginationAlign() {
      return this.paginationOption && this.paginationOption.align || 'middle'
    },
    hasFooter() {
      return (this.selection && this.showAllSelect)
        || (this.pagination && (this.paginationTotal > this.paginationPageSize))
        || this.$slots.footerRightContent
        || this.$slots.footerLeftContent
    },
    hasData() {
      return this.list && this.list.length
    }
  },

  watch: {
    list() {
      // 数据变化后清除所有点亮状态
      this.checkAll = false
      this.isIndeterminate = false
      this.checkedList = []
      this._initCheckedList()
      this._emitChange()

      this.tableKey = + new Date()
    }
  },
  
  created() {
    this.init()
  },

  mounted() {
    if (this.selection) {
      this._initCheckedList()
    }
    this._initTableWidth()
  },

  beforeUpdate() {
    this.enableUpdate && this.init()
  },
  
  methods: {
    init() {
      this.children = this.$slots.default.filter(item => {
        return /SpTableColumn/.test(item.tag)
      })
    },
    clearSelection() {
      if(this.disabled) return
      this.checkAll = false
      this._setCheckState(false)
    },
    toggleAllSelection() {
      if(this.disabled) return
      this.checkAll = !this.checkAll
      this._setCheckState(this.checkAll)
    },
    toggleRowSelection(index, selected) {
      if(!this.disabled && typeof index === 'number' && typeof selected === 'boolean') {
        this.handleCheck(index, selected)
      }
    },
    toggleRowsSelection(indexList, isChecked) {
      if(!this.disabled && Array.isArray(indexList) && typeof isChecked === 'boolean') {
        indexList.forEach(index => {
          if(!this.checkedList[index].disabled) {
            this.$set(this.checkedList, index, {
              disabled: this.checkedList[index].disabled,
              isChecked
            })
          }
        })
        
        this._processCheckBoxRelation()
        this._emitChange()
      }
    },
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
        this.$set(this.checkedList, len, {
          isChecked: false,
          disabled: this.isSelectDisable(this.list[len], len)
        })
      }
    },

    _emitChange() {
      // 过滤出打勾了的值给上层
      const result = []
      const isCheckedIndexList = []
      this.checkedList.forEach((item, index) => {
        if (item.isChecked) {
          isCheckedIndexList.push(index)
          result.push(this.list[index])
        }
      })
      if(!scalarArrayEquals(isCheckedIndexList, this.oldIsCheckedIndexList || [])) {
        // 只有值改变了才透出
        this.oldIsCheckedIndexList = isCheckedIndexList
        this.$emit('selection-change', result)
      }
    },

    /**
     * 处理checkbox的关联
     */
    _processCheckBoxRelation() {
      const checkedAccount = this.checkedList.filter(item => {
        return item.isChecked || item.disabled
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
    _setCheckState(checkState) {
      let len = this.list.length
      let isEmitChange = false
      while(len) {
        len--
        if(!this.checkedList[len].disabled) {
          isEmitChange = true
          this.$set(this.checkedList, len, {
            disabled: this.checkedList[len].disabled,
            isChecked: checkState
          })
        }
      }
      if(isEmitChange) {
        this.isIndeterminate = false
        this._emitChange()
      }
    },
    /**
     * 全选单选框点击
     */
    handleCheckAllChange(isChecked) {
      this._setCheckState(isChecked)
    },
    /**
     * 单选框单独点击
     */
    handleCheck(index, isChecked) {
      // 更新checkedList
      if(!this.checkedList[index].disabled) {
        this.$set(this.checkedList, index, {
          disabled: this.checkedList[index].disabled,
          isChecked
        })
        this._processCheckBoxRelation()
        this._emitChange()
      }
    },

    handlePageChange(index, pageSize) {
      this.$emit('pagination-change', index, pageSize)
    },

    handleViewMore() {
      this.$emit('table-view-more')
    },

    isSelectDisable(row, index) {
      if(this.disabled) return true
      if(typeof this.selectable === 'function') return !this.selectable(row, index)
      return false
    }
  },
}
</script>

<style lang="scss">
.sp-table {
  width: 100%;
  font-size: $table-font-size;
  line-height: $table-line-height;
  border: $table-outer-border;

  &.need--scroll {
    overflow-x: auto;
  }

  &__head {
    padding: $table-head-padding;
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
        padding-left: $table-cell-padding-horizontal;
      }
      [class^="sp-icon"] {
        font-size: 14px;
        color: #97a2b5;
      }
    }
  }
  &__body {
    position: relative;
    padding: $table-body-padding;
    text-align: left;
    color: $table-tbody-color;
    min-height: $table-min-height;
    box-sizing: border-box;

    tr {
      border-bottom: $table-border;

      &.is--striped {
        background: $table-background;
      }

      td {
        vertical-align: middle;
        line-height: 1.2;
        height: $table-row-height;
        padding: $table-td-padding-vertical 0;
        box-sizing: border-box;

        &:first-child {
          .sp-table-cell {
            padding-left: $table-cell-padding-horizontal;
          }
        }
        &:last-child {
          .sp-table-cell {
            padding-right: $table-cell-padding-horizontal;
          }
        }

        .sp-checkbox__wrap {
          display: block;
          height: 14px;
          line-height: 15px;
          .sp-checkbox {
            font-size: 0;
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
  &.is--no-footer {
    .sp-table__body {
      tr {
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  &__footer {
    position: relative;
    height: 84px;
    &-left {
      position: absolute;
      height: inherit;
      top: 0;
      left: $table-cell-padding-horizontal + $table-indent;
      bottom: 0;
      &-content {
        height: inherit;
        display: table-cell;
        vertical-align: middle;

        .sp-checkbox__wrap {
          margin-right: 16px;
        }

        .sp-button + .sp-button {
          margin-left: 2px;
        }
      }

      .sp-checkbox + span {
        padding-left: 8px;
      }

      &-operation {
        display: inline-block;
        vertical-align: sub;
      }
    }
    &-center {
      height: 100%;
      .sp-pagination {
        padding-top: 27px;
      }
    }
    &-right {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      &-content {
        height: 84px;
        display: table-cell;
        vertical-align: middle;
      }
    }
  }

  &__append {
    position: relative;
    &-show-more {
      padding: 15px 0 17px;
      line-height: 18px;
      height: 18px;
      text-align: center;
    }

    .sp-table {
      margin-left: -1 * $table-indent;
      margin-right: -1 * $table-indent;
      width: auto;
      border: none;
      &::before {
        position: absolute;
        content: "";
        display: block;
        height: 1px;
        background-color: $table-divider-color;
        left: -1 * $table-indent;
        right: -1 * $table-indent;
        top: -1px;
        z-index: 2;
      }
      &__head {
        tr {
          border: 0;
        }
      }
      &:not(.is--no-footer) {
        .sp-table__body {
          tr:last-child {
            border-bottom: 1px solid #e4e8ef;
          }
        }
      }
      &__footer {
        border-bottom: 0;
      }
    }
  }

  &__empty {
    &-text {
      height: $table-min-height;
      line-height: $table-min-height;
      text-align: center;
      color: $table-empty-color;
      font-size: 16px;
    }
  }
  &__loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: $table-loading-color;

    .sp-icon-loading {
      font-size: 24px;
      vertical-align: sub;
      color: $table-loading-color;
      margin-right: 10px;
    }

    &-wrap {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgb(255 255 255 / 50%);
    }
  }

  &-cell {
    position: relative;
    padding-right: 20px;
    box-sizing: border-box;
    word-break: break-all;
    line-height: 1.2;
  }

  &.is--disabled {
    box-shadow: 0 1px 0 0 #dbdfe6;
    background-color: $table-background--is-disabled;
    color: $color-text-tip;
    .sp-table__head {
      background-color: $table-background--is-disabled;
    }
    .sp-table__body {
      color: $color-text-tip;
      tr {
        &.is--striped {
          background: $table-background--is-disabled;
        }
      }
    }
    .sp-table__footer {
      border-bottom: none;
    }
  }

  &.is--selection {
    .sp-table {
      &__body {
        tr {
          td {
            &:first-child {
              .sp-table-cell {
                padding-right: 7px;
                padding-left: 10px;
                margin-left: $table-selection-margin-left;
              }
            }
          }
        }
      }
      &__head {
        tr {
          th:first-child {
            div {
              margin-left: $table-selection-margin-left;
              width: 11px;
            }
          }
        }
      }
      &__footer {
        &-left {
          left: $table-indent + 10px + $table-selection-margin-left;
        }
      }
    }
  }
}
</style>
