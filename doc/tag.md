# Tag 标签

### 基础用法
适用广泛的基础标签

:::demo 由`type`属性来选择tag的类型
```vue
<template>
  <sp-tag>默认</sp-tag>
  <sp-tag type="success">成功</sp-tag>
  <sp-tag type="warning">警告</sp-tag>
  <sp-tag type="info">消息</sp-tag>
  <sp-tag type="danger">危险</sp-tag>
</template>

```
:::

### 可移除
动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现

:::demo 设置`closable`属性可以定义一个标签是否可移除
```vue
<template>
  <sp-tag closable>默认</sp-tag>
  <sp-tag type="success" closable>成功</sp-tag>
  <sp-tag type="warning" closable>警告</sp-tag>
  <sp-tag type="info" closable>消息</sp-tag>
  <sp-tag type="danger" closable>危险</sp-tag>
</template>

```
:::

### 可移除或增加（操作）
动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现（注意：循环使用tag，key是必须的，否则会引起动画错乱）

:::demo 通过控制数据源来操作`tag`的增减
```vue
<template>
  <sp-tag
    closable
    v-for="item in tags"
    :key="item.label"
    @close="handleClose(item)"
  >{{ item.label }}</sp-tag>
</template>

<script>
export default{
  data() {
    return {
      tags: [
        { label: 'Kitty', value: 1 },
        { label: 'Jack', value: 2 },
        { label: 'Lucy', value: 3 }
      ]
    }
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type | 主题 | string | success/info/warning/danger | — |
| closable | 是否可关闭 | boolean | — | false |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close  | 关闭 Tag 时触发的事件 | — |

<script>
export default{
  data() {
    return {
      tags: [
        { label: 'Kitty', value: 1 },
        { label: 'Jack', value: 2 },
        { label: 'Lucy', value: 3 }
      ]
    }
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    }
  }
}
</script>

<style>
  .sp-tag {
    margin-right: 5px;
  }
</style>