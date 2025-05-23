<template>
  <div
    ref="reference"
    v-clickoutside="() => toggleDropDownVisible(false)"
    :class="[
      'sp-cascader',
      realSize && `sp-cascader--${realSize}`,
      { 'is-disabled': isDisabled }
    ]"
    @mouseenter="inputHover = true"
    @mouseleave="inputHover = false"
    @click="() => toggleDropDownVisible(readonly ? undefined : true)"
    @keydown="handleKeyDown"
  >
    <sp-input
      v-if="multiple"
      ref="input"
      v-model="presentText"
      :size="realSize"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="isDisabled"
      :validate-event="false"
      :class="{ 'is-focus': dropDownVisible }"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    >
      <template slot="suffix">
        <i
          v-if="clearBtnVisible"
          key="clear"
          class="sp-input__icon sp-icon-close"
          @click.stop="handleClear"
        ></i>
        <i
          v-else
          key="arrow-down"
          :class="[
            'sp-input__icon',
            'sp-icon-arrow-down-bold',
            dropDownVisible && 'is-reverse'
          ]"
          @click.stop="toggleDropDownVisible()"
        ></i>
      </template>
    </sp-input>
    <sp-input
      v-else
      ref="input"
      v-model="inputValue"
      :size="realSize"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="isDisabled"
      :validate-event="false"
      :class="{ 'is-focus': dropDownVisible }"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    >
      <template slot="suffix">
        <i
          v-if="clearBtnVisible"
          key="clear"
          class="sp-input__icon sp-icon-close"
          @click.stop="handleClear"
        ></i>
        <i
          v-else
          key="arrow-down"
          :class="[
            'sp-input__icon',
            'sp-icon-arrow-down-bold',
            dropDownVisible && 'is-reverse'
          ]"
          @click.stop="toggleDropDownVisible()"
        ></i>
      </template>
    </sp-input>

    <div v-if="multiple" class="sp-cascader__tags">
      <sp-tag
        v-for="tag in presentTags"
        :key="tag.key"
        type="info"
        :size="tagSize"
        :hit="tag.hitState"
        :closable="tag.closable"
        disable-transitions
        @close="deleteTag(tag)"
      >
        <span>{{ tag.text }}</span>
      </sp-tag>
      <input
        v-if="filterable && !isDisabled"
        v-model.trim="inputValue"
        type="text"
        class="sp-cascader__search-input"
        :placeholder="presentTags.length ? '' : placeholder"
        @input="e => handleInput(inputValue, e)"
        @click.stop="toggleDropDownVisible(true)"
        @keydown.delete="handleDelete"
      >
    </div>

    <transition name="sp-zoom-in-top" @after-leave="handleDropdownLeave">
      <div
        v-show="dropDownVisible"
        ref="popper"
        :class="['sp-popper', 'sp-cascader__dropdown', popperClass]"
      >
        <sp-cascader-panel
          v-show="!filtering"
          ref="panel"
          v-model="checkedValue"
          :options="options"
          :props="config"
          :border="false"
          :render-label="$scopedSlots.default"
          @expand-change="handleExpandChange"
          @close="toggleDropDownVisible(false)"
        ></sp-cascader-panel>
        <sp-scrollbar
          v-if="filterable"
          v-show="filtering"
          ref="suggestionPanel"
          tag="ul"
          class="sp-cascader__suggestion-panel"
          view-class="sp-cascader__suggestion-list"
          @keydown.native="handleSuggestionKeyDown"
        >
          <template v-if="suggestions.length">
            <li
              v-for="(item, index) in suggestions"
              :key="item.uid"
              :class="[
                'sp-cascader__suggestion-item',
                item.checked && 'is-checked'
              ]"
              :tabindex="-1"
              @click="handleSuggestionClick(index)"
            >
              <span>{{ item.text }}</span>
              <i v-if="item.checked" class="sp-icon-check"></i>
            </li>
          </template>
          <slot v-else name="empty">
            <li class="sp-cascader__empty-text">无匹配数据</li>
          </slot>
        </sp-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script>
import Popper from 'sparta/common/js/mixins/vue-popper'
import Clickoutside from 'sparta/common/js/utils/clickoutside'
import Emitter from 'sparta/common/js/mixins/emitter'
import SpInput from 'base/input'
import SpTag from 'base/tag'
import SpScrollbar from 'base/scrollbar'
import SpCascaderPanel from 'base/cascader-panel'
// import AriaUtils from 'element-ui/src/utils/aria-utils';
import { isEqual, isEmpty, kebabCase, debounce } from 'sparta/common/js/utils/tool'
import { isUndefined, isFunction, isDefined } from 'sparta/common/js/utils/types'
import { addResizeListener, removeResizeListener } from 'sparta/common/js/utils/resize-event'
// import debounce from 'throttle-debounce/debounce';

