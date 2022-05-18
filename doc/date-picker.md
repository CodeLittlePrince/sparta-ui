# DatePicker 日期选择框

输入或选择日期的控件。

### 基础用法

:::demo 通过`v-model`绑定时间数据
```vue
<template>
  <div class="sp-date-pikcer-demo">
   <p class="sp-date-pikcer-demo-p">默认: {{ time1 }}</p>
    <sp-date-picker v-model="time1" clearable @change="handleDateChange"  />
  </div>
  <div class="sp-date-pikcer-demo">
    <p class="sp-date-pikcer-demo-p">设置默认时间: {{ time1_1 }}</p>
    <sp-date-picker 
      v-model="time1_1" 
      clearable 
      default-time="12:00:00" 
      @change="handleDateChange"
     />
  </div>
</template>

<script>
export default {
  data() {
    return {
      time1: new Date('2019/02/11').getTime(),
      time1_1: new Date('2019/02/11').getTime(),
    }
  }，
  methods:{
    handleDateChange(value){
      console.log('change', value, value ? new Date(value) : '')
    }
  }
}
</script>
```
:::

### 不可选择的日期

:::demo 通过`disabledDate`控制
```vue
<template>
  <div class="sp-date-pikcer-demo">
    <sp-date-picker
      v-model="time2"
      :disabled-date="disabledDate"
      @change="handleDateChange"
    />
  </div>
  <div class="sp-date-pikcer-demo">
    <sp-date-picker
      v-model="time2_2"
      type="daterange"
      clearable
      :disabled-date="disabledDateRange"
      @change="handleDaterangeChange"
    />
  </div>
  <div class="sp-date-pikcer-demo">
     <sp-date-picker
      v-model="month"
      type="month"
      :disabled-date="disabledDate"
      clearable
      @change="handleDateChange" />
  </div>
  <div class="sp-date-pikcer-demo">
    <sp-date-picker
    v-model="year"
    type="year"
    :disabled-date="disabledDate"
    clearable
    @change="handleDateChange" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      time2: '',
      time2_2: [new Date('2019/02/11').getTime(), new Date('2021/11/12').getTime()]
    }
  },
  methods: {
    disabledDate(date) {
      return date.getTime() > Date.now()
    },
    disabledDateRange(date){
      return date.getTime() < new Date('2019/01/11').getTime() || date.getTime() > new Date('2021/12/12').getTime()
    },
    handleDateChange(value){
      console.log('change', value, value ? new Date(value) : '')
    },
    handleDaterangeChange(value){
      console.log('change', value, [new Date(value[0]), new Date(value[1])])
    },
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
      v-model="time1"
      disabled
    />
  </div>
  <div class="sp-date-pikcer-demo">
    <sp-date-picker
      type="daterange"
      v-model="time4"
      disabled
    />
  </div>
  <div class="sp-date-pikcer-demo">
     <sp-date-picker
      v-model="month"
      type="month"
      disabled />
  </div>
  <div class="sp-date-pikcer-demo">
    <sp-date-picker
    v-model="year"
    type="year"
    disabled />
  </div>
</template>

<script>
export default{
  data() {
    return {
      time1: '2019-02-11',
      time4: [new Date('2019/02/11').getTime(), new Date('2021/11/12').getTime()],
      month: new Date('2019/02/11').getTime(),
      year: new Date('2019/02/11').getTime(),
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
export default {
  data() {
    return {
      time4: [new Date('2019/02/11').getTime(), new Date('2021/11/12').getTime()]
    }
  },
  methods: {
    handleDaterangeChange(value){
      console.log('change', value, [new Date(value[0]), new Date(value[1])])
    },
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
        clearable
        @change="handleDateChange"
      ></sp-date-picker>
    </div>
    <div style="margin-top: 20px">
      <sp-date-picker
        v-model="time2_2"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['08:00:00', '12:00:00']"
        :show-time="true"
        clearable
        @change="handleDaterangeChange"
      ></sp-date-picker>
    </div>
</template>

<script>
export default {
  data() {
    return {
      time5: '',
      time2_2: [new Date('2019/02/11').getTime(), new Date('2021/11/12').getTime()],
    }
  },
  methods: {
    handleDateChange(value){
      console.log('change', value)
    },
    handleDaterangeChange(value){
      console.log('change', value, [new Date(value[0]), new Date(value[1])])
    },
  }
}
</script>
```
:::

