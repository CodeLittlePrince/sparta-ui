import base from './base'
import { insertMenuItems } from './tool'

// 如果，除了基础组件，还想新增其他文档，则可使用insertMenuItems方法：
const config = insertMenuItems(base, [
  // 新增
  {
    'parentIndex': '2',
    'data': {
      title: '快速上手',
      link: '/liuxue/quickstart',
      index: '2-2'
    }
  },
  // 新增 demo
  // {
  //   'parentIndex': '3-6',
  //   'data': {
  //     title: 'Modal 模态弹窗（新）',
  //     link: '/modal',
  //     index: '3-6-5'
  //   }
  // },
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