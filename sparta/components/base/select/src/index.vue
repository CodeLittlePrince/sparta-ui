<template>
  <div
    ref="spSelect"
    class="sp-select"
    :class="{
      isFocus,
      cursorPoiner,
      'is--disabled': disabled,
      'is--readonly': readonly,
      'is-group-multiple': groupMultiple,
    }"
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
      <div v-else-if="groupMultiple">
        <sp-popup-tip
          ref="popupTip"
          :custom-class="customPopupTipClass"
          color="#0D1233"
          has-border
          placement="top"
          theme="white"
          width="auto"
          :show-popup-tip-when-slot="true"
        >
          <div class="sp-select__input-box__group-multi">
            <div
              ref="sp-tag-box"
              class="sp-tag-box"
              @click="focusSelectInput"
            >{{ groupMultiSelectInputText }}</div>
            <div
              v-show="showGroupMultiSelectNum"
              class="sp-select__input-box__num"
            >+{{ groupMultiSelectNum }}</div>
            <!-- 多选过滤搜索输入框 -->
            <input
              v-if="isGroupMultipleFilterable"
              id="filterInput"
              ref="filterInput"
              v-model="groupFilterValue"
              type="text"
              autocomplete="off"
              class="sp-select__input--filter"
              :class="{'has--selected': groupMultiSelectInputText }"
              @blur="handleBlurGroupMultipleFilterInput"
              @keydown.tab="visible = false"
              @input="handleInputGroupMultipleFilterInput"
              @keydown.esc.stop.prevent="visible = false"
              @compositionstart="handleComposition"
              @compositionupdate="handleComposition"
              @compositionend="handleComposition;"
            />
          </div>
          <template v-if="showGroupMultiPopupTip && !isFocus && groupMultipleSelected && groupMultipleSelected.length" slot="popup">
            <slot name="popupTipContent">{{ groupMultipleSelected.map(item => getGroupMultiTextByValue(item)).join('；') }}</slot>
          </template>
        </sp-popup-tip>
      </div>
   
      <!-- 非多选情况-->
      <!-- 前置元素 -->
      <div
        v-show="showPrepend"
        class="sp-select__prepend"
        @click.stop="handleSelfClick"
      >
        <slot name="prepend"></slot>
      </div>
      <p
        v-show="isIE && inputText === '' && !isOnComposition"
        class="sp-select__input-placeholder"
      >
        {{ helperText }}
      </p>
      <div
        v-if="centerSlotVisible"
        ref="center"
        class="sp-select__center"
        :class="centerSlotClass"
        tabindex="0"
        @click.stop="handleSelfClick"
        @keydown.down.prevent="navigateOptions('next')"
        @keydown.up.prevent="navigateOptions('prev')"
        @keydown.enter.prevent="handleInputEnter"
        @keydown.tab="visible = false"
        @keydown.esc.stop.prevent="visible = false"
        @focus.stop="isFocus = true"
        @blur.stop="isFocus = false"
      >
        <slot name="center"></slot>
      </div>
      <input
        v-show="selectInputShow"
        ref="selectInput"
        v-model="inputText"
        class="sp-select__input"
        :class="selectInputClass"
        :style="selectInputStyle"
        type="text"
        :placeholder="placeholderText"
        :readonly="_readonly"
        :disabled="disabled || isGroupMultipleFilterable"
        autocomplete="off"
        @input="handleInputSelectInput"
        @focus="handleSelfClick"
        @blur="handleBlurSelectInput"
        @keydown.down.prevent="navigateOptions('next')"
        @keydown.up.prevent="navigateOptions('prev')"
        @keydown.enter.prevent="handleInputEnter"
        @keydown.tab="visible = false"
        @keydown.esc.stop.prevent="visible = false"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
      >
      <div
        ref="focusHelper"
        class="sp-select__focus-helper"
        tabindex="1"
        @keydown.down.prevent="handleSelfClick"
        @keydown.up.prevent="handleSelfClick"
        @focus.stop="handleHelperFocus"
        @blur.stop="handleHelperBlur"
      ></div>
      <!-- 后缀icon -->
      <div
        ref="sp-select-suffix"
        class="sp-select__suffix"
        @click="handleSuffixClick($event)"
      >
        <i
          v-show="showClearIcon && !isMulti"
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
      :popper-scroll-bind-elem="popperScrollBindElem"
    >
      <transition name="sp-zoom-in-top">
        <ul
          v-show="visible"
          ref="dropdown"
          class="sp-select-list"
        >
          <template v-if="groupMultiple">
            <sp-checkbox-group v-model="groupMultipleSelected" @change="handleGroupMultipleSelectedChange">
              <slot></slot>
            </sp-checkbox-group>
          </template>
          <template v-else>
            <slot></slot>
          </template>
          <!-- 无数据情况 -->
          <li
            v-show="loading || !hasSpOptions || (hasSpOptions && spOptionsAllInVisible)"
            class="sp-option is--disabled sp-select-list-emptyText"
            @click.stop
          >{{ loading ? loadingText : emptyText }}</li>
        </ul>
      </transition>
    </sp-select-dropdown>
  </div>
