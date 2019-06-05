<template>
  <div class="sp-table">
    <!-- 表格头部 -->
    <div class="sp-table__head">
      <table>
        <colgroup>
          <col
            v-if="selection"
            width="60px"
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
    <div class="sp-table__body">
      <!-- 有数据情况 -->
      <table v-if="list && list.length && !loading">
        <colgroup>
          <col
            v-if="selection"
            width="60px"
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
        v-else-if="!loading"
        class="sp-table__empty"
      >
        <span>
          <slot name="empty">{{ emptyText }}</slot>
        </span>
      </div>
      <!-- loading情况 -->
      <div
        v-else
        class="sp-table__loading"
      >
        <i
          v-if="!isIe9"
          class="sp-icon-loading"
        ></i>
        加载中...
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
    }
  },

  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      checkedIndexs: [],
      checkedList: []
    }
  },

  computed: {
    children() {
      return this.$slots.default.filter(item => {
        return /SpTableColumn/.test(item.tag)
      })
    },
    isIe9() {
      return navigator.appVersion.indexOf('MSIE 9.0') > -1
    }
  },

  mounted() {
    if (this.selection) {
      this.initCheckedList()
    }
  },
  
  methods: {
    initCheckedList() {
      let len = this.list.length
      while(len) {
        len--
        this.checkedList[len] = false
      }
    },
    emitChange() {
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
     * 全选单选框点击
     */
    handleCheckAllChange(isChecked) {
      let len = this.list.length
      while(len) {
        len--
        this.checkedList[len] = isChecked
      }
      this.isIndeterminate = false
      this.emitChange()
    },
    /**
     * 单选框单独点击
     */
    handleCheck(index, isChecked) {
      // 更新checkedList
      this.checkedList[index] = isChecked
      // 处理checkbox的关联
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
      this.emitChange()
    }
  },
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-table {
  table {
    width: 100%;
  }
  &__head {
    padding: 15px 24px;
    text-align: left;
    color: $table-thead-color;
    border-bottom: $table-border;
    background-color: $table-background;
    th {
      text-align: left; /* 为了IE */
      &:first-child {
        padding-left: 16px;
      }
    }
  }
  &__body {
    padding: 0 24px;
    text-align: left;
    color: $table-tbody-color;
    tr {
      border-bottom: $table-border;
      &:last-child {
        border-bottom: none;
      }
      td {
        vertical-align: middle;
        line-height: 1.2;
        padding: 15px 0;
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
    padding: 30px 0;
    text-align: center;
  }
  &__loading {
    padding: 30px 0;
    text-align: center;
    color: $color-text-secondary;
    .sp-icon-loading {
      font-size: 30px;
      vertical-align: sub;
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

