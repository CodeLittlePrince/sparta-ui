# Pagination 分页
分页组件

### 基本用法
一般配合`table`使用

:::demo 直接引用`sp-pagination`加必要的属性即可
```vue
<template>
  <sp-pagination
    align="middle"
    page-index="2"
    total="160"
    page-size="10"
    @change="pageChange">
  </sp-pagination>
</template>

<script>
export default{
  methods: {
    pageChange(index, pageSize) {
      console.log(index, pageSize)
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| perPages | 可见数字按钮的数量（必须是奇数） | string/number | — | '7' |
| pageIndex | 当前页码 | string/number | — | '1' |
| pageSize | 每页显示条数 | string/number | — | '10' |
| total | 总记录数 | string/number | — | '1' |
| align | 表格以哪对齐 | string/number | 'middle'/'left'/'right' | 'right' |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 改变页码时的回调 | (index, pageSize) index为当前页码，pageSize为每页显示条数 |

<script>
export default{
  methods: {
    pageChange(index, pageSize) {
      console.log(index, pageSize)
    }
  }
}
</script>