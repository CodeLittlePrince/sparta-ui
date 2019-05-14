import 'common/scss'
import Vue from 'vue'
import './plugins'
import './components'
import router from './router'
import App from './app'
import Sparta from 'sparta'

Vue.use(Sparta)

new Vue({
  el: '#app',
  router,
  render: createElement => createElement(App)
})