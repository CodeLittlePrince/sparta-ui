import { mount } from '@vue/test-utils'
import { bootstrap } from '../../../util'

bootstrap()

describe('Pagination', () => {
  const wrapper = mount({
    data() {
      return {
        perPages: 5,
        pageIndex: 2,
        pageSize: 20,
        total: 1000,
        align: 'middle',
        disabled: false,
        currentPage: -1,
        currentPageSize: -1,
        layout: '',
        pageSizes: []
      }
    },
    template: `
    <sp-pagination
      :align="align"
      :perPages="perPages"
      :page-index="pageIndex"
      :total="total"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :disabled="disabled"
      :layout="layout"
      @size-change="handlePageSizeChange"
      @change="handelPageChange">
    </sp-pagination>
    `,
    methods: {
      handelPageChange(index, pageSize) {
        this.currentPage = index
        this.currentPageSize = pageSize
      },
      handlePageSizeChange(pageSize) {
        this.currentPageSize = pageSize
      }
    }
  })
  document.body.appendChild(wrapper.vm.$el)

  describe('props', () => {
    it('type--total,type--perPages,type--pageSize, type--align', async () => {
      const liList = wrapper.findAll('.align--middle li').wrappers
      expect(liList.length).to.be.equal(8)
      expect(liList[liList.length -2].text()).to.be.equal('50')

      await wrapper.setData({total: 10000, pageSize: 100 })
      expect(liList[liList.length -2].text()).to.be.equal('100')
    })

    it('type--pageIndex', async () => {
      expect(wrapper.find('.align--middle .is--checked').text()).to.be.equal('2')

      await wrapper.setData({pageIndex: 3 })
      expect(wrapper.find('.align--middle .is--checked').text()).to.be.equal('3')
      await wrapper.setData({pageIndex: 2, total: 1000, pageSize:20 })
    })

    it('layout', async () => {
      expect(wrapper.find('.sp-pagination__total').exists()).to.be.false
      await wrapper.setData({ layout: 'total,sizes,jumper', pageSizes: [20, 30, 40, 50] })
      expect(wrapper.find('.sp-pagination__total').exists()).to.be.true
      expect(wrapper.find('.sp-pagination__sizes').exists()).to.be.true
      expect(wrapper.find('.sp-pagination__jump').exists()).to.be.true
      await wrapper.setData({ layout: '', pageSizes: [] })
    })
  })

  describe('events', () => {
    it('pre click', async () => {
      await wrapper.find('.align--middle li').trigger('click')
      expect(wrapper.find('.align--middle .is--checked').text()).to.be.equal('1')

      await wrapper.find('.align--middle li').trigger('click')
      expect(wrapper.find('.align--middle .is--checked').text()).to.be.equal('1')
    })

    it('next click', async () => {
      const liList = wrapper.findAll('.align--middle li').wrappers
      await wrapper.findAll('.align--middle li').wrappers[liList.length -1].trigger('click')
      expect(wrapper.find('.align--middle .is--checked').text()).to.be.equal('2')

      await wrapper.findAll('.align--middle li').wrappers[liList.length -1].trigger('click')
      expect(wrapper.find('.align--middle .is--checked').text()).to.be.equal('3')
      expect(wrapper.vm.currentPage).to.be.equal(3)
      expect(wrapper.vm.currentPageSize).to.be.equal(20)
    })

    it('first', async () => {
      await wrapper.findAll('.align--middle li').wrappers[1].trigger('click')
      expect(wrapper.find('.align--middle .is--checked').text()).to.be.equal('1')
    })

    it('last', async () => {
      const liList = wrapper.findAll('.align--middle li').wrappers
      await wrapper.findAll('.align--middle li').wrappers[liList.length -2].trigger('click')
      expect(wrapper.find('.align--middle .is--checked').text()).to.be.equal('50')
    })

    it('size-change', async () => {
      await wrapper.setData({ layout: 'sizes,jumper', pageSize: 8, pageSizes: [5, 10, 15, 20, 25] })
      expect(wrapper.find('.sp-selectInput__show').val()).to.be.equal('5条/页')
      await wrapper.setData({ layout: 'sizes,jumper', pageSize: 10, pageSizes: [5, 10, 15, 20, 25] })
      expect(wrapper.find('.sp-selectInput__show').val()).to.be.equal('10条/页')
      await wrapper.findAll('.align--middle li').wrappers[1].trigger('click')
      expect(wrapper.find('.align--middle .is--checked').text()).to.be.equal('1')
      expect(wrapper.vm.currentPageSize).to.be.equal(10)
      expect(wrapper.find('.sp-pagination__sizes').exists()).to.be.true
      await wrapper.find('.sp-pagination__sizes .sp-select').trigger('click')
      await wrapper.findAll('.sp-select-list .sp-option').wrappers[3].trigger('click')
      expect(wrapper.vm.currentPageSize).to.be.equal(20)
    })

    it('disable', async () => {
      await wrapper.setData({ disabled: true })
      await wrapper.find('.align--middle li').trigger('click')
      expect(wrapper.find('.align--middle .is--checked').text()).to.be.equal('1')
      expect(wrapper.vm.currentPage).to.be.equal(1)
      expect(wrapper.vm.currentPageSize).to.be.equal(20)
    })
    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  })
})