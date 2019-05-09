<template>
  <div class="ev-select-dropdown">
    <slot></slot>
  </div>
</template>

<script>
import dom from '@/common/js/dom'
import PopManage from '@/model/PopManage'

export default {
  name: 'EvSelectDropdown',
  mounted() {
    this.register()
    this.$nextTick(this.appendToBody)
  },
  beforeDestroy() {
    this.popManage.deregister()
    if (this.popWrapper) {
      this.popWrapper.parentNode.removeChild(this.popWrapper)
    }
  },
  methods: {
    /**
     * 注册自身到popManage，方便zIndex的管理
     */
    register() {
      this.popManage = new PopManage()
      this.popManage.register(this)
    },
    /**
     * 将自身加到body上，为了不收父容器overflow:hidden影响
     */
    appendToBody() {
      // 为了dropdown的定位，增加一个辅助元素
      this.popWrapper = document.createElement('div')
      this.popWrapper.style.cssText = `position: absolute; top: 0px; left: 0px; width: 100%; z-index: ${this.popManage.getZIndex()}`
      // 计算dropdown的位置，以及设置其宽度（默认为父元素宽度）
      const coords = dom.getElementCoords(this.$el)
      const top = coords.top
      const left = coords.left
      const parentNode = window.getComputedStyle(this.$el.parentNode)
      const width = parentNode.width
      this.parentHeight = parseFloat(parentNode.height)
      this.id = `x-dropdown-${this.popManage.getZIndex()}`
      this.$el.style.cssText = `top: ${top}px;left: ${left}px;width: ${width}`
      this.$el.id = this.id
      document.body.appendChild(this.popWrapper)
      this.popWrapper.appendChild(this.$el)
    },
    updateTop(newParentHeight) {
      const offsetTop = newParentHeight - this.parentHeight
      if (offsetTop !== 0) {
        const el = document.getElementById(this.id)
        const offsetTop = newParentHeight - this.parentHeight
        el.style.top = `${parseFloat(el.style.top) + offsetTop}px`
        // 更新parentHeight
        this.parentHeight = newParentHeight
      }
    }
  }
}
</script>

<style lang="scss">
.ev-select-dropdown {
  position: absolute;
}
</style>