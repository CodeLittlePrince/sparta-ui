<template>
  <div
    class="sp-select"
    :class="{ isFocus, cursorPoiner, 'is-disabled': disabled }"
    :style="`width: ${width}px;`"
    @click="handleSelfClick"
  >
    <div
      ref="sp-select-input-box"
      class="sp-select-input-box"
      :style="`height: ${selectInputBoxHeight}`"
      @mouseover="isHover = true"
      @mouseout="isHover = false"
    >
      <!-- 多选情况 -->
      <template v-if="multiple">
        <div
          ref="sp-tag-box"
          :style="`width: ${tagBoxWidth}`"
          class="sp-tag-box"
          @click="focusSelectInput"
        >
          <transition-group
            name="sp-zoom-in-center"
            @after-leave="updateTagboxHeight"
          >
            <sp-tag
              v-for="tag in selected"
              :key="tag.label"
              closable
              @close="handleTagClose(tag, $event)"
            >{{ tag.label }}</sp-tag>
          </transition-group>
        </div>
      </template>
      <!-- 非多选情况-->
      <p
        v-show="inputText === ''"
        class="sp-select-input-placeholder"
        @click="focusSelectInput"
      >
        {{ placeholder }}
      </p>
      <input
        ref="selectInput"
        v-model="inputText"
        class="sp-select-input"
        type="text"
        :readonly="readonly"
        :disabled="disabled"
        autocomplete="off"
        :style="`height: ${selectInputBoxHeight}`"
        @input="handleInputSelectInput"
        @focus="handleFocusSelectInput"
        @blur="handleBlurSelectInput"
        @keydown.down.prevent="navigateOptions('next')"
        @keydown.up.prevent="navigateOptions('prev')"
        @keydown.enter.prevent="handleInputEnter"
        @keydown.tab="visible = false"
        @keydown.esc.stop.prevent="visible = false"
      >
      <!-- 后缀icon -->
      <div
        ref="sp-select-suffix"
        class="sp-select-suffix"
        @click="handleSuffixClick($event)"
      >
        <i
          v-show="showClearIcon && !multiple"
          class="sp-icon-close"
        />
        <i
          v-show="!showClearIcon"
          class="sp-icon-arrow-down"
        />
      </div>
    </div>
    <!-- 下拉 -->
    <sp-select-dropdown
      ref="sp-select-dropdown"
      v-model="visible"
    >
      <transition name="sp-zoom-in-top">
        <ul
          ref="dropdown"
          class="sp-select-list"
        >
          <slot></slot>
          <!-- 无数据情况 -->
          <li
            v-show="!hasSpOptions || (hasSpOptions && evOptionsAllInVisiable)"
            class="sp-option is-disabled sp-select-list-emptyText"
            @click.stop
          >{{ emptyText }}</li>
        </ul>
      </transition>
    </sp-select-dropdown>
  </div>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'
import SpSelectDropdown from './select-dropdown'
import SpTag from 'sparta/components/tag/src'

