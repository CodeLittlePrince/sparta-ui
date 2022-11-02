Window 窗口
---
小窗口组件，该组件常用于后台系统，并且配合`menu`使用。
本demo非完整demo，因为已有router逻辑。
详细的交互demo可见[规则引擎平台](https://g.hz.netease.com/wyzfrmp/rule-engine-static)。

### 基本使用

:::demo 内部实现需要结合`vue-router`
```vue
<template>
  <sp-window
    ref="window"
    :tabs="tabsData"
    item-width="170"
    @close="handleWindowClose"
    @select="handleSelect"
  ></sp-window>
</template>

<script>
export default{
  data() {
    return {
      tabsData: [
        {
          title: '色彩',
          link: '/components/color'
        },
        {
          title: '图标',
          link: '/components/icon'
        },
        {
          title: '按钮',
          link: '/components/button'
        },
        {
          title: '栅格',
          link: '/components/grid'
        },
        {
          title: '布局',
          link: '/components/layout'
        },
        {
          title: '下拉菜单',
          link: '/components/dropdown'
        },
        {
          title: '窗口',
          link: '/components/window'
        },
        {
          title: '多选框',
          link: '/components/checkbox'
        }
      ]
    }
  },
  mounted() {
    this.handleMoveTo()
  },
  methods: {
    handleWindowClose(index) {
      console.log(`window close: ${index}`)
    },
    handleMoveTo() {
      this.$refs.window.selectTab(6)
    },
    handleSelect(link) {
      console.log(link)
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| tabs | 设置 window 的菜单数据 | Array | — | [] |
| titleKey | 设置 window 标题的键值 | string | — | 'title' |
| linkKey | 设置 window tab链接的键值 | string | — | 'child' |
| itemWidth | 设置 window tab的宽度 | string/number | — | 180 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close  | 关闭tab的回调 | (index) index为操作的条目的索引值 |
| select  | 选择tab的回调 | (link, itemData) link为操作的条目的链接值;itemData为操作元素对应的数据 |

### Methods
| Method | Description | Parameters |
|------|--------|-------|
| selectTab | 选择指定的tab | (index) index 为tab的索引 |


<script>
export default{
  data() {
    return {
      tabsData: [
        {
          title: '色彩',
          link: '/components/color'
        },
        {
          title: '图标',
          link: '/components/icon'
        },
        {
          title: '按钮',
          link: '/components/button'
        },
        {
          title: '栅格',
          link: '/components/grid'
        },
        {
          title: '布局',
          link: '/components/layout'
        },
        {
          title: '下拉菜单',
          link: '/components/dropdown'
        },
        {
          title: '窗口',
          link: '/components/window'
        },
        {
          title: '多选框',
          link: '/components/checkbox'
        }
      ]
    }
  },
  mounted() {
    this.handleMoveTo()
  },
  methods: {
    handleWindowClose(index) {
      console.log(`window close: ${index}`)
    },
    handleMoveTo() {
      this.$refs.window.selectTab(6)
    },
    handleSelect(link, itemData) {
      console.log(link, itemData)
    }
  }
}
</script>
