import SpPopupTip from './src/index'

SpPopupTip.install = Vue => {
  Vue.component(SpPopupTip.name, SpPopupTip)
}

export default SpPopupTip
