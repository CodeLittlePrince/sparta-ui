<template>
  <ul class="sp-option-group" :class="{ 'sp-option-group--is-group-multi': spSelect.groupMultiple }">
    <template v-if="spSelect.groupMultiple">
      <sp-checkbox
        :label="value"
        :disabled="disabled"
        @change="handleCheckboxChange"
      >
        <li>{{ label }}</li>
      </sp-checkbox>
    </template>
    <template v-else>
      <li class="sp-option-group-title">{{ label }}</li>
    </template>
    <li>
      <ul class="sp-option-group-content">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SpOptionGroup',

  inject: ['spSelect'],

  provide() {
    return {
      'SpOptionGroup': this
    }
  },
  
  props: {
    label: {
      type: String,
      default: ''
    },

    value: {
      type: [Array, Number, String, Boolean, Object],
      default: ''
    },
    
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      spOptions: [],
    }
  },

  watch: {
    'spSelect.groupMultipleSelected'(valList) {
      // 为了当所有子项都点亮的时候，则group 的checkbox 也自动点亮；
      // 反之，但凡有一个子项没有点亮，则group 的checkbox 也不应该点亮。
      const childValueList = this.getChildValueList()
      const index = valList.findIndex(item => item === this.value)
      let count = 0

      childValueList.forEach(value => {
        if (valList.includes(value)) {
          count++
        }
      })

      if (count === childValueList.length && index === -1) {
        this.spSelect.currentValue.push(this.value)
      } else if (count < childValueList.length && -1 < index) {
        this.spSelect.currentValue.splice(index, 1)
      }
    }
  },

  created() {
    this.spSelect.spOptionGroups.push(this)
  },

  methods: {
    handleCheckboxChange(val) {
      let selected = this.spSelect.groupMultipleSelected
      const childValueList = this.getChildValueList()

      // 点亮则去全选子条目，否则取消所有已选条目
      if (val) {
        const values = childValueList.filter(value => {
          return !selected.includes(value)
        })

        this.spSelect.groupMultipleSelected = selected.concat(values)
      } else {
        let len = selected.length

        while(len--) {
          if (childValueList.includes(selected[len])) {
            selected.splice(len, 1)
          }
        }
      }
    },

    getChildValueList() {
      return this.spOptions?.filter(item => !item.disabled)?.map(item => item.value) || []
    }
  }
}
</script>

<style lang="scss">
.sp-option-group {
  padding: 0;
  margin: 0;
  > .sp-checkbox__wrap {
    min-height: 35px;
    line-height: 35px;
    margin-right: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
    border-bottom: 1px solid #e4e8ef;
    font-weight: bold;
    transition: background-color 0.1s;

    &:hover {
      background-color: $select-dropdown-item-background-hover;
    }
  }
  &--is-group-multi {
    border-top: 2px solid #e4e8ef;

    &:first-child {
      border-top: 0;
    }
  }
  &-title {
    padding-left: 10px;
    font-size: 12px;
    color: #909399;
    line-height: 30px;
  }
  &-content {
    padding: 0;
    margin: 0;
  }
}
</style>
