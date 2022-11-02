# Layout 布局
协助进行页面级整体布局。

### 组件概述
- `Layout` - 布局容器，其下可嵌套 Header Asider Main Footer 或 Layout 本身，可以放在任何父容器中。
- `Header` - 顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
- `Asider` - 侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。
- `Main` - 内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
- `Footer` - 底部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

:::demo Layout和Header Asider Main Footer搭配
```vue
<template>
  <!-- example-1 -->
  <sp-layout class="md-layout-wrap">
    <sp-header>header</sp-header>
    <sp-main>main</sp-main>
    <sp-footer>footer</sp-footer>
  </sp-layout>
  <!-- example-2 -->
  <sp-layout class="md-layout-wrap">
    <sp-header>header</sp-header>
    <sp-layout>
      <sp-aside>aside</sp-aside>
      <sp-main>main</sp-main>
    </sp-layout>
    <sp-footer>footer</sp-footer>
  </sp-layout>
  <!-- example-3 -->
  <sp-layout class="md-layout-wrap">
    <sp-header>header</sp-header>
    <sp-layout>
      <sp-aside pull="right">aside</sp-aside>
      <sp-main>main</sp-main>
    </sp-layout>
    <sp-footer>footer</sp-footer>
  </sp-layout>
</template>

```
:::

### Layout Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| width | 宽度 | string | — | 100% |

### Header Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 顶栏高度 | string | — | 60px |

### Aside Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| width | 侧边栏宽度 | string | — | 200px |

### Footer Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 底栏高度 | string | — | 60px |

<style>
  .components--main .md-layout-wrap {
    margin-top: 30px;
  }
  .components--main .md-layout-wrap:first-child {
    margin-top: 0;
  }
  .components--main .sp-header,
  .components--main .sp-footer {
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-size: 22px;
    background-color: #7dbcea;
  }
  .components--main .sp-main,
  .components--main .sp-aside {
    text-align: center;
    color: #fff;
    font-size: 22px;
    background-color: #108ee9;
    height: 120px;
    min-height: 120px;
    line-height: 120px;
  }
  .components--main .sp-aside {
    background-color: #3ba0e9;
  }
</style>