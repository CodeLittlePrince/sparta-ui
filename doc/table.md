# Table 表格

用于展示批量数据

### 基本用法

:::demo 当`sp-table`元素中注入`list`对象数组后，在`sp-table-column`中用`prop`属性来对应对象中的键名即可填入数据，用`label`属性来定义表格的列名。<br>可以使用`width`属性来定义列宽。通过`template`自定义单元格内容，用`scope`单元格对应的值。
```vue
<template>
<div>
  <sp-button @click="showTableColumn = !showTableColumn">隐藏table-column</sp-button>
  <sp-table :list="tableList1" enable-update>
    <sp-table-column
      :ellipsis="true"
      prop="name"
      label="店铺名称"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      v-if="showTableColumn"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="tag"
      label="操作">
      <template slot-scope="scope">
        <sp-button
          type="primary"
          size="small"
        >
          {{ scope.cell }}
          {{ scope.row.tag }}
        </sp-button>
      </template>
    </sp-table-column>
  </sp-table>
  </div>
</template>

<script>
export default{
  data() {
    return {
      tableList1: [
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        },
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        }
      ]
    }
  },
  methods: {
    formatter(cell) {
      return cell + '元'
    }
  }
}
</script>
```
:::

### 自定义列表头部显示

:::demo 自定义头部。
```vue
<template>
  <sp-table :list="tableList1">
    <sp-table-column
      :ellipsis="true"
      prop="name"
      label="店铺名称"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      v-if="showTableColumn"
      label="提现中的金额"
      slot-name="withdrawing"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="tag"
      label="操作">
      <template slot-scope="scope">
        <sp-button
          type="primary"
          size="small"
        >
          {{ scope.cell }}
          {{ scope.row.tag }}
        </sp-button>
      </template>
    </sp-table-column>
     <div slot="withdrawing">
        提现中的金额 <sp-popup-tip
      width="200" color="#747d8c"
      has-border
    >
      <i class="sp-icon-ques"></i>
      <template slot="popup">
        我是做好事不留名的红领巾
      </template>
    </sp-popup-tip>
      </div>
  </sp-table>
</template>

<script>
export default{
  data() {
    return {
      tableList1: [
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        },
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        }
      ]
    }
  },
  methods: {
    formatter(cell) {
      return cell + '元'
    }
  }
}
</script>
```
:::

### 显示更多

:::demo 。
```vue
<template>
  <sp-table 
   :list="tableList1" 
   has-more
   @table-view-more="handleViewMore"
   >
    <sp-table-column
      :ellipsis="true"
      prop="name"
      label="店铺名称"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="tag"
      label="操作">
      <template slot-scope="scope">
        <sp-button
          type="primary"
          size="small"
        >
          {{ scope.cell }}
          {{ scope.row.tag }}
        </sp-button>
      </template>
    </sp-table-column>
  </sp-table>
</template>

<script>
export default{
  data() {
    return {
      tableList1: [
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        },
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        }
      ]
    }
  },
  methods: {
    formatter(cell) {
      return cell + '元'
    },
    handleViewMore() {
      console.log('handleViewMore')
    }
  }
}
</script>
```
:::


### 带分页的

:::demo 。
```vue
<template>
  <sp-table 
  :list="tableList1" 
  pagination>
    <sp-table-column
      :ellipsis="true"
      prop="name"
      label="店铺名称"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="tag"
      label="操作">
      <template slot-scope="scope">
        <sp-button
          type="primary"
          size="small"
        >
          {{ scope.cell }}
          {{ scope.row.tag }}
        </sp-button>
      </template>
    </sp-table-column>
  </sp-table>
</template>

<script>
export default{
  data() {
    return {
      tableList1: [
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        },
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        }
      ]
    }
  },
  methods: {
    formatter(cell) {
      return cell + '元'
    }
  }
}
</script>
```
:::

### 页面右侧自定义内容

:::demo footerRightContent。
```vue
<template>
  <sp-table 
  :list="tableList1" 
  pagination>
    <sp-table-column
      :ellipsis="true"
      prop="name"
      label="店铺名称"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="tag"
      label="操作">
      <template slot-scope="scope">
        <sp-button
          type="primary"
          size="small"
        >
          {{ scope.cell }}
          {{ scope.row.tag }}
        </sp-button>
      </template>
    </sp-table-column>
    <div slot="footerRightContent">充值金额/币种: <sp-button type="primary" size="small">立即充值</sp-button></div>
  </sp-table>
</template>

<script>
export default{
  data() {
    return {
      tableList1: [
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        },
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        }
      ]
    }
  },
  methods: {
    formatter(cell) {
      return cell + '元'
    }
  }
}
</script>
```
:::


