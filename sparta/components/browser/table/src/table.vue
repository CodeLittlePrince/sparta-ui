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
  table {
    table-layout: fixed;
  }
  .sp-table__head {
    box-sizing: border-box;
  }
}
</style>