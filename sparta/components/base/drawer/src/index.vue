<template>
  <div>
    <transition
      name="sp-drawer-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div
        v-show="visible"
        class="sp-drawer__wrapper"
        :style="`z-index: ${ drawerWrapperZIndex }`"
        tabindex="-1"
      >
        <div
          class="sp-drawer__container"
          :class="visible && 'sp-drawer__open'"
          role="document"
          tabindex="-1"
          @click.self="handleWrapperClick"
        >
          <div
            ref="drawer"
            aria-modal="true"
            aria-labelledby="sp-drawer__title"
            :aria-label="title"
            class="sp-drawer"
            :class="[direction, { 'has--footer': $slots.footer }]"
            :style="isHorizontal ? `width: ${drawerSize}` : `height: ${drawerSize}`"
            role="dialog"
            tabindex="-1"
          >
            <header v-if="withHeader" id="sp-drawer__title" class="sp-drawer__header">
              <slot name="title">
                <span role="heading" :title="title">{{ title }}</span>
              </slot>
              <button
                v-if="showClose"
                :aria-label="`close ${title || 'drawer'}`"
                class="sp-drawer__close-btn"
                type="button"
                @click="closeDrawer"
              >
                <i class="sp-dialog__close sp-icon sp-icon-close"></i>
              </button>
            </header>
            <!-- rendered 渲染 -->
            <section v-if="rendered" class="sp-drawer__body">
              <slot></slot>
            </section>
            <section v-if="rendered" class="sp-drawer__footer">
              <slot name="footer"></slot>
            </section>
          </div>
        </div>
      </div>
    </transition>

    <!-- mask -->
    <transition name="sp-fade">
      <div
        v-show="visible"
        class="sp-drawer__mask"
        :style="`z-index: ${ drawerMaskZIndex }`"
      ></div>
    </transition>
  </div>
</template>

<script>
import PopManage from 'sparta/model/PopManage' // 控制z-index

export default {
  name: 'SpDrawer',
  props: {
    // Drawer 关闭前的回调，会暂停 Drawer 的关闭
    beforeClose: {
      type: Function
    },
    // 控制是否在关闭 Drawer 之后将子元素全部销毁
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    // Drawer 打开的方向 right / left / top / bottom
    direction: {
      type: String,
      default: 'right',
      validator(val) {
        return ['left', 'right', 'top', 'bottom'].indexOf(val) !== -1
      }
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 'x%', 否则便会以 number 类型解释
    size: {
      type: [Number, String],
      default: '30%'
    },
    // Drawer 的标题，也可通过具名 slot （见下表）传入
    title: {
      type: String,
      default: ''
    },
    // 是否显示 Drawer，支持 .sync 修饰符
    value: {
      type: Boolean,
      default: false
    },
    // 点击遮罩层是否可以关闭 Drawer
    wrapperClosable: {
      type: Boolean,
      default: false
    },
    // 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效
    withHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: this.value,
      closed: false,
      prevActiveElement: null,
      rendered: false, // rendered 渲染
    }
  },
  computed: {
    // Drawer 是否是水平方向
    isHorizontal() {
      return this.direction === 'right' || this.direction === 'left'
    },
    // Drawer 的宽度或高度
    drawerSize() {
      return typeof this.size === 'number' ? `${this.size}px` : this.size
    }
  },
  watch: {
    value(val) {
      this.visible = val
      if (val) {
        this.closed = false
        this.$emit('open')
        this.open()
        // 前一个活动元素，为了关闭时聚焦之前的元素
        this.prevActiveElement = document.activeElement
      } else {
        if (!this.closed) {
          this.$emit('close')
          if (this.destroyOnClose === true) {
            this.rendered = false
          }
        }
        this.$nextTick(() => {
          if (this.prevActiveElement) {
            this.prevActiveElement.focus()
          }
        })
      }
    }
  },
  created() {
    // 控制z-index
    const popManage = PopManage.getInstance()
    this.drawerMaskZIndex = popManage.getZIndex()
    this.drawerWrapperZIndex = popManage.getZIndex()
  },
  mounted() {
    if (this.visible) {
      this.open()
    }
  },
  destroyed() {
    // destroy 之后删除 DOM 节点
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    /**
     * Drawer 打开动画结束时的回调
     */
    afterEnter() {
      this.$emit('opened')
    },

    /**
     * closed	Drawer 关闭动画结束时的回调
     */
    afterLeave() {
      this.$emit('closed')
    },

    open() {
      document.body.appendChild(this.$el)
      this.rendered = true
    },

    /**
     * 隐藏 Drawer（真正改变） 调用方：closeDrawer 和 beforeClose
     * @param {Boolean} cancel 是否触发关闭事件
     */
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('input', false)
        this.$emit('close')
        if (this.destroyOnClose === true) {
          this.rendered = false
        }
        this.closed = true
      }
    },

    /**
     * 点击遮罩层关闭 Drawer
     */
    handleWrapperClick() {
      if (this.wrapperClosable) {
        this.closeDrawer()
      }
    },

    /**
     * 关闭 Drawer（具体执行）
     */
    closeDrawer() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },

  }
}
</script>

