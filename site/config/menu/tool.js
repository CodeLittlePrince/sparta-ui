function insertMenuItems(source, datas) {
  const sourceCopy = JSON.parse(JSON.stringify(source))
  let menuData = sourceCopy.menuData

  datas.forEach(item => {
    insertMenuItem(menuData, item)
  })

  sourceCopy.menuData = menuData

  return sourceCopy
}

function insertMenuItem(menuData, { parentIndex, data }) {
  const indexSplits = parentIndex.split('-')
  let indexStr = ''
  let config = menuData

  indexSplits.forEach(num => {
    if (indexStr) {
      indexStr += '-' + num
    } else {
      indexStr = num
    }

    config = config.find(item => {
      return item.index == indexStr
    })

    if (config) {
      if (parentIndex == config.index) {
        const matchedIndex = config.child.findIndex(item => item.index == data.index)
        
        // 如果配置中已经存在对应的index，则用新值替换，否则在末尾新增
        if (-1 < matchedIndex) {
          config.child.splice(matchedIndex, 1, data)
        } else {
          config.child.push(data)
        }
      } else {
        config = config.child
      }
    }
  })
}

export {
  insertMenuItems
}