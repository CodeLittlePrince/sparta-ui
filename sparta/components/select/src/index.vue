<template>
  <div
    class="sp-select"
    :class="{ isFocus, cursorPoiner, 'is--disabled': disabled, 'is--readonly': readonly }"
    :style="`width: ${width}px;`"
    @click="handleSelfClick"
  >
    <div
      ref="sp-select-input-box"
      class="sp-select__input-box"
      @mouseover="isHover = true"
      @mouseout="isHover = false"
    >
      <!-- 多选情况 -->
      <template v-if="multiple">
        <div
          ref="sp-tag-box"
          class="sp-tag-box"
          @click="focusSelectInput"
        >
          <transition-group
            name="sp-zoom-in-center"
            @after-leave="updateTagboxHeight"
          >
            <sp-tag
              v-for="tag in selected"
              :key="tag.value"
              closable
              @close="handleTagClose(tag, $event)"
            >{{ tag.label }}</sp-tag>
          </transition-group>
        </div>
      </template>
      <!-- 非多选情况-->
      <!-- 前置元素 -->
      <div
        v-if="$slots.prepend"
        class="sp-select__prepend"
      >
        <slot name="prepend"></slot>
      </div>
      <p
        v-show="inputText === ''"
        class="sp-select__input-placeholder"
        @click="focusSelectInput"
      >
        {{ placeholder }}
      </p>
      <div v-if="$slots.center" class="sp-select__center" @click="handleFocusSelectInput">
        <slot name="center"></slot>
      </div>
      <input
        ref="selectInput"
        v-model="inputText"
        class="sp-select__input"
        :style="{ height: selectInputBoxHeight }"
        type="text"
        :readonly="_readonly"
        :disabled="disabled"
        autocomplete="off"
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
        class="sp-select__suffix"
        @click="handleSuffixClick($event)"
      >
        <i
          v-show="showClearIcon && !multiple"
          class="sp-icon-close-bold"
        />
        <i
          v-show="!showClearIcon"
          class="sp-icon-arrow-down-bold"
          :class="{'rotate': visible}"
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
          v-show="visible"
          ref="dropdown"
          class="sp-select-list"
        >
          <slot></slot>
          <!-- 无数据情况 -->
          <li
            v-show="!hasSpOptions || (hasSpOptions && spOptionsAllInVisible)"
            class="sp-option is--disabled sp-select-list-emptyText"
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

