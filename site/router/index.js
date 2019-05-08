import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import(/* webpackChunkName: "home" */ '../views/home')
const Components = () => import(/* webpackChunkName: "components" */ '../views/components')

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/components',
      component: Components
    }
  ]
})