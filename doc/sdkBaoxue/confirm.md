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
        title: '我是标题',
        message: '我是主体文案',
        cancelText: '取消',
        confirmText: '确定',
        cancelFunc: (vm, action) => {
          console.log(vm.visible, action)
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

### 类型（控制样式）

:::demo 一般失败场景使用，只有`error`可用，为了处理支付失败
```vue
<template>
  <sp-button
    type="primary"
    @click="showError"
  >error style</sp-button>
</template>

<script>
export default{
  methods: {
    showError() {
      this.$sparta.confirm({
        style: 'error',
        title: '支付失败～',
        message: '余额不足了，该充钱了～',
        align: 'left',
        cancelText: '',
        confirmText: '我知道了',
      })
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
        message: '我在左边',
        align: 'left'
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
          vm.confirmBtnLoading = true
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

### 内容使用VNode方式定义
:::demo 只需要`messge`的值设置为VNode的方式即可，使用jsx的语法
```vue
<template>
  <sp-button
    type="primary"
    @click="showVNode"
  >confirm</sp-button>
</template>

<script>
export default{
  methods: {
    showVNode() {
      this.$sparta.confirm({
        title: '我是标题',
        message: (
          <div>
            <div>我是vnode渲染出来的内容</div>
            <span style="color: #1977ea; cursor: pointer" onClick={ this.yell }>click</span>
          </div>
        )
      })
    },
    yell() {
      alert('yell')
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
| style     | 类型   | string | 'noraml'/'error'  | 'noraml' |
| message     | 主体文案   | string/vnode | -  |     ''    |
| align     | 主体文案对齐方式   | string | left/center/right  |     'center'    |
| cancelText     | 取消按钮文案   | string | -  |     '取消'    |
| confirmText     | 确认按钮文案   | string | -  |     '确定'    |
| hideAfterCancel   | 点击取消后，是否让弹窗消失   | boolean | -  |     true    |
| hideAfterConfirm   | 点击确定后，是否让弹窗消失   | boolean | -  |     true    |
| cancelFunc     | 取消回调，回调参数为(vm, action), action 为 'cancel' / 'close'  | function | -  |     ()=>{}    |
| confirmFunc     | 确定回调，回调参数为vm   | function | -  |     ()=>{}    |
| cancelBtnLoading     | 控制取消按钮loading态   | function | -  |     false   |
| confirmBtnLoading     | 控制确定按钮loading态   | function | -  |     false   |
| closeOnHashChange    | 是否在 hashchange 时关闭   | boolean | -  |     true   |
| closeOnPopstate    | 是否在 活动历史记录条目更改 时关闭   | boolean | -  |     true   |
| hasClose   | 右上角是否有关闭按钮   | boolean | -  |     false    |

### Methods
| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| close | 关闭弹窗   | —

<script>
export default{
  methods: {
    show1() {
      this.$sparta.confirm({
        title: '我是标题',
        message: '我是主体文案',
        cancelText: '取消',
        confirmText: '确定',
        cancelFunc: (vm, action) => {
          console.log(vm.visible, action)
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
        message: '我在左边',
        align: 'left'
      })
    },
    show4() {
      this.$sparta.confirm({
        message: '确定要删除吗？',
        hideAfterConfirm: false,
        confirmFunc: vm => {
          vm.confirmBtnLoading = true
          // 可以通过下面语句关闭弹窗
          // vm.visible = false
        }
      })
    },
    showVNode() {
      this.$sparta.confirm({
        title: '我是标题',
        message: (
          <div>
            <div>我是vnode渲染出来的内容</div>
            <span style="color: #1977ea; cursor: pointer" onClick={ this.yell }>click</span>
          </div>
        )
      })
    },
    showError() {
      this.$sparta.confirm({
        style: 'error',
        title: '支付失败～',
        message: '余额不足了，该充钱了～',
        align: 'left',
        cancelText: '',
        confirmText: '我知道了',
      })
    },
    yell() {
      alert('yell')
    }
  }
}
</script>