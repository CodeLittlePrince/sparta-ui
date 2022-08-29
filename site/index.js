import 'site/common/scss'
import Vue from 'vue'
import './plugins'
import './components'
import router from './router'
import App from './app'
import Sparta from 'sparta'

Vue.prototype.$SPARTA = {
  zIndex: 3000,
  THEME: process.env.THEME
}

Vue.use(Sparta)

new Vue({
  el: '#app',
  router,
  render: createElement => createElement(App)
})