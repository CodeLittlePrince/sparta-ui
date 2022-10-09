import SpProgress from './src/index'

SpProgress.install = function(Vue) {
  Vue.component(SpProgress.name, SpProgress)
}

export default SpProgress