### 禁用时分秒

:::demo 通过`disabledTime`禁用
```vue
<template>
    <div>
      <sp-date-picker
        v-model="time7"
        :show-time="true"
        :disabled-time="disabledDateTime"
        @change="handleDateChange"
        clearable
      ></sp-date-picker>
    </div>
    <div style="margin-top: 20px">
      <sp-date-picker
        v-model="time8"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :disabled-time="disabledRangeTime"
        :show-time="true"
        clearable
        @change="handleDaterangeChange"
      ></sp-date-picker>
    </div>
</template>

<script>
export default {
  data() {
    return {
      time7: '',
      time8: ''
    }
  },
  methods: {
    disabledDateTime(){
      return {
        disabledHour: () => [10, 20], // 0-23
        disabledMinute: () => [20, 30], // 0-59
        disabledSecond: () => [55, 56] // 0-59
      }
    },
    disabledRangeTime(type){
      if (type === 'start') {
        return {
          disabledHour: () => [13, 16],
          disabledMinute: () => [20, 30],
          disabledSecond: () => [55, 56]
        }
      }
      return {
        disabledHour: () => [20, 22],
        disabledMinute: () => [30, 50],
        disabledSecond: () => [55, 56]
      }
    },
    handleDateChange(value){
      console.log('change', value)
    },
    handleDaterangeChange(value){
      console.log('change', value, [new Date(value[0]), new Date(value[1])])
    },
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
        @change="handleDateChange"
        clearable
      ></sp-date-picker>
    </div>
    <div style="margin-top: 20px">
      <p class="sp-date-pikcer-demo-p">年: {{ year }}</p>
      <sp-date-picker
        v-model="year"
        type="year"
        @change="handleDateChange"
        clearable
      ></sp-date-picker>
    </div>
</template>

<script>
export default {
  data() {
    return {
      month: new Date('2019/02/11').getTime(),
      year: new Date('2019/02/11').getTime(),
    }
  },
  methods: {
    handleDateChange(value){
      console.log('change', value)
    },
  }
}
</script>
```
:::

### 设置value-format

:::demo 通过`value-format`,可以设置绑定值的格式
```vue
<template>
    <div>
      <p class="sp-date-pikcer-demo-p">日期: {{ time1_1_1 }}</p>
      <sp-date-picker
        v-model="time1_1_1"
        value-format="yyyy-MM-dd"
        @change="handleDateChange"
        clearable
      ></sp-date-picker>
    </div>
    <div class="sp-date-pikcer-demo">
      <p class="sp-date-pikcer-demo-p">日期: {{ time2_2_2 }}</p>
      <sp-date-picker
        v-model="time2_2_2"
        type="daterange"
        clearable
        value-format="yyyy-MM-dd hh:mm:ss"
        @change="handleDaterangeChange"
      />
    </div>
    <div class="sp-date-pikcer-demo">
      <p class="sp-date-pikcer-demo-p">日期: {{ month_1 }}</p>
      <sp-date-picker
        v-model="month_1"
        type="month"
        clearable
        value-format="yyyy-MM"
        @change="handleDateChange"
      />
    </div>
    <div class="sp-date-pikcer-demo">
      <p class="sp-date-pikcer-demo-p">日期: {{ year_1 }}</p>
      <sp-date-picker
        v-model="year_1"
        type="year"
        clearable
        value-format="yyyy"
        @change="handleDateChange"
      />
    </div>
</template>

<script>
export default {
  data() {
    return {
      time1_1_1: '2019-02-11',
      time2_2_2: ['2019-02-11 00:00:00', '2021-11-12 23:59:59'],
      month_1: '2019-02',
      year_1: '2019',
    }
  },
  methods: {
    handleDateChange(value){
      console.log('change', value)
    },
    handleDaterangeChange(value){
      console.log('change', value, [new Date(value[0]), new Date(value[1])])
    },
  }
}
</script>
```
:::

