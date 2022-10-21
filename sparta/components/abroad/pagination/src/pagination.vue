<script>
import Pagination from 'base/pagination'

export default {
  name: 'SpPagination',
  extends: Pagination
}
</script>

<style lang="scss">
.sp-pagination {
  ul > li {
    border-radius: $pagination-border-radius;
    margin-right: 6px;
    border: $border-base;
    &.item--more {
      border: solid 1px #fff;
    }
    &:first-child {
      margin-right: 6px;
      font-size: 12px;
    }
    &:last-child {
      margin-left: 0;
      margin-right: 0;
    }
    &:first-child, &:last-child {
      i {
        font-size: 12px;
      }
    }
  }
}
</style>