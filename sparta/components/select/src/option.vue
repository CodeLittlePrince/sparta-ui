<template>
  <li
    v-show="visible"
    class="sp-option"
    :class="{
      'is--selected': isSelect,
      'is--disabled': disabled,
      'is--hover': hover && !disabled
    }"
    @click.stop="handleClick(value, label)"
    @mouseover="handleMouseover"
  >
    <slot>
      {{ label }}
    </slot>
    <i
      v-show="selected"
      class="sp-icon-tick"
    />
  </li>
</template>

<script>
export default {
  name: 'SpOption',
  inject: ['spSelect'],
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
      visible: true
    }
  },
  computed: {
    isSelect() {
      return this.spSelect.multiple ? this.selected : this.spSelect.value === this.value
    }
  },
  created() {
    this.spSelect.spOptions.push(this)
  },
  methods: {
    handleClick(value, label) {
      if (this.disabled) {
        return
      }
      // 单选情况，select做处理
      if (!this.spSelect.multiple) {
        if(this.spSelect.filterable) {
          this.spSelect.singleSelected = label
          this.spSelect.oldInputText = label
        }
        this.spSelect.$emit('input', value)
        this.spSelect.$emit('change', value)
        this.spSelect.inputText = label
        this.spSelect.visible = false
      } else if (this.spSelect.multiple) {
      // 多选情况，将选择的值加入tag
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
      }
      this.spSelect.$refs.focusHelper.focus()
    },
    handleMouseover() {
      if (this.disabled) {
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
  }
  .sp-icon-tick {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
