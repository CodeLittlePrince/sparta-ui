快速上手
---
此部分介绍如何使用sparta-ui

### 全量引入
在js入口文件中引入`sparta-ui`的脚本和样式。

```js
import SpartaUI from 'sparta-ui/lib/plusCashier/index.js'
import 'sparta-ui/lib/plusCashier/index.css'

Vue.use(SpartaUI)
```

### 使用
在`html`中使用`<sp-*>`即可调用sparta组件，如：

```html
<sp-button type="primary">按钮</sp-button>
```