</template>

<script>
import Emitter from 'sparta/common/js/mixins/emitter'
import SpSelectDropdown from './select-dropdown'
import { debounce } from 'sparta/common/js/utils/tool'
export default {
  name: 'SpSelect',

  components: {
    'sp-select-dropdown': SpSelectDropdown,
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
    height: {
      type: [String, Number],
      default: 'auto'
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
    remoteMethod: {
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
    groupMultiple: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    limitDropdownWidth: {
      type: Boolean,
      default: true
    },
    popperScrollBindElem: {},
    loading: { // 是否正在从远程获取数据
      type: Boolean,
      default: false
    },
    loadingText: { // 远程加载时显示的文字
      type: String,
      default: '加载中'
    },
    wait: { // 自定义搜索防抖等待时间
      type: [String, Number],
      default: 300 // ms
    },
    // 显示多选的的popup 默认不显示
    showGroupMultiPopupTip: {
      type: Boolean,
      default: false
    },
    // 自定义popup-tip的class
    customPopupTipClass: {
      type: String,
      default: ''
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
      spOptionGroups: [],
      evOptionHoverIndex: -1,
      selected: [], // 老的多选选中的值， 现在用不到了
      selectInputBoxHeight: this.height - 2 + 'px',
      currentValue: this.value,
      oldInputText: null,
      isOnComposition: false,
      singleSelected: '',
      needFilterMethod: false, // 是否应该调用filterMethod方法，用户主动选择的时候，虽然输入框的值变化了，但是不应再去过滤了
      needRemoteMethod: false, // 是否应该调用remoteMethod方法，用户主动选择的时候，虽然输入框的值变化了，但是不应再去过滤了
      groupMultipleSelected: this.value,
      groupMultiSelectInputText: '',
      selectInputVisible: false, // 控制selectInput是否显示
      groupFilterValue: '', // 多选过滤搜索输入框的值
    }
  },

  computed: {
    _readonly() {
      return !this.filterable || this.readonly
    },
    // 自定义内容center插槽的显示时机
    centerSlotVisible() {
      return (this.$slots.center && this.inputText && !this.isCustomFilter) || (this.useCenterSlotCustomFilter && !!this.value)
    },
    // 自定义内容center插槽的动态class
    centerSlotClass() {
      return {'sp-select__center--bg': this.useCenterSlotCustomFilter && this.selectInputVisible }
    },
    selectInputClass() {
      return { 'sp-selectInput__absolute': this.useCenterSlotCustomFilter && !!this.value && this.selectInputVisible, 'sp-selectInput__show': this.inputText || this.isOnComposition }
    },
    selectInputStyle() {
      return { height: this.selectInputBoxHeight, '--suffix-width': this.$refs['sp-select-suffix']?.clientWidth + 'px' }
    },
    spOptionsAllDisabled() {
      return this.spOptions.every(option => option.disabled)
    },
    spOptionsAllInVisible() {
      return this.spOptions.every(option => !option.visible)
    },
    groupMultiSelectInputTxtMapList() {
      let txtMap = [] // 为了保证顺序，所以用数组而不是map

      this.spOptionGroups.forEach(item => {
        txtMap.push({
          label: item.label,
          value: item.value,
        })
      })

      this.spOptions.forEach(item => {
        txtMap.push({
          label: item.label,
          value: item.value,
        })
      })

      return txtMap
    },
    isMulti() {
      return this.multiple || this.groupMultiple
    },
    // 显示清空icon
    showClearIcon() {
      return this.clearable && this.inputText !== '' && this.isHover && !this.isMulti && this.value
    },
    hasSpOptions() {
      return this.spOptions && this.spOptions.length
    },
    disableOperation() {
      return this.disabled || this.readonly
    },
    showPrepend() {
      return this.$slots.prepend && this.inputText && (
        !this.filterable || (this.filterable && !this.oldInputText && !this.visible)
      )
    },
    isIE() {
      return window.ActiveXObject || 'ActiveXObject' in window
    },
    helperText() {
      return this.oldInputText || this.placeholder
    },
    placeholderText() {
      // IE10和IE11上，如果有placeholder，input显示以后IE辣鸡浏览器会自动触发input事件
      if (this.isIE || (this.useCenterSlotCustomFilter && this.selectInputVisible && !!this.value)) {
        return ''
      }
      return this.helperText
    },
    isCustomFilter() { // 是否是自定义搜索
      return this.filterable && this.filterMethod && typeof this.filterMethod === 'function'
    },
    isCustomFilterForRemote() { // 是否是自定义远程搜索
      return this.filterable && this.remoteMethod && typeof this.remoteMethod === 'function'
    },
    groupMultiSelectNum() {
      let count = this.groupMultipleSelected.length - 1
      let parentCount = 0

      return count - parentCount
    },
    showGroupMultiSelectNum() {
      return 2 <= this.groupMultipleSelected.length
    },
    // 开启自定义内容搜索：指定了filter-method且使用了center插槽
    useCenterSlotCustomFilter() {
      return this.$slots.center && this.isCustomFilter
    },
    isGroupMultipleFilterable() {
      return this.groupMultiple && this.filterable
    },
    selectInputShow() {
      return !this.isGroupMultipleFilterable || (this.isGroupMultipleFilterable && !this.groupMultipleSelected?.length && !this.visible)
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
        this.singleSelected = ''
        if (this.currentValue !== '' && !this.groupMultiple) {
          this.$nextTick(() => this.scrollToView())
        }
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpSelectDropdown', 'updatePopper')
      } else {
        // 如果filterable开启了，用户输入的值在options中不存在的话，清空
        if (this.filterable) {
          // 清空
          if(this.isGroupMultipleFilterable) {
            this.groupFilterValue = '' //
            return
          }

          this.inputText = ''
          if (this.useCenterSlotCustomFilter) {
            this.debounceFilterMethod?.()
            this.broadcast('SpSelectDropdown', 'destroyPopper')
            return
          }
          if (this.oldInputText) {
            this.inputText = this.oldInputText
          }
          if (this.singleSelected) {
            this.inputText = this.singleSelected
          }
          if (this.inputText == '') {
            this.clearValue()
          }
        }
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
    groupMultipleSelected(newVal, oldVal) {
      // 新老值如果一模一样就没必要发现变更了
      if (
        newVal.length === oldVal.length &&
        newVal.every(newItem => oldVal.every( oldItem => oldItem === newItem ))
      ) {
        return
      }

      if (newVal && !this.isGroupMultipleFilterable) {
        this.inputText = newVal.length ? ' ' : ''
      }
      
      if(this.isGroupMultipleFilterable) {
        this.groupFilterValue = ''
      }

      // 只留第一个元素的文案
      if (1 <= newVal?.length) {
        this.$nextTick(() => {
          this.groupMultiSelectInputText = this.getTextFromMapList(newVal)
        })
      } else {
        this.groupMultiSelectInputText = ''
      }
      // 根据新老数组的长度可知，是新增还是减少
      if (oldVal.length < newVal.length) {
        const extraValus = newVal.filter(item => !oldVal.includes(item))
        
        extraValus.forEach(value => {
          if (this.currentValue.indexOf(value) === -1) {
            this.currentValue.push(value)
          }
        })

        this.$emit('change', this.currentValue)
      } else if (oldVal.length > newVal.length) {
        const extraValus = oldVal.filter(item => !newVal.includes(item))

        extraValus.forEach(value => {
          const index = this.currentValue.findIndex(item => item === value)

          if (-1 < index) { // 可能新值是外面直接赋值的，这时候就可能会出现index为-1的情况，而splice(-1, 1)会把第一个元素去掉
            this.currentValue.splice(index, 1)
          }
        })

        this.$emit('change', this.currentValue)
      }
    },
    inputText() {
      // 如果filterable开启，并且focus，根据用户输入过滤（搜索）相关的条目
      if (this.filterable) {
        this.filterOptionsVisible()
        // 为了每次弹出dropdown，都会根据处的环境做适应
        this.broadcast('SpSelectDropdown', 'updatePopper')
      }
    },
    spOptions() {
      // 下拉选项变化
      let currentValue = ''
      if ((this.isCustomFilter || this.isCustomFilterForRemote) && this.inputText && this.inputText != ' ') {
        currentValue = this.inputText
      } else {
        currentValue = this.value
      }
      this.setCurrentValue(currentValue, true)
    },
    isFocus(val) {
      if(this.isGroupMultipleFilterable) {
        if(val) {
          this.$nextTick(() => {
            if(this.$refs.popupTip) {
              this.$refs.popupTip.visible = false
            }
          })
        }
        return
      }

      if (this.filterable) {
        if (!val) {
          this.oldInputText = null
        }
      }
    },
    loading(val) {
      if (val) {
        this.oldInputText = null
      }
      this.broadcast('SpSelectDropdown', 'updatePopper')
    },
    isCustomFilter(val) {
      if (val) {
        this.getDebounceFilterMethod()
      }
    },
    isCustomFilterForRemote(val) {
      if (val) {
        this.getDebounceRemoteMethod()
      }
    },
    groupFilterValue() { // 多选过滤搜索输入框的值
      if(this.isGroupMultipleFilterable) {
        this.filterOptionsVisible()
      }
    }
  },
  
  mounted() {
    if (this.isCustomFilter) {
      this.getDebounceFilterMethod()
    } // 自定义搜索防抖
    if (this.isCustomFilterForRemote) {
      this.getDebounceRemoteMethod()
    }
    this.setCurrentValue(this.value)
    document.addEventListener('click', this.handleOtherAreaClick)
  },
  
  beforeDestroy() {
    this.debounceFilterMethod?.cancel()
    this.debounceRemoteMethod?.cancel()
    document.removeEventListener('click', this.handleOtherAreaClick)
  },

  methods: {
    filterOptionsVisible() {
      if (this.isCustomFilter) {
        if (this.needFilterMethod) this.debounceFilterMethod?.()
        return
      }
      if (this.isCustomFilterForRemote) {
        if (this.needRemoteMethod) this.debounceRemoteMethod?.()
        return
      }
      //
      const filterKeyword = this.isGroupMultipleFilterable ? this.groupFilterValue : this.inputText
      for (let i = 0, len = this.spOptions.length; i < len; i++) {
        if (this.spOptions[i].label.indexOf(filterKeyword) !== -1) {
          this.spOptions[i].visible = true
        } else {
          this.spOptions[i].visible = false
        }
      }
    },
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
        this.$nextTick(() => {
          this.broadcast('SpSelectDropdown', 'updatePopper')
        })
      })
    },

    setCurrentValue(val, noTrigger) {
      this.currentValue = val

      if (this.groupMultiple) {
        this.groupMultipleSelected = val
        if(this.isGroupMultipleFilterable) {
          if(!noTrigger) {
            this.setGroupMultiSelectInputText(val)
          }
          return
        }
        // 设置输入框显示文案
        if ((!val) || (val && val.length === 0)) {
          // 没有值则置空
          this.inputText = ''
        } else {
          this.setGroupMultiSelectInputText(val)
        }
      } else {
        // groupMultiple模式checkbox本身已经会触发了
        if (this.validateEvent && !noTrigger) {
          this.dispatch('SpFormItem', 'sp.form.change', '')
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
          }
        }

        if (this.multiple) {
          this.selected = []
          // 多选情况
          for (let i = 0, len = this.spOptions.length; i < len; i++) {
            for (let j = 0, len = val.length; j < len; j++) {
              if (this.spOptions[i].value === val[j]) {
                this.selected.push({ label: this.spOptions[i].label, value: this.spOptions[i].value })
                this.spOptions[i].selected = true
              }
            }
          }
          this.updateTagboxHeight()
        } else {
          // 单选情况
          for (let i = 0, len = this.spOptions.length; i < len; i++) {
            if (this.spOptions[i].value === val) {
              if (this.useCenterSlotCustomFilter) {
                this.inputText = ''
              } else {
                this.inputText = this.spOptions[i].label
              }
              this.evOptionHoverIndex = i
              break
            }
          }
        }
      }
    },
    setGroupMultiSelectInputText(val) {
      this.$nextTick(() => { // 这里因为groupMultiSelectInputTxtMapList中获取optionGroup和option的时候元素还未渲染完，所以用nextTick
        // 有值则需要显示对应文案
        this.groupMultiSelectInputText = this.getTextFromMapList(val)
        // 是否全选要点亮
        this.broadcast('SpOptionGroup', 'lightGroupCheckbox')
      })
    },
    /**
     * 进行防抖处理
     */
    getDebounceFilterMethod() {
      this.debounceFilterMethod = debounce(() => {
        this.filterMethod?.( this.isGroupMultipleFilterable ? this.groupFilterValue : this.inputText)
      }, this.wait, { leading: true })
    },
    getDebounceRemoteMethod() {
      this.debounceRemoteMethod = debounce(() => { this.remoteMethod?.(this.inputText) }, this.wait, { leading: true })
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
        this.visible = (this.isCustomFilter || this.isCustomFilterForRemote) && !(this.inputText || this.oldInputText) && !this.spOptions.length ? false : true // 自定义搜索时，没有输入任何文字时，不展示拉下框
        
        this.isFocus = true
        if(!this.isGroupMultipleFilterable) {
          this.toggleSelectInputShow(true)
          this.$nextTick(() => {
            this.focusSelectInput()
          })
          this.storeInputTextWhenFilterable()
        }
      }
    },
    /**
     * 切换文本输入框显示
     */
    toggleSelectInputShow(show) {
      if (this.useCenterSlotCustomFilter) {
        this.selectInputVisible = show
        if (show && !!this.value) {
          this.selectInputBoxHeight = '100%'
        } else {
          this.selectInputBoxHeight = this.height - 2 + 'px'
        }
      }
    },
    /**
     * 点击其他区域触发事件
     */
    handleOtherAreaClick(e) {
      if (!this.$el.contains(e.target)) {
        this.isFocus = false
        this.visible = false
        this.toggleSelectInputShow(false)
      }
    },
    /**
     * 通过键盘的Enter键选定条目
     */
    handleInputEnter() {
      if (this.filterable && this.spOptionsAllInVisible || this.groupMultiple) {
        return
      }
      const hoverItem = this.spOptions[this.evOptionHoverIndex]
      if (hoverItem && this.isMulti) {
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
        if (this.filterable) {
          this.singleSelected = hoverItem.label
          this.oldInputText = hoverItem.label
        }

        this.$emit('input', hoverItem.value)
        this.$emit('change', hoverItem.value)
        this.needFilterMethod = false
        this.needRemoteMethod = false
        this.inputText = hoverItem.label
        this.visible = false
      }
      this.$refs.focusHelper.focus()
    },

    handleInputSelectInput() {
      if (!this.readonly) { // 解决IE9上鬼畜bug
        this.visible = true
      }
      this.needFilterMethod = true
      this.needRemoteMethod = true
    },

    handleHelperFocus() {
      this.isFocus = true
      
      if(this.isGroupMultipleFilterable) return

      if (this.filterable) {
        this.oldInputText = null
      }
    },

    handleHelperBlur() {
      this.isFocus = false
    },

    handleComposition(event) {
      if (event.type === 'compositionend') {
        this.isOnComposition = false
      } else {
        const text = event.target.value
        const lastCharacter = text[text.length - 1] || ''
        const koreanReg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi
        const isKorean = koreanReg.test(lastCharacter)
        this.isOnComposition = !isKorean
      }
    },

    handleBlurSelectInput() {
      if (!this.visible) {
        this.isFocus = false
      }
      this.toggleSelectInputShow(false)
      // 触发form的校验
      if (this.validateEvent && !this.isFocus) {
        this.dispatch('SpFormItem', 'sp.form.blur', [this.currentValue])
      }
    },

    handleSuffixClick(e) {
      if (this.showClearIcon) {
        this.needFilterMethod = true
        this.needRemoteMethod = true
        this.clearValue()
        this.$refs.selectInput.blur()
        this.visible = false
        e.stopPropagation()
      } else {
        this.focusSelectInput()
      }
    },

    clearValue() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.inputText = ''
     
      if(this.isGroupMultipleFilterable) {
        this.groupFilterValue = ''
        return
      }

      if (this.filterable) {
        this.oldInputText = null
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
      this.$emit('change', values)
    },

    hasLabelInOptions() {
      return this.spOptions.some(item => item.label === this.inputText)
    },
    /**
     * 聚焦到输入框
     */
    focusSelectInput() {
      this.$refs.selectInput.focus()
    },
    storeInputTextWhenFilterable() {
      if(this.isGroupMultipleFilterable) {
        return
      }

      if (this.filterable && this.inputText && this.hasLabelInOptions()) {
        this.oldInputText = this.inputText
        this.inputText = ''
      }
    },
    /**
     * 通过键盘的上下键(up/down)控制hover的位置
     */
    navigateOptions(direction) {
      if (this.readonly || this.groupMultiple) return
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
    },

    getTextFromMapList(valueList) {
  
      // txt需要先把valueList参考mapList做排序，最后取第一个元素
      let txt = ''
      let txtIndex = -1
      const mapList = this.groupMultiSelectInputTxtMapList

      valueList?.forEach(value => {
        const index = mapList.findIndex(item => item.value === value)

        if (index <= txtIndex || txtIndex === -1) {
          txt = mapList.find(item => item.value === value)?.label
          txtIndex = index
        }
      })

      return txt
    },

    getGroupMultiTextByValue(val) {
      return this.groupMultiSelectInputTxtMapList?.find(item => item.value === val)?.label || val
    },

    /**
     * 多选过滤输入框失焦
     */
    handleBlurGroupMultipleFilterInput() {
      if(this.visible) return

      this.isFocus = false
      this.groupFilterValue = ''
    },

    /**
     * 多选过滤输入框值变化
     */
    handleInputGroupMultipleFilterInput() {
      this.needFilterMethod = true
    },

    /**
     * 组多选值变化
     */
    handleGroupMultipleSelectedChange() {
      this.groupFilterValue = ''
      this.$nextTick(() => {
        this.$refs.filterInput?.focus?.()
      })
    },
  }
}
</script>

