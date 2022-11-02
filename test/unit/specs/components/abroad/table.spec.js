import { mount } from '@vue/test-utils'
import { bootstrap } from '../../../util'

bootstrap('abroad')

const testDataArr = []

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
          show: true,
          border: false
        }
      },
      template: `
       <sp-table ref="table" :list="testData" :border="border" enableUpdate>
          <sp-table-column prop="id" />
          <sp-table-column prop="name" label="片名" />
          <sp-table-column prop="release" label="发行日期" />
          <sp-table-column prop="director" label="导演" />
          <sp-table-column v-if="show" prop="runtime" label="时长（分）" />
       </sp-table>
      `,
    })

    it('vertical border', async () => {
      await wrapper.setData({ border: true })
      expect(wrapper.find('.sp-table.is--has-border').exists()).to.be.true
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
    })

    it('clearSelection', async () => {
      await wrapper.vm.$refs.table.clearSelection()
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
    })

    it('toggleRowSelection', async () => {
      await wrapper.vm.$refs.table.toggleRowSelection(3, true)
      expect(wrapper.vm.selectedList.length).to.be.equal(1)

      await wrapper.vm.$refs.table.toggleRowSelection(3, false)
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
    })

    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  })
})
