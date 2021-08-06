# Select 选择器

### 基础用法
适用广泛的基础单选（支持键盘控制）

:::demo `v-model`的值为当前被选中的`sp-option`的 value 属性值
```vue
<template>
  <sp-select v-model="value1">
    <sp-option
      v-for="item in list1"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></sp-option>
  </sp-select>
</template>

<script>
export default{
  data(){
    return {
      list1: [
        { label: 'Tom', value: 1 },
        { label: 'Jerry', value: 2 },
        { label: 'Kitty', value: 3 },
        { label: 'Adam', value: 4 },
        { label: 'Bob', value: 5 },
        { label: 'Cancy', value: 6 },
        { label: 'David', value: 7 },
        { label: 'Evan', value: 8 },
        { label: 'Franky', value: 9 },
        { label: 'Jerry', value: 10 },
        { label: 'Kitty', value: 11 },
        { label: 'Kathy', value: 12 }
      ],
      value1: 9
    }
  },
  watch: {
    value1(val) {
      console.log(val)
    }
  }
}
</script>
```
:::

### 禁用状态
选择器不可用状态

:::demo 为`sp-select`设置`disabled`属性，则整个选择器不可用
```vue
<template>
  <sp-select disabled>
  </sp-select>
</template>
```
:::


### 只读状态
选择器只读状态

:::demo 为`sp-select`设置`readonly`属性，则整个选择器不可用
```vue
<template>
  <sp-select v-model="value2" readonly>
    <sp-option
      v-for="item in list2"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.value === 2"
    ></sp-option>
  </sp-select>
</template>
```
:::

### 有禁用选项
禁止下拉中的选项

:::demo 在`sp-option`中，设定`disabled`值为 true，即可禁用该选项
```vue
<template>
  <sp-select v-model="value2">
    <sp-option
      v-for="item in list2"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.value === 2"
    ></sp-option>
  </sp-select>
</template>

<script>
export default{
  data(){
    return {
      list2: [
        { label: 'Tony', value: 1 },
        { label: 'Bob', value: 2 },
        { label: 'Jack', value: 3 }
      ],
      value2: 0
    }
  },
  watch: {
    value2(val) {
      console.log(val)
    }
  }
}
</script>
```
:::

### 可清空
包含清空按钮，可将选择器清空

:::demo 为`sp-select`设置`clearable`属性，则可将选择器清空。需要注意的是，clearable属性仅适用于单选。
```vue
<template>
  <sp-select
    v-model="value3"
    clearable
  >
    <sp-option
      v-for="item in list3"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></sp-option>
  </sp-select>
</template>

<script>
export default{
  data(){
    return {
      list3: [
        { label: 'cat', value: 1 },
        { label: 'dog', value: 2 },
        { label: 'pig', value: 3 }
      ],
      value3: 0
    }
  },
  watch: {
    value3(val) {
      console.log(val)
    }
  }
}
</script>
```
:::

### 可过滤（搜索）
可以利用搜索功能快速查找选项

:::demo 为sp-select添加filterable属性即可启用搜索功能。默认情况下，Select 会找出所有label属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个filter-method来实现。filter-method为一个Function，它会在输入值发生变化时调用，参数为当前输入值。
```vue
<template>
  <sp-select
    v-model="value4"
    filterable
  >
    <sp-option
      v-for="item in list4"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></sp-option>
  </sp-select>
</template>

<script>
export default{
  data(){
    return {
      list4: [
        { label: 'cat', value: 1 },
        { label: 'dog', value: 2 },
        { label: 'pig', value: 3 },
        { label: 'citty', value: 4 }
      ],
      value4: 0
    }
  },
  watch: {
    value4(val) {
      console.log(val)
    }
  }
}
</script>
```
:::

### 自定义模板
可以自定义备选项

:::demo 将自定义的 HTML 模板插入`sp-option`的 slot 中即可
```vue
<template>
  <sp-select v-model="value5">
    <sp-option
      v-for="item in list5"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right;">{{ item.value }}</span>
    </sp-option>
  </sp-select>
</template>

<script>
export default{
  data(){
    return {
      list5: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '杭州', value: 'hangzhou' }
      ],
      value5: ''
    }
  },
  watch: {
    value5(val) {
      console.log(val)
    }
  }
}
</script>
```
:::

### 分组
备选项进行分组展示

