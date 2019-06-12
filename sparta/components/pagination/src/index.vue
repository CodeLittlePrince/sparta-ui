<template>
  <div class="sp-pagination">
    <ul :class="`align-${ align }`">
      <!-- prev -->
      <li
        :class="{'is-disabled' : index === 1}"
        @click="prev"
      >
        <i class="sp-icon-arrow-left"></i>
      </li>
      <li
        :class="{'is-checked' : index === 1}"
        @click="first()"
      >
        1
      </li>
      <li
        v-if="showPrevMore"
        class="item--more"
      >
        ...
      </li>
      <li
        v-for="(pager, i) in pagers"
        :key="i"
        :class="{'is-checked' : index === pager}"
        @click="go(pager)"
      >
        {{ pager }}
      </li>
      <li
        v-if="showNextMore"
        class="item--more"
      >
        ...
      </li>
      <li
        v-if="pages !== 1"
        :class="{'is-checked' : index === pages}"
        @click="last"
      >
        {{ pages }}
      </li>
      <!-- next -->
      <li
        :class="{'is-disabled' : index === pages}"
        @click="next"
      >
        <i class="sp-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SpPagination',

  props: {
    // 向哪对齐：'middle','left','right'
    align: {
      type: String,
      default: 'right',
      validator (val) {
        // 只接收top, bottom
        return ['middle','left','right'].includes(val)
      }
    },
    // 页面中的可见页码，其他的以...替代, 必须是奇数
    perPages : {
      type : [Number, String],
      default : 7,
      validator (val) {
        // 只接收top, bottom
        return val % 2 === 1
      }
    },
    // 当前页码
    pageIndex : {
      type : [Number, String],
      default : 1
    },
    // 每页显示条数
    pageSize : {
      type : [Number, String],
      default : 10
    },
    // 总记录数
    total : {
      type : [Number, String],
      default : 1
    }
  },

  data() {
    return {
      index: +this.pageIndex, //当前页码
      limit: +this.pageSize,  //每页显示条数
      size: +this.total || 1, //总记录数
      showPrevMore: false,
      showNextMore: false,
      firstItem: 1,
      lastItem: 1
    }
  },

  computed: {
    // 计算总页码
    pages() {
      return Math.ceil(this.size / this.limit)
    },

    // 计算页码，当count等变化时自动计算
    pagers() {
      const array = []
      const perPages = +this.perPages
      const pageCount = this.pages
      let current = this.index
      const _offset = (perPages - 1) / 2

      const offset = {
        start: current - _offset,
        end: current + _offset
      }

      // -1, 3
      if (offset.start < 1) {
        offset.end = offset.end + (1 - offset.start)
        offset.start = 1
      }
      if (offset.end > pageCount) {
        offset.start = offset.start - (offset.end - pageCount)
        offset.end = pageCount
      }
      if (offset.start < 1) offset.start = 1

      // 控制'...'
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.showPrevMore = offset.start > 1
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.showNextMore = offset.end < pageCount

      for (let i = offset.start; i <= offset.end; i++) {
        array.push(i)
      }

      // 去除收尾
      return array.slice(1, -1)
    }
  },

  watch: {
    pageIndex(val) {
      this.index = val || 1
    },

    pageSize(val) {
      this.limit = val || 10
    },

    total(val) {
      this.size = val || 1
    }
  },

  methods: {
    prev() {
      if (this.index > 1) {
        this.go(this.index - 1)
      }
    },

    next() {
      if (this.index < this.pages) {
        this.go(this.index + 1)
      }
    },

    first(){
      if (this.index !== 1) {
        this.go(1)
      }
    },

    last(){
      if (this.index != this.pages) {
        this.go(this.pages)
      }
    },

    go(page) {
      if (this.index !== page) {
        this.index = page
        // emit给父组件处理
        this.$emit('change', this.index, this.pageSize)
      }
    }
  }
}
</script>


<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-pagination {
  text-align: center;
  @include clearfix();

  .align-left {
    float: left;
  }

  .align-right {
    float: right;
  }

  .align-middle {
    display: inline-block;
  }

  li {
    user-select: none;
    float: left;
    padding: 0 15px;
    height: $pagination-item-height;
    line-height: $pagination-item-height;
    font-size: $pagination-item-font-size;
    text-align: center;
    $pagination-item-background: #fff;
    border: $border-base;
    border-left: none;
    cursor: pointer;

    &:first-child {
      border-top-left-radius: $pagination-border-radius;
      border-bottom-left-radius: $pagination-border-radius;
      border-left: $border-base;
      margin-right: 10px;
      background-color: $pagination-item-prev-next-background;
      padding: 0 12px;
    }

    &:last-child {
      border-top-right-radius: $pagination-border-radius;
      border-bottom-right-radius: $pagination-border-radius;
      border-left: $border-base;
      margin-left: 10px;
      background-color: $pagination-item-prev-next-background;
      padding: 0 12px;
    }

    &:nth-child(2) {
      border-left: $border-base;
    }

    &:hover {
      background-color: $pagination-background;
      color: $pagination-item-color;
    }

    &.is-disabled,
    &.is-disabled:hover {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: $pagination-background--is-disabled;
    }

    &.is-checked {
      color: $pagination-item-color--is-checked;
      background-color: $pagination-background--is-checked;
      border-color: $pagination-border-color--is-checked;
    }
  }
}
</style>

