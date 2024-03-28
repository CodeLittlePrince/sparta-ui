import TreeTable from './src/index'

TreeTable.install = Vue => {
  Vue.component(TreeTable.name, TreeTable)
}

export default TreeTable