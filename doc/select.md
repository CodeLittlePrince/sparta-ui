# Select 选择器

### 自定义select 自定义前置图标
适用广泛的基础单选（支持键盘控制）

:::demo 可自定义前置元素，一般是icon或者img
```vue
<template>
  <div class="select-demo">
    <sp-select v-model="value8">
      <i slot="prepend" :class="icon"></i>
      <sp-option
        v-for="item in list8"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></sp-option>
    </sp-select>
  </div>
</template>

<script>
export default{
  data(){
    return {
      list8: [
        { label: 'TomTomTomTomTomTomTomTom@163.com', value: 1 , icon: 'sp-icon-file' },
        { label: 'Jerry@163.com', value: 2 , icon: 'sp-icon-check' },
        { label: 'KittyKittyKittyKitty@163.com', value: 3 , icon:'sp-icon-search' },
      ],
      value8: ''
    }
  },
  watch: {
    value8(val) {
      console.log(val)
    }
  },
  computed: {
    icon() {
      return (this.list8.find(item => item.value === this.value8) || {}).icon
    }
  }
}
</script>
```
:::

### 自定义select 自定义前置图标 全部
适用广泛的基础单选（支持键盘控制）

:::demo 可自定义前置元素，一般是icon或者img
```vue
<template>
  <div class="select-demo">
    <sp-select v-model="value12" clearable>
      <i slot="prepend" :class="icon12"></i>
      <sp-option
        v-for="item in list12"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></sp-option>
    </sp-select>
  </div>
</template>

<script>
export default{
  data(){
    return {
      list12: [
        { label: '全部', value: '' , icon: 'sp-icon-add-bold' },
        { label: 'TomTomTomTomTomTomTomTom@163.com', value: 1 , icon: 'sp-icon-file' },
        { label: 'Jerry@163.com', value: 2 , icon: 'sp-icon-check' },
        { label: 'KittyKittyKittyKitty@163.com', value: 3 , icon:'sp-icon-search' },
      ],
      value12: ''
    }
  },
  watch: {
    value12(val) {
      console.log(val)
    }
  },
  computed: {
    icon12() {
      return (this.list12.find(item => item.value === this.value12) || {}).icon
    }
  }
}
</script>
```
:::


### 自定义 select 样式
适用广泛的基础单选（支持键盘控制）

:::demo `v-model`的值为当前被选中的`sp-option`的 value 属性值，通过覆盖样式
```vue
<template>
  <div class="select-demo">
    <div class="customer-select">
      <sp-select v-model="value11"  placeholder="已使用优惠抵扣￥1,000.00">
        <sp-option
          v-for="item in list11"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></sp-option>
      </sp-select>
    </div>
 </div>
</template>

<script>
export default{
  data(){
    return {
      list11: [
        { label: 'TomTomTomTomTomTomTomTom@163.com', value: 1 , icon: 'sp-icon-file' },
        { label: 'Jerry@163.com', value: 2 , icon: 'sp-icon-check' },
        { label: 'KittyKittyKittyKitty@163.com', value: 3 , icon:'sp-icon-search' },
      ],
      value11: 1
    }
  },
  watch: {
    value11(val) {
      console.log(val)
    }
  }
}
</script>
<style>
  .customer-select {
    .sp-select__input-box {
      border: 1px dashed #ee4c4c;
      background: rgba(238, 76, 76, 0.1);
      color: #ee4c4c;
      .sp-select__input-placeholder,.sp-select__input {
        color: #ee4c4c;
        background: rgba(238, 76, 76, 0.1);
      }
      .sp-select__suffix {
        background: rgba(238, 76, 76, 0.1);
        border: 0;
        color: #ee4c4c;
      }
      .isFocus.sp-select__suffix i {
        color: #ee4c4c;
      }
    }
    .sp-select.isFocus .sp-select__input-box {
      border-color: #ee4c4c;
    }
    .sp-select.isFocus .sp-select__suffix {
      background: rgba(238, 76, 76, 0.1);
      i {
        color: #ee4c4c;
      }
    }
  }
</style>
```
:::

### 自定义center 显示元素
适用广泛的基础单选（支持键盘控制）

