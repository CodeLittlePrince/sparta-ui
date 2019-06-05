<template>
  <div class="sp-table">
    <!-- 表格头部 -->
    <div class="sp-table__head">
      <table>
        <colgroup>
          <col
            v-for="(item, index) in children"
            :key="index"
            :width="item.componentOptions.propsData.width"
          >
        </colgroup>
        <thead>
          <tr>
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
            <td
              v-for="(tdItem, cIndex ) in children"
              :key="cIndex"
            >
              <sp-table-cell
                :column="tdItem"
                :list="list"
                :c-index="cIndex"
                :r-index="rIndex"
              >
              </sp-table-cell>
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
export default {
  name: 'SpTable',

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
    }
  },

  computed: {
    colNum() {
      return this.data && this.data.length ?
        Object.keys(this.data[0]).length :
        0
    },
    children() {
      return this.$slots.default.filter(item => {
        return /SpTableColumn/.test(item.tag)
      })
    },
    isIe9() {
      return navigator.appVersion.indexOf('MSIE 9.0') > -1
    }
  }
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
    color: $color-text-secondary;
    border-bottom: $border-base;
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
    tr {
      border-bottom: $border-base;
      &:last-child {
        border-bottom: none;
      }
      td {
        vertical-align: middle;
        line-height: 1.2;
        padding: 28px 0;
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

