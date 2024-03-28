<script>
import Table from '../../table'

/**
 * 将树形数据扁平化
 * @param {*} list
 * @param {*} item
 * @param {*} childrenKey
 * @param {*} rowKey
 * @param {*} spTreeTableRowLevel
 * @returns
 */
function flattenItem(list, item, childrenKey, rowKey, spTreeTableRowLevel) {
  item[childrenKey].forEach(v => {
    list.push({
      ...v,
      spTreeTableRowLevel,
      spTreeTableRowId: v[rowKey],
      spTreeTableRowParentId: item[rowKey],
      spTreeTableRowChildren: v[childrenKey]
    })
    if(v[childrenKey]?.length) {
      flattenItem(list, v, childrenKey, rowKey, spTreeTableRowLevel+1)
    }
  })
  return list
}

export default {

  name: 'SpTreeTable',


  extends: Table,

  props: {
    treeProps: { // 渲染嵌套数据的配置选项
      type: Object,
      default() {
        return {
          children: 'children'
        }
      }
    },
    
    defaultExpandAll: { // 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      expandedRowKeyList: [], // 展开的节点
    }
  },

  computed: {
    tableList() {
      let list = []
      this.list.forEach(item => {
        list.push({
          ...item,
          spTreeTableRowLevel: 0,
          spTreeTableRowId: item[this.rowKey],
          spTreeTableRowChildren: item[this.treeProps.children]
        })
        if (this.isTreeTable && item[this.treeProps.children]?.length) {
          list.push(...flattenItem([], item, this.treeProps.children, this.rowKey, 1))
        }
      })

      return list
    },

    isTreeTable() {
      return true
    },

    allCheckedList() { // 所有选中的节点
      return this.checkedList.filter(v => v.isChecked)
    }
  },

  watch: {
    tableList: {
      handler(list) {
        if(this.defaultExpandAll) {
          // 默认展开所有
          list.forEach(v => {
            if(v.spTreeTableRowLevel > 0) {
              this.expandedRowKeyList.push(v[this.rowKey])
            }
          })
        }
      },
      immediate: true
    }
  },
  
  methods: {
    isExpand(item) {
      const { spTreeTableRowId, spTreeTableRowLevel } = item
      // 根节点默认展开
      if(spTreeTableRowLevel === 0 || this.expandedRowKeyList.includes(spTreeTableRowId)) {
        return true
      }
    
      // 判断当前节点是否有子节点，如果有子节点，判断子节点是否在展开列表
      const rowData = this.tableList.find(v => v.spTreeTableRowId === spTreeTableRowId) || {}
      if(rowData.spTreeTableRowChildren?.length) {
        // 说明有子节点
        const expandKeys = rowData.spTreeTableRowChildren.map(v => (v[this.rowKey]))
        // 判断当前节点的子节点是否在展开列表
        const isExist = this.expandedRowKeyList.some(v => expandKeys.includes(v))
        if(isExist) {
          // 再判断下直接父节点是否展开
          const parent = this.tableList.find(v => v.spTreeTableRowId === rowData.spTreeTableRowParentId)
          return this.childRowIsExpand(parent)
        }
        return isExist
      }
      return false
    },

    isSub(v) {
      return v?.spTreeTableRowParentId
    },

    hasSub(v) {
      return v?.spTreeTableRowChildren?.length
    },
    /**
     * 仅调整样式
     * @param {*} rowData
     */
    isIndeterminateState(rowData) {
      // 判断当前节点是否有子节点，如果有子节点，
      if(this.hasSub(rowData)) {
        const checkedInfo = this.checkedList.find(checkedItem => checkedItem.spTreeTableRowId === rowData.spTreeTableRowId)
        // 判断子节点是否有选中状态，如果有选中状态，且当前节点有选中状态
        return rowData.spTreeTableRowChildren.some(child => this.allCheckedList.some(checkedItem => checkedItem.spTreeTableRowId === child.spTreeTableRowId)) && !checkedInfo?.isChecked
      }
    },

    /**
     * 判断直接的子节点是否展开
     */
    childRowIsExpand(item) {
      if(item?.spTreeTableRowChildren?.length) {
        const expandKeys = item.spTreeTableRowChildren.map(v => (v[this.rowKey]))
        return this.expandedRowKeyList.some(v => expandKeys.includes(v))
      }
      return false
    },
  
    /**
     * 判断父节点是否隐藏
     * @param {*} item
     * @returns boolean
     */
    parentHasHide(item) {
      const parent = this.tableList.find(v => v.spTreeTableRowId === item.spTreeTableRowParentId)
      if(!this.isSub(parent)) {
        // 说明父节点是根节点
        return false
      }
      // 递归判断父节点是否隐藏， 如果有一个父节点隐藏，返回true, 否则直到spTreeTableRowLevel为0, 返回false
      const isExpanded = this.expandedRowKeyList.includes(item.spTreeTableRowParentId)
      if(!isExpanded) {
        // 说明父节点是收起状态
        return true
      } else {
        // 说明父节点是展开状态, 这个时候需要判断父节点的父节点是否是收起状态
        return this.parentHasHide(parent)
      }
    },
    
    /**
     * 是否隐藏
     * @param {*} item
     * @returns
     */
    isHide(item) {
      return this.isSub(item) && (
        !this.isExpand(item)
        || this.parentHasHide(item)
      )
    },
    
    /**
     *  行展开收起
     * @param {*} item
     * @param {*} index
     */
    handleRowExpand(item, index, key) {
      if(item?.spTreeTableRowChildren?.length) {
        // 1. 判断当前节点是否展开
        // 2. 如果当前节点展开，将当前节点的id加入到expandedRowKeyList
        // 3. 如果当前节点收起，将当前节点的id从expandedRowKeyList中移除
        const expandKeys = item.spTreeTableRowChildren.map(v => (v[key]))
      
        this.expandedRowKeyList = this.expandedRowKeyList.includes(expandKeys[0])
          ? this.expandedRowKeyList.filter(v => !expandKeys.includes(v))
          : [...this.expandedRowKeyList, ...expandKeys]
      }
    },
    /**
     * 批量切换选中状态
     */
    toggleRowsSelection(indexList, isChecked) {
      if(!this.disabled && Array.isArray(indexList) && typeof isChecked === 'boolean') {
        Promise.all(indexList.map(index => this.checkHandle(index, isChecked))).then(() => {
          this._processCheckBoxRelation()
          this._emitChange()
        })
      }
    },

    /**
     * 单选框单独点击
     * @param {*} index
     * @param {*} isChecked
     */
    handleCheck(index, isChecked) {
      this.checkHandle(index, isChecked).then(() => {
        this._processCheckBoxRelation()
        this._emitChange()
      })
    },

    checkHandle(index, isChecked) {
      return new Promise((resolve) => {
        // 1. 判断当前节点是否disabled
        // 2. 如果当前节点不是disabled，判断是否有子节点，如果有子节点，递归调用
        // 3. 如果当前节点不是disabled，判断是否有父节点，如果有父节点，递归调用选中状态
        if(!this.checkedList[index].disabled) {
          const rowData = this.tableList[index]
          let allNeedCheckIndexList = [index]
          this.getTreeTableListChildIndex(rowData.spTreeTableRowId, allNeedCheckIndexList)

          this.getTreeTableListParentIndex(rowData, allNeedCheckIndexList)

          for (let i = 0; i < allNeedCheckIndexList.length; i++) {
            const checkedListIndex = allNeedCheckIndexList[i]
            const checkItem = this.checkedList[checkedListIndex]
            if(!checkItem.disabled) {
              // 如果是disabled，跳过
              this.$set(this.checkedList, checkedListIndex, {
                spTreeTableRowId: this.tableList[checkedListIndex].spTreeTableRowId,
                disabled: this.checkedList[checkedListIndex].disabled,
                isChecked
              })
            }
          }
        }
        resolve()
      })
    },

    /**
     *
     * @param {*} spTreeTableRowId
     * @param {*} treeTableIndexList
     */
    getTreeTableListChildIndex(spTreeTableRowId, treeTableIndexList) {
    // 找到tableData
      for (let index = 0; index < this.tableList.length; index++) {
        const item = this.tableList[index]
        if(item.spTreeTableRowParentId === spTreeTableRowId) { // 找到父节点，将父节点加入到treeTableIndexList
          treeTableIndexList.push(index)
          if(this.hasChild(item.spTreeTableRowId)) { // 如果有子节点，递归调用
            this.getTreeTableListChildIndex(item.spTreeTableRowId, treeTableIndexList)
          }
        }
      }
    },

    hasChild(spTreeTableRowId) {
      return !!this.tableList.find(item => item.spTreeTableRowParentId === spTreeTableRowId)
    },

    /**
     * 获取父节点
     * @param {*} rowData
     * @param {*} treeTableIndexList
     */
    getTreeTableListParentIndex(rowData, treeTableIndexList) {
      // 1. 判断是否是根节点，如果是根节点，返回
      if(!rowData.spTreeTableRowParentId) {
        return
      }
      // 判断同级节点的选中状态，如果同级节点都选中，父节点选中，如果还不是跟节点，递归调用
      let brothersList = this.tableList.filter(v => v.spTreeTableRowParentId === rowData.spTreeTableRowParentId).filter(v => v.spTreeTableRowId !== rowData.spTreeTableRowId) // 同级节点
      // 这里要先过滤掉不可选的节点
      brothersList = brothersList.filter((item, index) => !this.checkedList[index].disabled)

      // 判断同级可选节点是否都选中
      const isAllChecked = brothersList.every(v => this.checkedList.some(item => item.spTreeTableRowId === v.spTreeTableRowId && (item.isChecked || item.disabled)))
      if(isAllChecked) {
        const parentIndex = this.tableList.findIndex(v => v.spTreeTableRowId === rowData.spTreeTableRowParentId)
        treeTableIndexList.push(parentIndex) // 将父节点

        this.getTreeTableListParentIndex(this.tableList[parentIndex], treeTableIndexList)
      }

    }

  }
}
</script>

<style lang="scss">
.sp-table {
  &__body {
    tr {
      &.is--hide {
        display: none;
      }
    }
  }
  &__expand-ico {
    color: #a1a3b3;
    font-size: 12px;
    cursor: pointer;
    margin-right: 6px;
    position: relative;
    top: 0;
    &.is--expand {
      top: -1px;
      transform: rotate(90deg);
    }
  }
}
</style>