:::demo 可自定义select 显示元素
```vue
<template>
  <div class="select-demo">
    <sp-select v-model="value10">
      <i slot="prepend" :class="icon10"></i>
      <div slot="center">{{ valueText }}</div>
      <sp-option
        v-for="item in list10"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></sp-option>
    </sp-select>
  </div>
</template>

<script>
export default{
  data(){
    return {
      list10: [
        { label: 'TomTomTomTomTomTomTomTom@163.com', value: 1 , icon: 'sp-icon-file' },
        { label: 'Jerry@163.com', value: 2 , icon: 'sp-icon-check' },
        { label: 'KittyKittyKittyKitty@163.com', value: 3 , icon:'sp-icon-search' },
      ],
      value10: ''
    }
  },
  watch: {
    value10(val) {
      console.log(val)
    }
  },
  computed: {
    icon() {
      return (this.list10.find(item => item.value === this.value10) || {}).icon
    },
    valueText() {
      let label = (this.list10.find(item => item.value === this.value10) || {}).label
      if(label && label.length > 15) {
        label = `${ label.substr(0,9) }...@163.com`
      }
      return label
    }
  }
}
</script>
```
:::

### 基础用法
适用广泛的基础单选（支持键盘控制）

:::demo `v-model`的值为当前被选中的`sp-option`的 value 属性值
```vue
<template>
  <div class="select-demo">
    <sp-select v-model="value1">
      <sp-option
        v-for="item in list1"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></sp-option>
    </sp-select>
  </div>
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
  <div class="select-demo">
    <sp-select disabled>
    </sp-select>
  </div>
</template>
```
:::


### 只读状态
选择器只读状态

:::demo 为`sp-select`设置`readonly`属性，则整个选择器不可用
```vue
<template>
  <div class="select-demo">
    <sp-select v-model="value2" readonly>
      <sp-option
        v-for="item in list2"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.value === 2"
      ></sp-option>
    </sp-select>
  </div>
</template>
```
:::

### 有禁用选项
禁止下拉中的选项

:::demo 在`sp-option`中，设定`disabled`值为 true，即可禁用该选项
```vue
<template>
  <div class="select-demo">
    <sp-select v-model="value2">
      <sp-option
        v-for="item in list2"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.value === 2"
      ></sp-option>
    </sp-select>
  </div>
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
  <div class="select-demo">
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
  </div>
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
  <div class="select-demo">
    <p>filterable属性</p>
    <sp-select
      v-model="value4"
      filterable
      clearable
    >
      <sp-option
        v-for="item in list4"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></sp-option>
    </sp-select>
    <div class="select-demo">
    <p>filter-method方法</p>
    <sp-select
      v-model="value4_1"
      filterable
      clearable
      :loading="loading"
      :filter-method="filterMethod"
    >
      <sp-option
        v-for="item in list4_1"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></sp-option>
    </sp-select>
  </div>
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
      value4: 0,
      list4_1: [],
      value4_1: '',
      loading: false
    }
  },
  watch: {
    value4(val) {
      console.log(val)
    },
    value4_1(val) {
      console.log(val)
    }
  },
  methods: {
    filterMethod(value) {
      console.log('filterMethod', value)
      if(!value) return 
      this.loading = true
      this.$ajax.get('/api/search', { keyword: value })
      .then((res) => {
        setTimeout(() => {
          this.list4_1 = res
          this.loading = false
        }, 200);
      })
    }
  }
}
</script>
```
:::

### 自定义select 自定义前置图标 + 可过滤（搜索）

