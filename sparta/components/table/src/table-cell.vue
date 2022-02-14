<script>
export default {
  name: 'SpTableCell',

  props: {
    column: {
      type: Object,
      default: null
    },
    list: {
      type: Array,
      default: () => []
    },
    rIndex: {
      type: Number,
      default: 0
    },
    cIndex: {
      type: Number,
      default: 0
    }
  },
  render(h) {
    // 单元格里面的内容
    const row = this.list[this.rIndex]
    let cell = this.column.componentOptions.propsData.prop ? row[this.column.componentOptions.propsData.prop] : row
    let cellCopy = cell === undefined ? undefined : JSON.parse(JSON.stringify(cell))
    const cellData = this.$parent.children[this.cIndex].data
    const formatter = cellData.attrs.formatter
    if (this.column.children) {
      cellCopy = this.column.children
    } else if(cellData.scopedSlots) {
      // 如果单元格中是template，则直接显示
      cellCopy = cellData.scopedSlots.default({
        cell: cellCopy,
        row: row,
        index: this.rIndex
      })
    } else if(cellCopy !== undefined && cellCopy !== null && formatter) {
      // 否则，如果cell中不为undefined，null且formatter有值
      // 则用formatter格式化数据
      cellCopy = formatter(cellCopy, row)
    } else if(cellCopy === undefined || cellCopy === null) {
      // 否则，显示cellEmptyText
      cellCopy = this.$parent.cellEmptyText
    }
    // ellipsis
    let cellClass = 'sp-table-cell'
    if (cellData.attrs.ellipsis) {
      cellClass += ' ellipsis'
    }
    // 宽度
    let cellWidth = cellData.attrs.width
    // 如果转换后是一个number，则加'px'后缀
    if (!isNaN(+cellWidth)) {
      cellWidth += 'px'
    }
    
    // 渲染
    return h('div',
      {
        class: cellClass,
        attrs: {
          style: `width: ${cellWidth}`
        }
      },
      cellCopy
    )
  }
}
</script>
