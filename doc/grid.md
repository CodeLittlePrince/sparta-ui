# Grid 栅格
通过基础的 24 分栏，迅速简便地创建布局。

### 基础布局
使用单一分栏创建基础的栅格布局。

:::demo 通过 row 和 col 组件，并通过 col 组件的 span 属性我们就可以自由地组合布局。
```vue
<template>
  <sp-row>
    <sp-col :span="24"><div class="grid-content bg-purple-dark"></div></sp-col>
  </sp-row>
  <sp-row>
    <sp-col :span="12"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="12"><div class="grid-content bg-purple-light"></div></sp-col>
  </sp-row>
  <sp-row>
    <sp-col :span="8"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="8"><div class="grid-content bg-purple-light"></div></sp-col>
    <sp-col :span="8"><div class="grid-content bg-purple"></div></sp-col>
  </sp-row>
  <sp-row>
    <sp-col :span="6"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="6"><div class="grid-content bg-purple-light"></div></sp-col>
    <sp-col :span="6"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="6"><div class="grid-content bg-purple-light"></div></sp-col>
  </sp-row>
  <sp-row>
    <sp-col :span="4"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="4"><div class="grid-content bg-purple-light"></div></sp-col>
    <sp-col :span="4"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="4"><div class="grid-content bg-purple-light"></div></sp-col>
    <sp-col :span="4"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="4"><div class="grid-content bg-purple-light"></div></sp-col>
  </sp-row>
</template>
```
:::

### 分栏间隔
分栏之间存在间隔。

:::demo Row 组件 提供 `gutter` 属性来指定每一栏之间的间隔，默认间隔为 0。
```vue
<template>
  <sp-row :gutter="20">
    <sp-col :span="6"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="6"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="6"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="6"><div class="grid-content bg-purple"></div></sp-col>
  </sp-row>
</template>
```
:::

### 混合布局
分栏之间存在间隔。

:::demo 通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。
```vue
<template>
  <sp-row :gutter="20">
    <sp-col :span="16"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="8"><div class="grid-content bg-purple"></div></sp-col>
  </sp-row>
  <sp-row :gutter="20">
    <sp-col :span="8"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="8"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="4"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="4"><div class="grid-content bg-purple"></div></sp-col>
  </sp-row>
  <sp-row :gutter="20">
    <sp-col :span="4"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="16"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="4"><div class="grid-content bg-purple"></div></sp-col>
  </sp-row>
</template>
```
:::

### 分栏偏移
支持偏移指定的栏数。

:::demo 通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。
```vue
<template>
  <sp-row :gutter="20">
    <sp-col :span="6"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></sp-col>
  </sp-row>
  <sp-row :gutter="20">
    <sp-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></sp-col>
  </sp-row>
  <sp-row :gutter="20">
    <sp-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></sp-col>
  </sp-row>
</template>
```
:::

### 响应式布局
参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。

:::demo 通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。
```vue
<template>
  <sp-row :gutter="10">
    <sp-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></sp-col>
    <sp-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></sp-col>
    <sp-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></sp-col>
  </sp-row>
</template>
```
:::

### 基于断点的隐藏类
用于在某些条件下隐藏元素。这些类名可以添加在任何 DOM 元素或自定义组件上。

包含的类名及其含义为：
- `hidden-xs-only` - 当视口在 `xs` 尺寸时隐藏
- `hidden-sm-only` - 当视口在 `sm` 尺寸时隐藏
- `hidden-sm-and-down` - 当视口在 `sm` 及以下尺寸时隐藏
- `hidden-sm-and-up` - 当视口在 `sm` 及以上尺寸时隐藏
- `hidden-md-only` - 当视口在 `md` 尺寸时隐藏
- `hidden-md-and-down` - 当视口在 `md` 及以下尺寸时隐藏
- `hidden-md-and-up` - 当视口在 `md` 及以上尺寸时隐藏
- `hidden-lg-only` - 当视口在 `lg` 尺寸时隐藏
- `hidden-lg-and-down` - 当视口在 `lg` 及以下尺寸时隐藏
- `hidden-lg-and-up` - 当视口在 `lg` 及以上尺寸时隐藏
- `hidden-xl-only` - 当视口在 `xl` 尺寸时隐藏


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| list | 设置 table 数据源 | array | — | [] |
| emptyText | 设置 table 没有数据时候的默认文案| string | — | '无相关数据' |
| loading | 设置 table 是否处于加载，如果是则会出现loading bar | boolean | — | false |
| cellEmptyText | 设置单元格没有数据的默认文案 | string | — | '--' |
| cellEmptyText | 设置单元格没有数据的默认文案 | string | — | '--' |
| formatter | 设置单元格数据格式化方法 | function | — | — |

### Slot
| name | 说明 |
|------|--------|
| — | modal 的内容 |
| foot | modal 按钮操作区的内容 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close  | modal 关闭的回调 | — |
| show  | modal 打开的回调 | — |

<script>
export default{
  data(){
    return {
      type: 'primary'
    }
  }
}
</script>

<style>
  .sp-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .sp-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>