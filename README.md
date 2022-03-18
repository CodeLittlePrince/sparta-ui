sparta-ui
---
[![NPM version](https://img.shields.io/npm/v/sparta-ui.svg)](https://npmjs.org/package/sparta-ui)

介绍
---

### 命名由来
此组件库叫Sparta名字的由来，是因为一部名为《斯巴达300勇士》。
因为目前市面上，针对IE9的完全兼容的组件库几乎是没有了。而对于网易支付来说，IE9的用户占比还是不少，为了更好地服务用户，Sparta从此而生。

### 特性
- 开箱即用的高质量 Vue 组件。
- 全链路开发和设计工具体系。
- 为数不多的支持IE9的组件库。

### 贡献者开发时注意
写md的时候，代码之间不能有换行，否则无法编译通过!!!

### 安装
```shell
npm install sparta-ui --save
```

### 快速上手
#### 引入
在js入口文件中引入sparta-ui的脚本和样式。

```js
import SpartaUI from 'sparta-ui'
import 'sparta-ui/lib/theme/globalpay/index.css' // 跨境主题
// import 'sparta-ui/lib/theme/epay/index.css' // epay主题

Vue.use(SpartaUI)
```

#### 使用
使用<sp-*>即可调用sparta组件，如：
```html
<sp-button type="primary">按钮</sp-button>
```

#### 按需引入
为了组件库在项目中不会过于庞大，所以支持了按需引入。

```js
import 'sparta-ui/lib/theme/globalpay/style/index.css' // 跨境主题
import 'sparta-ui/lib/theme/epay/style/index.css' // epay主题
import Button from 'sparta-ui/lib/button/index.js'
import 'sparta-ui/lib/theme/globalpay/button/index.css' // 跨境主题
import 'sparta-ui/lib/theme/epay/button/index.css' // epay主题
// TODO，编写插件简化引入写法

Vue.use(Button)
```