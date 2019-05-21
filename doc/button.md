# Button 按钮

### 基础用法

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。
```vue
<template>
  <div class="md-demo-button">
    <sp-row>
      <sp-button>默认按钮</sp-button>
      <sp-button type="primary">主要按钮</sp-button>
      <sp-button type="success">成功按钮</sp-button>
      <sp-button type="info">信息按钮</sp-button>
      <sp-button type="warning">警告按钮</sp-button>
      <sp-button type="danger">危险按钮</sp-button>
    </sp-row>
    <sp-row>
      <sp-button plain>朴素按钮</sp-button>
      <sp-button type="primary" plain>主要按钮</sp-button>
      <sp-button type="success" plain>成功按钮</sp-button>
      <sp-button type="info" plain>信息按钮</sp-button>
      <sp-button type="warning" plain>警告按钮</sp-button>
      <sp-button type="danger" plain>危险按钮</sp-button>
    </sp-row>
    <sp-row>
      <sp-button round>圆角按钮</sp-button>
      <sp-button type="primary" round>主要按钮</sp-button>
      <sp-button type="success" round>成功按钮</sp-button>
      <sp-button type="info" round>信息按钮</sp-button>
      <sp-button type="warning" round>警告按钮</sp-button>
      <sp-button type="danger" round>危险按钮</sp-button>
    </sp-row>
    <sp-row>
      <sp-button icon="sp-icon-search" circle></sp-button>
      <sp-button type="primary" icon="sp-icon-edit" circle></sp-button>
      <sp-button type="success" icon="sp-icon-check" circle></sp-button>
      <sp-button type="info" icon="sp-icon-message" circle></sp-button>
      <sp-button type="warning" icon="sp-icon-star-off" circle></sp-button>
      <sp-button type="danger" icon="sp-icon-delete" circle></sp-button>
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
      <sp-button type="success" disabled>成功按钮</sp-button>
      <sp-button type="info" disabled>信息按钮</sp-button>
      <sp-button type="warning" disabled>警告按钮</sp-button>
      <sp-button type="danger" disabled>危险按钮</sp-button>
    </sp-row>
    <sp-row>
      <sp-button plain disabled>朴素按钮</sp-button>
      <sp-button type="primary" plain disabled>主要按钮</sp-button>
      <sp-button type="success" plain disabled>成功按钮</sp-button>
      <sp-button type="info" plain disabled>信息按钮</sp-button>
      <sp-button type="warning" plain disabled>警告按钮</sp-button>
      <sp-button type="danger" plain disabled>危险按钮</sp-button>
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
      <sp-button type="primary" icon="sp-icon-edit"></sp-button>
      <sp-button type="primary" icon="sp-icon-share"></sp-button>
      <sp-button type="primary" icon="sp-icon-delete"></sp-button>
      <sp-button type="primary" icon="sp-icon-search">搜索</sp-button>
      <sp-button type="primary">上传<i class="sp-icon-upload sp-icon--right"></i></sp-button>
    </sp-row>
  </div>
</template>
```
:::

### 按钮组

:::demo 使用`<sp-button-group>`标签来嵌套你的按钮。
```vue
<template>
  <div class="md-demo-button">
    <sp-button-group>
      <sp-button type="primary" icon="sp-icon-arrow-left">上一页</sp-button>
      <sp-button type="primary">下一页<i class="sp-icon-arrow-right sp-icon--right"></i></sp-button>
    </sp-button-group>
    <sp-button-group>
      <sp-button type="primary" icon="sp-icon-edit"></sp-button>
      <sp-button type="primary" icon="sp-icon-share"></sp-button>
      <sp-button type="primary" icon="sp-icon-delete"></sp-button>
    </sp-button-group>
  </div>
</template>
```
:::


### 加载中

:::demo 要设置为 `loading` 状态，只要设置`loading`属性为`true`即可。
```vue
<template>
  <div class="md-demo-button">
    <sp-button type="primary" :loading="true">加载中</sp-button>
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
      <sp-button>默认按钮</sp-button>
      <sp-button size="medium">中等按钮</sp-button>
      <sp-button size="small">小型按钮</sp-button>
      <sp-button size="mini">超小按钮</sp-button>
    </sp-row>
    <sp-row>
      <sp-button round>默认按钮</sp-button>
      <sp-button size="medium" round>中等按钮</sp-button>
      <sp-button size="small" round>小型按钮</sp-button>
      <sp-button size="mini" round>超小按钮</sp-button>
    </sp-row>
  </div>
</template>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| type     | 类型   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| round     | 是否圆角按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |


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