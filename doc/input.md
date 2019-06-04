Input 输入框
---
通过鼠标或键盘输入内容，是最基础的表单域的包装。

### 何时使用
- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

### 基本用法
:::demo 简单使用，input的宽度默认是100%，如需改变，可加父容器或样式覆盖。
```vue
<template>
  <sp-input
    v-model="value1"
    placeholder="basic usage"
  />
</template>

<script>
  export default {
    data() {
      return {
        value1: ''
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

### 四种大小
我们提供了四种尺寸（默认、medium、small 和 mini ），高度分别为 40px、36px、 32px、28px。

:::demo 通过`size`设置组件大小
```vue
<template>
  <div class="demo-input-size">
    <sp-input
      placeholder="default input"
      v-model="input1">
    </sp-input>
    <sp-input
      size="medium"
      placeholder="medium input"
      v-model="input2">
    </sp-input>
    <sp-input
      size="small"
      placeholder="small input"
      v-model="input3">
    </sp-input>
    <sp-input
      size="mini"
      placeholder="mini input"
      v-model="input4">
    </sp-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>
```
:::

### 禁用状态

:::demo 通过 `disabled` 属性设置禁用
```vue
<sp-input
  placeholder="请输入内容"
  disabled>
</sp-input>
```
:::

### 可清空
:::demo 使用`clearable`属性即可得到一个可清空的输入框
```vue
<template>
  <sp-input
    v-model="value2"
    placeholder="clearable"
    clearable
  />
</template>

<script>
  export default {
    data() {
      return {
        value2: ''
      }
    }
  }
</script>
```
:::

### 带 icon 的输入框
:::demo 可以通过 prefix-icon 和 suffix-icon 属性在 input 组件首部和尾部增加显示图标，也可以通过 slot 来放置图标。
```vue
<template>
  <div class="demo-input-suffix">
    属性方式：
    <sp-input
      placeholder="请选择日期"
      suffix-icon="sp-icon-date"
      v-model="input1">
    </sp-input>
    <sp-input
      placeholder="请输入内容"
      prefix-icon="sp-icon-search"
      v-model="input2">
    </sp-input>
  </div>
  <div style="margin: 20px 0;"/>
  <div class="demo-input-suffix">
    slot 方式：
    <sp-input
      placeholder="请选择日期"
      v-model="input3">
      <i slot="suffix" class="sp-input__icon sp-icon-date"></i>
    </sp-input>
    <sp-input
      placeholder="请输入内容"
      v-model="input4">
      <i slot="prefix" class="sp-input__icon sp-icon-search"></i>
    </sp-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input5: '',
      input6: '',
      input7: '',
      input8: ''
    }
  }
}
</script>
```
:::

### textarea
因为`input`和textarea有太多的功能复用，所以干脆做成一个。

通过通过`type="textarea"`即可；

默认高度可用`rows`设定；

可自适应文本高度的文本域，通过`autosize`设定，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。


:::demo 通过`type="textarea"`
```vue
<template>
  <sp-input
    type="textarea"
    autosize
    placeholder="请输入内容"
    v-model="textarea1">
  </sp-input>
  <div style="margin: 20px 0;"/>
  <sp-input
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
    placeholder="请输入内容"
    v-model="textarea2">
  </sp-input>
</template>

<script>
  export default {
    data() {
      return {
        textarea1: '',
        textarea2: ''
      }
    }
  }
</script>
```
:::

### 复合型输入框
可前置或后置元素，一般为标签或按钮。

:::demo 可通过 `slot` 来指定在 `input` 中前置或者后置内容。
```vue
<template>
  <div>
    <sp-input placeholder="请输入内容" v-model="input9">
      <template slot="prepend">Http://</template>
    </sp-input>
  </div>
  <div style="margin-top: 15px;">
    <sp-input placeholder="请输入内容" v-model="input10">
      <template slot="append">.com</template>
    </sp-input>
  </div>
  <div style="margin-top: 15px;">
    <sp-input
      placeholder="请输入内容"
      v-model="input11"
      class="input-with-select"
      style="width: 600px;">
      <sp-select
        v-model="select"
        width="100"
        height="36px"
        slot="prepend"
        placeholder="请选择"
      >
        <sp-option label="餐厅名" value="1"></sp-option>
        <sp-option label="订单号" value="2"></sp-option>
        <sp-option label="用户电话" value="3"></sp-option>
      </sp-select>
      <sp-button slot="append" icon="sp-icon-search"></sp-button>
    </sp-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input9: '',
        input10: '',
        input11: '',
        select: ''
      }
    }
  }
</script>
```
:::


### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text，textarea 和其他原生 input 的 type 值
| value         | 绑定值           | string / number  | — | — |
| maxlength     | 原生属性，最大输入长度      | number          |  —  | — |
| minlength     | 原生属性，最小输入长度      | number          | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| clearable     | 是否可清空        | boolean         | — | false |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium、small 和 mini  | — |
| prefix-icon   | 输入框头部图标    | string          | — | — |
| suffix-icon   | 输入框尾部图标    | string          | — | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }  |  boolean / object | — |  false   |
| autocomplete | 原生属性，自动补全 | string | on, off | off |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |
| step | 原生属性，设置输入字段的合法数字间隔 | — | — | — |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| autofocus | 原生属性，自动获取焦点 | boolean | true, false | false |
| form | 原生属性 | string | — | — |
| label | 输入框关联的label文字 | string | — | — |
| tabindex | 输入框的tabindex | string | - | - |

### Input Slots
| name | 说明 |
|------|--------|
| prefix | 输入框头部内容，只对 `type="text"` 有效 |
| suffix | 输入框尾部内容，只对 `type="text"` 有效 |
| prepend | 输入框前置内容，只对 `type="text"` 有效 |
| append | 输入框后置内容，只对 `type="text"` 有效 |

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 在 Input 值改变时触发 | (value: string \| number) |
| clear | 在点击由 `clearable` 属性生成的清空按钮时触发 | — |

### Input Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点 | — |
| select | 选中 input 中的文字 | — |


<script>
  export default {
    data() {
      return {
        value1: '',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        value2: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        textarea1: '',
        textarea2: '',
        input9: '',
        input10: '',
        input11: '',
        select: ''
      }
    },
    watch: {
      value1(val) {
        console.log(val)
      }
    }
  }
</script>

<style>
.components--main {
  .demo-input-size {
    .sp-input {
      margin-right: 15px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .sp-input {
    width: 200px;
  }
  .sp-textarea {
    width: 300px;
  }
}
</style>