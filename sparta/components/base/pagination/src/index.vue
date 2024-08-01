<template>
  <div class="sp-pagination" :class="{'is--disabled': disabled }">
    <div :class="`align--${ align }`">
      <div v-if="showTotal" class="sp-pagination__total">共{{ total }}条</div>
      <ul>
        <!-- prev -->
        <li
          class="sp-pagination__li-prev"
          :class="{'is--disabled' : index === 1}"
          @click="prev"
        >
          <i class="sp-icon-arrow-left"></i>
        </li>
        <li
          :class="{'is--checked' : index === 1}"
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
          :class="{'is--checked' : index === pager}"
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
          :class="{'is--checked' : index === pages}"
          @click="last"
        >
          {{ pages }}
        </li>
        <!-- next -->
        <li
          class="sp-pagination__li-next"
          :class="{'is--disabled' : index === pages}"
          @click="next"
        >
          <i class="sp-icon-arrow-right"></i>
        </li>
      </ul>
      <div v-if="showSizes" class="sp-pagination__sizes">
        <sp-select v-model="limit" height="28" @change="handleSizeChange">
          <sp-option
            v-for="item in pageSizesOption"
            :key="item"
            :value="item"
            :label="`${item}条/页`"
          ></sp-option>
        </sp-select>
      </div>
      <div v-if="showJumper && pages > 1" class="sp-pagination__jump">
        跳至<sp-input
          ref="jumperInput"
          v-model="jumperPage"
          size="mini"
          :filter-char="/[^\d]/g"
          @change="handleJumpChange"
          @keydown.enter.native="handleInputEnter"
        />页
      </div>
    </div>
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
    // 每页显示个数选择器的选项设置
    pageSizes : {
      type : Array,
      default : () => []
    },
    // 总记录数
    total : {
      type : [Number, String],
      default : 1
    },
    // 禁止状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: '',
      validator(val) {
        if(!val) return true
        return val.split(',').every(item => ['sizes', 'jumper', 'total'].includes(item))
      }
    }
  },

  data() {
    return {
      index: +this.pageIndex, //当前页码
      limit: 0, //每页显示条数
      size: +this.total || 1, //总记录数
      showPrevMore: false,
      showNextMore: false,
      firstItem: 1,
      lastItem: 1,
      jumperPage: +this.pageIndex
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

      // 去除首尾
      return array.slice(1, -1)
    },

    showTotal() {
      return this.layout?.split(',')?.includes('total')
    },

    showSizes() {
      return this.layout?.split(',')?.includes('sizes') && this.pageSizes?.length
    },

    showJumper() {
      return this.layout?.split(',')?.includes('jumper')
    },

    pageSizesOption() {
      return this.pageSizes.map(item => Number(item))
    }
  },

  watch: {
    pageIndex(val) {
      this.index = val || 1
    },

    pageSize: {
      immediate: true,
      handler() {
        this.handleSetPageSize()
      }
    },

    total(val) {
      this.size = val || 1
    },

    index(val) {
      this.jumperPage = val
    },

    pageSizes: {
      handler(val, oldVal) {
        // !!这里为什么要判断长度或第一个值，是因为使用方在外面使用的时候大部分情况是重新赋值的，这种情况下，虽然值没变，但还会触发这里，所以需要判断是否真正改变
        if (val?.length && (val?.length !== oldVal?.length || val?.join('') !== oldVal?.join(''))) {
          this.handleSetPageSize()
        }
      },
      immediate: true
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

    first() {
      if (this.index !== 1) {
        this.go(1)
      }
    },

    last() {
      if (this.index != this.pages) {
        this.go(this.pages)
      }
    },

    go(page) {
      if (this.index !== page && !this.disabled) {
        this.index = page
        // emit给父组件处理
        this.$emit('change', this.index, this.limit)
      }
    },

    handleJumpChange(val) {
      if(!val || val < 1) {
        val = 1
      }
      this.go(Number(val))
    },

    handleSizeChange() {
      this.go(1)
      this.$emit('size-change', this.limit)
    },

    handleInputEnter() {
      // 修复回车之后光标显示在值前面的问题
      this.$refs.jumperInput?.$refs?.input?.blur?.()
      this.$nextTick(() => {
        this.$refs.jumperInput?.$refs?.input?.focus?.()
      })
    },

    handleSetPageSize() {
      const pageSize = Number(this.pageSize)
      if(this.pageSizes?.length) {
        if(this.pageSizesOption.includes(pageSize)) {
          this.limit = pageSize
        } else {
          this.limit = this.pageSizes[0]
        }
      } else {
        this.limit = pageSize || 10
      }
    }
  }
}
</script>


