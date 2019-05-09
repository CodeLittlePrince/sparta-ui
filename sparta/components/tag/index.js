import EvTag from './src'

EvTag.install = Vue => {
  Vue.component(EvTag.name, EvTag)
}

export default EvTag