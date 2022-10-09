import Menu from './src'

Menu.install = Vue => {
  Vue.component(Menu.name, Menu)
}

export default Menu
