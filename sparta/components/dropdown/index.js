import dropdown from '../dropdown/src'

dropdown.install = Vue => {
  Vue.component(dropdown.name, dropdown)
}

export default dropdown
