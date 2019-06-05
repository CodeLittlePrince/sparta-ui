import TableColumn from '../table/src/table-column'

TableColumn.install = Vue => {
  Vue.component(TableColumn.name, TableColumn)
}

export default TableColumn