<style lang="scss">
@import "sparta/common/scss/base/mixin";

.sp-pagination {
  text-align: center;
  @include clearfix;
  font-size: 0;

  &__total {
    display: inline-block;
    line-height: 28px;
    height: 28px;
    vertical-align: top;
    color: #0d1233;
    font-size: 14px;
    margin-right: 16px;
  }

  &__sizes {
    display: inline-block;
    width: 94px;
    margin-left: 16px;
    vertical-align: top;
    .sp-select__input-box {
      min-height: 29px;
      font-size: 12px;
      .sp-select__input {
        padding-right: 0;
      }

      .sp-select__suffix {
        padding-left: 4px;
        background-color: transparent;
        border-color: transparent;

        .sp-icon-arrow-down-bold {
          color: #0d1233;
          &.rotate {
            color: #09f;
          }
        }
      }
    }
  }

  &__jump {
    display: inline-block;
    vertical-align: top;
    width: 104px;
    line-height: 28px;
    height: 28px;
    color: #0d1233;
    font-size: 14px;
    margin-left: 8px;
    .sp-input {
      width: 50px;
      margin: 0 6px;
    }
  }

  &.is--disabled {
    cursor: not-allowed;
    li:not(.item--more) {
      color: $pagination-item-color--is-disabled;
      background-color: $pagination-item-background--is-disabled;
      &.is--checked {
        background-color: #c7cbd1;
        color: #f0f3f7;
        border-color: #c7cbd1;
      }
    }
  }

  .align--left {
    float: left;
  }

  .align--right {
    float: right;
  }

  .align--middle, ul {
    display: inline-block;
  }

  li {
    user-select: none;
    float: left;
    color: $pagination-item-color;
    padding: 0 4px;
    min-width: $pagination-item-height - 8;
    height: $pagination-item-height;
    line-height: $pagination-item-height;
    font-size: $pagination-item-font-size;
    text-align: center;
    border: $border-base;
    border-left: none;
    box-sizing: content-box;

    &:first-child {
      border-top-left-radius: $pagination-border-radius;
      border-bottom-left-radius: $pagination-border-radius;
      border-left: $border-base;
      margin-right: 10px;
      background-color: $pagination-item-prev-next-background;
      color: #97a2b5;
    }

    &:last-child {
      border-top-right-radius: $pagination-border-radius;
      border-bottom-right-radius: $pagination-border-radius;
      border-left: $border-base;
      margin-left: 10px;
      background-color: $pagination-item-prev-next-background;
      color: #97a2b5;
    }

    &:nth-child(2) {
      border-left: $border-base;
    }

    &.item--more {
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
      line-height: 20px;
    }
  }

  &:not(.is--disabled) li {
    cursor: pointer;
    &:hover {
      color: $pagination-item-color--is-hover;
    }
    &:not(.sp-pagination__li-prev):not(.sp-pagination__li-next):not(.is--checked):hover {
      background-color: $pagination-background;
    }

    &.is--disabled,
    &.is--disabled:hover {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: $pagination-background--is-disabled;
    }

    &.is--checked {
      color: $pagination-item-color--is-checked;
      background-color: $pagination-background--is-checked;
      border-color: $pagination-border-color--is-checked;
    }
  }
}
</style>

