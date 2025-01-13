# PasswordInput 密码输入框

### 基础用法

:::demo 简单使用，PasswordInput的宽度默认是100%，如需改变，可加父容器或样式覆盖。
```vue
<template>
  <div class="md-demo-password-input">
    <sp-password-input
      v-model="value1" 
    />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1: ''
      }
    },
    watch: {
      value1(val) {
        console.log(val)
      }
    }
  }
</script>
```
:::


### 数字类型

:::demo 简单使用，PasswordInput的宽度默认是100%，如需改变，可加父容器或样式覆盖。
```vue
<template>
  <div class="md-demo-password-input">
    <sp-password-input 
      type="number"
      v-model="value2" 
    />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value2: ''
      }
    },
    watch: {
      value2(val) {
        console.log(val)
      }
    }
  }
</script>
```
:::

### 身份证后4位

:::demo 通过设置`type`为`idCard`，当`type`为`idCard`，`length`值固定为`4`，无法更改。
```vue
<template>
  <div class="md-demo-password-input">
    <sp-password-input 
      type="idCard"
      v-model="value4" 
    />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value4: ''
      }
    },
    watch: {
      value4(val) {
        console.log(val)
      }
    }
  }
</script>
```
:::

### 长度控制

:::demo 通过`length`控制长度。
```vue
<template>
  <div class="md-demo-password-input">
    <sp-password-input 
      type="number"
      :length="4"
      v-model="value3" 
    />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value3: ''
      }
    },
    watch: {
      value3(val) {
        console.log(val)
      }
    }
  }
</script>
```
:::



### PasswordInput Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | password，number，idCard（身份证后4位） | password
| validateEvent         | 验证   | boolean  | —  |true
| value         | 绑定值           | string / number  | — | — |
| length         | 输入框长度           | number  | — |6

### Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| focus | 聚焦 | —

<script>
  export default {
    data() {
      return {
        value1: '',
        value2: '',
        value4: '',
        value3: ''
      }
    },
    watch: {
      value1(val) {
        console.log(val)
      },
      value2(val) {
        console.log(val)
      },
      value4(val) {
        console.log(val)
      },
      value3(val) {
        console.log(val)
      }
    }
  }
</script>

<style>
.sp-password-input-demo {
}
</style>
