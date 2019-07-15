# TimePicker 时间选择框

当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

### 基础用法

:::demo 通过`v-model`绑定时间数据
```vue
<template>
  <div class="sp-time-pikcer-demo">
    <sp-time-picker v-model="time1" />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time1: '12:11:30'
    }
  }
}
</script>
```
:::

### 选择时分

:::demo 通过`needSecond`属性控制
```vue
<template>
  <div class="sp-time-pikcer-demo">
    <sp-time-picker
      v-model="time2"
      :needSecond="false"
    />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time2: ''
    }
  }
}
</script>
```
:::

### 禁用条目

:::demo 通过`disableHour`、`disableMinute`或`disableSecond`属性控制
```vue
<template>
  <div class="sp-time-pikcer-demo">
    <sp-time-picker
      v-model="time3"
      :needSecond="false"
      :disableHour="handleDisableHour"
    />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time3: ''
    }
  }
}
</script>
```
:::

### 禁用

:::demo 通过`disabled`属性控制
```vue
<template>
  <div class="sp-time-pikcer-demo">
    <sp-time-picker
      v-model="time4"
      disabled
    />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time4: ''
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value    | 绑定值，默认格式必须为aa:bb:cc的字符串   | string  | — | — |
| needSecond | 是否需要填写分 | boolean | — | true |
| disabled | 是否禁用 | boolean | — | true |
| disableHour | 是否禁用时间指定的条目 | Function | — | () => false |

<script>
export default{
  data() {
    return {
      time1: '12:11:30',
      time2: '',
      time3: '',
      time4: '07:07:07'
    }
  },
  watch: {
    time1(val) {
      console.log(val)
    }
  },
  methods: {
    handleDisableHour(hour) {
      return -1 < ['01', '02', '03'].indexOf(hour)
    }
  }
}
</script>

<style>
.sp-time-pikcer-demo {
  width: 200px;
}
</style>