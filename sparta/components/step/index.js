import SpStep from './src/step'

/* istanbul ignore next */
SpStep.install = function(Vue) {
  Vue.component(SpStep.name, SpStep)
}

export default SpStep
