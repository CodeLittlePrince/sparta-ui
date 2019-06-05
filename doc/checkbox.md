# Checkbox 多选框

### 基础用法
单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

:::demo 在`sp-checkbox`元素中定义`v-model`绑定变量，单一的`checkbox`中，默认绑定变量的值会是`Boolean`，选中为`true`。
```vue
<template>
  <!-- `checked1` 为 true 或 false -->
  <sp-checkbox v-model="checked1" @change="handleChange1">备选项</sp-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked1: true
      }
    },
    watch: {
      checked1(val) {
        console.log('watch checked1: ', val)
      }
    },
    methods: {
      handleChange1(val) {
        console.log('handleChange1: ', val)
      }
    }
  }
</script>
```
:::

### 不可用
checkbox 不可用。

:::demo 设置`disabled`属性即可。
```vue
<template>
  <sp-checkbox v-model="checked2" disabled>备选项1</sp-checkbox>
  <sp-checkbox v-model="checked3" disabled>备选项</sp-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked2: false,
        checked3: true
      };
    }
  };
</script>
```
:::

### Checkbox 组
适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

:::demo `checkbox-group`元素能把多个 `checkbox` 管理为一组，只需要在 `Group` 中使用v-model绑定Array类型的变量即可。 `sp-checkbox` 的 label属性是该 `checkbox` 对应的值，若该标签中无内容，则该属性也充当 `checkbox` 按钮后的介绍。`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。
```vue
<template>
  <sp-checkbox-group v-model="checkList1" @change="handleCheckList1">
    <sp-checkbox label="a">Kitty</sp-checkbox>
    <sp-checkbox label="b">Tom</sp-checkbox>
    <sp-checkbox label="c">Jerry</sp-checkbox>
    <sp-checkbox label="d" disabled>Jack</sp-checkbox>
    <sp-checkbox label="e" disabled>Lucy</sp-checkbox>
  </sp-checkbox-group>
  </br>
  <sp-checkbox-group v-model="checkList2" @change="handleCheckList2">
    <sp-checkbox label="包子"></sp-checkbox>
    <sp-checkbox label="馒头"></sp-checkbox>
    <sp-checkbox label="豆浆"></sp-checkbox>
    <sp-checkbox label="油条" disabled></sp-checkbox>
    <sp-checkbox label="烧饼" disabled></sp-checkbox>
  </sp-checkbox-group>
</template>
<script>
  export default {
    data() {
      return {
        checkList1: ['a','e'],
        checkList2: ['包子', '烧饼']
      }
    },
    methods: {
      handleCheckList1(vals) {
        console.log('checkList1: ', vals)
      },
      handleCheckList2(vals) {
        console.log('checkList2: ', vals)
      }
    }
  };
</script>
```
:::

### 全选
在实现全选效果时，你可能会用到 indeterminate 属性。

:::demo `indeterminate` 属性用以表示 `checkbox` 的不确定状态，一般用于实现全选的效果
```vue
<template>
  <div>
    <sp-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >
      全选
    </sp-checkbox>
  </div>
  </br>
  <sp-checkbox-group
    v-model="checkedCities"
    @change="handleCheckedCitiesChange"
  >
    <sp-checkbox
      v-for="city in cities"
      :label="city"
      :key="city"
    >
      {{city}}
    </sp-checkbox>
  </sp-checkbox-group>
</template>
<script>
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: ['上海', '北京', '广州', '深圳'],
        isIndeterminate: true
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? ['上海', '北京', '广州', '深圳'] : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  }
</script>
```
:::

### 可选项目数量的限制

:::demo 使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。
```vue
<template>
  <sp-checkbox-group 
    v-model="checkedCities2"
    :min="1"
    :max="2">
    <sp-checkbox v-for="city in cities2" :label="city" :key="city">{{city}}</sp-checkbox>
  </sp-checkbox-group>
</template>
<script>
  export default {
    data() {
      return {
        checkedCities2: ['上海', '北京'],
        cities2: ['上海', '北京', '广州', '深圳']
      };
    }
  };
</script>
```
:::


### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效）| string / number / boolean  |       —        |     —    |
| true-label | 选中时的值   | string / number | — |     —    |
| false-label | 没有选中时的值   | string / number    |      —         |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
| checked  | 当前是否勾选    | boolean   |  — | false   |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制    | boolean   |  — | false   |

### Checkbox Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | 是否禁用    | boolean   | — | false   |
| min     | 可被勾选的 checkbox 的最小数量   | number    |       —        |     —    |
| max     | 可被勾选的 checkbox 的最大数量   | number    |       —        |     —    |

### Checkbox-group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |


<script>
  export default {
    data() {
      return {
        checked1: true,
        checked2: false,
        checked3: true,
        checkList1: ['a','e'],
        checkList2: ['包子', '烧饼'],
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: ['上海', '北京', '广州', '深圳'],
        isIndeterminate: true,
        checkedCities2: ['上海', '北京'],
        cities2: ['上海', '北京', '广州', '深圳']
      }
    },
    watch: {
      checked1(val) {
        console.log('watch checked1: ', val)
      }
    },
    methods: {
      handleChange1(val) {
        console.log('handleChange1: ', val)
      },
      handleCheckList1(vals) {
        console.log('checkList1: ', vals)
      },
      handleCheckList2(vals) {
        console.log('checkList2: ', vals)
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? ['上海', '北京', '广州', '深圳'] : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  }
</script>