<style lang="scss">
@keyframes sp-drawer-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@mixin drawer-animation($direction) {

  @keyframes #{$direction}-drawer-in {
    0% {

      @if $direction == left {
        transform: translate(-100%, 0);
      }

      @if $direction == right {
        transform: translate(100%, 0);
      }

      @if $direction == top {
        transform: translate(0, -100%);
      }

      @if $direction == bottom {
        transform: translate(0, 100%);
      }
    }

    100% {
      @if $direction == left {
        transform: translate(0, 0);
      }

      @if $direction == right {
        transform: translate(0, 0);
      }

      @if $direction == top {
        transform: translate(0, 0);
      }

      @if $direction == bottom {
        transform: translate(0, 0);
      }
    }
  }

  @keyframes #{$direction}-drawer-out {
    0% {
      @if $direction == left {
        transform: translate(0, 0);
      }

      @if $direction == right {
        transform: translate(0, 0);
      }

      @if $direction == top {
        transform: translate(0, 0);
      }

      @if $direction == bottom {
        transform: translate(0, 0);
      }
    }

    100% {
      @if $direction == left {
        transform: translate(-100%, 0);
      }

      @if $direction == right {
        transform: translate(100%, 0);
      }

      @if $direction == top {
        transform: translate(0, -100%);
      }

      @if $direction == bottom {
        transform: translate(0, 100%);
      }
    }
  }
}

@mixin animation-in($direction) {
  .sp-drawer__open &.#{$direction} {
    animation: #{$direction}-drawer-in 0.3s 1ms;
  }
}

@mixin animation-out($direction) {
  &.#{$direction} {
    animation: #{$direction}-drawer-out 0.3s;
  }
}

@include drawer-animation(right);
@include drawer-animation(left);
@include drawer-animation(top);
@include drawer-animation(bottom);

$directions: right, left, top, bottom;

.sp-drawer {
  position: absolute;
  box-sizing: border-box;
  background-color: $--dialog-background-color;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 20px 0 rgb(0 0 0 / 3%);
  overflow: hidden;
  outline: 0;

  @each $direction in $directions {
    @include animation-out($direction);
    @include animation-in($direction);
  }

  &__mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: $modal-mask-background;
  }

  &__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    margin: 0;
  }

  &__header {
    align-items: center;
    color: #0d1233;
    display: flex;
    height: 22px;
    line-height: 22px;
    margin-bottom: 16px;
    padding: 16px $--dialog-padding-primary 0;
    & > :first-child {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }
  }

  &__title {
    margin: 0;
    flex: 1;
    line-height: inherit;
    font-size: 1rem;
  }

  &__close-btn {
    border: none;
    cursor: pointer;
    font-size: $--font-size-extra-large;
    color: inherit;
    background-color: transparent;

    .sp-dialog__close {
      font-size: $--font-size-extra-large;
    }
  }

  &__body {
    flex: 1;
    overflow: auto;
    & > * {
      box-sizing: border-box;
    }
  }

  &__footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 18px 20px;
    text-align: right;
    height: 72px;
    box-sizing: border-box;
  }

  &.left, &.right {
    height: 100%;
    top: 0;
    bottom: 0;
  }

  &.top, &.bottom {
    width: 100%;
    left: 0;
    right: 0;
  }

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }

  &.top {
    top: 0;
  }

  &.bottom {
    bottom: 0;
  }

  &.has--footer {
    .sp-drawer__body {
      margin-bottom: 72px;
    }
  }
}

.sp-drawer__container {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}

.sp-drawer-fade-enter-active {
  animation: sp-drawer-fade-in 0.3s;
}

.sp-drawer-fade-leave-active {
  animation: sp-drawer-fade-in 0.3s reverse;
}

</style>