:::demo 自定义和filterable结合版
```vue
<template>
  <div class="select-demo">
    <sp-select v-model="value9" filterable clearable>
      <i slot="prepend" :class="icon9"></i>
      <sp-option
        v-for="item in list9"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></sp-option>
    </sp-select>
  </div>
</template>

<script>
export default{
  data(){
    return {
      list9: [
        { label: '全部', value: '' , icon: 'sp-icon-add-bold' },
        { label: 'cat', value: 1 , icon: 'sp-icon-file' },
        { label: 'pig', value: 2 , icon: 'sp-icon-check' },
        { label: 'dog', value: 3 , icon:'sp-icon-search' },
      ],
      value9: ''
    }
  },
  watch: {
    value9(val) {
      console.log(val)
    }
  },
  computed: {
    icon9() {
      return (this.list9.find(item => item.value === this.value9) || {}).icon
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
  <div class="select-demo">
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
  </div>
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
  <div class="select-demo">
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
  </div>
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
  <div class="select-demo">
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
  </div>
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
| height | 设置高度 | string/number | — | 36 |
| readonly | 设置是否只读 | boolean | — | false |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 是否可以清空选项 | boolean | — | false |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| filter-method | 自定义搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| loading-text | 远程加载时显示的文字 | string | — | 加载中 |
| wait | 自定义搜索防抖等待时间（毫秒） | string/number | — | 300 |
| emptyText | 过滤时候没有匹配值的文案 | string | — | 请选择 |
| limitDropdownWidth | 是否限制下拉框宽度成1.5倍 | boolean | — | true |
| popperScrollBindElem | popper浮动定位的锚点元素 | string/Element | — | - |


### Select Slots
|   name  | 说明     |
|---------|---------|
|    —    | Option 组件列表 |
| prefix | select框头部图标 |
| center | select选中值显示 |
### Select Events
|   事件名称 | 说明     |
|---------|---------|
| change | 选中 option 时，调用此函数 |
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
      value4: 1,
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
      value7: [],
      list8: [
        { label: 'TomTomTomTomTomTomTomTom@163.com', value: 1 , icon: 'sp-icon-file' },
        { label: 'Jerry@163.com', value: 2 , icon: 'sp-icon-check' },
        { label: 'KittyKittyKittyKitty@163.com', value: 3 , icon:'sp-icon-search' },
      ],
      value8: '',
      list9: [
        { label: '全部', value: '' , icon: 'sp-icon-add-bold' },
        { label: 'cat', value: 1 , icon: 'sp-icon-file' },
        { label: 'pig', value: 2 , icon: 'sp-icon-check' },
        { label: 'dog', value: 3 , icon:'sp-icon-search' },
      ],
      value9: '',
      list10: [
        { label: 'TomTomTomTomTomTomTomTom@163.com', value: 1 , icon: 'sp-icon-file' },
        { label: 'Jerry@163.com', value: 2 , icon: 'sp-icon-check' },
        { label: 'KittyKittyKittyKitty@163.com', value: 3 , icon:'sp-icon-search' },
      ],
      value10: '',
      list11: [
        { label: 'TomTomTomTomTomTomTomTom@163.com', value: 1 , icon: 'sp-icon-file' },
        { label: 'Jerry@163.com', value: 2 , icon: 'sp-icon-check' },
        { label: 'KittyKittyKittyKitty@163.com', value: 3 , icon:'sp-icon-search' },
      ],
      value11: 1,
      list12: [
        { label: '全部', value: '' , icon: 'sp-icon-add-bold' },
        { label: 'TomTomTomTomTomTomTomTom@163.com', value: 1 , icon: 'sp-icon-file' },
        { label: 'Jerry@163.com', value: 2 , icon: 'sp-icon-check' },
        { label: 'KittyKittyKittyKitty@163.com', value: 3 , icon:'sp-icon-search' },
      ],
      value12: '',
      list4_1: [],
      value4_1: '',
      loading: false
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
    value4_1(val) {
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
    },
    value8(val) {
      console.log(val)
    },
    value9(val) {
      console.log(val)
    },
    value10(val) {
      console.log(val)
    },
    value11(val) {
      console.log(val)
    },
    value12(val) {
      console.log(val)
    }
  },
  computed: {
    icon() {
      return (this.list8.find(item => item.value === this.value8) || {}).icon
    },
    icon10() {
      return (this.list10.find(item => item.value === this.value10) || {}).icon
    },
    icon9() {
      return (this.list9.find(item => item.value === this.value9) || {}).icon
    },
    icon12() {
      return (this.list12.find(item => item.value === this.value12) || {}).icon
    },
    valueText() {
      let label = (this.list10.find(item => item.value === this.value10) || {}).label
      if(label && label.length > 15) {
        label = `${ label.substr(0,9) }...@163.com`
      }
      return label
    }
  },
  methods: {
    filterMethod(value) {
      console.log('filterMethod', value)
      if(!value) return 
      this.loading = true
      this.$ajax.get('/api/search', { keyword: value })
      .then((res) => {
        setTimeout(() => {
          this.list4_1 = res
          this.loading = false
        }, 200);
      })
    }
  }
}
</script>

<style>
  .components--main .select-demo {
    p {
      line-height: 1.5;
      margin: 10px 0;
    }
    .sp-select {
      width: 300px;
    }
    .customer-select {
      .sp-select__input-box {
        border: 1px dashed #ee4c4c;
        background: rgba(238, 76, 76, 0.1);
        color: #ee4c4c;
        .sp-select__input-placeholder,.sp-select__input {
          color: #ee4c4c;
          background: rgba(238, 76, 76, 0.1);
        }
        .sp-select__suffix {
          background: rgba(238, 76, 76, 0.1);
          border: 0;
          color: #ee4c4c;
        }
        .isFocus.sp-select__suffix i {
          color: #ee4c4c;
        }
      }
      .sp-select.isFocus .sp-select__input-box {
        border-color: #ee4c4c;
      }
      .sp-select.isFocus .sp-select__suffix {
        background: rgba(238, 76, 76, 0.1);
        i {
          color: #ee4c4c;
        }
      }
    }
  }
</style>