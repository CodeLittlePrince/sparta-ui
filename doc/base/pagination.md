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

### 不可点击状态

:::demo 直接引用`sp-pagination`加disabled属性即可
```vue
<template>
  <sp-pagination
    align="middle"
    page-index="2"
    total="160"
    page-size="10"
    disabled
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

### 附加功能
一般配合`table`使用

:::demo 直接引用`sp-pagination`根据场景需要，可以添加其他功能模块。
```vue
<template>
  <div>
    <div>
      显示总页数
      <sp-pagination
        align="middle"
        page-index="2"
        total="160"
        page-size="10"
        layout="total"
        @change="pageChange">
      </sp-pagination>
    </div>
    <div>
      调整每页显示条数
      <sp-pagination
        align="middle"
        page-index="2"
        total="160"
        page-size="10"
        :page-sizes="[10,50,100]"
        layout="sizes"
        @change="pageChange">
      </sp-pagination>
    </div>
    <div>
      直接前往
      <sp-pagination
        align="middle"
        page-index="2"
        total="160"
        page-size="10"
        layout="jumper"
        @change="pageChange">
      </sp-pagination>
    </div>
    <div>
      完整功能
      <sp-pagination
        align="middle"
        page-index="2"
        total="160"
        page-size="10"
        :page-sizes="[5,50,100]"
        layout="total,sizes,jumper"
        @size-change="sizeChange"
        @change="pageChange">
      </sp-pagination>
    </div>
  </div>
</template>

<script>
export default{
  methods: {
    pageChange(index, pageSize) {
      console.log(index, pageSize)
    },
    sizeChange(pageSize) {
      console.log("pageSize", pageSize)
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
| layout | 组件布局，子组件名用逗号分隔 | string | 'total'/'sizes'/'jumper' | — |
| page-sizes | 每页显示个数选择器的选项设置 | number | [10, 20, 30, 40, 50, 100] |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 改变页码时的回调 | (index, pageSize) index为当前页码，pageSize为每页显示条数 |
| size-change  | pageSize 改变时会触发 | (pageSize) pageSize为每页显示条数 |

<script>
export default{
  methods: {
    pageChange(index, pageSize) {
      console.log(index, pageSize)
    },
    sizeChange(pageSize) {
      console.log("pageSize", pageSize)
    }
  }
}
</script>