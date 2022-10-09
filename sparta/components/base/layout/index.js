import Layout from './src'

Layout.install = Vue => {
  Vue.component(Layout.name, Layout)
}

export default Layout
