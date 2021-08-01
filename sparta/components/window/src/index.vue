<template>
  <div class="sp-window">
    <sp-button
      class="sp-window__left"
      icon="sp-icon-arrow-left"
      @click="_moveLeft()"
    ></sp-button>
    <sp-button
      class="sp-window__right"
      icon="sp-icon-arrow-right"
      @click="_moveRight()"
    ></sp-button>
    <div
      ref="content"
      class="sp-window__content"
    >
      <ul
        ref="list"
        :style="`
          width: ${listWidth};
          transform: translateX(${offset}px);
          -ms-transform: translateX(${offset}px);
          -moz-transform: translateX(${offset}px);
          -webkit-transform: translateX(${offset}px);
          -o-transform: translateX(${offset}px);
        `"
        @mousewheel="_handleMousewheel"
      >
        <li
          v-for="(item, index) in tabs"
          ref="item"
          :key="item[linkKey]"
          :class="{ active: $route.path === item[linkKey] }"
          :style="`width: ${itemWidth}px`"
          @click="_handleTabClick(index)"
        >
          <span :title="item[titleKey]">{{ item[titleKey] }}</span>
          <i
            class="sp-icon-close"
            @click="_handleClose(index, $event)"
          ></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import dom from 'sparta/common/js/utils/dom'
import SpButton from 'sparta/components/button'

const SPACE = 40 // 每步移动的距离

export default {
  name: 'SpWindow',

  components: {
    'sp-button': SpButton
  },

  props: {
    titleKey: {
      type: String,
      default: 'title'
    },
    linkKey: {
      type: String,
      default: 'link'
    },
    tabs: {
      type: Array,
      default: () => []
    },
    itemWidth: {
      type: [String, Number],
      default: 180
    }
  },

  data() {
    return {
      listWidth: 'auto',
      contentWidth: 0,
      maxStep: 0,
      offset: 0
    }
  },

  watch: {
    tabs() {
      this._setListWidth()
    }
  },

  mounted() {
    window.addEventListener('load', this._handleLoad)
  },

  beforeDestroy() {
    window.removeEventListener('load', this._handleLoad)
  },

  methods: {
    /**
     * 选择索引为index的tab
     * @param {number} index 选择tab的索引
     */
    selectTab(index) {
      // 替换页面
      this.$router.replace(this.tabs[index][this.linkKey])
      // 点击后移动至可视区域
      this._moveTo(index)
      this.$emit('select', this.tabs[index][this.linkKey], this.tabs[index])
    },
    /**
     * 移动至指定的距离
     */
    _moveTo(index) {
      // 拿到list宽度，以及index tab的offset
      const items = Array.from(this.$refs.list.children)
      let offset = 0
      let totalWidth = 0
      for (let i = 0, len = items.length; i < len; i++) {
        const itemStyle = window.getComputedStyle(items[i])
        if (index > i) {
          offset += parseInt(itemStyle.width) + parseInt(itemStyle.marginLeft) + parseInt(itemStyle.marginRight)
        }
        totalWidth += parseInt(itemStyle.width) + parseInt(itemStyle.marginLeft) + parseInt(itemStyle.marginRight)
      }
      const contentWidth = parseInt(window.getComputedStyle(this.$refs.content).width)
      // 如果list宽度小于容器宽度，则
      if (totalWidth - contentWidth < 0) {
        return this.offset = 0
      // 否则，到了末尾几个了，则需防止左移过多
      } else if (0 < contentWidth - (totalWidth - offset)) {
        offset -= contentWidth - (totalWidth - offset) - 5
      // 否则，如果不是第一项，则都往左回移半个tab的距离
      } else if (index !== 0) {
        const itemStyle = window.getComputedStyle(items[0])
        offset -= (parseInt(itemStyle.width) + parseInt(itemStyle.marginLeft) + parseInt(itemStyle.marginRight)) / 2
      }
      return this.offset = -offset
    },
    /**
     * 关闭窗口
     */
    _handleClose(index, e) {
      e.stopPropagation()
      // eslint-disable-next-line vue/no-mutating-props
      this.tabs.splice(index, 1)
      const currentItem = this.$refs.item[index]
      const isActive = dom.hasClass(currentItem, 'active')
      // 如果关闭的不是当前显示窗口，则忽略
      // 否则，如果tab数量为0，则显示首页
      // 否则，如果关闭的index等于tab最后一项，则打开前一项tab
      // 否则，打开index对应的tab
      this.$emit('close', index)
      if (!isActive) {
        return
      } else if (this.tabs.length <= 0) {
        this.$router.replace('/')
      } else if(index === this.tabs.length) {
        this.$router.replace(this.tabs[index - 1][this.linkKey])
      } else {
        this.$router.replace(this.tabs[index][this.linkKey])
      }
    },
    /**
     * 页面加载完后处理
     */
    _handleLoad() {
      this._setListWidth()
    },
    /**
     * 滚轮事件监听
     */
    _handleMousewheel(e) {
      e.preventDefault()
      const deltaY = e.deltaY
      if (deltaY > 0) {
        this._moveRight()
      } else {
        this._moveLeft()
      }
    },
    /**
     * 点击tab
     */
    _handleTabClick(index) {
      this.selectTab(index)
    },
    /**
     * 设置list的宽度
     */
    _setListWidth() {
      const items = Array.from(this.$refs.list.children)
      let w = 0
      items.forEach(item => {
        const itemStyle = window.getComputedStyle(item)
        w += parseInt(itemStyle.width) + parseInt(itemStyle.marginLeft) + parseInt(itemStyle.marginRight)
      })
      this.listWidth = `${w}px`
      this.contentWidth = window.getComputedStyle(this.$refs.content).width
    },
    /**
     * 向左移动
     */
    _moveLeft() {
      if (this.offset < 0) {
        this.offset += SPACE
      }
      // 因为每步是SPACE距离，可能走过头；
      // 因此，需要防止左移过多
      if (0 < this.offset) {
        this.offset = 0
      }
    },
    /**
     * 向右移动
     */
    _moveRight() {
      const listWidth = parseInt(this.listWidth)
      const contentWidth = parseInt(this.contentWidth)
      this.maxStep = (listWidth - contentWidth) / SPACE
      if (-(this.maxStep * SPACE) < this.offset) {
        this.offset -= SPACE
      }
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-window {
  position: relative;
  height: 40px;
  padding: 0 30px;

  .sp-button {
    position: absolute;
    z-index: 1;
    bottom: 0;
    padding: 7px;
    border-radius: 0;
  }

  &__left {
    left: 0;
  }

  &__right {
    right: 0;
  }

  &__content {
    width: 100%;
    height: 40px;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background-color: #dcdfe6;
    }

    ul {
      @include clearfix();
      position: absolute;
      bottom: 0;
      left: 1px;
      white-space: nowrap;
      font-size: 0;
      transition: all 0.2s;
      z-index: 2;

      li {
        position: relative;
        display: inline-block;
        width: 180px;
        height: 30px;
        border: $border-base;
        border-bottom: none;
        margin-top: 1px;
        margin-left: 5px;
        padding-right: 18px;
        padding-left: 8px;
        box-sizing: border-box;
        font-size: 16px;
        transition: all 0.2s;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;

        &.active {
          color: $color-primary;
          border-color: $color-primary-light-1;

          &::after {
            content: '';
            display: inline-block;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1px;
            background-color: #fff;
          }
        }

        i {
          position: absolute;
          top: 6px;
          right: 5px;
          cursor: pointer;
        }

        span {
          width: 100%;
          display: inline-block;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 29px;
          font-size: 13px;
          cursor: default;
        }
      }
    }
  }
}
</style>