import 'site/common/scss'
import Vue from 'vue'
import './plugins'
import './components'
import router from './router'
import App from './app'
import Sparta from 'spartaComponents'

import Layout from 'sparta/components/base/layout/index.js'
import Header from 'sparta/components/base/header/index.js'
import Menu from 'sparta/components/base/menu/index.js'
import Col from 'sparta/components/base/col/index.js'

Vue.prototype.$SPARTA = {
  zIndex: 3000,
  THEME: process.env.THEME,
  animation: false
}

if (['miniCashier', 'plusCashier'].includes(process.env.THEME)) {
  Vue.use(Layout)
  Vue.use(Header)
  Vue.use(Menu)
  Vue.use(Col)
}

Vue.use(Sparta)

new Vue({
  el: '#app',
  router,
  render: createElement => createElement(App)
})