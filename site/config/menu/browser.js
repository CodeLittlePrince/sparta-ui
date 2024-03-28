import base from './base'
import { insertMenuItems } from './tool'

// 如果，除了基础组件，还想新增其他文档，则可使用insertMenuItems方法：
const config = insertMenuItems(base, [
  // 新增
  {
    'parentIndex': '2',
    'data': {
      title: '快速上手',
      link: '/browser/quickstart',
      index: '2-2'
    }
  },
  {
    parentIndex: '3-5',
    data: {
      title: 'Table 表格（新）',
      link: '/browser/table',
      index: '3-5-2'
    }
  },
  {
    parentIndex: '3-1',
    data: {
      title: 'Button 按钮（新）',
      link: '/browser/button',
      index: '3-1-4'
    }
  },
  {
    parentIndex: '3-3',
    data: {
      title: 'Menu 菜单',
      link: '/browser/menu',
      index: '3-3-1'
    }
  },
  {
    parentIndex: '3-4',
    data: {
      title: 'Form 表单（新）',
      link: '/base/form',
      index: '3-4-11'
    },
  }
])

export default config