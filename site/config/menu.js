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
          group: '布局',
          index: '4-2',
          child: [
            {
              title: 'Grid 栅格',
              link: '/grid',
              index: '4-2-1'
            },
            {
              title: 'Layout 布局',
              link: '/layout',
              index: '4-2-2'
            }
          ]
        },
        {
          group: '导航',
          index: '4-3',
          child: [
            {
              title: 'Menu 菜单',
              link: '/menu',
              index: '4-3-1'
            },
            {
              title: 'Window 窗口',
              link: '/window',
              index: '4-3-2'
            },
            {
              title: 'Dropdown 下拉菜单',
              link: '/dropdown',
              index: '4-3-3'
            },
            {
              title: 'Pagination 分页',
              link: '/pagination',
              index: '4-3-4'
            }
          ]
        },
        {
          group: '数据录入',
          index: '4-4',
          child: [
            {
              title: 'Checkbox 多选框',
              link: '/checkbox',
              index: '4-4-1'
            },
            {
              title: 'Select 选择器',
              link: '/select',
              index: '4-4-2'
            },
            {
              title: 'Input 输入框',
              link: '/input',
              index: '4-4-3'
            },
            {
              title: 'Radio 单选框',
              link: '/radio',
              index: '4-4-4'
            },
            {
              title: 'TimePicker 时间选择框',
              link: '/time-picker',
              index: '4-4-5'
            },
            {
              title: 'DatePicker 日期选择框',
              link: '/date-picker',
              index: '4-4-6'
            },
            {
              title: 'Upload 上传',
              link: '/upload',
              index: '4-4-7'
            },
            {
              title: 'Form 表单',
              link: '/form',
              index: '4-4-8'
            },
            {
              title: 'PasswordInput 密码输入',
              link: '/password-input',
              index: '4-4-9'
            }
          ]
        },
        {
          group: '数据展示',
          index: '4-5',
          child: [
            {
              title: 'Tag 标签',
              link: '/tag',
              index: '4-5-1'
            },
            {
              title: 'Table 表格',
              link: '/table',
              index: '4-5-2'
            },
            {
              title: 'Tabs 标签页',
              link: '/tabs',
              index: '4-5-3'
            },
            {
              title: 'ImgPreview 图片查看器',
              link: '/img-preview',
              index: '4-5-4'
            },
          ]
        },
        {
          group: '反馈',
          index: '5-1',
          child: [
            {
              title: 'Modal 模态弹窗',
              link: '/modal',
              index: '5-1-1'
            },
            {
              title: 'Toast 全局提示',
              link: '/toast',
              index: '5-1-2'
            },
            {
              title: 'Confirm 全局确认',
              link: '/confirm',
              index: '5-1-3'
            },
            {
              title: 'Progress 进度条',
              link: '/progress',
              index: '5-1-4'
            }
          ]
        }
      ]
    }
  ]
}