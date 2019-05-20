<template>
  <li
    v-show="visiable"
    class="sp-option"
    :class="{
      'is-selected': isSelect,
      'is-disabled': disabled,
      'is-hover': hover && !disabled
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
  inject: ['evSelect'],
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
      visiable: true
    }
  },
  computed: {
    isSelect() {
      return this.evSelect.multiple ? this.selected : this.evSelect.value === this.value
    }
  },
  created() {
    this.evSelect.evOptions.push(this)
  },
  methods: {
    handleClick(value, label) {
      if (this.disabled) {
        return
      }
      // 单选情况，select做处理
      if (!this.evSelect.multiple) {
        this.evSelect.$emit('input', value)
        this.evSelect.inputText = label
        this.evSelect.visiable = false
      } else if (this.evSelect.multiple) {
      // 多选情况，将选择的值加入tag
        const valueIndex = this.evSelect.value.indexOf(value)
        if (valueIndex !== -1) {
          this.evSelect.selected.splice(valueIndex, 1)
          this.evSelect.value.splice(valueIndex, 1)
          this.selected = false
        } else {
          this.evSelect.selected.push({ label, value })
          this.evSelect.value.push(value)
          this.selected = true
        }
        // 更新select的高度
        this.evSelect.updateTagboxHeight()
      }
      this.evSelect.focusSelectInput()
    },
    handleMouseover() {
      if (this.disabled) {
        return
      }
      if (this.evSelect.visiable) { // 这句if防止收起动画的时候，鼠标也会hover带条目上
        this.evSelect.evOptionHoverIndex = this.evSelect.evOptions.indexOf(this)
      }
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable.scss";
$option-height: 34px;

.sp-option {
  position: relative;
  font-size: 14px;
  padding: 0 20px;
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
  &.is-hover {
    background-color: $select-dropdown-item-color-hover;
  }
  &.is-selected {
    color: $color-primary;
    font-weight: 700;
  }
  &.is-disabled {
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
