# Menu 菜单

### 基础用法
适用广泛的基础单选（支持键盘控制）

:::demo 通过`data`传入菜单信息
```vue
<template>
  <sp-menu
    :indent="20"
    :data="menuData1.list"
    :default-open="menuData1.defaultOpen"
    @select="handleMenuSelect"
  />
</template>

<script>
export default {
  data() {
    return {
      menuData1: {
        defaultOpen: '2-1',
        list: [
          {
            title: 'menu1',
            link: '/menu1',
            index: '1'
          },
          {
            title: 'menu2',
            index: '2',
            child: [
              {
                title: 'item2',
                link: '/item2-2',
                index: '2-1'
              }
            ]
          },
          {
            title: 'menu3',
            index: '3',
            child: [
              {
                index: '3-1',
                group: 'item1',
                child: [
                  {
                    title: 'option1',
                    link: '/option3-1-1',
                    index: '3-1-1'
                  },
                  {
                    title: 'option2',
                    link: '/option3-1-2',
                    index: '3-1-2'
                  }
                ]
              },
              {
                index: '3-2',
                group: 'item1',
                child: [
                  {
                    title: 'option1',
                    link: '/option3-2-1',
                    index: '3-2-1'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    handleMenuSelect(index, { link }) {
      console.log(index, link)
    }
  }
}
</script>
```
:::

### 主题
menu有两种主题，第一种`common`如上面例子中所见，另一种为`file`主题。

:::demo 属性`theme`值设置为`file`
```vue
<template>
  <sp-menu
    theme="file"
    :indent="20"
    :data="menuData2.list"
    :default-open="menuData2.defaultOpen"
  />
</template>

<script>
export default {
  data() {
    return {
      menuData1: {
        defaultOpen: '1',
        list: [
          {
            title: 'menu1',
            link: '/menu1',
            index: '1'
          },
          {
            title: 'menu2',
            index: '2',
            child: [
              {
                title: 'item2',
                link: '/item2-2',
                index: '2-1'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
```
:::

### 唯一
控制同级的父条目，同时只展开一个

:::demo 属性`unique`值设置为true
```vue
<template>
  <sp-menu
    unique
    :indent="20"
    :data="menuData3"
  />
</template>

<script>
export default {
  data() {
    return {
      menuData3: [
        {
          title: 'menu1',
          link: '/menu1',
          index: '1'
        },
        {
          title: 'menu2',
          index: '2',
          child: [
            {
              title: 'item2',
              link: '/item2-1',
              index: '2-1'
            }
          ]
        },
        {
          title: 'menu3',
          index: '3',
          child: [
            {
              title: 'item3',
              link: '/item3-1',
              index: '3-1'
            }
          ]
        }
      ]
    }
  }
}
</script>
```
:::

### 父项可点击导航
让父条目也可点击进行页面切换，相当于让每个分类项目有了自己的主页介绍（多被用于`file`主题）。

:::demo 属性`parent-is-page`值设置为true
```vue
<template>
  <sp-menu
    theme="file"
    :indent="20"
    :data="menuData4"
    parent-is-page
    @select="handleMenuSelect"
  />
</template>

<script>
export default {
  data() {
    return {
      menuData4: [
        {
          title: 'menu1',
          link: '/menu1',
          index: '1'
        },
        {
          title: 'menu2',
          link: '/menu2',
          index: '2',
          child: [
            {
              title: 'item2',
              link: '/item2-1',
              index: '2-1'
            }
          ]
        },
        {
          title: 'menu3',
          link: '/menu3',
          index: '3',
          child: [
            {
              title: 'item3',
              link: '/item3-1',
              index: '3-1'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleMenuSelect(index, { link }) {
      console.log(index, link)
    }
  }
}
</script>
```
:::

### 展开所有条目
将所有的条目都展示出来

:::demo 属性`open-all`值设置为true
```vue
<template>
  <sp-menu
    open-all
    :indent="20"
    :data="menuData3"
  />
</template>

<script>
export default {
  data() {
    return {
      menuData3: [
        {
          title: 'menu1',
          link: '/menu1',
          index: '1'
        },
        {
          title: 'menu2',
          index: '2',
          child: [
            {
              title: 'item2',
              link: '/item2-1',
              index: '2-1'
            }
          ]
        },
        {
          title: 'menu3',
          index: '3',
          child: [
            {
              title: 'item3',
              link: '/item3-1',
              index: '3-1'
            }
          ]
        }
      ]
    }
  }
}
</script>
```
:::

### 分组
条目可按分组展示

