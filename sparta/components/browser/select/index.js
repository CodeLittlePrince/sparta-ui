import Select from './src/index'

Select.install = Vue => {
  Vue.component(Select.name, Select)
}

export default Select
