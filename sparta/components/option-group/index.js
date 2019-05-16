import OptionGroup from '../select/src/option-group'

OptionGroup.install = Vue => {
  Vue.component(OptionGroup.name, OptionGroup)
}

export default OptionGroup
