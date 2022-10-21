import base from './base'
import { insertMenuItems } from './tool'

// 如果，除了基础组件，还想新增其他文档，则可使用insertMenuItems方法：
const config = insertMenuItems(base, [
  // 新增
  {
    parentIndex: '2',
    data: {
      title: '快速上手',
      link: '/abroad/quickstart',
      index: '2-2'
    }
  },
  // select
  {
    parentIndex: '3-4',
    data: {
      title: 'Select 选择器（新）',
      link: '/abroad/select',
      index: '3-4-2'
    }
  },
  // radio
  {
    parentIndex: '3-4',
    data: {
      title: 'Radio 单选框（新）',
      link: '/abroad/radio',
      index: '3-4-4'
    }
  },
  // Table
  {
    parentIndex: '3-5',
    data: {
      title: 'Table 表格（新）',
      link: '/abroad/table',
      index: '3-5-2'
    }
  },
  // 替换 demo
  // {
  //   'parentIndex': '3-1',
  //   'data': {
  //     title: 'Icon 图标（XXXX）',
  //     link: '/icon',
  //     index: '3-1-2'
  //   }
  // }
])

export default config