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
```
:::

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