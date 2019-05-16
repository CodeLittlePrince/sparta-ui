菜单 menu
---
全局左侧菜单组件

### 使用
html
```html
<sp-menu
  :data="menuData"
  :default-open="defaultOpen"
  @select="handleMenuSelect"
  @open="handleMenuOpen"
  @close="handleMenuClose"
>
</sp-menu>
```

js
```js
data() {
  return {
    defaultOpen: '2-1',
    menuData: [
      {
        title: '标题1',
        link: '/1',
        index: '1'
      },
      {
        title: '标题2',
        link: '/2',
        index: '2',
        child: [
          {
            title: '标题2-1',
            link: '/2-1',
            index: '2-1'
          } 
        ]
      }
    ]
  }
},
methods: {
  handleMenuSelect(index) {
    console.log(`menu select: ${index}`)
  },
  handleMenuClose(index) {
    console.log(`menu close: ${index}`)
  },
  handleMenuOpen(index) {
    console.log(`menu open: ${index}`)
  }
}
```

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| width | 设置 menu 的宽度 | string | — | '240px' |
| data | 设置 menu 的菜单数据 | Array | — | [] |
| titleKey | 设置 menu 标题的键值 | string | — | 'title' |
| childKey | 设置 menu 子菜单的键值 | string | — | 'child' |
| indexKey | 设置 menu 条目的索引的键值 | string | — | 'index' |
| indent | 设置 menu 的padding-left | number | — | 20 |
| defaultOpen | 设置 menu 的默认打开项 | string | — | '' |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| select  | 选择菜单条目的回调 | (index) index为操作的条目的索引值 |
| open  | 展开菜单条目的回调 | (index) index为操作的条目的索引值 |
| close  | 折叠菜单条目的回调 | (index) index为操作的条目的索引值 |