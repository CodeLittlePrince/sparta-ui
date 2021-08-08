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

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| width | 设置浮层的宽度| string/number | — | 190 |
| theme | 设置浮层的主题 | string | 'white'/'blue' | 'white' |
| color | 设置浮层的字体颜色 | string | — | '#012257' |
| hasBorder | 设置浮层是否有边框 | boolean | — | false |

### Slot
| name | 说明 |
|------|--------|
| — | 基础内容 |
| popup | 悬浮层里的内容 |