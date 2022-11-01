<template>
  <Table
    ref="table"
    v-bind="$attrs"
    :border="border"
    :class="{ 'is--has-border': border }"
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
    border: {
      type: Boolean,
      default: true
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
  caption, td, th {
    text-align: left;
  }
  border-radius: 4px;
  &__body tr.is--striped {
    background-color: #fff;
  }
  &__head {
    padding: 0;
    th {
      padding: 13px 16px;
    }
  }
  &__body {
    tr {
      td {
        padding: 0;
        line-height: 1;
        & .sp-table-cell {
          padding: 13px 16px;
          line-height: 1;
        }
      }
    }
  }
  &.is--has-border &__head {
    border-bottom: none;
    th {
      border-bottom: none;
      border-right: $border-base;
      &:last-child {
        border-right: none;
      }
    }
  }
  &.is--has-border &__body {
    tr {
      td {
        border-right: $border-base;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  &.is--selection &__body tr td:first-child &-cell, &.is--selection &__head th:first-child {
    padding-left: 0;
    padding-right: 0;
  }
  &.is--selection &__head tr th:first-child div {
    width: 14px;
  }
  &.is--selection &__footer-left {
    left: 10px;
  }
}
</style>