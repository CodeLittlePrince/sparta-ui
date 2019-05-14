# Button 按钮

:::demo 我就是一个小小的demo
```html
<template>
  <sp-button :type="type">click</sp-button>
</template>

<script>
export default {
  data() {
    return {
      type: 'primary'
    }
  }
}
</script>
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