快速上手
---
此部分介绍如何使用sparta-ui

### 引入
在js入口文件中引入`sparta-ui`的脚本和样式。

```js
import SpartaUI from 'sparta-ui'
import 'sparta-ui/lib/index.css'

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
import 'sparta-ui/lib/style/index.css'
import Button from 'sparta-ui/lib/button/index.js'
import 'sparta-ui/lib/button/index.css'
// TODO，编写插件简化引入写法

Vue.use(Button)
```