### 页面左侧自定义内容

:::demo footerRightContent。
```vue
<template>
  <sp-table 
  :list="tableList1" 
  >
    <sp-table-column
      :ellipsis="true"
      prop="name"
      label="店铺名称"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="tag"
      label="操作">
      <template slot-scope="scope">
        <sp-button
          type="primary"
          size="small"
        >
          {{ scope.cell }}
          {{ scope.row.tag }}
        </sp-button>
      </template>
    </sp-table-column>
    <div slot="footerLeftContent">已选中<sp-button type="text" size="small">0</sp-button>张E卡</div>
    <div slot="footerRightContent">充值金额/币种: <sp-button type="primary" size="small">立即充值</sp-button></div>
  </sp-table>
</template>

<script>
export default{
  data() {
    return {
      tableList1: [
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        },
        {
          name: 'Steven Jobs',
          withdrawing: '20.00',
          tag: 'yo'
        }
      ]
    }
  },
  methods: {
    formatter(cell) {
      return cell + '元'
    }
  }
}
</script>
```
:::


### 带选择的表格

:::demo 设置`sp-table`属性`selection`为true。
```vue
<template>
<sp-button @click="handleClearSelection">清空选择clearSelection</sp-button>
<sp-button @click="handleToggleAllSelection">切换全选toggleAllSelection</sp-button>
  <sp-table
    :list="tableList1"
    pagination
    ref="table"
    :pagination-option="{ total: 1000 }"
    :pagination-disabled="paginationDisabled"
    selection
    @selection-change="handleSelectionChange"
    @pagination-change="handlePaginationChange"
  >
    <sp-table-column
      :ellipsis="true"
      prop="name"
      label="店铺名称"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="tag"
      label="操作">
      <template slot-scope="scope">
        <sp-input v-model="scope.row.amount" 
        @focus="handleInputFocus(scope.index)"/>
      </template>
    </sp-table-column>
    <div slot="footerLeftContent">
      <sp-button plain size="mini">删除</sp-button>
    </div>
  </sp-table>
</template>

<script>
export default{
  data() {
    return {
      tableList1: [
        {
          name: '番茄炒西红柿',
          withdrawing: '20.00',
          tag: 'yo',
          amount: ''
        },
        {
          name: '土豆炖马铃薯',
          withdrawing: '30.00',
          tag: 'yo',
          amount: ''
        }
      ]
    }
  },
  methods: {
    formatter(cell) {
      return cell + '元'
    },
    handleSelectionChange(data) {
      console.log(data)
    },
    handleClearSelection() {
      this.$refs.table.clearSelection()
    },
    handleToggleAllSelection() {
       this.$refs.table.toggleAllSelection()
    },
    handleInputFocus(index) {
      this.$refs.table.toggleRowSelection(index, true)
    },
    handlePaginationChange(index, pageSize) {
      this.paginationDisabled = true
      setTimeout(() => {
        this.paginationDisabled = false
      }, 1000)
      console.log(index, pageSize)
    }
  }
}
</script>
```
:::


### 带选择的表格 部分不可选

