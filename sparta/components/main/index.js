import Main from './src'

Main.install = Vue => {
  Vue.component(Main.name, Main)
}

export default Main
