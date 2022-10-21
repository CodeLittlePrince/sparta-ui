# Radio 单选框

单选框。

### 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

### 基本用法

建议都用`radio-group`方式使用。
:::demo 通过`v-model`绑定变量

```vue
<template>
  <div class="sp-radio-demo">
    <sp-radio label="apple" v-model="value1" @click="hanldeClick">苹果</sp-radio>
    <sp-radio label="banana" v-model="value1" @click="hanldeClick">香蕉</sp-radio>
    <sp-radio size="small" label="smallApple" v-model="value1" @click="hanldeClick">小苹果</sp-radio>
    <sp-radio size="small" label="smallBanana" v-model="value1" @click="hanldeClick">小香蕉</sp-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: ""
    };
  },
  methods: {
    hanldeClick(){
      console.log('------radio click------')
    }
  }
};
</script>
```
:::

### 禁用状态

:::demo 通过设置`disabled`禁用

```vue
<template>
  <div class="sp-radio-demo">
    <sp-radio label="apple" disabled>苹果</sp-radio>
    <sp-radio label="banana" value="banana" disabled>香蕉</sp-radio>
  </div>
</template>
```

:::

### 单选组合

:::demo 只需要在`group`用 v-model 来做数据绑定

```vue
<template>
  <div class="sp-radio-demo">
    <p>单选组:</p>
    </br>
    <sp-radio-group v-model="value2">
      <sp-radio label="apple">苹果</sp-radio>
      <sp-radio label="banana">香蕉</sp-radio>
      <sp-radio label="pear">梨</sp-radio>
    </sp-radio-group>
  </div>
</template>

<script>
export default{
  data() {
    return {
      value2: 'apple'
    }
  }
}
</script>
```

:::

### 按钮样式

:::demo 只需要把 `sp-radio` 元素换成 `sp-radio-button` 元素即可，此外，还提供了 `text` 属性。

```vue
<template>
  <div class="sp-radio-demo">
    <sp-radio-group v-model="value3">
      <sp-radio-button label="apple">苹果</sp-radio-button>
      <sp-radio-button label="banana" disabled>香蕉</sp-radio-button>
      <sp-radio-button label="pear">梨</sp-radio-button>
    </sp-radio-group>
    <br />
    <sp-radio-group v-model="value4">
      <sp-radio-button label="Europe" text>亚马逊欧洲</sp-radio-button>
      <sp-radio-button label="Japan" disabled text>亚马逊日本</sp-radio-button>
      <sp-radio-button label="United Arab Emirates" text>亚马逊阿联酋</sp-radio-button>
    </sp-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value3: "apple",
      value4: "Europe",
    };
  }
};
</script>
```

:::

### Radio Attributes

| 参数     | 说明           | 类型                      | 可选值 | 默认值 |
| -------- | -------------- | ------------------------- | ------ | ------ |
| label    | Radio 的 value | string / number / boolean | —      | —      |
| disabled | 是否禁用       | boolean                   | —      | false  |
| size | 尺寸       | string                   | default / small     | default  |

### Radio Events

| 事件名称 | 说明                   | 回调参数              |
| -------- | ---------------------- | --------------------- |
| change   | 绑定值变化时触发的事件 | 选中的 Radio label 值 |
| click   | 点击事件，不管值有没有变化 | 已选中的 Radio label 值 |

### Radio-group Events

| 事件名称 | 说明                   | 回调参数              |
| -------- | ---------------------- | --------------------- |
| change   | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radio Button Attributes

| 参数     | 说明           | 类型                      | 可选值 | 默认值 |
| -------- | -------------- | ------------------------- | ------ | ------ |
| label    | Radio 的 value | string / number / boolean | —      | —      |
| disabled | 是否禁用       | boolean                   | —      | false  |
| text    | 是否朴素按钮   | boolean                   | —      | false  |

<script>
export default{
  data() {
    return {
      value1: '',
      value2: 'apple',
      value3: 'apple',
      value4: 'Europe',
    }
  },
  watch: {
    value1(val) {
      console.log(val)
    },
    value2(val) {
      console.log(val)
    },
    value3(val) {
      console.log(val)
    },
    value4(val) {
      console.log(val)
    },
  },
  methods: {
    hanldeClick(){
      console.log('------radio click------')
    }
  }
}
</script>

<style>
.sp-radio-demo {
  .sp-radio-wrap {
    margin-right: 10px;
  }
}
</style>
