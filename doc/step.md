# Step 步骤条

### 基础用法

:::demo 使用`position`属性来定义当前步骤到达的位置。
```vue
<template>
  <div class="md-demo-step">
    <sp-step position="0">
      <sp-step-item>Step1</sp-step-item>
      <sp-step-item>Step2</sp-step-item>
      <sp-step-item>Step3</sp-step-item>
    </sp-step>
    <sp-step position="1">
      <sp-step-item>Step1</sp-step-item>
      <sp-step-item>Step2</sp-step-item>
      <sp-step-item>Step3</sp-step-item>
    </sp-step>
    <sp-step position="2">
      <sp-step-item>Step1</sp-step-item>
      <sp-step-item>Step2</sp-step-item>
      <sp-step-item>Step3</sp-step-item>
    </sp-step>
    <sp-step position="3">
      <sp-step-item>Step1</sp-step-item>
      <sp-step-item>Step2</sp-step-item>
      <sp-step-item>Step3</sp-step-item>
    </sp-step>
  </div>
</template>
```
:::

### 自定义step-item的内容

:::demo 自定义
```vue
<template>
  <div class="md-demo-step">
    <sp-step position="1">
      <sp-step-item>
        <sp-button>click Step1</sp-button>
        <p>hello</p>
      </sp-step-item>
      <sp-step-item>
        <sp-button>click Step2</sp-button>
        <p>hello</p>
      </sp-step-item>
      <sp-step-item>
        <sp-button>click Step3</sp-button>
        <p>hello</p>
      </sp-step-item>
    </sp-step>
  </div>
</template>
```
:::

### 自定义step-item-line的间隔宽度

:::demo 自定义
```vue
<template>
  <div class="md-demo-step">
    <sp-step position="1" :space="200">
      <sp-step-item>Step1</sp-step-item>
      <sp-step-item>Step2</sp-step-item>
      <sp-step-item>Step3</sp-step-item>
    </sp-step>
  </div>
</template>
```
:::


### 展示下划线和箭头

:::demo 自定义
```vue
<template>
  <div class="md-demo-step">
    <sp-step position="1" need-arrow>
      <sp-step-item>Step1</sp-step-item>
      <sp-step-item>Step2</sp-step-item>
      <sp-step-item>Step3</sp-step-item>
    </sp-step>
  </div>
</template>
```
:::

### 展示下划线和箭头和进行居中对齐 

:::demo 自定义
```vue
<template>
  <div class="md-demo-step">
    <sp-step position="1" align-center need-arrow space="300">
      <sp-step-item>Step1</sp-step-item>
      <sp-step-item>Step2</sp-step-item>
      <sp-step-item>Step3</sp-step-item>
    </sp-step>
  </div>
</template>
```
:::


### Step Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| position     | 当前到达的步骤下标   | string/number   | -  |     0    |
| space     | 每个 step 的间距，不填写默认80px，单位px   | number/string   | -  |     80    |
| need-arrow     | 展示底部下划线和箭头   | boolean   | -  |     false    |
| align-center     | 进行居中对齐   | boolean   | -  |     false    |

### Step-Item Slot
| name | 说明 |
|------|--------|
| — | step-item 的内容 |

<style>
  .components--main {
    .md-demo-step .sp-step {
      margin-bottom: 33px;
    }
  }
</style>