<template>
  <div
    ref="dropdown"
    class="sp-dropdown"
    @click="handleClick"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div class="sp-dropdown__content">
      <slot></slot>
    </div>
    <sp-dropdown-item-wrap
      v-model="visible"
      :placement="placement"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseleave"
    >
      <transition name="sp-zoom-in-top">
        <ul v-show="visible">
          <slot name="dropdown"></slot>
        </ul>
      </transition>
    </sp-dropdown-item-wrap>
  </div>
</template>

<script>
import SpDropdownItemWrap from './dropdown-item-wrap'
import Emitter from 'sparta/common/js/mixins/emitter'

export default {
  name: 'SpDropdown',

  components: {
    'sp-dropdown-item-wrap': SpDropdownItemWrap
  },

  mixins: [Emitter],

  provide() {
    return {
      'SpDropdown': this
    }
  },

  props: {
    trigger: {
      type: String,
      default: 'hover',
      validator(val) {
        return ['hover', 'click'].indexOf(val) > -1
      }
    },
    placement: {
      type: String,
      default: 'bottom-start'
    }
  },

  data() {
    return {
      visible: false
    }
  },

  watch: {
    // 监控下拉是否显示
    visible(val) {
      if (val) {
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpDropdownItemWrap', 'updatePopper')
      } else {
        this.broadcast('SpDropdownItemWrap', 'destroyPopper')
      }
    }
  },

  mounted() {
    if (this.trigger === 'click') {
      document.addEventListener('click', this.handleOtherAreaClick)
    }
  },

  beforeDestroy() {
    if (this.trigger === 'click') {
      document.removeEventListener('click', this.handleOtherAreaClick)
    }
    if (this.trigger === 'hover') {
      this.timeId && clearTimeout(this.timeId)
    }
  },

  methods: {
    handleMouseenter() {
      if (this.trigger === 'hover') {
        this.visible = true
        this.timeId && clearTimeout(this.timeId)
      }
    },
    handleMouseleave() {
      if (this.trigger === 'hover') {
        this.timeId = setTimeout(() => {
          this.visible = false
        }, 200)
      }
    },
    handleClick() {
      if (this.trigger === 'click') {
        this.visible = !this.visible
      }
    },
    /**
     * 点击其他区域触发事件
     */
    handleOtherAreaClick(e) {
      if (!this.$el.contains(e.target)) {
        this.isFocus = false
        this.visible = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-dropdown {
  display: inline-block;

  &__content {
    cursor: pointer;
  }

  &-item-wrap {
    ul {
      margin: 5px 0;
      padding: 5px 0;
      border: 1px solid $dropdown-border-color;
      border-radius: $dropdown-border-radius;
      box-shadow: $float-box-shadow-box;
      box-sizing: border-box;
      background-color: $dropdown-background;
      cursor: pointer;
    }
  }
}
</style>
