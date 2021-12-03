# DatePicker 日期选择框

输入或选择日期的控件。

### 基础用法

:::demo 通过`v-model`绑定时间数据
```vue
<template>
  <div class="sp-date-pikcer-demo">
   <p class="sp-date-pikcer-demo-p">默认: {{ time1 }}</p>
    <sp-date-picker v-model="time1" clearable  />
  </div>

  <div class="sp-date-pikcer-demo">
    <p class="sp-date-pikcer-demo-p">设置默认时间: {{ time1_1 }}</p>
    <sp-date-picker v-model="time1_1" clearable default-time="12:00:00" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      time1: new Date('2019/02/11').getTime(),
      time1_1: new Date('2019/02/11').getTime(),
    }
  }
}
</script>
```
:::

### 不可选择的日期

:::demo 通过`disableDate`控制
```vue
<template>
  <div class="sp-date-pikcer-demo">
    <sp-date-picker
      v-model="time2"
      :disable-date="disableDate"
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
    disableDate(date) {
      return date.getTime() > Date.now()
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
:::demo `type`设置为`daterange`即可
```vue
<template>
  <div class="">
    <sp-date-picker
      v-model="time4"
      type="daterange"
      clearable
      @change="handleDaterangeChange"
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

### 显示时分秒

:::demo 通过`showTime`显示
```vue
<template>
    <div>
      <sp-date-picker
        v-model="time5"
        :show-time="true"
        @change="handleDateChange"
      ></sp-date-picker>
    </div>
    <div style="margin-top: 20px">
      <sp-date-picker
        v-model="time6"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        :show-time="true"
      ></sp-date-picker>
    </div>
</template>

<script>
export default{
  data() {
    return {
      time5: '',
      time6: ''
    }
  },
  methods: {
    handleDateChange(value){
      console.log('change', value)
    }
  }
}
</script>
```
:::

### 禁用时分秒

:::demo 通过`disableTime`禁用
```vue
<template>
    <div>
      <sp-date-picker
        v-model="time7"
        :show-time="true"
        :disable-time="disabledDateTime"
      ></sp-date-picker>
    </div>
    <div style="margin-top: 20px">
      <sp-date-picker
        v-model="time8"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        :disable-time="disabledRangeTime"
        :show-time="true"
      ></sp-date-picker>
    </div>
</template>

<script>
export default{
  data() {
    return {
      time7: '',
      time8: ''
    }
  },
  methods: {
    disabledDateTime(){
      return {
        disableHour: () => [10, 20], // 0-23
        disableMinute: () => [20, 30], // 0-59
        disableSecond: () => [55, 56] // 0-59
      }
    },
    disabledRangeTime(type){
      if (type === 'start') {
        return {
          disableHour: () => [13, 16],
          disableMinute: () => [20, 30],
          disableSecond: () => [55, 56]
        }
      }
      return {
        disableHour: () => [20, 22],
        disableMinute: () => [30, 59],
        disableSecond: () => [55, 56]
      }
    }
  }
}
</script>
```
:::

### 其他日期单位

:::demo 通过`type`,可以选月、年
```vue
<template>
    <div>
      <p class="sp-date-pikcer-demo-p">月: {{ month }}</p>
      <sp-date-picker
        type="month"
        v-model="month"
      ></sp-date-picker>
    </div>
    <div style="margin-top: 20px">
      <p class="sp-date-pikcer-demo-p">年: {{ year }}</p>
      <sp-date-picker
        v-model="year"
        type="year"
      ></sp-date-picker>
    </div>
</template>

<script>
export default{
  data() {
    return {
      month: '',
      year: '',
    }
  }
}
</script>
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value    | 绑定值，默认格式必须为yyyy-MM-dd的字符串或long类型,showTime模式下格式必须为yyyy-MM-dd hh:mm:ss或long类型   | string/number  | — | — |
| type | 日期组件类型 | string | date/daterange/month/year | date |
| value-format | 可选，绑定值的格式。不指定则绑定值为 long 类型 | number/string | yyyy-MM-dd / yyyy-MM-dd hh:mm:ss | — |
| default-time | 选中日期后的默认具体时刻 | 非范围选择时：string / 范围选择时：string[] | 非范围选择时：形如12:00:00的字符串；范围选择时：数组，长度为 2，每项值为字符串，形如12:00:00，第一项指定开始日期的时刻，第二项指定结束日期的时刻。不指定会使用时刻 00:00:00 | 00:00:00 / ['00:00:00', '23:59:59'] |
| showTime | 是否显示时分秒。仅在type为date/daterange时生效 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | true |
| disabledDate | 设置禁用状态，参数为当前日期，要求返回 Boolean | Function | — | function (new Date()) => false |
| disabledTime | 不可选择的时间 | Function | — | function () => {} |
| placeholder | 非范围选择时的占位内容 | string | — | 请选择日期 |
| start-placeholder | 类型为daterange情况下的开始placeholder文案 | string | — | 开始日期 |
| end-placeholder | 类型为daterange情况下的结束placeholder文案 | string | — | 结束日期 |
| clearable | 是否展示清空按钮 | boolean | — | false |

### Events
| 事件名称      | 说明    | 回调参数      | 
|---------- |-------- |---------- |
| change | 用户确认选定的值时触发 | 组件绑定值 |

<script>
export default{
  data() {
    return {
      time1: new Date('2019/02/11').getTime(),
      time1_1: new Date('2019/02/11 12:00:00').getTime(),
      time2: '',
      time3: '2019-07-07',
      time4: [new Date('2019/02/11').getTime(), new Date('2021/11/12').getTime()],
      time5: '',
      time6: '',
      time7: '',
      time8: '',
      month: '',
      year: '',
    }
  },
  watch: {
    time1(val) {
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
    }
  },
  methods: {
    disableDate(date) {
      return date.getTime() > Date.now()
    },
    disabaleRange(date){
      return date.getTime() < this.time4[0] || date.getTime() > this.time4[1]
    },
    disabledDateTime(){
      return {
        disableHour: () => [10, 20], // 0-23
        disableMinute: () => [20, 30], // 0-59
        disableSecond: () => [55, 56] // 0-59
      }
    },
    disabledRangeTime(type){
      if (type === 'start') {
        return {
          disableHour: () => [13, 16],
          disableMinute: () => [20, 30],
          disableSecond: () => [55, 56]
        }
      }
      return {
        disableHour: () => [20, 22],
        disableMinute: () => [30, 59],
        disableSecond: () => [55, 56]
      }
    },
    handleDaterangeChange(value){
      console.log('change', value)
    },
    handleDateChange(value){
      console.log('change', value)
    }
  }
}
</script>

<style>
.sp-date-pikcer-demo {
  margin: 0 0 20px 0;
}
.sp-date-pikcer-demo-p{
  margin: 0 0 5px 0;
}
</style>