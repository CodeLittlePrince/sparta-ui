# Dropdown 下拉菜单
向下弹出的列表。

### 何时使用
当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。


### 基础用法
:::demo 浮层通过`slot="dropdown"`设置，条目通过`sp-dropdown-item`设置。
```vue
<template>
  <div class="sp-dropdown-demo">
    <sp-dropdown>
      <span class="hoverBtn">hover me</span>
      <template slot="dropdown">
        <sp-dropdown-item>
          肯德基
        </sp-dropdown-item>
        <sp-dropdown-item>
          麦当劳
        </sp-dropdown-item>
        <sp-dropdown-item>
          汉堡王
        </sp-dropdown-item>
      </template>
    </sp-dropdown>
  </div>
</template>
```
:::

### 条目禁用
:::demo 通过`disabled`设置。
```vue
<template>
  <div class="sp-dropdown-demo">
    <sp-dropdown>
      <span class="hoverBtn">hover me</span>
      <template slot="dropdown">
        <sp-dropdown-item>
          肯德基
        </sp-dropdown-item>
        <sp-dropdown-item disabled>
          麦当劳
        </sp-dropdown-item>
        <sp-dropdown-item>
          汉堡王
        </sp-dropdown-item>
      </template>
    </sp-dropdown>
  </div>
</template>
```
:::

### 触发方式
默认是移入触发菜单，可以点击触发。

:::demo 可以配置 `hover` 激活或者 `click` 激活。
```vue
<template>
  <div class="sp-dropdown-demo">
    <label>hover触发：</label>
    <sp-dropdown>
      <sp-button type="primary">hover me</sp-button>
      <template slot="dropdown">
        <sp-dropdown-item>
          肯德基
        </sp-dropdown-item>
        <sp-dropdown-item>
          麦当劳
        </sp-dropdown-item>
        <sp-dropdown-item>
          汉堡王
        </sp-dropdown-item>
      </template>
    </sp-dropdown>
    <label>click触发：</label>
    <sp-dropdown trigger="click">
      <sp-button type="primary">click me</sp-button>
      <template slot="dropdown">
        <sp-dropdown-item>
          啤酒
        </sp-dropdown-item>
        <sp-dropdown-item>
          饮料
        </sp-dropdown-item>
        <sp-dropdown-item>
          矿泉水
        </sp-dropdown-item>
      </template>
    </sp-dropdown>
  </div>
</template>
```
:::

### Dropdown Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| placement    | 菜单弹出位置     | string | top/top-start/top-end/bottom/bottom-start/bottom-end  | bottom-end |
| trigger      | 触发下拉的行为   | string | hover, click  | hover |
| popperScrollBindElem | popper浮动定位的锚点元素 | string/Element | — | - |
| dropdownWrapClass | 浮层自定义样式 | string | — | '' |

### Dropdown Slots

| Name | 说明 |
|------|--------|
| — | 触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件  |
| dropdown | 下拉列表，通常是 `<sp-dropdown-menu>` 组件     |

### Dropdown Menu Item Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| disabled      | 禁用     | boolean          | — | false |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| toggleVisible | 切换下拉框是否显示 | - |


<style>
.sp-dropdown-demo {
  .sp-button {
    margin-right: 30px;
  }
  .hoverBtn {
    color: #409eff;
  }
}
</style>