# Drawer 按钮

### 基础用法

:::demo 呼出一个临时的侧边栏, 可以从多个方向呼出。
```vue
<template>
  <div class="md-demo-drawer">
    <sp-radio-group v-model="direction">
      <sp-radio label="left">从左往右开</sp-radio>
      <sp-radio label="right">从右往左开</sp-radio>
      <sp-radio label="top">从上往下开</sp-radio>
      <sp-radio label="bottom">从下往上开</sp-radio>
    </sp-radio-group>
    <sp-button type="primary" size="mini" @click="drawerVisible = true">点我打开</sp-button>
    <sp-drawer
      title="我是标题"
      :direction="direction"
      :destroy-on-close="true"
      size="50%"
      v-model="drawerVisible"
      :before-close="handleBeforeClose">
       <span>Drawer show!{{ new Date().toLocaleString() }}</span>
       <div class="footer" slot="footer">
         <sp-button plain size="medium" @click="drawerVisible = false">次要操作</sp-button>
         <sp-button type="primary" size="medium" @click="drawerVisible = false">主要操作</sp-button>
       </div>
    </sp-drawer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        direction: 'right',
        drawerVisible: false
      }
    },
    methods: {
      handleBeforeClose(done) {
        done()
      }
    }
  }
</script>
```
:::

### 不添加 Title
:::demo 不添加 Title, 一般需要同时设置wrapperClosable
```vue
<template>
  <div class="md-demo-drawer">
    <sp-button type="primary" size="mini" @click="drawerVisible1 = true">点我打开</sp-button>
    <sp-drawer
      :with-header="false"
      :wrapper-closable="true"
       v-model="drawerVisible1">
       <span>Drawer show!{{ new Date().toLocaleString() }}</span>
    </sp-drawer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        drawerVisible1: false
      }
    }
  }
</script>
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| before-close     | 关闭前的回调，会暂停 Drawer 的关闭   | function(done)，done 用于关闭 Drawer  |   —            |    —     |
| destroy-on-close     | 控制是否在关闭 Drawer 之后将子元素全部销毁   | boolean    | — | false   |
| direction     | Drawer 打开的方向   | Direction    | right / left / top / bottom |  right  |
| show-close  | 是否显示关闭按钮    | boolean   | —   | true   |
| size  | Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 'x%', 否则便会以 number 类型解释 | number / string   |  —  |  '30%'  |
| title  | Drawer 的标题，也可通过具名 slot （见下表）传入 | string   |  —  |  —  |
| value | 是否显示 Drawer | boolean | — | false |
| wrapper-closable | 点击遮罩层是否可以关闭 Drawer | boolean | — | false |
| with-header | 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效 | boolean | — | true |

### Slot
| 事件名称      | 说明    |
|---------- |-------- |
| —  | Drawer 的内容 |
| title  | Drawer 标题区的内容 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| open  | Drawer 打开的回调 | - |
| opened  | Drawer 打开动画结束时的回调 | - |
| close  | Drawer 关闭的回调 | - |
| closed  | Drawer 关闭动画结束时的回调 | - |


<style>
  .components--main {
    .md-demo-drawer .sp-button {
      margin-left: 10px;
      margin-bottom: 10px;
    }
    .md-demo-drawer .sp-radio-group {
      float: left;
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        direction: 'right',
        drawerVisible: false,
        drawerVisible1: false
      }
    },
    methods: {
      handleBeforeClose(done) {
        console.log('before-close')
        done()
      }
    }
  }
</script>