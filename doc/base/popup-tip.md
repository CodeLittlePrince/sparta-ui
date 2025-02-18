# PopupTip 浮层提示

### 基本使用

:::demo 一般配合icon使用
```vue
<template>
  <p>
    猜猜我是谁
    <sp-popup-tip
      width="200" color="#747d8c"
      has-border
    >
      <i class="sp-icon-ques"></i>
      <template slot="popup">
        我是做好事不留名的红领巾
      </template>
    </sp-popup-tip>
  </p>
</template>
```
:::

### 出现位置

:::demo placement=top
```vue
<template>
  <div>
    <p class="placementBody">
      浮层在上方出现
      <sp-popup-tip
        width="200" color="#747d8c"
        placement="top"
        has-border
      >
        <i class="sp-icon-ques"></i>
        <template slot="popup">
          我是做好事不留名的红领巾
        </template>
      </sp-popup-tip>
    </p>
    <p class="placementBody">
      浮层在右边出现
      <sp-popup-tip
        has-border
        width="200" color="#747d8c"
        placement="right"
      >
        <i class="sp-icon-ques"></i>
        <template slot="popup">
          我是做好事不留名的红领巾
          <p>我是做好事不留名的红领巾</p>
          <p>我是做好事不留名的红领巾</p>
          <p>我是做好事不留名的红领巾</p>
          <p>我是做好事不留名的红领巾</p>
        </template>
      </sp-popup-tip>
    </p>
    <p class="placementBody">
      浮层在左边出现
      <sp-popup-tip
        width="200" color="#747d8c"
        placement="left"
        has-border
      >
        <i class="sp-icon-ques"></i>
        <template slot="popup">
          我是做好事不留名的红领巾
          <p>我是做好事不留名的红领巾</p>
          <p>我是做好事不留名的红领巾</p>
          <p>我是做好事不留名的红领巾</p>
        </template>
      </sp-popup-tip>
    </p>
     <p class="placementBody">
      浮层在下方出现
      <sp-popup-tip
       has-border
        width="200" color="#747d8c"
        placement="bottom"
      >
        <i class="sp-icon-ques"></i>
        <template slot="popup">
          我是做好事不留名的红领巾
        </template>
      </sp-popup-tip>
    </p>
  </div>
</template>
```
:::

### 通过点击消失

:::demo hide-by-click-out
```vue
<template>
  <p>
    通过点击消失
    <sp-popup-tip
      width="200" color="#747d8c"
      has-border
      hide-by-click-out
    >
      <i class="sp-icon-ques"></i>
      <template slot="popup">
        我是做好事不留名的红领巾
      </template>
    </sp-popup-tip>
  </p>
</template>
```
:::

### 显示调用

:::demo hide-by-click-out
```vue
<template>
  <p>
    显示调用
    <sp-popup-tip
      ref="tip1"
      width="200"
      color="#747d8c"
      has-border
      placement="top"
    >
      <i class="sp-icon-ques"></i>
      <template slot="popup">
        我是做好事不留名的红领巾
      </template>
    </sp-popup-tip>
  </p>
  <p>
    显示调用 + 通过点击消失
    <sp-popup-tip
      ref="tip2"
      width="200"
      has-border
      hide-by-click-out
    >
      <i class="sp-icon-ques"></i>
      <template slot="popup">
        我是做好事不留名的红领巾
      </template>
    </sp-popup-tip>
  </p>
</template>
<script>
  export default {
    mounted() {
      this.$refs.tip1.show()
      this.$refs.tip2.show()
    }
  }
</script>
```
:::

### mouseenter方式显示失效

:::demo freeze开启，mouseenter和mouseleave不再有效果，只能通过show方法显示
```vue
<template>
  <p>
    通过点击消失
    <sp-popup-tip
      ref="tip3"
      width="200" color="#747d8c"
      has-border
      hide-by-click-out
      freeze
      placement="top"
    >
      <i class="sp-icon-ques"></i>
      <template slot="popup">
        我是做好事不留名的红领巾
      </template>
    </sp-popup-tip>
  </p>
</template>
<script>
  export default {
    mounted() {
      this.$refs.tip3.show()
    }
  }
</script>
```
:::

### 主题色

:::demo theme="red"
```vue
<template>
  <p>
    浮层red主题
    <sp-popup-tip
      width="200" color="#747d8c"
      has-border
      theme="red"
    >
      <i class="sp-icon-ques"></i>
      <template slot="popup">
        我是做好事不留名的红领巾
      </template>
    </sp-popup-tip>
  </p>
  <p style="margin-top: 20px;">
    浮层blue主题
    <sp-popup-tip
      width="200" color="#747d8c"
      has-border
      theme="blue"
    >
      <i class="sp-icon-ques"></i>
      <template slot="popup">
        我是做好事不留名的红领巾
      </template>
    </sp-popup-tip>
  </p>
</template>
```
:::


### click触发

:::demo theme="red"
```vue
<template>
  <p>
    浮层red主题
    <sp-popup-tip
      width="200" color="#747d8c"
      has-border
      theme="red"
      trigger="click"
    >
      <i class="sp-icon-ques"></i>
      <template slot="popup">
        我是做好事不留名的红领巾
      </template>
    </sp-popup-tip>
  </p>
</template>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| width | 设置浮层的宽度| string/number | — | 190 |
| theme | 设置浮层的主题 | string | 'white'/'blue'/'red' | 'white' |
| color | 设置浮层的字体颜色 | string | — | '#012257' |
| hasBorder | 设置浮层是否有边框 | boolean | — | false |
| popperScrollBindElem | popper浮动定位的锚点元素 | string/Element | — | - |
| placement | Tooltip 组件出现的位置 | string | bottom/top/left/right | bottom |
| hide-by-click-out | 消失通过click其它区域触发,mouseleave将失效 | boolean | — | false |
| freeze | freeze开启，mouseenter和mouseleave不再有效果，只能通过show方法显示 | boolean | — | false |
| trigger | 触发行为 | string | click/hover | hover |
| use-transition | 是否使用过度动画 | boolean	 | — | true |

### Form Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| show |  显示 tip | —
| hide |  隐藏 tip | —

### Slot
| name | 说明 |
|------|--------|
| — | 基础内容 |
| popup | 悬浮层里的内容 |

### Events
| 事件名 | 说明 | 回调参数
|------ | -------- | --------
| show | 显示tip时触发 | —
| hide | 隐藏tip时触发 | —

<script>
  export default {
    mounted() {
      this.$refs.tip1.show()
      this.$refs.tip2.show()
      this.$refs.tip3.show()
    }
  }
</script>

<style>
  .placementBody {
    margin-bottom: 30px;
  }
</style>