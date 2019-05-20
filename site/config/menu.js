export default {
  defaultOpen: '1',
  menuData: [
    {
      title: '介绍',
      link: '/introduce',
      index: '1'
    },
    {
      title: '开发指南',
      index: '2',
      child: [
        {
          title: '安装',
          link: '/install',
          index: '2-1'
        },
        {
          title: '快速上手',
          link: '/quickstart',
          index: '2-2'
        }
      ]
    },
    {
      title: '导航',
      index: '3',
      child: [
        {
          title: '菜单',
          link: '/menu',
          index: '3-1'
        }
      ]
    },
    {
      title: '组件',
      index: '4',
      child: [
        {
          index: '4-1',
          group: '通用',
          child: [
            {
              title: 'Color 色彩',
              link: '/color',
              index: '4-1-1'
            },
            {
              title: 'Icon 图标',
              link: '/icon',
              index: '4-1-2'
            },
            {
              title: 'Button 按钮',
              link: '/button',
              index: '4-1-4'
            }
          ]
        },
        {
          index: '4-2',
          group: '数据录入',
          child: [
            {
              title: 'Select 选择器',
              link: '/select',
              index: '4-2-1'
            }
          ]
        }
      ]
    }
  ]
}