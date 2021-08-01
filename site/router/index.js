import Vue from 'vue'
import VueRouter from 'vue-router'
import menuConfig from 'site/config/menu'

Vue.use(VueRouter)

const Home = () => import(/* webpackChunkName: "home" */ '../views/home')
const Components = () => import(/* webpackChunkName: "components" */ '../views/components')

let routes = []

routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/components',
    component: Components,
    children: [
      {
        path: '',
        redirect: 'install'
      }
    ]
  }
]

// --- 通过menu.js配置来注册路由
// --- 这样的话用户就能点击进入对应的页面
// --- 然后通过路由，根据路径名去加载对应的文档
// --- 文档因为webpack自动变为vue component
function traverseMenu(config) {
  config.forEach(item => {
    if (item.link) {
      routes[1].children.push({
        path: `${item.link.slice(1)}`,
        component: () => import('../../doc' + item.link)
      })
    }
    if (item.child) {
      traverseMenu(item.child)
    }
  })
}

traverseMenu(menuConfig.menuData)

export default new VueRouter({
  mode: 'hash',
  routes
})