<style lang="scss">
@import "sparta/common/scss/base/mixin";

.sp-select {
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  font-size: 0;
  line-height: 1;

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
    color: $select-prepend-color;
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
    border-radius: $input-border-radius;
    border: 1px solid $select-input-border-color;
    box-sizing: border-box;
    display: inline-table;
    color: $select-input-font-color;
    transition: $transition-border-base;
    overflow: hidden;

    .sp-select__input {
      background-color: white;
      &-placeholder {
        position: absolute;
        left: 0;
        top: 0;
        right: 45px;
        bottom: 0;
        padding: 0 0 0 10px;
        z-index: 10;
        margin: 0;
        line-height: $select-height - 2;
        color: $color-text-placeholder;
        overflow: hidden;
      }
    }

    .sp-select__input,
    .sp-select__center {
      width: 100%;
      vertical-align: middle;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: table-cell;
      appearance: none;
      outline: none;
      border: none;
      height: $select-height - 2;
      line-height: $select-height - 2;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 0;
      color: inherit;
    }

    .sp-popup-tip {
      display: block;
    }

    .sp-select__input--filter {
      background-color: transparent;
      height: $input-height - 2;
      min-width: 10px;
      padding-right: 46px;
      border: none;
      outline: none;
      box-sizing: border-box;
      &.has--selected {
        padding-left: 10px;
      }
    }

    &:hover {
      border-color: $select-input-border-color-hover;
    }

    .sp-tag-box {
      padding-bottom: 3px;
      box-sizing: border-box;
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

    &__group-multi {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      right: 33px;
      bottom: 0;
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

  &__center--bg {
    opacity: 0.2;
    color: #012257;
  }

  &__center ~ .sp-selectInput__absolute {
    position: absolute;
    width: calc(100% - var(--suffix-width, 0px));
    left: 0;
    z-index: 1;
    display: block;
    background-color: transparent;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .sp-selectInput__show {
    background-color: #fff;
  }

  &.isFocus &__input-box {
    border-color: $select-input-border-color-focus;
    box-shadow: $select-input-box-shadow-focus;
  }

  &__focus-helper {
    outline: none;
  }

  &__suffix {
    text-align: center;
    user-select: none;
    display: table-cell;
    width: 1px;
    border-left: $select-suffix-border-left;
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
    color: $select-suffix-color-focus;
    border-color: $select-suffix-background-color-focus;
  }

  .is--disabled &__suffix {
    color: #c7cbd1;
    background-color: $select-background-disabled;
  }
  .is--readonly &__suffix {
    background-color: $select-background-readonly;
  }

  &.is-group-multiple &__input-box {
    .sp-tag-box {
      @include ellipsis;
      right: 85px;
      line-height: $input-height - 2;
      padding-left: 10px;
      padding-bottom: 0;
    }

    .sp-select__input-box__num {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      min-width: 26px;
      height: 18px;
      border-radius: 2px;
      background-color: #eaeef2;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      color: #97a2b5;
    }
  }

  &-list {
    max-height: 274px;
    height: 100%;
    overflow: auto;
    margin: 4px 0;
    padding: 5px 0;
    border: 1px solid $select-dropdown-border-color;
    border-radius: $input-border-radius;
    box-shadow: $float-box-shadow-box;
    box-sizing: border-box;
    background-color: $select-dropdown-item-background;

    &-emptyText {
      text-align: center;
    }
  }
}
</style>