const KeyCode = {
  tab: 9,
  enter: 13,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  esc: 27
}
const MigratingProps = {
  expandTrigger: {
    newProp: 'expandTrigger',
    type: String
  },
  changeOnSelect: {
    newProp: 'checkStrictly',
    type: Boolean
  },
  hoverThreshold: {
    newProp: 'hoverThreshold',
    type: Number
  }
}

const PopperMixin = {
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    appendToBody: Popper.props.appendToBody,
    visibleArrow: {
      type: Boolean,
      default: true
    },
    arrowOffset: Popper.props.arrowOffset,
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    popperOptions: Popper.props.popperOptions,
    transformOrigin: Popper.props.transformOrigin
  },
  methods: Popper.methods,
  data: Popper.data,
  created: Popper.created,
  beforeDestroy: Popper.beforeDestroy
}

const InputSizeMap = {
  medium: 36,
  small: 32,
  mini: 28
}

export default {
  name: 'SpCascader',

  directives: { Clickoutside },

  components: {
    SpInput,
    SpTag,
    SpScrollbar,
    SpCascaderPanel
  },

  mixins: [PopperMixin, Emitter],

  inject: {
    spForm: {
      default: ''
    },
    spFormItem: {
      default: ''
    }
  },

  props: {
    value: {},
    options: Array,
    props: Object,
    size: String,
    placeholder: {
      type: String,
      default: () => '请选择'
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    filterMethod: Function,
    separator: {
      type: String,
      default: ' / '
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    collapseTags: Boolean,
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function,
      default: () => (() => {})
    },
    popperClass: String
  },

  data() {
    return {
      dropDownVisible: false,
      checkedValue: this.value,
      inputHover: false,
      inputValue: null,
      presentText: '',
      presentTags: [],
      checkedNodes: [],
      filtering: false,
      suggestions: [],
      inputInitialHeight: 0,
      pressDeleteCount: 0
    }
  },

  computed: {
    realSize() {
      const _elFormItemSize = (this.elFormItem || {}).elFormItemSize
      return this.size || _elFormItemSize || (this.$ELEMENT || {}).size
    },
    tagSize() {
      return ['small', 'mini'].indexOf(this.realSize) > -1
        ? 'mini'
        : 'small'
    },
    isDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    },
    config() {
      const config = this.props || {}
      const { $attrs } = this

      Object
        .keys(MigratingProps)
        .forEach(oldProp => {
          const { newProp, type } = MigratingProps[oldProp]
          let oldValue = $attrs[oldProp] || $attrs[kebabCase(oldProp)]
          if (isDefined(oldProp) && !isDefined(config[newProp])) {
            if (type === Boolean && oldValue === '') {
              oldValue = true
            }
            config[newProp] = oldValue
          }
        })

      return config
    },
    multiple() {
      return this.config.multiple
    },
    leafOnly() {
      return !this.config.checkStrictly
    },
    readonly() {
      return !this.filterable || this.multiple
    },
    clearBtnVisible() {
      if (!this.clearable || this.isDisabled || this.filtering || !this.inputHover) {
        return false
      }

      return this.multiple
        ? !!this.checkedNodes.filter(node => !node.isDisabled).length
        : !!this.presentText
    },
    panel() {
      return this.$refs.panel
    }
  },

  watch: {
    disabled() {
      this.computePresentContent()
    },
    value(newVal, oldVal) {
      if (!isEqual(newVal, oldVal)) {
        this.checkedValue = newVal
        this.computePresentContent()
      }
    },
    checkedValue(newVal, oldVal) {
      const { dropDownVisible } = this
      const { checkStrictly, multiple } = this.config

      if (!isEqual(newVal, oldVal) || isUndefined(oldVal)) {
        this.computePresentContent()
        // hide dropdown when single mode
        if (!multiple && !checkStrictly && dropDownVisible) {
          this.toggleDropDownVisible(false)
        }

        this.$emit('input', newVal)
        this.$emit('change', newVal)
        this.dispatch('SpFormItem', 'sp.form.change', newVal)
      }
    },
    options: {
      handler: function() {
        this.$nextTick(this.computePresentContent)
      },
      deep: true
    },
    presentText(val) {
      this.inputValue = val
    },
    presentTags(val, oldVal) {
      if (this.multiple && (val.length || oldVal.length)) {
        this.$nextTick(this.updateStyle)
      }
    },
    filtering() {
      this.$nextTick(this.updatePopper)
    }
  },

  mounted() {
    const { input } = this.$refs
    if (input && input.$el) {
      this.inputInitialHeight = input.$el.offsetHeight || InputSizeMap[this.realSize] || 40
    }

    if (!this.isEmptyValue(this.value)) {
      this.computePresentContent()
    }

    this.filterHandler = debounce(() => {
      const { inputValue } = this

      if (!inputValue) {
        this.filtering = false
        return
      }

      const before = this.beforeFilter(inputValue)
      if (before && before.then) {
        before.then(this.getSuggestions)
      } else if (before !== false) {
        this.getSuggestions()
      } else {
        this.filtering = false
      }
    }, this.debounce)
    addResizeListener(this.$el, this.updateStyle)
  },

  beforeDestroy() {
    removeResizeListener(this.$el, this.updateStyle)
  },

  methods: {
    toggleDropDownVisible(visible) {
      if (this.isDisabled) return

      const { dropDownVisible } = this
      const { input } = this.$refs
      visible = isDefined(visible) ? visible : !dropDownVisible
      if (visible !== dropDownVisible) {
        this.dropDownVisible = visible
        if (visible) {
          this.$nextTick(() => {
            this.updatePopper()
            this.panel.scrollIntoView()
          })
        }
        input.$refs.input.setAttribute('aria-expanded', visible)
        this.$emit('visible-change', visible)
      }
    },
    handleDropdownLeave() {
      this.filtering = false
      this.inputValue = this.presentText
      this.doDestroy()
    },
    handleKeyDown(event) {
      switch (event.keyCode) {
      case KeyCode.enter:
        this.toggleDropDownVisible()
        break
      case KeyCode.down:
        this.toggleDropDownVisible(true)
        this.focusFirstNode()
        event.preventDefault()
        break
      case KeyCode.esc:
      case KeyCode.tab:
        this.toggleDropDownVisible(false)
        break
      }
    },
    handleFocus(e) {
      this.$emit('focus', e)
    },
    handleBlur(e) {
      this.$emit('blur', e)
    },
    handleInput(val, event) {
      !this.dropDownVisible && this.toggleDropDownVisible(true)

      if (event && event.isComposing) return
      if (val) {
        this.filterHandler()
      } else {
        this.filtering = false
      }
    },
    handleClear() {
      this.presentText = ''
      this.panel.clearCheckedNodes()
    },
    handleExpandChange(value) {
      this.$nextTick(this.updatePopper.bind(this))
      this.$emit('expand-change', value)
      this.$emit('active-item-change', value) // Deprecated
    },
    focusFirstNode() {
      this.$nextTick(() => {
        const { filtering } = this
        const { popper, suggestionPanel } = this.$refs
        let firstNode = null

        if (filtering && suggestionPanel) {
          firstNode = suggestionPanel.$el.querySelector('.sp-cascader__suggestion-item')
        } else {
          const firstMenu = popper.querySelector('.sp-cascader-menu')
          firstNode = firstMenu.querySelector('.sp-cascader-node[tabindex="-1"]')
        }

        if (firstNode) {
          firstNode.focus()
          !filtering && firstNode.click()
        }
      })
    },
    computePresentContent() {
      // nextTick is required, because checked nodes may not change right now
      this.$nextTick(() => {
        if (this.config.multiple) {
          this.computePresentTags()
          this.presentText = this.presentTags.length ? ' ' : ''
        } else {
          this.computePresentText()
        }
      })
    },
    isEmptyValue(val) {
      const { multiple } = this
      const { emitPath } = this.panel.config
      if (multiple || emitPath) {
        return isEmpty(val)
      }
      return false
    },
    computePresentText() {
      const { checkedValue, config } = this

      if (!this.isEmptyValue(checkedValue)) {
        const node = this.panel.getNodeByValue(checkedValue)
        if (node && (config.checkStrictly || node.isLeaf)) {
          this.presentText = node.getText(this.showAllLevels, this.separator)
          return
        }
      }
      this.presentText = ''
    },
    computePresentTags() {
      const { isDisabled, leafOnly, showAllLevels, separator, collapseTags } = this
      const checkedNodes = this.getCheckedNodes(leafOnly)
      const tags = []

      const genTag = node => ({
        node,
        key: node.uid,
        text: node.getText(showAllLevels, separator),
        hitState: false,
        closable: !isDisabled && !node.isDisabled
      })

      if (checkedNodes.length) {
        const [first, ...rest] = checkedNodes
        const restCount = rest.length
        tags.push(genTag(first))

        if (restCount) {
          if (collapseTags) {
            tags.push({
              key: -1,
              text: `+ ${restCount}`,
              closable: false
            })
          } else {
            rest.forEach(node => tags.push(genTag(node)))
          }
        }
      }

      this.checkedNodes = checkedNodes
      this.presentTags = tags
    },
    getSuggestions() {
      let { filterMethod } = this

      if (!isFunction(filterMethod)) {
        filterMethod = (node, keyword) => node.text.includes(keyword)
      }

      const suggestions = this.panel.getFlattedNodes(this.leafOnly)
        .filter(node => {
          if (node.isDisabled) return false
          node.text = node.getText(this.showAllLevels, this.separator) || ''
          return filterMethod(node, this.inputValue)
        })

      if (this.multiple) {
        this.presentTags.forEach(tag => {
          tag.hitState = false
        })
      } else {
        suggestions.forEach(node => {
          node.checked = isEqual(this.checkedValue, node.getValueByOption())
        })
      }

      this.filtering = true
      this.suggestions = suggestions
      this.$nextTick(() => {
        this.updatePopper()
      })
    },
    handleSuggestionKeyDown(event) {
      const { keyCode, target } = event
      switch (keyCode) {
      case KeyCode.enter:
        target.click()
        break
      case KeyCode.up:
        // eslint-disable-next-line no-case-declarations
        const prev = target.previousElementSibling
        prev && prev.focus()
        break
      case KeyCode.down:
        // eslint-disable-next-line no-case-declarations
        const next = target.nextElementSibling
        next && next.focus()
        break
      case KeyCode.esc:
      case KeyCode.tab:
        this.toggleDropDownVisible(false)
        break
      }
    },
    handleDelete() {
      const { inputValue, pressDeleteCount, presentTags } = this
      const lastIndex = presentTags.length - 1
      const lastTag = presentTags[lastIndex]
      this.pressDeleteCount = inputValue ? 0 : pressDeleteCount + 1

      if (!lastTag) return

      if (this.pressDeleteCount) {
        if (lastTag.hitState) {
          this.deleteTag(lastTag)
        } else {
          lastTag.hitState = true
        }
      }
    },
    handleSuggestionClick(index) {
      const { multiple } = this
      const targetNode = this.suggestions[index]

      if (multiple) {
        const { checked } = targetNode
        targetNode.doCheck(!checked)
        this.panel.calculateMultiCheckedValue()
      } else {
        this.checkedValue = targetNode.getValueByOption()
        this.toggleDropDownVisible(false)
      }
    },
    deleteTag(tag) {
      const { checkedValue } = this
      const current = tag.node.getValueByOption()
      const val = checkedValue.find(n => isEqual(n, current))
      this.checkedValue = checkedValue.filter(n => !isEqual(n, current))
      this.$emit('remove-tag', val)
    },
    updateStyle() {
      const { $el, inputInitialHeight } = this
      if (this.$isServer || !$el) return

      const { suggestionPanel } = this.$refs
      const inputInner = $el.querySelector('.sp-input__inner')

      if (!inputInner) return

      let suggestionPanelEl = null

      if (suggestionPanel && (suggestionPanelEl = suggestionPanel.$el)) {
        const suggestionList = suggestionPanelEl.querySelector('.sp-cascader__suggestion-list')
        suggestionList.style.minWidth = inputInner.offsetWidth + 'px'
      }

      const tags = $el.querySelector('.sp-cascader__tags')
      if (tags) {
        const offsetHeight = Math.round(tags.getBoundingClientRect().height)
        const height = Math.max(offsetHeight + 6, inputInitialHeight) + 'px'
        inputInner.style.height = height
        if (this.dropDownVisible) {
          this.updatePopper()
        }
      }
    },

    /**
     * public methods
    */
    getCheckedNodes(leafOnly) {
      return this.panel.getCheckedNodes(leafOnly)
    }
  }
}
</script>

<style lang="scss">
@import "./cascader";
</style>