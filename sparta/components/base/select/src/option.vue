<template>
  <li
    v-show="visible && !spSelect.loading"
    class="sp-option"
    :class="{
      'is--selected': isSelect,
      'is--disabled': needDisabled,
      'is--hover': (hover && !needDisabled && !spSelect.groupMultiple),
      'is--group-multi': spSelect.groupMultiple
    }"
    @click.stop="handleClick(value, label)"
    @mouseover="handleMouseover"
  >
    <template v-if="spSelect.groupMultiple">
      <sp-checkbox
        :label="value"
        :disabled="needDisabled"
        @click.native.stop
      ><slot>{{ label }}</slot></sp-checkbox>
    </template>
    <template v-else>
      <slot>{{ label }}</slot>
    </template>
    <i
      v-show="selected"
      class="sp-icon-tick"
    />
  </li>
</template>

<script>
export default {
  name: 'SpOption',
  inject: {
    spSelect: {
      default: ''
    },
    SpOptionGroup: {
      default: ''
    }
  },
  props: {
    label: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [Array, Number, String, Boolean, Object],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hover: false,
      selected: false,
      visible: true,
    }
  },
  computed: {
    isMulti() {
      return this.spSelect.multiple || this.spSelect.groupMultiple
    },
    
    isSelect() {
      return this.isMulti ? this.selected : this.spSelect.value === this.value
    },

    needDisabled() {
      return this.disabled || this.spSelect.disabled || this.SpOptionGroup?.disabled
    }
  },
  created() {
    this.spSelect.spOptions.push(this)

    if (this.SpOptionGroup) {
      this.SpOptionGroup.spOptions.push(this)
    }
  },
  beforeDestroy() {
    this.spSelect.spOptions.splice(this.spSelect.spOptions.findIndex(item => item === this), 1)

    if (this.SpOptionGroup) {
      this.SpOptionGroup.spOptions.splice(this.spSelect.spOptions.findIndex(item => item === this), 1)
    }
  },
  methods: {
    handleClick(value, label) {
      if (this.needDisabled || this.spSelect.groupMultiple) {
        return
      }

      this.spSelect.needFilterMethod = false

      // 多选情况，将选择的值加入tag
      if (this.spSelect.multiple) {
        const valueIndex = this.spSelect.value.indexOf(value)

        if (valueIndex !== -1) {
          this.spSelect.selected.splice(valueIndex, 1)
          this.spSelect.value.splice(valueIndex, 1)
          this.selected = false
        } else {
          this.spSelect.selected.push({ label, value })
          this.spSelect.value.push(value)
          this.selected = true
        }
        // 更新select的高度
        this.spSelect.updateTagboxHeight()
      // 单选情况，select做处理
      } else {
        if(this.spSelect.filterable) {
          this.spSelect.singleSelected = label
          this.spSelect.oldInputText = label
        }
        this.spSelect.$emit('input', value)
        this.spSelect.$emit('change', value)
        this.spSelect.inputText = label
        this.spSelect.visible = false
      }
      this.spSelect.$refs.focusHelper.focus()
    },
    
    handleCheckboxClick(value) {
      if (this.needDisabled) {
        return
      }

      const valueIndex = this.spSelect.value.indexOf(value)

      if (valueIndex !== -1) {
        this.spSelect.value.splice(valueIndex, 1)
      } else {
        this.spSelect.value.push(value)
      }
    },

    handleMouseover() {
      if (this.needDisabled) {
        return
      }
      if (this.spSelect.visible) { // 这句if防止收起动画的时候，鼠标也会hover带条目上
        this.spSelect.evOptionHoverIndex = this.spSelect.spOptions.indexOf(this)
      }
    }
  }
}
</script>

<style lang="scss">
$option-height: 34px;

.sp-option {
  position: relative;
  font-size: 14px;
  padding: 0 10px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: $opiton-color;
  height: $option-height;
  line-height: $option-height;
  box-sizing: border-box;
  transition: background-color 0.1s;
  cursor: pointer;
  &.is--hover {
    background-color: $select-dropdown-item-background-hover;
  }
  &.is--selected {
    color: $color-primary;
    font-weight: 700;
  }
  &.is--disabled {
    color: $opiton-color-disabled;
    cursor: not-allowed;

    .sp-checkbox__wrap {
      cursor: not-allowed;
    }
  }
  &.is--group-multi {
    line-height: auto;
    height: auto;
    padding: 0;

    &:hover {
      background-color: $select-dropdown-item-background-hover;
    }
  }
  .sp-icon-tick {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .sp-checkbox {
    vertical-align: top;
    margin-top: 4px;

    &__wrap {
      height: auto;
      line-height: 20px;
      padding: 7px 10px;
      display: block;
      margin-right: 0;
      cursor: pointer;
    }

    &__text {
      vertical-align: top;
    }
  }
}
</style>
