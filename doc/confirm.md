# Confirm 全局确认

全局展示操作反馈信息。

### 基本使用

:::demo 方法已绑定在`vm`上，直接调用即可
```vue
<template>
  <sp-button
    type="primary"
    @click="show1"
  >confirm</sp-button>
</template>

<script>
export default{
  methods: {
    show1() {
      this.$sparta.confirm({
        title: '我是一个大标题',
        message: '我是主体文案',
        cancelText: '算了',
        confirmText: '好吧',
        cancelFunc: vm => {
          console.log(vm.visible)
        },
        confirmFunc: vm => {
          console.log(vm.visible)
        }
      })
    }
  }
}
</script>
```
:::

### 便捷用法

:::demo 只定义message文案可以直接传字符串
```vue
<template>
  <sp-button
    type="primary"
    @click="show2"
  >delete</sp-button>
</template>

<script>
export default{
  methods: {
    show2() {
      this.$sparta.confirm('确定要删除吗？')
    }
  }
}
</script>
```
:::

### 文案位置调整

:::demo 使用`align`即可，有`left`、`center`、`right`三种
```vue
<template>
  <sp-button
    type="primary"
    @click="show3"
  >confirm</sp-button>
</template>

<script>
export default{
  methods: {
    show3() {
      this.$sparta.confirm({
        message: '我在中间',
        align: 'center'
      })
    }
  }
}
</script>
```
:::

### confirm弹窗不消失

:::demo `hideAfterConfirm`设为false既可
```vue
<template>
  <sp-button
    type="primary"
    @click="show4"
  >submit</sp-button>
</template>

<script>
export default{
  methods: {
    show4() {
      this.$sparta.confirm({
        message: '确定要删除吗？',
        hideAfterConfirm: false,
        confirmFunc: vm => {
          // 可以通过下面语句关闭弹窗
          // vm.visible = false
        }
      })
    }
  }
}
</script>
```
:::

### Options
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title     | 标题   | string | -  |     '提示'    |
| message     | 主体文案   | string | -  |     ''    |
| align     | 主体文案对齐方式   | string | left/center/right  |     'left'    |
| cancelText     | 取消按钮文案   | string | -  |     '取消'    |
| confirmText     | 确认按钮文案   | string | -  |     '确定'    |
| hideAfterConfirm   | 点击确定后，是否让弹窗消失   | boolean | -  |     true    |
| hideAfterConfirm   | 点击确定后，是否让弹窗消失   | boolean | -  |     true    |
| cancelFunc     | 取消回调   | function | -  |     ()=>{}    |
| confirmFunc     | 确定回调   | function | -  |     ()=>{}    |

<script>
export default{
  methods: {
    show1() {
      this.$sparta.confirm({
        title: '我是一个大标题',
        message: '我是主体文案',
        cancelText: '算了',
        confirmText: '好吧',
        cancelFunc: vm => {
          console.log(vm.visible)
        },
        confirmFunc: vm => {
          console.log(vm.visible)
        }
      })
    },
    show2() {
      this.$sparta.confirm('确定要删除吗？')
    },
    show3() {
      this.$sparta.confirm({
        message: '我在中间',
        align: 'center'
      })
    },
    show4() {
      this.$sparta.confirm({
        message: '确定要删除吗？',
        hideAfterConfirm: false,
        confirmFunc: vm => {
          // 可以通过下面语句关闭弹窗
          // vm.visible = false
        }
      })
    }
  }
}
</script>