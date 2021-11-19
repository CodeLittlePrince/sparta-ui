Modal 模态弹窗
---
弹窗组件

### 基本使用
:::demo 通过`v-model`控制modal的是否可见
```vue
<template>
  <sp-button type="primary" @click="visible1 = true">show</sp-button>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visible1"
    @show="showHandle"
    @close="closeHandle"
  >
    <div class="content">
      <p>我是modal1的内容</p>
      <sp-button type="default" @click="visible1 = false">取消</sp-button>
      <sp-button type="primary" @click="visible2 = true">确定</sp-button>
    </div>
  </sp-modal>
</template>

<script>
export default{
  data() {
    return {
      visible1: false
    }
  },
  methods: {
    showHandle() {
      console.log('show')
    },
    closeHandle() {
      console.log('close')
    }
  }
}
</script>
```
:::

### 唯一弹窗模式
:::demo 设置`unique`属性为`true`，则弹窗只能同时存在最多一个
```vue
<template>
  <sp-button type="primary" @click="visible2 = true">show</sp-button>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visible2"
    @show="showHandle"
    @close="closeHandle"
  >
    <div class="content">
      <p>我是modal2的内容</p>
      <p>我是modal2的内容</p>
      <p>我是modal2的内容</p>
      <p>我是modal2的内容</p>
      <sp-button type="default" @click="visible3 = true">新开非unique弹窗</sp-button>
      <sp-button type="primary" @click="visible4 = true">新开unique弹窗</sp-button>
    </div>
  </sp-modal>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visible3"
  >
    <div class="content">
      <p>我是非unique弹窗内容</p>
      <sp-button type="default" @click="visible3 = false">取消</sp-button>
      <sp-button type="primary" @click="visible3 = false">确定</sp-button>
    </div>
  </sp-modal>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visible4"
    unique
  >
    <div class="content">
      <p>我是unique弹窗内容</p>
      <sp-button type="default" @click="visible4 = false">取消</sp-button>
      <sp-button type="primary" @click="visible4 = false">确定</sp-button>
    </div>
  </sp-modal>
</template>

<script>
export default{
  data() {
    return {
      visible2: false,
      visible3: false,
      visible4: false,
    }
  },
  methods: {
    showHandle() {
      console.log('show')
    },
    closeHandle() {
      console.log('close')
    }
  }
}
</script>
```
:::

### head自定义
:::demo 通过`title`控制标题文案；或者通过`slot`定制更多样的顶部
```vue
<template>
  <sp-button type="primary" @click="visible5 = true">用title</sp-button>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visible5"
  >
    <div class="content">
      <p>我是modal的内容</p>
      <sp-button type="primary" @click="visible5 = false">确定</sp-button>
    </div>
  </sp-modal>
  <sp-button type="primary" @click="visible6 = true">用slot head</sp-button>
  <sp-modal 
    class="components--main__sp-modal"
    v-model="visible6"
  >
    <div slot="head">我是更灵活的head</div>
    <div class="content">
      <p>我是modal的内容</p>
      <sp-button type="primary" @click="visible6 = false">确定</sp-button>
    </div>
  </sp-modal>
</template>

<script>
export default{
  data() {
    return {
      visible5: false
    }
  },
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 控制 modal 的可见不可见 | boolean | — | false |
| width | 设置 modal 的宽度| string/number | — | 500 |
| title | 设置 modal 的标题文案 | string | — | '提示' |
| hasClose | 设置 modal 的close按钮是否显示 | boolean | — | true |

### Slot
| name | 说明 |
|------|--------|
| — | modal 的内容 |
| head | modal 的顶部内容，默认是title文案 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close  | modal 关闭的回调 | — |
| show  | modal 打开的回调 | — |
| after-leave  | modal 消失动画结束的回调 | — |


<script>
export default{
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
    }
  },
  methods: {
    showHandle() {
      console.log('show')
    },
    closeHandle() {
      console.log('close')
    }
  }
}
</script>

<style>
  .components--main__sp-modal {
    .content {
      text-align: center;
      padding: 30px;
      .sp-button {
        margin-top: 20px
      }
    }
  }
</style>