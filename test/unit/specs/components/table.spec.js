import { mount, shallowMount } from '@vue/test-utils'
import Table from 'sparta/components/table'
import TableColum from 'sparta/components/table-column'
import { createTest, createVue, destroyVM } from '../../util';

const testDataArr = [];
const toArray = function(obj) {
  return [].slice.call(obj);
};

const getTestData = () => {
  return [
    { id: 1, name: 'A Bug\'s Life', release: '1995-11-22', director:'John Lasseter', runtime: 80 },
    { id: 2, name: 'A Bug\'s Life', release: '1998-11-25', director: 'John Lasseter', runtime: 95 },
    { id: 3, name: 'Toy Story 2', release: '1999-11-24', director: 'John Lasseter', runtime: 92 },
    { id: 4, name: 'Monsters, Inc.', release: '2001-11-2', director: 'Andrew Stanton', runtime: 92 },
    { id: 5, name: 'Finding Nemo', release: '2003-5-30', director: 'Andrew Stanton', runtime: 100 }
  ];
};

getTestData().forEach(cur => {
  Object.keys(cur).forEach(prop => {
    testDataArr.push(cur[prop].toString());
  });
});

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
      components: {
        'sp-table': Table,
        'sp-table-column': TableColum
      }
    })

    it('head', async () => {
      const ths = toArray(wrapper.vm.$el.querySelectorAll('thead th'));
      expect((ths.map(node => node.textContent).filter(o => o)).length).to.be.equal(5);
    })

    it('row length', () => {
      expect(wrapper.vm.$el.querySelectorAll('.sp-table__body tbody tr').length).to.equal(getTestData().length);
    });

    it('row data', () => {
      const cells = toArray(wrapper.vm.$el.querySelectorAll('td .sp-table-cell'))
        .map(node => node.textContent);
      expect(cells).to.deep.equal(testDataArr);
    });

    it('change data', async () => {
      await wrapper.setData({ testData: []})
      expect(wrapper.find('.sp-table__empty').isVisible()).to.be.true
    });

    it('hide table column', async () => {
      await wrapper.setData({ show: false })
      const ths = toArray(wrapper.vm.$el.querySelectorAll('thead th'));
      expect((ths.map(node => node.textContent).filter(o => o)).length).to.be.equal(4);
    });
  })

  describe('attributes', () => {
    const wrapper = mount({
      data() {
        return {
          testData: [],
          loading: false,
          hasMore: false,
          disabled: false,
          selection: false,
          pagination: false,
          paginationOption: {
             perPages: 5,
             pageIndex: 2,
             pageSize: 10,
             total: 1000,
             align: 'middle'
          },
          paginationDisabled: false,
          cellEmptyText: '测试'
        }
      },
      template: `
       <sp-table 
          :list="testData" 
          :loading="loading"
          :selection="selection"
          :has-more="hasMore"
          :disabled="disabled"
          :pagination="pagination"
          :paginationOption="paginationOption"
          :pagination-disabled="paginationDisabled"
          :cell-empty-text="cellEmptyText"
          >
          <sp-table-column prop="name" label="片名" />
          <sp-table-column prop="id" />
          <sp-table-column prop="release" label="发行日期" />
          <sp-table-column prop="director" label="导演" />
          <sp-table-column prop="runtime" label="时长（分）" />
       </sp-table>
      `,
      components: {
        'sp-table': Table,
        'sp-table-column': TableColum
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('emptyText', () => {
      expect(wrapper.find('.sp-table__empty').isVisible()).to.be.true
    });

    it('loading', async () => {
      await wrapper.setData({ loading: true })
      expect(wrapper.find('.sp-table__loading-wrap').isVisible()).to.be.true
      await wrapper.setData({ loading: false })
    });

    it('selection', async () => {
      await wrapper.setData({ selection: true })
      expect(wrapper.find('.sp-checkbox').exists()).to.be.true
    });

    it('pagination', async () => {
      await wrapper.setData({ pagination: true })
      expect(wrapper.find('.sp-table__footer-center').exists()).to.be.true
    });

    it('paginationOption', async () => {
      expect(wrapper.vm.$el.querySelectorAll('.sp-pagination .align--middle li').length).to.equal(8)
      expect(wrapper.find('.sp-pagination .align--middle .is--checked').text()).to.equal('2')
      expect(wrapper.find('.align--middle').exists()).to.be.true
    });

    it('paginationDisabled', async () => {
      await wrapper.setData({ paginationDisabled: true })
      expect(wrapper.find('.sp-pagination.is--disabled').exists()).to.be.true
      await wrapper.setData({ paginationDisabled: false })
    });

    it('hasMore', async () => {
      await wrapper.setData({ hasMore: true })
      expect(wrapper.find('.sp-table__append').exists()).to.be.true
      await wrapper.setData({ hasMore: false })
    });

    it('disabled', async () => {
      await wrapper.setData({ disabled: true })
      expect(wrapper.find('.sp-table.is--disabled').exists()).to.be.true
      await wrapper.setData({ disabled: false })
    });

    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  });
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
          :paginationOption="{ total: 1000 }"
          :hasMore="true"
          >
          <sp-table-column prop="id" />
          <sp-table-column prop="name" label="片名" />
          <sp-table-column prop="release" label="发行日期" />
          <sp-table-column prop="director" label="导演" />
          <sp-table-column prop="runtime" label="时长（分）" />
       </sp-table>
      `,
      components: {
        'sp-table': Table,
        'sp-table-column': TableColum
      },
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
    });

    it('selection-change single click', async () => {
      await wrapper.find('.sp-checkbox__input').trigger('click')
      expect(wrapper.vm.selectedList.length).to.be.equal(4)
    });

    it('selection-change all click', async () => {
      await wrapper.find('.sp-table__footer-left-content .sp-checkbox__input').trigger('click')
      expect(wrapper.vm.selectedList.length).to.be.equal(5)
    });

    it('pagination-change', async () => {
      await wrapper.findAll('.sp-pagination li').wrappers[5].trigger('click')
      expect(wrapper.vm.currentPageIndex).to.be.equal(5)
      expect(wrapper.vm.currentPageSize).to.be.equal(10)
    });

    it('table-view-more', async () => {
      await wrapper.find('.sp-table__append-show-more button').trigger('click')
      expect(wrapper.vm.isClickTableViewMore).to.be.true
    });

    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  });

  describe('methods', () => {
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
          @selection-change="handleSelectionChange"
          ref="table"
          :selection="true"
          :paginationOption="{ total: 1000 }"
          :hasMore="true"
          >
          <sp-table-column prop="id" />
          <sp-table-column prop="name" label="片名" />
          <sp-table-column prop="release" label="发行日期" />
          <sp-table-column prop="director" label="导演" />
          <sp-table-column prop="runtime" label="时长（分）" />
       </sp-table>
      `,
      components: {
        'sp-table': Table,
        'sp-table-column': TableColum
      },
      methods: {
        handleSelectionChange(data) {
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
      components: {
        'sp-table': Table,
        'sp-table-column': TableColum
      },
      methods: {
        formatter(cell) {
          return cell + '分钟'
        }
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('formatter', async () => {
      const tdList = toArray(wrapper.vm.$el.querySelectorAll('.sp-table-cell'));
      expect(tdList.map(node => node.textContent).filter(o => o).some(item => item.includes('分钟'))).to.be.true
    })

    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  })
  

})


function clickElement(ele) {
  return ele.trigger('click')
}