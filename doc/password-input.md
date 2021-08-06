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

<style>
.sp-password-input-demo {
}
</style>