export default {
  name: 'SpSelect',

  components: {
    'sp-select-dropdown': SpSelectDropdown
  },

  mixins: [Emitter],

  provide() {
    return {
      'spSelect': this
    }
  },

  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    width:  {
      type: [String, Number],
      default: 240
    },
    height: {
      type: [String, Number],
      default: 36
    },
    value: {
      type: [Array, Number, String, Boolean, Object],
      default: ''
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
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      visible: false,
      isFocus: false,
      isHover: false,
      canNotFocus: true,
      cursorPoiner: !this.disabled && !this.readonly,
      inputText: this.value && this.value.length ? ' ' : '',
      spOptions: [],
      evOptionHoverIndex: -1,
      selected: [],
      selectInputBoxHeight: this.height - 2 + 'px',
      currentValue: this.value
    }
  },

  computed: {
    _readonly() {
      return ((!this.isFocus || this.canNotFocus) && !this.filterable) || this.readonly
    },
    spOptionsAllDisabled() {
      return this.spOptions.every(option => option.disabled)
    },
    spOptionsAllInVisible() {
      return this.spOptions.every(option => !option.visible)
    },
    showClearIcon() {
      return this.clearable && this.inputText !== '' && this.isHover && !this.multiple
    },
    hasSpOptions() {
      return this.spOptions && this.spOptions.length
    },
    disableOperation() {
      return this.disabled || this.readonly
    }
  },

  watch: {
    value(val) {
      this.setCurrentValue(val)
    },
    evOptionHoverIndex(val) {
      this.spOptions.forEach((option, index) => {
        option.hover = val === index
      })
    },
    // 监控下拉是否显示
    visible(val) {
      if (val) {
        if (this.currentValue !== '') {
          this.$nextTick(() => this.scrollToView())
        }
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpSelectDropdown', 'updatePopper')
      } else {
        this.broadcast('SpSelectDropdown', 'destroyPopper')
      }
      // 触发form的校验
      if (this.validateEvent && !val) {
        this.dispatch('SpFormItem', 'sp.form.change', [this.currentValue])
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
        const hasSameLabel = this.spOptions.some(item => {
          return item.label === val
        })
        for (let i = 0, len = this.spOptions.length; i < len; i++) {
          if (hasSameLabel || (this.spOptions[i].label.indexOf(val) !== -1)) {
            this.spOptions[i].visible = true
          } else {
            this.spOptions[i].visible = false
          }
        }
      }
    }
  },
  
  mounted() {
    if (this.disableOperation) {
      return
    }
    this.setCurrentValue(this.value)
    document.addEventListener('click', this.handleOtherAreaClick)
  },
  
  beforeDestroy() {
    if (this.disableOperation) {
      return
    }
    document.removeEventListener('click', this.handleOtherAreaClick)
  },

  methods: {
    updateTagboxHeight() {
      this.$nextTick(() => {
        // 更新容器的高度
        const style = window.getComputedStyle(this.$refs['sp-tag-box'])
        let height = parseFloat(style.height) + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
        if (height.toString() === 'NaN') { // 防止弹窗情况，父级消失导致拿不到高度
          height = 0
        }
        if (height < this.height - 2) {
          height = this.height - 2
        }
        this.selectInputBoxHeight = `${height}px`
        this.$refs['sp-select-suffix'].style.height = height + 'px'
        this.$refs['sp-select-suffix'].style.lineHeight = height + 'px'
        this.$nextTick(() => {
          this.broadcast('SpSelectDropdown', 'updatePopper')
        })
      })
    },
    
    setCurrentValue(val) {
      this.currentValue = val
      if (this.validateEvent) {
        this.dispatch('SpFormItem', 'sp.form.change', [val])
      }
      // 设置输入框显示文案
      if ((!val) || (this.multiple && val && val.length === 0)) {
        // 没有值则置空
        this.inputText = ''
        if (this.multiple) {
          this.selected = []
          this.spOptions.map(item => {
            return item.selected = false
          })
          this.updateTagboxHeight()
        }
      } else if (this.multiple) {
        this.selected = []
        // 多选情况
        for (let i = 0, len = this.spOptions.length; i < len; i++) {
          for (let j = 0, len = val.length; j < len; j++) {
            if (this.spOptions[i].value === val[j]) {
              this.selected.push({ label: this.spOptions[i].label, value: this.spOptions[i].value })
              this.spOptions[i].selected = true
              this.updateTagboxHeight()
            }
          }
        }
      } else {
        // 单选情况
        for (let i = 0, len = this.spOptions.length; i < len; i++) {
          if (this.spOptions[i].value === val) {
            this.inputText = this.spOptions[i].label
            this.evOptionHoverIndex = i
            break
          }
        }
      }
    },
    /**
     * 点击自身处理
     */
    handleSelfClick() {
      if (!this.disableOperation) {
        // 原本可以在点击自身的时候切换下拉显示隐藏状态
        // 但是IE9上聚焦就会触发input事件
        // input又会影响下拉显示状态，input事件又在click前触发
        // 导致显示Bug，因此，暂时降低体验处理
        this.visible = true
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
    },
    /**
     * 通过键盘的Enter键选定条目
     */
    handleInputEnter() {
      if (this.filterable && this.spOptionsAllInVisible) {
        return
      }
      const hoverItem = this.spOptions[this.evOptionHoverIndex]
      if (hoverItem && this.multiple) {
        const valueIndex = this.currentValue.indexOf(hoverItem.value)
        // 将选择的值加入tag
        if (valueIndex !== -1) {
          this.selected.splice(valueIndex, 1)
          this.currentValue.splice(valueIndex, 1)
          this.spOptions[this.evOptionHoverIndex].selected = false
        } else {
          this.selected.push({ label: hoverItem.label, value: hoverItem.value })
          this.currentValue.push(hoverItem.value)
          this.spOptions[this.evOptionHoverIndex].selected = true
        }
      } else if (hoverItem) {
        this.$emit('input', hoverItem.value)
        this.inputText = hoverItem.label
        this.visible = false
      }
      this.focusSelectInput()
    },

    handleInputSelectInput() {
      if (
        this.inputText !== '' &&
        !this.readonly // 解决IE9上鬼畜bug
      ) {
        this.visible = true
      }
    },

    handleFocusSelectInput() {
      if (!this.disableOperation) {
        this.isFocus = true
        // 如果filterable开启，并且用户输入为空，则展示所有条目
        if (this.filterable && this.inputText.length === 0) {
          for (let i = 0, len = this.spOptions.length; i < len; i++) {
            this.spOptions[i].visible = true
          }
        }
      }
    },

    handleBlurSelectInput() {
      if (!this.visible) {
        this.isFocus = false
      }
      // 如果filterable开启了，用户输入的值在options中不存在的话，清空
      if (this.filterable) {
        let matchedItem = null
        this.spOptions.forEach(item => {
          if (item.label === this.inputText) {
            matchedItem = item
          }
        })
        if (matchedItem) {
          this.$emit('input', matchedItem.value)
        } else {
          this.inputText = ''
          this.$emit('input', '')
        }
      }
      // 触发form的校验
      if (this.validateEvent && !this.isFocus) {
        this.dispatch('SpFormItem', 'sp.form.blur', [this.currentValue])
      }
    },

    handleSuffixClick(e) {
      if (this.showClearIcon) {
        this.$emit('input', '')
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
      for (let i = 0, len = this.spOptions.length; i < len; i++) {
        if (this.spOptions[i].value === tag.value) {
          this.spOptions[i].selected = false
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
      if(this.$slots.center) {
        this.handleFocusSelectInput()
      } else {
        this.$refs.selectInput.focus()
      }
    },
    /**
     * 通过键盘的上下键(up/down)控制hover的位置
     */
    navigateOptions(direction) {
      if (!this.visible) {
        this.visible = true
        return
      }
      if (this.spOptions.length === 0) return
      if (!this.spOptionsAllDisabled && !this.spOptionsAllInVisible) {
        // 上下切换
        if (direction === 'next') {
          this.evOptionHoverIndex++
          if (this.evOptionHoverIndex === this.spOptions.length) {
            this.evOptionHoverIndex = 0
          }
        } else if (direction === 'prev') {
          this.evOptionHoverIndex--
          if (this.evOptionHoverIndex < 0) {
            this.evOptionHoverIndex = this.spOptions.length - 1
          }
        }
        const option = this.spOptions[this.evOptionHoverIndex]
        // 如果遇到disabled或者不可见条目，跳过
        if (option.disabled || !option.visible) {
          this.navigateOptions(direction)
        }
        this.$nextTick(() => this.scrollToView())
      }
    },
    /**
     * 将点亮的条目滚入可见区域
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
        } else if (dropdownTop - indexOptionTop + stepDistance >= 0) {
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

.sp-select {
  font-size: 0;
  position: relative;
  display: block;
  margin: 0;
  padding: 0;

  &.is--disabled, &.is--disabled &__input-box {
    cursor: not-allowed;
    .sp-select__prepend, input, .sp-select__center {
      background-color: $select-background-disabled;
      color: $select-input-border-color-disabled;
    }
  }
  &.is--readonly, &.is--readonly &__input-box {
    .sp-select__prepend, input, .sp-select__center {
      background-color: $select-background-readonly;
      color: $color-text-regular;
    }
  }
  &.is--disabled &__input-box, &.is--readonly &__input-box {
    &:hover {
      border-color: $select-input-border-color;
    }
  }

  &__prepend {
    display: table-cell;
    text-align: center;
    width: 1px;
    vertical-align: middle;
    user-select: none;
    padding-left: 10px;
    i {
      font-size: 14px;
      display: inline-block;
    }
  }

  &__input-box {
    font-size: 14px;
    position: relative;
    border-collapse: separate;
    vertical-align: baseline;
    line-height: normal;
    border-spacing: 0;
    width: 100%;
    min-height: $select-height;
    background-color: $select-background;
    background-image: none;
    border-radius: 4px;
    border: 1px solid $select-input-border-color;
    box-sizing: border-box;
    display: inline-table;
    color: $select-input-font-color;
    transition: $transition-border-base;
    overflow: hidden;

    .sp-select__input {
      &-placeholder {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 0 45px 0 10px;
        z-index: 10;
        margin: 0;
        line-height: $select-height - 2;
        color: $color-text-placeholder;
      }
    }

    .sp-select__input, .sp-select__center {
      width: 100%;
      vertical-align: middle;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: table-cell;
      -webkit-appearance: none;
      outline: none;
      border: none;
      height: $select-height - 2;
      line-height: $select-height - 2;
      padding: 0 10px 0 10px;
      box-sizing: border-box;
      border-radius: 4px;
      color: inherit;
      font-size: inherit;
    }

    &:hover {
      border-color: $select-input-border-color-hover;
    }

    .sp-tag-box {
      position: absolute;
      padding-bottom: 3px;
      left: 0;
      right: 28px;
    }

    .sp-tag {
      height: 28px;
      line-height: 28px;
      margin-left: 3px;
      margin-top: 3px;
    }

    .sp-icon-arrow-down-bold .rotate {
      transition: $transition-all;
      transform: rotate(180deg);
    }
  }

  &.cursorPoiner {
    cursor: pointer;
    input {
      cursor: pointer;
    }
  }

  &__center ~ &__input {
    display: none;
  }

  &.isFocus &__input-box {
    border-color: $select-input-border-color-focus;
  }

  &__suffix {
    text-align: center;
    user-select: none;
    display: table-cell;
    width: 1px;
    border-left: 1px solid $border-color-base;
    background-color: $select-suffix-background-color;
    color: $color-text-tip;
    vertical-align: middle;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0;

    i {
      font-size: 12px;
    }
  }

  &.isFocus &__suffix {
    background-color: $select-suffix-background-color-focus;
    color: #fff;
    border-color: $select-suffix-background-color-focus;
  }

  .is--disabled &__suffix {
    color: #c7cbd1;
  }

  &-list {
    max-height: 274px;
    height: 100%;
    overflow: auto;
    margin: 4px 0;
    padding: 5px 0;
    border: 1px solid $select-dropdown-border-color;
    border-radius: 4px;
    box-shadow: $float-box-shadow-box;
    box-sizing: border-box;
    background-color: $select-dropdown-item-background;

    &-emptyText {
      text-align: center;
    }
  }
}
</style>
