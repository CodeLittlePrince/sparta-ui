# Radio单选框
单选框。

### 何时使用
- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

### 基本用法
建议都用`radio-group`方式使用。
:::demo 通过`v-model`绑定变量
```vue
<template>
  <div class="sp-radio-demo">
    <sp-radio
      label="apple"
      v-model="value1"
    >苹果</sp-radio>
    <sp-radio
      label="banana"
      v-model="value1"
    >香蕉</sp-radio>
  </div>
</template>

<script>
export default{
  data() {
    return {
      value1: ''
    }
  }
}
</script>

```
:::

### 禁用状态
:::demo 通过设置`disabled`禁用
```vue
<template>
  <div class="sp-radio-demo">
    <sp-radio
      label="apple"
      disabled
    >苹果</sp-radio>
    <sp-radio
      label="banana"
      disabled
    >香蕉</sp-radio>
  </div>
</template>
```
:::

### 单选组合
:::demo 只需要在`group`用v-model来做数据绑定
```vue
<template>
  <div class="sp-radio-demo">
    <p>单选组:</p>
    </br>
    <sp-radio-group v-model="value2">
      <sp-radio label="apple">苹果</sp-radio>
      <sp-radio label="banana">香蕉</sp-radio>
      <sp-radio label="pear">梨</sp-radio>
    </sp-radio-group>
  </div>
</template>

<script>
export default{
  data() {
    return {
      value2: 'apple'
    }
  }
}
</script>
```
:::

### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value   | string / number / boolean | — | — |
| disabled  | 是否禁用    | boolean   | — | false   |

### Radio Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

<script>
export default{
  data() {
    return {
      value1: '',
      value2: 'apple'
    }
  }
}
</script>

<style>
.sp-radio-demo {
  .sp-radio-wrap {
    margin-right: 10px;
  }
}
</style>