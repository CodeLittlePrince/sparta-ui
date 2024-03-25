export default {
  defaultOpen: '1',
  menuData: [
    {
      title: '介绍',
      link: '/base/introduce',
      index: '1'
    },
    {
      title: '开发指南',
      index: '2',
      child: [
        {
          title: '安装',
          link: '/base/install',
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
              link: '/base/color',
              index: '3-1-1'
            },
            {
              title: 'Icon 图标（新）',
              link: '/base/icon',
              index: '3-1-2'
            },
            {
              title: 'Button 按钮（新）',
              link: '/base/button',
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
              link: '/base/grid',
              index: '3-2-1'
            },
            {
              title: 'Layout 布局',
              link: '/base/layout',
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
              link: '/base/menu',
              index: '3-3-1'
            },
            {
              title: 'Window 窗口',
              link: '/base/window',
              index: '3-3-2'
            },
            {
              title: 'Dropdown 下拉菜单',
              link: '/base/dropdown',
              index: '3-3-3'
            },
            {
              title: 'Pagination 分页',
              link: '/base/pagination',
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
              link: '/base/checkbox',
              index: '3-4-1'
            },
            {
              title: 'Select 选择器（新）',
              link: '/base/select',
              index: '3-4-2'
            },
            {
              title: 'Cascader 级联选择器',
              link: '/base/cascader',
              index: '3-4-3'
            },
            {
              title: 'Input 输入框（新）',
              link: '/base/input',
              index: '3-4-4'
            },
            {
              title: 'Radio 单选框（新）',
              link: '/base/radio',
              index: '3-4-5'
            },
            {
              title: 'TimePicker 时间选择框',
              link: '/base/time-picker',
              index: '3-4-6'
            },
            {
              title: 'TimeSelect 时间选择器（新）',
              link: '/base/time-select',
              index: '3-4-7'
            },
            {
              title: 'DatePicker 日期选择框（新）',
              link: '/base/date-picker',
              index: '3-4-8'
            },
            {
              title: 'Upload 上传（新）',
              link: '/base/upload',
              index: '3-4-9'
            },
            {
              title: 'UploadPro 上传（新）',
              link: '/base/upload-pro',
              index: '3-4-10'
            },
            {
              title: 'Form 表单（新）',
              link: '/base/form',
              index: '3-4-11'
            },
            {
              title: 'PasswordInput 密码输入（新）',
              link: '/base/password-input',
              index: '3-4-12'
            },
            {
              title: 'Switch 开关',
              link: '/base/switch',
              index: '3-4-13'
            },
          ]
        },
        {
          group: '数据展示',
          index: '3-5',
          child: [
            {
              title: 'Tag 标签',
              link: '/base/tag',
              index: '3-5-1'
            },
            {
              title: 'Table 表格（新）',
              link: '/base/table',
              index: '3-5-2'
            },
            {
              title: 'Tabs 标签页（新）',
              link: '/base/tabs',
              index: '3-5-3'
            },
            {
              title: 'ImgPreview 图片查看器（新）',
              link: '/base/img-preview',
              index: '3-5-4'
            },
            {
              title: 'PopupTip 浮层提示（新）',
              link: '/base/popup-tip',
              index: '3-5-5'
            },
            {
              title: 'Step 步骤条（新）',
              link: '/base/step',
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
              link: '/base/modal',
              index: '3-6-1'
            },
            {
              title: 'Toast 全局提示（新）',
              link: '/base/toast',
              index: '3-6-2'
            },
            {
              title: 'Confirm 全局确认（新）',
              link: '/base/confirm',
              index: '3-6-3'
            },
            {
              title: 'Progress 进度条',
              link: '/base/progress',
              index: '3-6-4'
            }
          ]
        }
      ]
    }
  ]
}