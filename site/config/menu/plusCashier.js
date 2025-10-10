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
        },
        {
          title: '快速上手',
          link: '/plusCashier/quickstart',
          index: '2-2'
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
              title: 'Icon 图标',
              link: '/plusCashier/icon',
              index: '3-1-2'
            },
            {
              title: 'Button 按钮',
              link: '/plusCashier/button',
              index: '3-1-4'
            }
          ]
        },
        {
          group: '导航',
          index: '3-3',
          child: [
            {
              title: 'Dropdown 下拉菜单',
              link: '/base/dropdown',
              index: '3-3-3'
            },
          ]
        },
        {
          group: '数据录入',
          index: '3-4',
          child: [
            {
              title: 'Input 输入框',
              link: '/base/input',
              index: '3-4-4'
            },
            {
              title: 'Select 选择器',
              link: '/plusCashier/select',
              index: '3-4-5'
            },
            {
              title: 'Radio 单选框',
              link: '/plusCashier/radio',
              index: '3-4-6'
            },
            {
              title: 'Form 表单',
              link: '/plusCashier/form',
              index: '3-4-11'
            },
            {
              title: 'PasswordInput 密码输入',
              link: '/base/password-input',
              index: '3-4-12'
            },
          ]
        },
        {
          group: '数据展示',
          index: '3-5',
          child: [
            {
              title: 'PopupTip 浮层提示',
              link: '/plusCashier/popup-tip',
              index: '3-5-6'
            },
          ]
        },
        {
          group: '反馈',
          index: '3-6',
          child: [
            {
              title: 'Modal 模态弹窗',
              link: '/plusCashier/modal',
              index: '3-6-1'
            },
            {
              title: 'Toast 全局提示',
              link: '/plusCashier/toast',
              index: '3-6-2'
            },
            {
              title: 'Confirm 全局确认',
              link: '/base/confirm',
              index: '3-6-3'
            },
          ]
        },
      ]
    }
  ]
}