# Button 按钮

### 基础用法

:::demo 使用`type`、`plain`属性来定义 Button 的样式。
```vue
<template>
  <div class="md-demo-button">
    <sp-row>
      <sp-button>默认按钮</sp-button>
      <sp-button type="primary">主要按钮</sp-button>
      <sp-button plain>较弱按钮</sp-button>
    </sp-row>
  </div>
</template>
```
:::


### 禁用状态

:::demo 你可以使用 `disabled` 属性来定义按钮是否可用，它接受一个Boolean值。
```vue
<template>
  <div class="md-demo-button">
    <sp-row>
      <sp-button disabled>默认按钮</sp-button>
      <sp-button type="primary" disabled>主要按钮</sp-button>
      <sp-button plain disabled>朴素按钮</sp-button>
    </sp-row>
  </div>
</template>
```
:::


### 文字按钮

:::demo `type`为`text`即可
```vue
<template>
  <div class="md-demo-button">
    <sp-row>
      <sp-button type="text">文字按钮</sp-button>
      <sp-button type="text" disabled>文字按钮</sp-button>
    </sp-row>
  </div>
</template>
```
:::


### 图标按钮

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。
```vue
<template>
  <div class="md-demo-button">
    <sp-row>
      <sp-button type="primary" icon="sp-icon-view"></sp-button>
      <sp-button type="primary" icon="sp-icon-delete"></sp-button>
      <sp-button type="primary" icon="sp-icon-search">搜索</sp-button>
      <sp-button type="primary">日期<i class="sp-icon-calendar sp-icon--right"></i></sp-button>
    </sp-row>
  </div>
</template>
```
:::

### 加载中

:::demo 要设置为 `loading` 状态，只要设置`loading`属性为`true`即可。
```vue
<template>
  <div class="md-demo-button">
    <sp-button :loading="true">加载中</sp-button>
    <sp-button :loading="true" type="primary">加载中</sp-button>
    <sp-button :loading="true" plain>加载中</sp-button>
    <sp-button :loading="true" type="text">加载中</sp-button>
  </div>
</template>
```
:::


### 不同尺寸

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。
```vue
<template>
  <div class="md-demo-button">
    <sp-row>
      <sp-button type="primary">default</sp-button>
      <sp-button type="primary" size="medium">medium</sp-button>
      <sp-button type="primary" size="small">small</sp-button>
      <sp-button type="primary" size="mini">mini</sp-button>
    </sp-row>
  </div>
</template>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| type     | 类型   | string    |   primary / text |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| click  | 点击事件 | e |

<style>
  .components--main {
    .md-demo-button .sp-row .sp-button{
      margin-left: 10px;
      margin-bottom: 10px;
    }
    .md-demo-button .sp-icon--right {
      margin-left: 5px;
    }
  }
</style>