export default {
  name: 'SpSelect',
  components: {
    'sp-select-dropdown': SpSelectDropdown,
    'sp-tag': SpTag
  },
  provide() {
    return {
      'evSelect': this
    }
  },
  mixins: [Emitter],
  props: {
    width:  {
      type: [String, Number],
      default: 240
    },
    value: {
      type: [Array, Number, String, Boolean, Object],
      default: undefined
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterMethod: {
      type: Function,
      default: null
    },
    emptyText: {
      type: String,
      default: '无匹配数据'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      isFocus: false,
      isHover: false,
      canNotFocus: true,
      cursorPoiner: !this.disabled,
      inputText: this.value && this.value.length ? ' ' : '',
      evOptions: [],
      evOptionHoverIndex: -1,
      selected: [],
      selectInputBoxHeight: '40px',
      tagBoxWidth: 'auto'
    }
  },
  computed: {
    readonly() {
      return (!this.isFocus || this.canNotFocus) && !this.filterable
    },
    evOptionsAllDisabled() {
      return this.evOptions.every(option => option.disabled)
    },
    evOptionsAllInVisiable() {
      return this.evOptions.every(option => !option.visible)
    },
    showClearIcon() {
      return this.clearable && this.inputText !== '' && this.isHover
    },
    hasSpOptions() {
      return this.evOptions && this.evOptions.length
    }
  },
  watch: {
    evOptionHoverIndex(val) {
      this.evOptions.forEach((option, index) => {
        option.hover = val === index
      })
    },
    // 监控下拉是否显示
    visible(val) {
      if (val) {
        if (this.value !== undefined) {
          this.$nextTick(() => this.scrollToView())
        }
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpSelectDropdown', 'updatePopper')
      } else {
        this.broadcast('SpSelectDropdown', 'destroyPopper')
      }
    },
    selected(val) {
      if (val) {
        this.inputText = val.length ? ' ' : ''
      }
    },
    inputText(val) {
      // 如果filterable开启，并且focus，根据用户输入过滤（搜索）相关的条目
      if (this.filterable && this.isFocus) {
        // 如果用户输入刚好可以在条目中找到，则展示所有的条目
        const hasSameLabel = this.evOptions.some(item => {
          return item.label === val
        })
        for (let i = 0, len = this.evOptions.length; i < len; i++) {
          if (hasSameLabel || (this.evOptions[i].label.indexOf(val) !== -1)) {
            this.evOptions[i].visible = true
          } else {
            this.evOptions[i].visible = false
          }
        }
      }
    }
  },
  mounted() {
    if (this.disabled) {
      return
    }
    this.setDefault()
    if (this.multiple) {
      this.setTagboxWidth()
    }
    document.addEventListener('click', this.handleOtherAreaClick)
  },
  beforeDestroy() {
    if (this.disabled) {
      return
    }
    document.removeEventListener('click', this.handleOtherAreaClick)
  },
  methods: {
    /**
     * 设置默认label和evOptionHoverIndex
     */
    setDefault() {
      const defaultSlot = this.$slots.default
      if (defaultSlot && this.value) {
        for (let i = 0, len = defaultSlot.length; i < len; i++) {
          if (defaultSlot[i].componentInstance.value === this.value) {
            this.evOptionHoverIndex = i
            this.inputText = defaultSlot[i].componentInstance.label
            break
          }
        }
      }
    },
    setTagboxWidth() {
      this.tagBoxWidth = `${parseFloat(window.getComputedStyle(this.$refs['sp-tag-box'].parentNode).width) - 38}px`
    },
    updateTagboxHeight() {
      if (this.selected.length) {
        this.$nextTick(() => {
          // 更新容器的高度
          const style = window.getComputedStyle(this.$refs['sp-tag-box'])
          const height = parseFloat(style.height) + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
          this.selectInputBoxHeight = `${height + 2}px`
          this.$refs['sp-select-suffix'].style.height = height + 'px'
          this.$refs['sp-select-suffix'].style.lineHeight = height + 'px'
          this.$nextTick(() => {
            this.broadcast('SpSelectDropdown', 'updatePopper')
          })
        })
      }
    },
    /**
     * 点击自身处理
     */
    handleSelfClick() {
      if (!this.disabled) {
        this.visible = !this.visible
      }
    },
    /**
     * 点击其他区域触发事件
     */
    handleOtherAreaClick(e) {
      if (!this.$el.contains(e.target)){
        this.isFocus = false
        this.visible = false
      }
    },
    /**
     * 通过键盘的Enter键选定条目
     */
    handleInputEnter() {
      if (this.filterable && this.evOptionsAllInVisiable) {
        return
      }
      const hoverItem = this.evOptions[this.evOptionHoverIndex]
      if (hoverItem && this.multiple) {
        const valueIndex = this.value.indexOf(hoverItem.value)
        // 将选择的值加入tag
        if (valueIndex !== -1) {
          this.selected.splice(valueIndex, 1)
          this.value.splice(valueIndex, 1)
          this.evOptions[this.evOptionHoverIndex].selected = false
        } else {
          this.selected.push({ label: hoverItem.label, value: hoverItem.value })
          this.value.push(hoverItem.value)
          this.evOptions[this.evOptionHoverIndex].selected = true
        }
        this.updateTagboxHeight()
      } else if (hoverItem) {
        this.$emit('input', hoverItem.value)
        this.inputText = hoverItem.label
        this.visible = false
      }
      this.focusSelectInput()
    },
    handleInputSelectInput() {
      if (this.inputText !== '') {
        this.visible = true
      }
    },
    handleFocusSelectInput() {
      if (!this.disabled) {
        this.isFocus = true
        // 如果filterable开启，并且用户输入为空，则展示所有条目
        if (this.filterable && this.inputText.length === 0) {
          for (let i = 0, len = this.evOptions.length; i < len; i++) {
            this.evOptions[i].visible = true
          }
        }
      }
    },
    handleBlurSelectInput() {
      this.isFocus = false
      // 如果filterable开启了，用户输入的值在options中不存在的话，清空
      if (this.filterable) {
        let matchedItem = null
        this.evOptions.forEach(item => {
          if (item.label === this.inputText) {
            matchedItem = item
          }
        })
        if (matchedItem) {
          this.$emit('input', matchedItem.value)
        } else {
          this.inputText = ''
          this.$emit('input', undefined)
        }
      }
    },
    handleSuffixClick(e) {
      if (this.showClearIcon) {
        this.$emit('input', undefined)
        this.inputText = ''
        this.$refs.selectInput.blur()
        this.visible = false
        e.stopPropagation()
      } else {
        this.focusSelectInput()
      }
    },
    handleTagClose(tag, e) {
      e.stopPropagation()
      // 去除当前tag
      this.selected.splice(this.selected.indexOf(tag), 1)
      let values = this.selected.map(item => item.value)
      // 取消点亮对应的option
      for (let i = 0, len = this.evOptions.length; i < len; i++) {
        if (this.evOptions[i].value === tag.value) {
          this.evOptions[i].selected = false
          break
        }
      }
      // 更新数据
      this.$emit('input', values)
    },
    /**
     * 聚焦到输入框
     */
    focusSelectInput() {
      this.$refs.selectInput.focus()
    },
    /**
     * 通过键盘的上下键(up/down)控制hover的位置
     */
    navigateOptions(direction) {
      if (!this.visible) {
        this.visible = true
        return
      }
      if (this.evOptions.length === 0) return
      if (!this.evOptionsAllDisabled && !this.evOptionsAllInVisiable) {
        // 上下切换
        if (direction === 'next') {
          this.evOptionHoverIndex++
          if (this.evOptionHoverIndex === this.evOptions.length) {
            this.evOptionHoverIndex = 0
          }
        } else if (direction === 'prev') {
          this.evOptionHoverIndex--
          if (this.evOptionHoverIndex < 0) {
            this.evOptionHoverIndex = this.evOptions.length - 1
          }
        }
        const option = this.evOptions[this.evOptionHoverIndex]
        // 如果遇到disabled或者不可见条目，跳过
        if (option.disabled || !option.visible) {
          this.navigateOptions(direction)
        }
        this.$nextTick(() => this.scrollToView())
      }
    },
    /**
     * 将hover的条目滚入可见区域
     */
    scrollToView() {
      const dropdown = this.$refs.dropdown
      const children = dropdown.children
      const dropdownTop = dropdown.scrollTop
      const dropdownStyle = window.getComputedStyle(dropdown)
      const dropdownHeight = parseFloat(dropdownStyle.height)
      let stepDistance = 0
      let offset = 0
      if (children && children.length) {
        stepDistance = parseFloat(window.getComputedStyle(dropdown.children[0]).height)
      }
      if (this.evOptionHoverIndex !== -1) {
        const indexOptionTop = stepDistance * (this.evOptionHoverIndex + 1)
        // 1 index在视窗之下 indexOptionTop - dropdownHeight + fix padding
        // 2 index在视窗之上 indexOptionTop - stepDistance + fix padding
        // 3 index在视窗之中 dropdownTop
        if (indexOptionTop - dropdownHeight - dropdownTop > 0) {
          offset = indexOptionTop - dropdownHeight + parseInt(dropdownStyle.paddingTop)
        } else if (dropdownTop - indexOptionTop >= 0) {
          offset = indexOptionTop - stepDistance + parseInt(dropdownStyle.paddingBottom)
        } else {
          offset = dropdownTop
        }
      }
      dropdown.scrollTop = offset
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
$select-height: 40px;

.sp-select {
  font-size: 14px;
  line-height: 0;
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0;
  &.is-disabled, &.is-disabled &-input-box input {
    background-color: $select-background-disabled;
    color: $select-input-border-color-disabled;
    cursor: not-allowed;
  }
  &-input-box {
    position: relative;
    width: 100%;
    min-height: $select-height;
    background-color: $select-background;
    background-image: none;
    border-radius: 4px;
    border: 1px solid $select-input-border-color;
    box-sizing: border-box;
    display: inline-block;
    color: $select-input-font-color;
    font-size: inherit;
    transition: $transition-border-base;
    overflow: hidden;
    .sp-select-input {
      width: 100%;
      -webkit-appearance: none;
      outline: none;
      border: none;
      height: $select-height - 2;
      line-height: $select-height - 2;
      padding: 0 30px 0 15px;
      box-sizing: border-box;
      border-radius: 4px;
      color: inherit;
      font-size: inherit;
      &-placeholder {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 0 30px 0 15px;
        margin: 0;
        line-height: $select-height - 2;
        color: $color-text-placeholder;
      }
    }
    &:hover {
      border-color: $select-input-border-color-hover;
    }
    .sp-tag-box {
      position: absolute;
      padding-bottom: 3px;
    }
    .sp-tag {
      margin-left: 3px;
      margin-top: 3px;
    }
  }
  &.cursorPoiner {
    cursor: pointer;
    input {
      cursor: pointer;
    }
  }
  &.isFocus &-input-box {
    border-color: $select-input-border-color-click;
  }
  &-suffix {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: $select-height - 2px;
    line-height: $select-height - 2px;
    text-align: center;
    user-select: none;
  }
  &-list {
    max-height: 274px;
    height: 100%;
    overflow: auto;
    margin: 5px 0;
    padding: 5px 0;
    border: 1px solid $select-dropdown-border-color;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    background-color: $select-dropdown-item-color;
    &-emptyText {
      text-align: center;
    }
  }
}
</style>