:::demo 使用`sp-option-group`对备选项进行分组，它的label属性为分组名
```vue
<template>
  <sp-select v-model="value6">
    <sp-option-group
      v-for="group in list6"
      :key="group.label"
      :label="group.label"
    >
      <sp-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right;">{{ item.value }}</span>
      </sp-option>
    </sp-option-group>
  </sp-select>
</template>

<script>
export default{
  data(){
    return {
      list6: [{
        label: '北京',
        options: [{
          value: 'Sanlitun',
          label: '三里屯'
        }, {
          value: 'Wangfujing',
          label: '王府井'
        }]
        }, {
        label: '上海',
        options: [{
          value: 'Lujiazui',
          label: '陆家嘴'
        }, {
          value: 'Nanjinglu',
          label: '南京路'
        }]
      }],
      value6: ''
    }
  },
  watch: {
    value6(val) {
      console.log(val)
    }
  }
}
</script>
```
:::

### 基础多选
适用性较广的基础多选，用 Tag 展示已选项

:::demo 为`sp-select`设置`multiple`属性即可启用多选，此时`v-model`的值为当前选中值所组成的数组。
```vue
<template>
  <sp-select
    v-model="value7"
    multiple
  >
    <sp-option
      v-for="item in list7"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right;padding-right: 20px;">{{ item.value }}</span>
    </sp-option>
  </sp-select>
</template>

<script>
export default{
  data(){
    return {
      list7: [
        { label: '听音乐', value: 'music' },
        { label: '看电影', value: 'movie' },
        { label: '绘画', value: 'drawing' },
        { label: '跑步', value: 'running' }
      ],
      value7: []
    }
  },
  watch: {
    value7(val) {
      console.log(val)
    }
  }
}
</script>
```
:::

### Select Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| width | 设置宽度 | string/number | — | 240 |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 是否可以清空选项 | boolean | — | false |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| filter-method | 自定义搜索方法 | function | — | — |
| emptyText | 过滤时候没有匹配值的文案 | string | — | 请选择 |


### Select Slots
|   name  | 说明     |
|---------|---------|
|    —    | Option 组件列表 |

### Option Group Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 分组的组名 | string | — | — |

### Option Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 选项文案 | string/number | — | — |
| value | 选项的值 | array/number/string/boolean/object | — | — |
| disabled | 是否禁用该选项 | boolean | — | false |


<script>
export default{
  data(){
    return {
      list1: [
        { label: 'TomTomTomTomTomTomTomTomTom', value: 1 },
        { label: 'Jerry', value: 2 },
        { label: 'Kitty', value: 3 },
        { label: 'Adam', value: 4 },
        { label: 'Bob', value: 5 },
        { label: 'Cancy', value: 6 },
        { label: 'David', value: 7 },
        { label: 'Evan', value: 8 },
        { label: 'Franky', value: 9 },
        { label: 'Jerry', value: 10 },
        { label: 'Kitty', value: 11 },
        { label: 'Kathy', value: 12 }
      ],
      value1: 9,
      list2: [
        { label: 'Tony', value: 1 },
        { label: 'Bob', value: 2 },
        { label: 'Jack', value: 3 }
      ],
      value2: 0,
      list3: [
        { label: 'cat', value: 1 },
        { label: 'dog', value: 2 },
        { label: 'pig', value: 3 }
      ],
      value3: 0,
      list4: [
        { label: 'cat', value: 1 },
        { label: 'dog', value: 2 },
        { label: 'pig', value: 3 },
        { label: 'citty', value: 4 }
      ],
      value4: 0,
      list5: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '杭州', value: 'hangzhou' }
      ],
      value5: '',
      list6: [{
        label: '北京',
        options: [{
          value: 'Sanlitun',
          label: '三里屯'
        }, {
          value: 'Wangfujing',
          label: '王府井'
        }]
       }, {
        label: '上海',
        options: [{
          value: 'Lujiazui',
          label: '陆家嘴'
        }, {
          value: 'Nanjinglu',
          label: '南京路'
        }]
      }],
      value6: '',
      list7: [
        { label: '听音乐', value: 'music' },
        { label: '看电影', value: 'movie' },
        { label: '绘画', value: 'drawing' },
        { label: '跑步', value: 'running' }
      ],
      value7: []
    }
  },
  watch: {
    value1(val) {
      console.log(val)
    },
    value2(val) {
      console.log(val)
    },
    value3(val) {
      console.log(val)
    },
    value4(val) {
      console.log(val)
    },
    value5(val) {
      console.log(val)
    },
    value6(val) {
      console.log(val)
    },
    value7(val) {
      console.log(val)
    }
  }
}
</script>