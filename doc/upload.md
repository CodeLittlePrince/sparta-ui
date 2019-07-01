# Upload 上传

输入或选择日期的控件。

### 基础用法

:::demo 通过`v-model`绑定时间数据
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload
      action="http://localhost:9999/upload"
      :processResult="processResult"
      @change="handleChange1"
      multiple
    >
    </sp-upload>
  </div>
</template>

<script>
export default{
  data() {
    return {
      time1: ''
    }
  },
  methods: {
    handleChange1(list) {
      console.log(list)
    },
    processResult(item) {
      return item.path
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value    | 绑定值，默认格式必须为YYYY:MM:DD的字符串   | string  | — | — |
| disabled | 是否禁用 | boolean | — | true |
| disableDay | 是否禁用日期指定的条目 | Function | — | () => false |
| disableMonth | 是否禁用月份指定的条目 | Function | — | () => false |
| disableYear | 是否禁用年份指定的条目 | Function | — | () => false |

<script>
export default{
  data() {
    return {
      time1: '2019-02-11',
      time2: '',
      time3: '2019-07-07'
    }
  },
  methods: {
    handleChange1(list) {
      console.log(list)
    },
    processResult(item) {
      return item.path
    }
  }
}
</script>

<style>
.sp-upload-demo {
  width: 400px;
}
</style>