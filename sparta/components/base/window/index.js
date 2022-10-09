import Window from './src'

Window.install = Vue => {
  Vue.component(Window.name, Window)
}

export default Window