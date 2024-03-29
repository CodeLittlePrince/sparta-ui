import { mount } from '@vue/test-utils'
import { bootstrap } from '../../../util'

bootstrap()

const testDataArr = []
const toArray = function(obj) {
  return [].slice.call(obj)
}

const getTestData = () => {
  return [
    { id: 1, name: 'A Bug\'s Life', release: '1995-11-22', director:'John Lasseter', runtime: 80 },
    { id: 2, name: 'A Bug\'s Life', release: '1998-11-25', director: 'John Lasseter', runtime: 95 },
    { id: 3, name: 'Toy Story 2', release: '1999-11-24', director: 'John Lasseter', runtime: 92 },
    { id: 4, name: 'Monsters, Inc.', release: '2001-11-2', director: 'Andrew Stanton', runtime: 92 },
    { id: 5, name: 'Finding Nemo', release: '2003-5-30', director: 'Andrew Stanton', runtime: 100 }
  ]
}

getTestData().forEach(cur => {
  Object.keys(cur).forEach(prop => {
    testDataArr.push(cur[prop].toString())
  })
})

describe('Table', () => {
  describe('rendering data is correct', () => {
    const wrapper = mount({
      data() {
        return {
          testData: getTestData(),
          show: true
        }
      },
      template: `
       <sp-table :list="testData" enableUpdate>
          <sp-table-column prop="id" />
          <sp-table-column prop="name" label="片名" />
          <sp-table-column prop="release" label="发行日期" />
          <sp-table-column prop="director" label="导演" />
          <sp-table-column v-if="show" prop="runtime" label="时长（分）" />
       </sp-table>
      `,
    })

    it('head', async () => {
      const ths = toArray(wrapper.vm.$el.querySelectorAll('thead th'))
      expect((ths.map(node => node.textContent).filter(o => o)).length).to.be.equal(5)
    })

    it('row length', () => {
      expect(wrapper.vm.$el.querySelectorAll('.sp-table__body tbody tr').length).to.equal(getTestData().length)
    })

    it('row data', () => {
      const cells = toArray(wrapper.vm.$el.querySelectorAll('td .sp-table-cell'))
        .map(node => node.textContent)
      expect(cells).to.deep.equal(testDataArr)
    })

    it('change data', async () => {
      await wrapper.setData({ testData: []})
      expect(wrapper.find('.sp-table__empty').isVisible()).to.be.true
    })

    it('hide table column', async () => {
      await wrapper.setData({ show: false })
      const ths = toArray(wrapper.vm.$el.querySelectorAll('thead th'))
      expect((ths.map(node => node.textContent).filter(o => o)).length).to.be.equal(4)
    })
  })

  describe('props', () => {
    const wrapper = mount({
      data() {
        return {
          testData: [],
          ellipsis: true,
          loading: false,
          hasMore: false,
          disabled: false,
          selection: false,
          pagination: false,
          showAllSelect: true,
          paginationOption: {
            perPages: 5,
            queryPageNo: 2,
            pageSize: 10,
            totalSize: 1000,
            align: 'middle'
          },
          cellEmptyText: '测试'
        }
      },
      template: `
       <sp-table 
          :list="testData" 
          :loading="loading"
          :selection="selection"
          :showAllSelect="showAllSelect"
          :has-more="hasMore"
          :disabled="disabled"
          :pagination="pagination"
          :paginationOption="paginationOption"
          :cell-empty-text="cellEmptyText"
          >
          <sp-table-column prop="name" label="片名" />
          <sp-table-column prop="id" />
          <sp-table-column prop="release" label="发行日期" />
          <sp-table-column 
            prop="director" 
            label="导演" 
            width="200"
            :ellipsis="ellipsis"/>
          <sp-table-column prop="runtime" label="时长（分）" />
       </sp-table>
      `,
    })
    document.body.appendChild(wrapper.vm.$el)

    it('emptyText', () => {
      expect(wrapper.find('.sp-table__empty').isVisible()).to.be.true
    })

    it('loading', async () => {
      await wrapper.setData({ loading: true })
      expect(wrapper.find('.sp-table__loading-wrap').isVisible()).to.be.true
      await wrapper.setData({ loading: false })
    })

    it('selection: true -- no data', async () => {
      await wrapper.setData({ selection: true })
      expect(wrapper.find('.sp-checkbox').exists()).to.be.false
    })

    it('showAllSelect', async () => {
      await wrapper.setData({ selection: true, pagination: false, showAllSelect:false })
      expect(wrapper.find('.sp-table__footer').exists()).to.be.false
      await wrapper.setData({ showAllSelect:true })
    })

    it('pagination: 1 page', async () => {
      await wrapper.setData({ pagination: true, paginationOption: { totalSize: 9 } })
      expect(wrapper.find('.sp-table__footer-center').exists()).to.be.false
    })

    it('pagination: 2 page', async () => {
      await wrapper.setData({ pagination: true, paginationOption: { totalSize: 11 } })
      expect(wrapper.find('.sp-table__footer-center').exists()).to.be.true
    })

    it('paginationOption', async () => {
      expect(wrapper.vm.$el.querySelectorAll('.sp-pagination .align--middle li').length).to.equal(4)
      expect(wrapper.find('.sp-pagination .align--middle .is--checked').text()).to.equal('2')
      expect(wrapper.find('.align--middle').exists()).to.be.true
    })

    it('hasMore', async () => {
      await wrapper.setData({ hasMore: true })
      expect(wrapper.find('.sp-table__append').exists()).to.be.true
      await wrapper.setData({ hasMore: false })
    })

    it('disabled', async () => {
      await wrapper.setData({ disabled: true })
      expect(wrapper.find('.sp-table.is--disabled').exists()).to.be.true
      await wrapper.setData({ disabled: false })
    })

    it('ellipsis', async () => {
      await wrapper.setData({ testData: [{
        id: 1,
        name: 'Finding Nemo',
        release: '2003-5-30',
        director: 'Andrew StantonAndrew StantonAndrew StantonAndrew StantonAndrew StantonAndrew StantonAndrew StantonAndrew StantonAndrew StantonAndrew Stanton',
        runtime: 100 }]
      })
      
      expect(wrapper.find('.sp-table__body').find('.ellipsis').exists()).to.be.true
      expect(wrapper.find('.sp-table__body').find('.ellipsis').element.style.width).to.be.equal('200px')
    })

    it('selection: true -- has data', async () => {
      await wrapper.setData({ selection: true })
      expect(wrapper.find('.sp-checkbox').exists()).to.be.true
    })

    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  })
  describe('events', () => {
    const wrapper = mount({
      data() {
        return {
          testData: getTestData(),
          currentPageIndex: -1,
          currentPageSize: -1,
          selectedList: [],
          isClickTableViewMore: false
        }
      },
      template: `
       <sp-table 
          :list="testData"
          ref="table"
          @selection-change="handleSelectionChange"
          @pagination-change="handlePaginationChange"
          @table-view-more="handleTableViewMore"
          :selection="true"
          pagination
          :paginationOption="{ totalSize: 1000 }"
          :hasMore="true"
          >
          <sp-table-column prop="id" />
          <sp-table-column prop="name" label="片名" />
          <sp-table-column prop="release" label="发行日期" />
          <sp-table-column prop="director" label="导演" />
          <sp-table-column prop="runtime" label="时长（分）" />
       </sp-table>
      `,
      methods: {
        handleSelectionChange(data) {
          this.selectedList = data
        },
        handlePaginationChange(index, pageSize) {
          this.currentPageIndex = index,
          this.currentPageSize = pageSize
        },
        handleTableViewMore() {
          this.isClickTableViewMore = true
        }
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('selection-change', async () => {
      await wrapper.vm.$refs.table.toggleAllSelection()
      expect(wrapper.find('.sp-checkbox.is--checked').exists()).to.be.true
      expect(wrapper.vm.selectedList.length).to.be.equal(5)
    })

    it('selection-change single click', async () => {
      await wrapper.find('.sp-checkbox__input').trigger('click')
      expect(wrapper.vm.selectedList.length).to.be.equal(4)
    })

    it('selection-change all click', async () => {
      await wrapper.find('.sp-table__footer-left-content .sp-checkbox__input').trigger('click')
      expect(wrapper.vm.selectedList.length).to.be.equal(5)
    })

    it('pagination-change', async () => {
      await wrapper.findAll('.sp-pagination li').wrappers[5].trigger('click')
      expect(wrapper.vm.currentPageIndex).to.be.equal(5)
      expect(wrapper.vm.currentPageSize).to.be.equal(10)
    })

    it('table-view-more', async () => {
      await wrapper.find('.sp-table__append-show-more button').trigger('click')
      expect(wrapper.vm.isClickTableViewMore).to.be.true
    })

    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  })

  describe('methods', () => {
    const wrapper = mount({
      data() {
        return {
          testData: getTestData(),
          currentPageIndex: -1,
          currentPageSize: -1,
          selectedList: [],
          changeCount: 0,
          isClickTableViewMore: false
        }
      },
      template: `
       <sp-table 
          :list="testData" 
          @selection-change="handleSelectionChange"
          ref="table"
          :selection="true"
          :paginationOption="{ totalSize: 1000 }"
          :hasMore="true"
          >
          <sp-table-column prop="id" />
          <sp-table-column prop="name" label="片名" />
          <sp-table-column prop="release" label="发行日期" />
          <sp-table-column prop="director" label="导演" />
          <sp-table-column prop="runtime" label="时长（分）" />
       </sp-table>
      `,
      methods: {
        handleSelectionChange(data) {
          this.changeCount++
          this.selectedList = data
        }
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('toggleAllSelection', async () => {
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
      await wrapper.vm.$refs.table.toggleAllSelection()
      expect(wrapper.vm.selectedList.length).to.be.equal(5)
      expect(wrapper.vm.$children[0].checkAll).to.be.true
    })

    it('clearSelection', async () => {
      await wrapper.vm.$refs.table.clearSelection()
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
      expect(wrapper.vm.$children[0].checkAll).to.be.false

      await wrapper.vm.$refs.table.clearSelection()
      expect(wrapper.vm.changeCount).to.be.equal(2)
    })

    it('toggleRowSelection', async () => {
      await wrapper.vm.$refs.table.toggleRowSelection(3, true)
      expect(wrapper.vm.selectedList.length).to.be.equal(1)
      expect(wrapper.vm.$children[0].isIndeterminate).to.be.true
      expect(wrapper.vm.$children[0].checkAll).to.be.false

      await wrapper.vm.$refs.table.toggleRowSelection(3, false)
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
      expect(wrapper.vm.$children[0].checkAll).to.be.false
      expect(wrapper.vm.$children[0].isIndeterminate).to.be.false
    })

    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  })


  describe('Table-column Attributes', () => {
    const wrapper = mount({
      data() {
        return {
          testData: getTestData()
        }
      },
      template: `
       <sp-table :list="testData">
          <sp-table-column prop="id" />
          <sp-table-column prop="name" label="片名" />
          <sp-table-column prop="release" label="发行日期" />
          <sp-table-column prop="director" label="导演" />
          <sp-table-column prop="runtime" label="时长（分）" :formatter="formatter"/>
       </sp-table>
      `,
      methods: {
        formatter(cell) {
          return cell + '分钟'
        }
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('formatter', async () => {
      const tdList = toArray(wrapper.vm.$el.querySelectorAll('.sp-table-cell'))
      expect(tdList.map(node => node.textContent).filter(o => o).some(item => item.includes('分钟'))).to.be.true
    })

    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  })

  describe('interact', () => {
    const wrapper = mount({
      data() {
        return {
          testData: getTestData(),
          selectedList: []
        }
      },
      template: `
       <sp-table 
       :list="testData"
       :selection="true"
       :pagination="true"
       ref="table"
       :pagination-option="{ totalSize: 1000 }"
       @selection-change="handleSelectionChange"
       :selectable="isSelectable"
       >
          <sp-table-column prop="id" />
          <sp-table-column prop="name" label="片名" />
          <sp-table-column prop="release" label="发行日期" />
          <sp-table-column prop="director" label="导演" />
          <sp-table-column prop="runtime" label="时长（分）" :formatter="formatter"/>
       </sp-table>
      `,
      methods: {
        formatter(cell) {
          return cell + '分钟'
        },
        handleSelectionChange(data) {
          this.selectedList = data
        },
        isSelectable(row) {
          return ![4].includes(row.id)
        }
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('checkbox part able', async () => {
      await wrapper.find('.sp-table__footer-left-content .sp-checkbox__input').trigger('click')
      expect(wrapper.vm.selectedList.length).to.be.equal(4)
      expect(wrapper.vm.$children[0].checkAll).to.be.true

      await wrapper.vm.$refs.table.toggleAllSelection()
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
      expect(wrapper.vm.$children[0].checkAll).to.be.false

      await wrapper.vm.$refs.table.toggleAllSelection()
      expect(wrapper.vm.selectedList.length).to.be.equal(4)
      expect(wrapper.vm.$children[0].checkAll).to.be.true

      await wrapper.vm.$refs.table.clearSelection()
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
      expect(wrapper.vm.$children[0].checkAll).to.be.false

      await wrapper.vm.$refs.table.toggleRowSelection(3, true)
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
      expect(wrapper.vm.$children[0].checkAll).to.be.false

      await wrapper.vm.$refs.table.toggleAllSelection()
      expect(wrapper.vm.selectedList.length).to.be.equal(4)
      expect(wrapper.vm.$children[0].checkAll).to.be.true

      await wrapper.setData({ testData: [
        { id: 11, name: 'A Bug\'s Life', release: '1995-11-22', director:'John Lasseter', runtime: 80 }
      ]})
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
      expect(wrapper.vm.$children[0].checkAll).to.be.false
    })

    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  })
  
  describe('interact - 自定义渲染', () => {
    const wrapper = mount({
      data() {
        return {
          testData: getTestData()
        }
      },
      template: `
       <sp-table :list="testData">
          <sp-table-column label="片名">1</sp-table-column>
          <sp-table-column label="发行日期">2</sp-table-column>
          <sp-table-column label="导演">3</sp-table-column>
       </sp-table>
      `,
    })

    document.body.appendChild(wrapper.vm.$el)

    it('row data - 自定义渲染', () => {
      const cells = toArray(wrapper.vm.$el.querySelectorAll('td .sp-table-cell'))
        .map(node => node.textContent)
      expect(cells).to.deep.equal(['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'])
    })

    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  })

})