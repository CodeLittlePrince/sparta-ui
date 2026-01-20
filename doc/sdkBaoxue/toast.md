# Toast 全局提示

全局展示操作反馈信息。

### 基本使用

:::demo 方法已绑定在`vm`上，直接调用即可
```vue
<template>
  <sp-button
    type="primary"
    @click="showInfo"
  >info</sp-button>
  <sp-button
    type="primary"
    @click="showLongInfo"
  >showLongInfo</sp-button>
</template>

<script>
export default{
  methods: {
    showInfo() {
      this.$sparta.info('一个消息')
    },
    showLongInfo() {
      this.$sparta.info('一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息')
    }
  }
}
</script>
```
:::

### 1种状态

:::demo 分别有`info`1种，暂时不直接变为交`toast`，避免以后又说要加不同状态样式
```vue
<template>
  <sp-button
    @click="showInfo"
  >info</sp-button>
</template>

<script>
export default{
  methods: {
    showInfo() {
      this.$sparta.info('一个消息')
    }
  }
}
</script>
```
:::

### 自定义toast存在的时间

:::demo 分别有：全局配置，调用声明，两种方式。
```vue
<template>
  <sp-button
    @click="showTipResetDuration"
  >一个 5s 的消息</sp-button>
</template>

<script>
Vue.prototype.$sparta.success = Toast('success', 5000) // 全局配置
// 单独调用的话，在调用的时候声明即可
export default{
  methods: {
    showTipResetDuration() {
      // 调用声明
      this.$sparta.success('一个 5s 的消息', 5000)
      // 全局配置后可以这样调用
      this.$sparta.success('一个 5s 的消息')
    }
  }
}
</script>
```
:::


### 自定义样式

:::demo 分别有：全局配置，调用声明，两种方式。
```vue
<template>
  <sp-button
    @click="showTipResetClassName"
  >一个消息</sp-button>
</template>

<script>
Vue.prototype.$sparta.success = Toast('success', {
  className: 'custom-class'
}) // 全局配置
// 单独调用的话，在调用的时候声明即可
export default{
  methods: {
    showTipResetClassName() {
      // 调用声明
      this.$sparta.success('一个自定义class消息', {
        className: 'custom-class'
      })
      // 全局配置后可以这样调用
      this.$sparta.success('一个自定义class消息')
    }
  }
}
</script>
<style>
  .sp-toast.custom-class .sp-toast__contain {
    background: #409EFF;
    font-size: 34px;
    color: white;
    top: 180px;
  }
</style>
```
:::

<script>
export default{
  methods: {
    showInfo() {
      this.$sparta.info('一个消息')
    },
    showLongInfo() {
      this.$sparta.info('一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息一个消息')
    },
    showTipResetDuration() {
      this.$sparta.success('一个 5s 的消息', 5000)
    },
    showTipResetClassName() {
      // 调用声明
      this.$sparta.success('一个自定义class消息', {
        className: 'custom-class'
      })
    },
    showNoUseTransition() {
      // 调用声明
      this.$sparta.success('一个自定义class消息', {
        useTransition: false
      })
    }
  }
}
</script>
<style>
  .sp-toast.custom-class .sp-toast__contain {
    background: #409EFF;
    font-size: 34px;
    color: white;
    top: 180px;
  }
</style>