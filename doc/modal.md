Modal 模态弹窗
---
弹窗组件

### 基本使用

:::demo 通过`v-model`控制modal的是否可见
```vue
<template>
  <sp-button type="primary" @click="visiable1 = true">show</sp-button>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visiable1"
    @show="showHandle"
    @close="closeHandle">
    <div class="content">
      我是modal的内容
    </div>
    <div slot="foot">
      <sp-button type="default" @click="visiable1 = false">取消</sp-button>
      <sp-button type="primary" @click="visiable1 = false">确定</sp-button>
    </div>
  </sp-modal>
</template>

<script>
export default{
  data() {
    return {
      visiable1: false
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

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 控制 modal 的可见不可见 | boolean | — | false |
| width | 设置 modal 的宽度| string/number | — | 500 |
| title | 设置 modal 的标题文案 | string | — | '提示' |
| hasClose | 设置 modal 的close按钮是否显示 | boolean | — | true |
| top | 设置 modal 里顶部的距离 | string | — | '15vh' |

### Slot
| name | 说明 |
|------|--------|
| — | modal 的内容 |
| foot | modal 按钮操作区的内容 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close  | modal 关闭的回调 | — |
| show  | modal 打开的回调 | — |


<script>
export default{
  data() {
    return {
      visiable1: false
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
    }
  }
</style>