:::demo 设置`sp-table`属性`selection`为true， `selectable`传入函数。
```vue
<template>
<sp-button @click="handleClearSelection2">清空选择clearSelection2</sp-button>
<sp-button @click="handleToggleAllSelection2">切换全选toggleAllSelection2</sp-button>
  <sp-table
    :list="tableList2"
    pagination
    ref="table2"
    :pagination-option="{ total: 1000 }"
    :pagination-disabled="paginationDisabled2"
    selection
    :selectable="isSelectable2"
    @selection-change="handleSelectionChange2"
    @pagination-change="handlePaginationChange2"
  >
    <sp-table-column
      :ellipsis="true"
      prop="name"
      label="店铺名称"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
     <sp-table-column
      prop="tag"
      label="操作">
      <template slot-scope="scope">
        <sp-input v-model="scope.row.amount" 
        @focus="handleInputFocus2(scope.index)"/>
      </template>
    </sp-table-column>
    <div slot="footerLeftContent">
      <sp-button plain size="mini">删除</sp-button>
    </div>
  </sp-table>
</template>

<script>
export default{
  data() {
    return {
      paginationDisabled2: false
      tableList2: [
        {
          name: '番茄炒西红柿',
          withdrawing: '20.00',
          tag: 'yo',
          amount: ''
        },
        {
          name: '土豆炖马铃薯',
          withdrawing: '30.00',
          tag: 'yo',
          amount: ''
        }
      ]
    }
  },
  methods: {
    formatter(cell) {
      return cell + '元'
    },
    handleSelectionChange2(data) {
      console.log(data)
    },
    handleClearSelection2() {
      this.$refs.table2.clearSelection()
    },
    handleInputFocus2(index) {
      this.$refs.table2.toggleRowSelection(index, true)
    },
    handleToggleAllSelection2() {
       this.$refs.table2.toggleAllSelection()
    },
    handlePaginationChange2(index, pageSize) {
      this.paginationDisabled2 = true
      setTimeout(() => {
        this.paginationDisabled2 = false
      }, 1000)
      console.log(index, pageSize)
    },
    isSelectable2(row, index) {
      return !['30.00'].includes(row.withdrawing)
    }
  }
}
</script>
```
:::


### 不可勾选状态

:::demo 设置`sp-table`属性`selection`为true，属性`disabled`为true 。
```vue
<template>
  <sp-table
    :list="tableList1"
    disabled
    selection
    @selection-change="handleSelectionChange"
  >
    <sp-table-column
      :ellipsis="true"
      prop="name"
      label="店铺名称"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="tag"
      label="操作">
      <template slot-scope="scope">
        <sp-button
          type="primary"
          size="small"
        >
          click
        </sp-button>
      </template>
    </sp-table-column>
    <div slot="footerLeftContent">
      <sp-button plain size="mini">删除</sp-button>
    </div>
  </sp-table>
</template>

<script>
export default{
  data() {
    return {
      tableList1: [
        {
          name: '番茄炒西红柿',
          withdrawing: '20.00',
          tag: 'yo'
        },
        {
          name: '土豆炖马铃薯',
          withdrawing: '30.00',
          tag: 'yo'
        }
      ]
    }
  },
  methods: {
    formatter(cell) {
      return cell + '元'
    },
    handleSelectionChange(data) {
      console.log(data)
    }
  }
}
</script>
```
:::

### 横向滚动的表格

:::demo 需要把所有的column设置width。
```vue
<template>
  <sp-table
    :list="tableList1"
    @selection-change="handleSelectionChange"
  >
    <sp-table-column
      :ellipsis="true"
      prop="name"
      label="店铺名称"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="withdrawing"
      label="提现中的金额"
      :formatter="formatter"
      width="200">
    </sp-table-column>
    <sp-table-column
      prop="tag"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <sp-button
          type="primary"
          size="small"
        >
          click
        </sp-button>
      </template>
    </sp-table-column>
  </sp-table>
</template>

<script>
export default{
  data() {
    return {
      tableList1: [
        {
          name: '番茄炒西红柿',
          withdrawing: '20.00',
          tag: 'yo'
        },
        {
          name: '土豆炖马铃薯',
          withdrawing: '30.00',
          tag: 'yo'
        }
      ]
    }
  },
  methods: {
    formatter(cell) {
      return cell + '元'
    }
  }
}
</script>
```
:::


### Table Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| list | 设置 table 数据源 | array | — | [] |
| emptyText | 设置 table 没有数据时候的默认文案| string | — | '无相关数据' |
| loading | 设置 table 是否处于加载，如果是则会出现loading bar | boolean | — | false |
| cellEmptyText | 设置单元格没有数据的默认文案 | string | — | '--' |
| selection | 带选择的表格 | boolean | — | false |
| pagination | 设置表格分页 | boolean | — | false |
| paginationOption | 设置表格分页参数参考Pagination组件 | object | — | {} |
| paginationDisabled | 设置表格分页不可点击状态 | boolean | — | false |
| hasMore | 设置显示更多按钮 | boolean | — | false |
| disabled | 设置表格不可勾选 | boolean | — | false |

### Table Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| selection-change  | checkbox选择触发 | selection（选中了数据数组） |
| pagination-change  | 改变页码时的回调 | (index, pageSize) index为当前页码，pageSize为每页显示条数 |
| table-view-more  | 查看更多触发 | - |

