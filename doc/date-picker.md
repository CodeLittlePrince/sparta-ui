# DatePicker 日期选择框

输入或选择日期的控件。

### 基础用法

:::demo 通过`v-model`绑定时间数据
```vue
<template>
  <div class="sp-date-pikcer-demo">
    <sp-date-picker v-model="time1" />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time1: ''
    }
  }
}
</script>
```
:::

### 禁用年/月/日

:::demo 通过`disableYear`、`disableMonth`、`disableDay`控制
```vue
<template>
  <div class="sp-date-pikcer-demo">
    <sp-date-picker
      v-model="time2"
      :disableYear="disableYear2"
      :disableMonth="disableMonth2"
      :disableDay="disableDay2"
    />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time2: ''
    }
  },
  methods: {
    disableYear2(year) {
      return year < 2018
    },
    disableMonth2(month) {
      return month < 6
    },
    disableDay2(day) {
      return day < 10
    }
  }
}
</script>
```
:::

### 禁用
:::demo 通过`disabled`控制
```vue
<template>
  <div class="sp-date-pikcer-demo">
    <sp-date-picker
      v-model="time3"
      disabled
    />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time3: '2019-07-07'
    }
  }
}
</script>
```
:::

### 范围
:::demo 通过`disabled`控制
```vue
<template>
  <div class="">
    <sp-date-picker
      v-model="time4"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time4: []
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
      time3: '2019-07-07',
      time4: []
    }
  },
  watch: {
    time1(val) {
      console.log(val)
    },
    time4(val) {
      console.log(val)
    }
  },
  methods: {
    disableYear2(year) {
      return year < 2018
    },
    disableMonth2(month) {
      return month < 6
    },
    disableDay2(day) {
      return day < 10
    }
  }
}
</script>

<style>
.sp-date-pikcer-demo {
  width: 200px;
}
</style>