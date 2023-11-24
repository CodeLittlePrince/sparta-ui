快速上手
---
此部分介绍如何使用sparta-ui

### 全量引入
在js入口文件中引入`sparta-ui`的脚本和样式。

```js
import SpartaUI from 'sparta-ui/lib/liuxue/index.js'
import 'sparta-ui/lib/liuxue/index.css'

Vue.use(SpartaUI)
```

### 使用
在`html`中使用`<sp-*>`即可调用sparta组件，如：

```html
<sp-button type="primary">按钮</sp-button>
```

### 按需引入
为了组件库在项目中不会过于庞大，所以支持了按需引入。

```js
import 'sparta-ui/lib/liuxue/style/index.css'
import 'sparta-ui/lib/liuxue/button/index.css'
import Button from 'sparta-ui/lib/liuxue/button/index.js'
// 初始化配置，$SPARTA 默认值是：{ THEME: 'liuxue' }
Vue.prototype.$SPARTA = {
  THEME: 'liuxue', // 主题的初始类型，目前有：liuxue、epay
  zIndex: 3000, // 弹窗的初始zIndex，默认为2000
  ... // 其它
}
// TODO，编写插件简化引入写法
Vue.use(Button)
```