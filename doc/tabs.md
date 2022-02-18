# Tabs 标签页
选项卡切换组件。


### 基本用法
:::demo 使用`sp-tabs`加`sp-tab-pane`实现tab
```vue
<template>
  <sp-tabs v-model="tabsValue1">
    <sp-tab-pane
      tab="TAB1"
      value="A"
    >
      <div class="tabs-demo-content">TAB1 page</div>
    </sp-tab-pane>
    <sp-tab-pane
      tab="TAB2"
      value="B"
    >
      <div class="tabs-demo-content">TAB2 page</div>
    </sp-tab-pane>
    <sp-tab-pane
      tab="TAB3"
      value="C"
    >
      <div class="tabs-demo-content">TAB3 page</div>
    </sp-tab-pane>
  </sp-tabs>
</template>

<script>
export default{
  data() {
    return {
      tabsValue1: 'A'
    }
  }
}
</script>

```
:::

### 禁用tab条目
:::demo 由`disabled`属性来禁用
```vue
<template>
  <sp-tabs v-model="tabsValue2">
    <sp-tab-pane
      tab="TAB1"
      value="A"
    >
      <div class="tabs-demo-content">TAB1 page</div>
    </sp-tab-pane>
    <sp-tab-pane
      tab="TAB2"
      value="B"
      disabled
    >
      <div class="tabs-demo-content">TAB2 page</div>
    </sp-tab-pane>
    <sp-tab-pane
      tab="TAB3"
      value="C"
    >
      <div class="tabs-demo-content">TAB3 page</div>
    </sp-tab-pane>
  </sp-tabs>
</template>

<script>
export default{
  data() {
    return {
      tabsValue2: 'A'
    }
  }
}
</script>

```
:::

### Tabs Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model     | 绑定值，选中选项卡的 value   | string/number/boolean   | -  |     ''    |

### Tab-pane Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| tab     | 选项卡标题   | string   | — |    —     |
| value | 选项卡的值 | string/number/boolean | — | '' |
| disabled   | 禁用 | Boolan | — | - | false

<script>
export default{
  data() {
    return {
      tabsValue1: 'A',
      tabsValue2: 'A'
    }
  }
}
</script>

<style>
.components--main {
  .tabs-demo-content {
    padding: 16px;
  }
}
</style>
