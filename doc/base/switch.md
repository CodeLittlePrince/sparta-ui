## Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

### 基本用法

:::demo 绑定`v-model`到一个`Boolean`类型的变量。可以使用`active-color`属性与`inactive-color`属性来设置开关的背景色。

```vue
<template>
  <sp-switch
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949">
  </sp-switch>
</template>
<script>
  export default {
    data() {
      return {
        value: true
      }
    }
  };
</script>
```
:::

### 文字描述

:::demo 使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。

```vue
<template>
  <div>
    <sp-switch
    style="display: block"
      v-model="value1"
      active-text="按月付费"
      inactive-text="按年付费">
    </sp-switch>
    <sp-switch
      style="display: block"
      v-model="value2"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="按月付费"
      inactive-text="按年付费">
    </sp-switch>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1: true,
        value2: true
      }
    }
  };
</script>
```
:::

### 扩展的 value 类型

:::demo 设置`active-value`和`inactive-value`属性，接受`Boolean`, `String`或`Number`类型的值。

```vue
<template>
  <sp-popup-tip 
    width="200" 
    theme="blue"
    has-border
    placement="top">
    <sp-switch
      v-model="value3"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-value="100"
      inactive-value="0">
    </sp-switch>
    <template slot="popup">
      Switch value: {{ value3 }}
    </template>
  </sp-popup-tip>
</template>
<script>
  export default {
    data() {
      return {
        value3: '100'
      }
    }
  };
</script>
```

:::

### 禁用状态

:::demo 设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用。


```vue
<template>
  <div>
    <sp-switch
      v-model="value4"
      disabled>
    </sp-switch>
    <sp-switch
      v-model="value5"
      disabled>
    </sp-switch>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value5: true,
        value4: false
      }
    }
  };
</script>
```
:::


### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | boolean / string / number | — | — |
| disabled  | 是否禁用    | boolean   | — | false   |
| width  | switch 的宽度（像素）    | number   | — | 40 |
| active-icon-class  | switch 打开时所显示图标的类名，设置此项会忽略 `active-text`    | string   | — | — |
| inactive-icon-class  | switch 关闭时所显示图标的类名，设置此项会忽略 `inactive-text`    | string   | — | — |
| active-text  | switch 打开时的文字描述    | string   | — | — |
| inactive-text  | switch 关闭时的文字描述    | string   | — | — |
| active-value  | switch 打开时的值    | boolean / string / number | — | true |
| inactive-value  | switch 关闭时的值    | boolean / string / number | — | false |
| active-color  | switch 打开时的背景色    | string   | — | #409EFF |
| inactive-color  | switch 关闭时的背景色    | string   | — | #C0CCDA |
| name            | switch 对应的 name 属性    | string   | — | — |
| validate-event  | 改变 switch 状态时是否触发表单的校验     | boolean   | - | true |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | switch 状态发生变化时的回调函数    | 新状态的值 |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 Switch 获取焦点 | - |

<script>
  export default {
    data() {
      return {
        value: true,
        value1: true,
        value2: true,
        value3: '100',
        value5: true,
        value4: false
      }
    }
  };
</script>