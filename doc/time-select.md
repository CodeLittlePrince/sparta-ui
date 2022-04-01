# TimeSelect 时间选择框

当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

### 基础用法

:::demo 通过`v-model`绑定时间数据， 可以通过picker-options里面的start,end控制可选范围
```vue
<template>
  <div class="sp-time-picker-demo">
    <sp-time-select 
      v-model="time1" 
      clearable 
      :disabled-time="handleDisabledTime" 
      :picker-options="{ start: '02:00', end: '20:00' }"/>
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
    handleDisabledTime(currentVal) {
      return ['10:00'].includes(currentVal)
    }
  }
}
</script>
```
:::

### 可以在可选的范围内设置最大和最小的可选值

:::demo 通过`v-model`绑定时间数据
```vue
<template>
  <div class="sp-time-picker-demo">
    <sp-time-select 
      v-model="time3" 
      clearable 
      :picker-options="{ minTime: '02:00', maxTime: '13:00' }"/>
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

### 基础时间范围选择

:::demo 通过`v-model`绑定时间数据
```vue
<template>
  <div class="sp-time-picker-demo">
    <sp-time-select v-model="time2" 
    clearable 
    type="range"/>
  </div>
</template>

<script>
export default{
  data() {
    return {
      time2: []
    }
  }
}
</script>
```
:::

### 时间范围选择 - 设置禁用状态

:::demo 通过`v-model`绑定时间数据
```vue
<template>
  <div class="sp-time-picker-demo">
    <sp-time-select v-model="time5" 
    clearable 
    type="range"
    :disabled-time-start="handleDisabledTimeStart"
    :disabled-time-end="handleDisabledTimeEnd"/>
  </div>
</template>

<script>
export default{
  data() {
    return {
      time5: ['00:00', '23:00']
    }
  },
  methods: {
    handleDisabledTimeStart(currentVal) {
      return ['24:00'].includes(currentVal)
    },
    handleDisabledTimeEnd(currentVal) {
      return ['20:00','24:00'].includes(currentVal)
    }
  }
}
</script>
```
:::

### 时间范围选择 设置间隔时间

:::demo 通过`v-model`绑定时间数据
```vue
<template>
  <div class="sp-time-picker-demo">
    <sp-time-select v-model="time4" 
    clearable 
    type="range"
    :picker-options="{ 
      step: '00:15'
    }"
    />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time4: ['09:00', '11:00']
    }
  }
}
</script>
```
:::


### 时间范围选择 设置时间可选范围

:::demo 通过`v-model`绑定时间数据
```vue
<template>
  <div class="sp-time-picker-demo">
    <sp-time-select v-model="time6" 
    clearable 
    type="range"
    :picker-options="{ 
      start: '05:00',
      end: '23:00'
    }"
    />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time6: []
    }
  }
}
</script>
```
:::

### 时间范围选择 设置时间最大最小可选值

:::demo 通过`v-model`绑定时间数据
```vue
<template>
  <div class="sp-time-picker-demo">
    <sp-time-select v-model="time7" 
    clearable 
    type="range"
    :picker-options="{ 
      minTime: '02:00',
      maxTime: '22:00'
    }"
    />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time7: []
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value    | 绑定值，<br/>type为timeselect的默认格式是字符串 <br/>type为range的默认格式是字符串   | string/array  | — | — |
| type | 时间选择组件类型 | string | —/range | timeselect |
| disabled | 是否禁用 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | false |
| pickerOptions | 当前选择器特有的选项参考下表 | Object | — | {} |
| placeholder | 非范围选择时的占位内容 | string | — | 请选择时间 |
| startPlaceholder | 范围选择时开始时间的占位内容 | string | — | 开始时间 |
| endPlaceholder | 范围选择时结束时间的占位内容 | string | — | 结束时间 |
| disabledTime | 非范围选择时，设置禁用状态，参数为当前时间，要求返回 Boolean | Function | — | (val) => false |
| disabledTimeStart | 范围选择时，设置开始时间禁用状态，参数为当前时间，要求返回 Boolean | Function | — | (val) => false |
| disabledTimeEnd | 范围选择时，设置结束时间禁用状态，参数为当前时间，要求返回 Boolean | Function | — | (val) => false |
| scrollBindElement | 设置scroll事件监听的元素 | string/Element | — | - |

### Time Select Options
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| start    | 开始时间| string  | — | 00:00 |
| end | 结束时间 | string | — | 24:00 |
| step | 间隔时间 | string | — | 01:00 |
| minTime | 最小时间，小于该时间的时间段将被禁用 | string | — | 00:00 |
| maxTime | 最大时间，大于该时间的时间段将被禁用 | string | — | — |

<script>
export default{
  data() {
    return {
      time1: '',
      time3: '',
      time2: [],
      time4: ['09:00', '11:00'],
      time5: ['00:00', '23:00'],
      time6: [],
      time7: []
    }
  },
  watch: {
    time1(val) {
      console.log(val)
    },
    time2(val) {
      console.log(val)
    },
    time3(val) {
      console.log(val)
    },
    time4(val) {
      console.log(val)
    },
    time5(val) {
      console.log(val)
    },
    time6(val) {
      console.log(val)
    },
    time7(val) {
      console.log(val)
    },
  },
  methods: {
    handleDisabledTime(currentVal) {
      return ['10:00'].includes(currentVal)
    },
    handleDisabledTimeStart(currentVal) {
      return ['24:00'].includes(currentVal)
    },
    handleDisabledTimeEnd(currentVal) {
      return ['20:00','24:00'].includes(currentVal)
    }
  }
}
</script>

<style>
.sp-time-picker-demo {
  width: 400px;
}
</style>