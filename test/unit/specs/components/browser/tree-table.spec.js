import { mount } from '@vue/test-utils'
import { bootstrap, waitImmediate } from '../../../util'

bootstrap('browser')

const getTestData = () => {
  return [
    {
      id: '1',
      name: 'UE设计',
      number: '7',
      userName: '1',
      groupName: 'UE设计',
      groupUserName: 'wang wu'
    },
    {
      id: '2',
      name: 'UI设计',
      number: '10',
      userName: '2',
      groupName: 'UI设计',
      groupUserName: 'wang wu',
      childList: [
        {
          id: '21',
          name: 'C端UI',
          number: '2',
          userName: '21',
          groupName: 'C端UI',
          groupUserName: 'wang wu',
        },
        {
          id: '22',
          name: 'B端UI',
          number: '3',
          userName: '22',
          groupName: 'B端UI',
          groupUserName: 'wang wu',
          childList: [
            {
              id: '221',
              name: 'home',
              number: '5',
              userName: '221',
              groupName: 'home',
              groupUserName: 'wang wu',
              childList: [
                {
                  id: '2211',
                  name: '设计师',
                  number: '16',
                  userName: '2211',
                  groupName: '设计师',
                  groupUserName: 'wang wu',
                  childList: [
                    {
                      id: '22111',
                      name: '家装设计师',
                      number: '2',
                      userName: '22111',
                      groupName: '家装设计师',
                      groupUserName: 'wang wu',
                      childList: [
                        {
                          id: '221111',
                          name: '软装设计师软装设计师软装设计师软装设计师',
                          number: '1',
                          userName: '221111',
                          groupName: '软装设计师',
                          groupUserName: 'wang wu',
                        }
                      ]
                    },
                    {
                      id: '22112',
                      name: '家装设计师2',
                      number: '2',
                      userName: '22112',
                      groupName: '家装设计师2',
                      groupUserName: 'wang wu',
                      childList: [
                        {
                          id: '221121',
                          name: '软装设计师软装设计师软装设计师软装设计师2',
                          number: '1',
                          userName: '221121',
                          groupName: '软装设计师2',
                          groupUserName: 'wang wu',
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: '222',
              name: 'C端UI2',
              number: '2',
              userName: '222',
              groupName: 'C端UI2',
              groupUserName: 'wang wu2',
            },
          ]
        }
      ]
    },
  ]
}

describe('TreeTable', () => {
  describe('rendering data is correct', () => {
    const wrapper = mount({
      data() {
        return {
          testData: getTestData(),
          defaultExpandAll: false
        }
      },
      template: `
      <sp-tree-table
        :list="testData"
        row-key="id"
        :tree-props="{ children: 'childList', hasChildren: true }"
        selection
        :default-expand-all="defaultExpandAll"
      >
        <sp-table-column
          :ellipsis="true"
          prop="name"
          label="部门名称"
          width="200">
        </sp-table-column>
        <sp-table-column
          prop="number"
          label="部门人数"
          width="200">
        </sp-table-column>
        <sp-table-column
          prop="userName"
          label="部门负责人"
          width="200">
        </sp-table-column>
        <sp-table-column
          prop="groupName"
          label="部门群名称"
          width="200">
        </sp-table-column>
        <sp-table-column
          prop="groupUserName"
          label="部门群群主"
          width="698">
        </sp-table-column>
      </sp-tree-table>
      `,
    })

    document.body.appendChild(wrapper.vm.$el)

    it('defaultExpandAll is false', async () => {
      expect(wrapper.findAll('tr.is--expand').length).to.be.equal(2)
    })

    it('defaultExpandAll is true', async () => {
      await wrapper.setData({ defaultExpandAll: true })
      expect(wrapper.findAll('tr.is--expand').length).to.be.equal(11)
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
          selectedList: [],
        }
      },
      template: `
       <sp-tree-table
        :list="testData"
        row-key="id"
        :tree-props="{ children: 'childList', hasChildren: true }"
        selection
        :selectable="isTreeTableSelectable"
        ref="table"
        @selection-change="handleSelectionChange"
      >
        <sp-table-column
          :ellipsis="true"
          prop="name"
          label="部门名称"
          width="200">
        </sp-table-column>
        <sp-table-column
          prop="number"
          label="部门人数"
          width="200">
        </sp-table-column>
        <sp-table-column
          prop="userName"
          label="部门负责人"
          width="200">
        </sp-table-column>
        <sp-table-column
          prop="groupName"
          label="部门群名称"
          width="200">
        </sp-table-column>
        <sp-table-column
          prop="groupUserName"
          label="部门群群主"
          width="698">
        </sp-table-column>
      </sp-tree-table>
      `,
      methods: {
        handleSelectionChange(data) {
          console.log('treeTable, handleSelectionChange', data.length)
          this.selectedList = data
        },
        isTreeTableSelectable(row) {
          return !['222'].includes(row.id)
        }
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('toggleAllSelection', async () => {
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
      await wrapper.vm.$refs.table.toggleAllSelection()
      expect(wrapper.vm.selectedList.length).to.be.equal(10)
    })

    it('clearSelection', async () => {
      await wrapper.vm.$refs.table.clearSelection()
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
    })

    it('toggleRowSelection', async () => {
      await wrapper.vm.$refs.table.toggleRowSelection(3, true)
      expect(wrapper.vm.selectedList.length).to.be.equal(7)

      await wrapper.vm.$refs.table.toggleRowSelection(3, false)
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
    })

    it('toggleRowsSelection', async () => {
      await wrapper.vm.$refs.table.toggleRowsSelection([0, 1], true)
      await waitImmediate()
      expect(wrapper.vm.selectedList.length).to.be.equal(10)

      await wrapper.vm.$refs.table.toggleRowsSelection([0,1], false)
      await waitImmediate()
      expect(wrapper.vm.selectedList.length).to.be.equal(0)
    })

    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  })
})
