import TabPane from '../tabs/src/tab-pane'

TabPane.install = Vue => {
  Vue.component(TabPane.name, TabPane)
}

export default TabPane