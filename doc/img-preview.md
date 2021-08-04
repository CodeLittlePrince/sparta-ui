# ImgPreview 图片查看器

### 基础用法

:::demo 使用js声明式调用
```vue
<template>
  <sp-row>
    <sp-button type="primary" @click="handleClick">文字按钮</sp-button>
  </sp-row>
</template>

<script>
export default{
  methods: {
    handleClick() {
      this.$sparta.imgPreview('https://i.epay.126.net/a/ge/static/img/ex_supplier_big.837ce916.png')
    }
  }
}
</script>
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| plain     | 是否朴素按钮   | boolean    | — | false   |


<script>
export default{
  methods: {
    handleClick() {
      this.$sparta.imgPreview('https://i.epay.126.net/a/ge/static/img/ex_supplier_big.837ce916.png')
    }
  }
}
</script>