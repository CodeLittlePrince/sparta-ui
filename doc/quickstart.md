快速上手
---
此部分介绍如何使用sparta-ui

### 引入
在js入口文件中引入`sparta-ui`的脚本和样式。

```js
import SpartaUI from 'sparta-ui'
import 'sparta-ui/lib/theme/globalpay/index.css' // 跨境主题
// import 'sparta-ui/lib/theme/epay/index.css' // epay主题

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
import 'sparta-ui/lib/theme/globalpay/style/index.css' // 跨境主题
import 'sparta-ui/lib/theme/epay/style/index.css' // epay主题
import Button from 'sparta-ui/lib/button/index.js'
import 'sparta-ui/lib/theme/globalpay/button/index.css' // 跨境主题
import 'sparta-ui/lib/theme/epay/button/index.css' // epay主题
// 初始化配置
Vue.prototype.$SPARTA = {
  THEME: 'globalpay', // 主题的初始类型，目前有：globalpay、epay
  zIndex: 3000, // 弹窗的初始zIndex，默认为2000
  ... // 其它
}
// TODO，编写插件简化引入写法
Vue.use(Button)
```