:::demo 通过data中的`group`属性设置
```vue
<template>
  <sp-menu
    open-all
    :indent="20"
    :data="menuData5"
  />
</template>

<script>
export default {
  data() {
    return {
      menuData5: [
        {
          title: 'menu1',
          link: '/menu1',
          index: '1'
        },
        {
          title: 'menu2',
          index: '2',
          child: [
            {
              group: 'item2-1',
              index: '2-1',
              child: [
                {
                  title: 'item2-1',
                  link: '/item2-1-1',
                  index: '2-1-1'
                },
                {
                  title: 'item2-1',
                  link: '/item2-1-2',
                  index: '2-1-2'
                }
              ]
            },
            {
              group: 'item2-2',
              index: '2-2',
              child: [
                {
                  title: 'item2-2',
                  link: '/item2-2-1',
                  index: '2-2-1'
                },
                {
                  title: 'item2-2',
                  link: '/item2-2-2',
                  index: '2-2-2'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data | 数据源 | array | — | [] |
| default-open | 设置默认的打开项目 | string | — | '' |
| indent | 设置每个层级菜单缩进宽度 | number | — | 24 |
| theme | 设置menu的主题 | string | common/file | 'common' |
| unique | 让同层级的菜单只展开一个 | boolean | — | false |
| parent-is-page | 父项文字点击后触发select事件，不会发生折叠，同时文字左侧会出现`+`或`-`的符号作为折叠使用 | boolean | — | false |
| open-all | 展开所有条目 | boolean | — | false |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| select  | 条目 选择的回调 | — |
| open  | 条目 展开的回调 | — |
| close  | 条目 折叠的回调 | — |

<script>
export default {
  data() {
    return {
      menuData1: {
        defaultOpen: '2-1',
        list: [
          {
            title: 'menu1',
            link: '/menu1',
            index: '1'
          },
          {
            title: 'menu2',
            index: '2',
            child: [
              {
                title: 'item2',
                link: '/item2-2',
                index: '2-1'
              }
            ]
          },
          {
            title: 'menu3',
            index: '3',
            child: [
              {
                index: '3-1',
                group: 'item1',
                child: [
                  {
                    title: 'option1',
                    link: '/option3-1-1',
                    index: '3-1-1'
                  },
                  {
                    title: 'option2',
                    link: '/option3-1-2',
                    index: '3-1-2'
                  }
                ]
              },
              {
                index: '3-2',
                group: 'item1',
                child: [
                  {
                    title: 'option1',
                    link: '/option3-2-1',
                    index: '3-2-1'
                  }
                ]
              }
            ]
          }
        ]
      },
      menuData2: {
        defaultOpen: '1',
        list: [
          {
            title: 'menu1',
            link: '/menu1',
            index: '1'
          },
          {
            title: 'menu2',
            index: '2',
            child: [
              {
                title: 'item2',
                link: '/item2-2',
                index: '2-1'
              }
            ]
          }
        ]
      },
      menuData3: [
        {
          title: 'menu1',
          link: '/menu1',
          index: '1'
        },
        {
          title: 'menu2',
          index: '2',
          child: [
            {
              title: 'item2',
              link: '/item2-1',
              index: '2-1'
            }
          ]
        },
        {
          title: 'menu3',
          index: '3',
          child: [
            {
              title: 'item3',
              link: '/item3-1',
              index: '3-1'
            }
          ]
        }
      ],
      menuData4: [
        {
          title: 'menu1',
          link: '/menu1',
          index: '1'
        },
        {
          title: 'menu2',
          link: '/menu2',
          index: '2',
          child: [
            {
              title: 'item2',
              link: '/item2-1',
              index: '2-1'
            }
          ]
        },
        {
          title: 'menu3',
          link: '/menu3',
          index: '3',
          child: [
            {
              title: 'item3',
              link: '/item3-1',
              index: '3-1'
            }
          ]
        }
      ],
      menuData5: [
        {
          title: 'menu1',
          link: '/menu1',
          index: '1'
        },
        {
          title: 'menu2',
          index: '2',
          child: [
            {
              group: 'item2-1',
              index: '2-1',
              child: [
                {
                  title: 'item2-1',
                  link: '/item2-1-1',
                  index: '2-1-1'
                },
                {
                  title: 'item2-1',
                  link: '/item2-1-2',
                  index: '2-1-2'
                }
              ]
            },
            {
              group: 'item2-2',
              index: '2-2',
              child: [
                {
                  title: 'item2-2',
                  link: '/item2-2-1',
                  index: '2-2-1'
                },
                {
                  title: 'item2-2',
                  link: '/item2-2-2',
                  index: '2-2-2'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleMenuSelect(index, { link }) {
      console.log(index, link)
    }
  }
}
</script>