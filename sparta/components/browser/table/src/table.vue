<template>
  <Table
    ref="table"
    :cell-empty-text="cellEmptyText"
    v-bind="$attrs"
    :border="border"
    v-on="$listeners"
  >
    <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
  </Table>
</template>

<script>
import Table from 'base/table'

export default {
  name: 'SpTable',
  components: {
    Table
  },
  props: {
    cellEmptyText: {
      type: String,
      default: '—'
    }
  },
  methods: {
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection()
    },
    toggleRowSelection(index, selected) {
      this.$refs.table.toggleRowSelection(index, selected)
    }
  }
}
</script>

<style lang="scss">
.sp-table {
  table {
    table-layout: fixed;
  }
  .sp-table__head {
    box-sizing: border-box;
    padding: 15px 10px;
    border-bottom: 1px solid #dadee0;
    th {
      line-height: 19px;
    }
  }
  .sp-table__body {
    padding: 0 10px;
  }
  .sp-table-cell {
    line-height: 1.5;
  }
  .sp-table__footer {
    margin: 20px 0 30px;
    height: 30px;
  }
  .sp-table__footer-center {
    .sp-pagination {
      padding-top: 0;
    }
  }
  .sp-table__footer-right-content {
    height: auto;
  }
  .sp-table__footer-left,&.is--selection .sp-table__footer-left {
    left: 20px;
  }
  &.is--no-footer .sp-table__body tr:last-child {
    border-bottom: 1px solid #e9edf0;
  }
}
</style>