### Table Methods
| 方法名      | 说明    | 参数      |
|---------- |-------- |---------- |
| clearSelection      | 用于多选表格，清空用户的选择    | —      |
| toggleAllSelection      | 用于多选表格，切换所有行的选中状态    | —      |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）    | index(数组下标,从0开始),selected   |


### Table-column Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| prop | 设置每列单元格获取数据的key | string| — | '' |
| label | 设置 table 每列头部单元格的文案 | string| — | '' |
| width | 设置 table 每列的宽度 | string | — | '' |
| ellipsis | 设置 table 指定列是否超长ellipsis | boolean | — | false |
| formatter | 设置单元格数据格式化方法 | function | — | — |
| template | 设置单元格内html，单元数据通过slot-scope的值加cell获取，如slot-scope值为`scope`，则获取方式为`{{ scope.cell }}` | slot | — | — |


### Table-column Scoped Slot
| name | 说明 |
|------|--------|
| — | 自定义列的内容，参数为 { cell, row }，cell为该单元格对应的数据prop的值，row为该行的所有数据 |
| footerLeftContent | 自定义左侧操作内容 |
| footerRightContent | 自定义footer右边的内容 |


<script>
export default{
  data() {
    return {
      tableList1: [
        {
          name: '番茄炒西红柿',
          withdrawing: '20.00',
          tag: 'yo',
          amount: ''
        },
        {
          name: '番茄炒西红柿番茄炒西红柿番茄炒西红柿番茄炒西红柿番茄炒西红柿番茄炒西红柿番茄炒西红柿番茄炒西红柿番茄炒西红柿番茄炒西红柿番茄炒西红柿番茄炒西红柿番茄炒西红柿',
          withdrawing: '20.00',
          tag: 'yo',
          amount: ''
        },
        {
          name: null,
          withdrawing: '30.00',
          tag: 'yo',
          amount: ''
        }
      ],
      tableList2: [
        {
          name: 'cat',
          withdrawing: '20.00',
          tag: 'yo',
          amount: ''
        },
        {
          name: 'dog',
          withdrawing: '20.00',
          tag: 'yo',
          amount: ''
        },
        {
          name: 'pig',
          withdrawing: '30.00',
          tag: 'yo',
          amount: ''
        }
      ],
      paginationDisabled: false,
      paginationDisabled2: false,
      showTableColumn: true
    }
  },
  methods: {
    formatter(cell) {
      return cell + '元'
    },
    handleSelectionChange(data) {
      console.log(data)
    },
    handlePaginationChange(index, pageSize) {
      this.paginationDisabled = true
      setTimeout(() => {
        this.paginationDisabled = false
      }, 1000)
      console.log(index, pageSize)
    },
    handleViewMore() {
      console.log('handleViewMore')
    },
    handleClearSelection() {
      this.$refs.table.clearSelection()
    },
    handleToggleAllSelection() {
       this.$refs.table.toggleAllSelection()
    },
    handleInputFocus(index) {
      this.$refs.table.toggleRowSelection(index, true)
    },
    handleInputBlur(row, index) {
      if(row.amount) return
      this.$refs.table.toggleRowSelection(index, false)
    },
    handleSelectionChange2(data) {
      console.log(data)
    },
    handleClearSelection2() {
      this.$refs.table2.clearSelection()
    },
    handleInputFocus2(index) {
      this.$refs.table2.toggleRowSelection(index, true)
    },
    handleToggleAllSelection2() {
       this.$refs.table2.toggleAllSelection()
    },
    handlePaginationChange2(index, pageSize) {
      this.paginationDisabled2 = true
      setTimeout(() => {
        this.tableList2 = [
          {
          name: 'cat'+index,
          withdrawing: '20.00',
          tag: 'yo',
          amount: ''
        },
        {
          name: 'dog'+index,
          withdrawing: '20.00',
          tag: 'yo',
          amount: ''
        },
        {
          name: 'pig'+index,
          withdrawing: '30.00',
          tag: 'yo',
          amount: ''
        }
        ]
        this.paginationDisabled2 = false
      }, 1000)
      console.log(index, pageSize)
    },
    isSelectable2(row, index) {
      return !['30.00'].includes(row.withdrawing)
    }
  }
}
</script>