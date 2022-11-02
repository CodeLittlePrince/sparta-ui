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
      }
    },
    template: `
    <sp-pagination
      :align="align"
      :perPages="perPages"
      :page-index="pageIndex"
      :total="total"
      :page-size="pageSize"
      :disabled="disabled"
      @change="handelPageChange">
    </sp-pagination>
    `,
    methods: {
      handelPageChange(index, pageSize) {
        this.currentPage = index
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

    it('disable', async () => {
      await wrapper.setData({ disabled: true })
      await wrapper.find('.align--middle li').trigger('click')
      expect(wrapper.find('.align--middle .is--checked').text()).to.be.equal('50')
      expect(wrapper.vm.currentPage).to.be.equal(50)
      expect(wrapper.vm.currentPageSize).to.be.equal(20)
    })
    after(() => {
      document.body.removeChild(wrapper.vm.$el)
    })
  })
})