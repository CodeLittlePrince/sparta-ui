import Option from '../select/src/option'

Option.install = Vue => {
  Vue.component(Option.name, Option)
}

export default Option
