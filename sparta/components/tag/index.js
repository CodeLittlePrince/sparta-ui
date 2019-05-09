import SpTag from './src'

SpTag.install = Vue => {
  Vue.component(SpTag.name, SpTag)
}

export default SpTag