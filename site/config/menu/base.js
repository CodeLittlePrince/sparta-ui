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
        }
      ]
    },
    {
      title: '组件',
      index: '3',
      child: [
        {
          index: '3-1',
          group: '通用',
          child: [
            {
              title: 'Color 色彩',
              link: '/color',
              index: '3-1-1'
            },
            {
              title: 'Icon 图标（新）',
              link: '/icon',
              index: '3-1-2'
            },
            {
              title: 'Button 按钮（新）',
              link: '/button',
              index: '3-1-4'
            }
          ]
        },
        {
          group: '布局',
          index: '3-2',
          child: [
            {
              title: 'Grid 栅格',
              link: '/grid',
              index: '3-2-1'
            },
            {
              title: 'Layout 布局',
              link: '/layout',
              index: '3-2-2'
            }
          ]
        },
        {
          group: '导航',
          index: '3-3',
          child: [
            {
              title: 'Menu 菜单',
              link: '/menu',
              index: '3-3-1'
            },
            {
              title: 'Window 窗口',
              link: '/window',
              index: '3-3-2'
            },
            {
              title: 'Dropdown 下拉菜单',
              link: '/dropdown',
              index: '3-3-3'
            },
            {
              title: 'Pagination 分页',
              link: '/pagination',
              index: '3-3-4'
            }
          ]
        },
        {
          group: '数据录入',
          index: '3-4',
          child: [
            {
              title: 'Checkbox 多选框（新）',
              link: '/checkbox',
              index: '3-4-1'
            },
            {
              title: 'Select 选择器（新）',
              link: '/select',
              index: '3-4-2'
            },
            {
              title: 'Input 输入框（新）',
              link: '/input',
              index: '3-4-3'
            },
            {
              title: 'Radio 单选框（新）',
              link: '/radio',
              index: '3-4-4'
            },
            {
              title: 'TimePicker 时间选择框',
              link: '/time-picker',
              index: '3-4-5'
            },
            {
              title: 'TimeSelect 时间选择器（新）',
              link: '/time-select',
              index: '3-4-6'
            },
            {
              title: 'DatePicker 日期选择框（新）',
              link: '/date-picker',
              index: '3-4-7'
            },
            {
              title: 'Upload 上传（新）',
              link: '/upload',
              index: '3-4-8'
            },
            {
              title: 'UploadPro 上传（新）',
              link: '/upload-pro',
              index: '3-4-9'
            },
            {
              title: 'Form 表单（新）',
              link: '/form',
              index: '3-4-10'
            },
            {
              title: 'PasswordInput 密码输入（新）',
              link: '/password-input',
              index: '3-4-11'
            },
          ]
        },
        {
          group: '数据展示',
          index: '3-5',
          child: [
            {
              title: 'Tag 标签',
              link: '/tag',
              index: '3-5-1'
            },
            {
              title: 'Table 表格（新）',
              link: '/table',
              index: '3-5-2'
            },
            {
              title: 'Tabs 标签页（新）',
              link: '/tabs',
              index: '3-5-3'
            },
            {
              title: 'ImgPreview 图片查看器（新）',
              link: '/img-preview',
              index: '3-5-4'
            },
            {
              title: 'PopupTip 浮层提示（新）',
              link: '/popup-tip',
              index: '3-5-5'
            },
            {
              title: 'Step 步骤条（新）',
              link: '/step',
              index: '3-5-6'
            },
            
          ]
        },
        {
          group: '反馈',
          index: '3-6',
          child: [
            {
              title: 'Modal 模态弹窗（新）',
              link: '/modal',
              index: '3-6-1'
            },
            {
              title: 'Toast 全局提示（新）',
              link: '/toast',
              index: '3-6-2'
            },
            {
              title: 'Confirm 全局确认（新）',
              link: '/confirm',
              index: '3-6-3'
            },
            {
              title: 'Progress 进度条',
              link: '/progress',
              index: '3-6-4'
            }
          ]
        }
      ]
    }
  ]
}