### 不可编辑模式

:::demo 通过`editable`，可以设置是否可以编辑，默认是true
```vue
<template>
    <div class="sp-date-pikcer-demo">
      <sp-date-picker
        :editable="false"
      ></sp-date-picker>
    </div>
    <div class="sp-date-pikcer-demo">
      <sp-date-picker
        type="daterange"
        :editable="false"
      ></sp-date-picker>
    </div>
</template>
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
| editable | 文本框可输入 | boolean | — | true |
| popperScrollBindElem | popper浮动定位的锚点元素 | string/Element | — | - |

### Events
| 事件名称      | 说明    | 回调参数      | 
|---------- |-------- |---------- |
| change | 用户确认选定的值时触发，change内不要使用v-model绑定的值，因为会存在change更新v-model还未更新的情况，change内直接使用回调参数即可 | 组件绑定值 |

<script>
export default{
  data() {
    return {
      time1: new Date('2019/02/11').getTime(),
      time1_1: new Date('2019/02/11').getTime(),
      time1_1_1: '2019-02-11',
      time2: '',
      time2_2: [new Date('2019/02/11').getTime(), new Date('2021/11/12').getTime()],
      time2_2_2: ['2019-02-11 00:00:00', '2021-11-12 23:59:59'],
      time3: '2019-07-07',
      time4: [new Date('2019/02/11').getTime(), new Date('2021/11/12').getTime()],
      time5: '',
      time6: '',
      time7: '',
      time8: '',
      month: new Date('2019/02/11').getTime(),
      year: new Date('2019/02/11').getTime(),
      month_1: '2019-02',
      year_1: '2019',
    }
  },
  watch: {
    time1(value) {
      console.log(value, value ? new Date(value) : '')
    },
    time1_1(value) {
      console.log(value, value ? new Date(value) : '')
    },
    time1_1_1(value) {
      console.log(value)
    },
    time2_2_2(value){
      console.log(value)
    },
    time2(value) {
      console.log(value, value ? new Date(value) : '')
    },
    time3(value) {
      console.log(value, value ? new Date(value) : '')
    },
    time4(value) {
      console.log(value, [new Date(value[0]), new Date(value[1])])
    },
    time5(value) {
      console.log(value, value ? new Date(value) : '')
    },
    time6(value) {
      console.log(value, [new Date(value[0]), new Date(value[1])])
    },
    time7(value) {
      console.log(value, value ? new Date(value) : '')
    },
    time8(value) {
      console.log(value, [new Date(value[0]), new Date(value[1])])
    },
    month(value) {
      console.log(value, value ? new Date(value) : '')
    },
    month_1(value){
      console.log(value)
    },
    year(value){
      console.log(value, value ? new Date(value) : '')
    },
    year_1(value){
      console.log(value)
    },
  },
  methods: {
    disabledDate(date) {
      return date.getTime() > Date.now()
    },
    disabledDateRange(date){
      return date.getTime() < new Date('2019/01/11').getTime() || date.getTime() > new Date('2021/12/12').getTime()
    },
    disabaleRange(date){
      return date.getTime() < this.time4[0] || date.getTime() > this.time4[1]
    },
    disabledDateTime(){
      return {
        disabledHour: () => [10, 20], // 0-23
        disabledMinute: () => [20, 30], // 0-59
        disabledSecond: () => [55, 56] // 0-59
      }
    },
    disabledRangeTime(type){
      if (type === 'start') {
        return {
          disabledHour: () => [13, 16],
          disabledMinute: () => [20, 30],
          disabledSecond: () => [55, 56]
        }
      }
      return {
        disabledHour: () => [20, 22],
        disabledMinute: () => [30, 50],
        disabledSecond: () => [55, 56]
      }
    },
    handleDaterangeChange(value){
      console.log('change', value, [new Date(value[0]), new Date(value[1])])
    },
    handleDateChange(value){
      console.log('change', value, value ? new Date(value) : '')
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