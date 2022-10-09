import Aside from './src'

Aside.install = Vue => {
  Vue.component(Aside.name, Aside)
}

export default Aside
