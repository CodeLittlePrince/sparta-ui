import { mount } from '@vue/test-utils'
import Select from 'base/select'
import { bootstrap } from '../../../util'

bootstrap()

const getTestData = function() {
  return [
    { id: 1, name: 'cat', disabled: false, icon: 'sp-icon-file' },
    { id: 2, name: 'dog', disabled: false, icon: 'sp-icon-check' },
    { id: 3, name: 'pig', disabled: false, icon:'sp-icon-search'},
    { id: 4, name: 'tiger', disabled: false, icon: 'sp-icon-file' },
    { id: 5, name: 'elephant', disabled: false, icon: 'sp-icon-check' }
  ]
}

const getTestGroupData = function() {
  return [{
    label: '北京',
    options: [{
      value: 'Sanlitun',
      label: '三里屯'
    }, {
      value: 'Wangfujing',
      label: '王府井',
      disabled: true
    }]
  }, {
    label: '上海',
    options: [{
      value: 'Lujiazui',
      label: '陆家嘴'
    }, {
      value: 'Nanjinglu',
      label: '南京路'
    }]
  }]
}

const getFilterableData = function() {
  return [
    {
      'bankAccount': '9769',
      'accountId': '2021032516BC01987368',
      'bankAccountName': '阿拉蕾1',
      'bankName': '上海银行',
    },
    {
      'bankAccount': '1459',
      'accountId': '2021040921BC02064252',
      'bankAccountName': '阿拉蕾2',
      'bankName': '浙商银行',
    },
    {
      'bankAccount': '0371',
      'accountId': '140000201205298325',
      'bankAccountName': '阿拉蕾3',
      'bankName': '农业银行',
    },
    {
      'bankAccount': '4444',
      'accountId': '2021051114BC02250476',
      'bankAccountName': '阿拉蕾4',
      'bankName': '测试银行',
    },
    {
      'bankAccount': '4628',
      'accountId': '2021122717BC03938794',
      'bankAccountName': '阿拉蕾5',
      'bankName': '工商银行',
    },
    {
      'bankAccount': '4638',
      'accountId': '2021122717BC03938812',
      'bankAccountName': '阿拉蕾',
      'bankName': '工商银行',
    },
    {
      'bankAccount': '4639',
      'accountId': '2021122717BC03938899',
      'bankAccountName': '阿拉蕾x',
      'bankName': '工商银行',
    },
    {
      'bankAccount': '145X',
      'accountId': '2021040921BC02064211',
      'bankAccountName': '阿拉蕾9',
      'bankName': '浙商银行2',
    }
  ]
}

describe('Select', () => {

  describe('single', () => {
    const wrapper = mount({
      data() {
        return {
          val: '',
          optionsData: getTestData(),
          readonly: false,
          disabled: false,
          clearable: false,
          filterable: false,
          placeholder: '',
          emptyText: '',
          height: 50
        }
      },
      template: `
      <div>
      <sp-button class="sp-select-other-button">测试single</sp-button>
        <sp-select 
          ref="select"
          :height="height"
          :readonly="readonly"
          :disabled="disabled"
          :clearable="clearable"
          :placeholder="placeholder"
          :filterable="filterable"
          :emptyText="emptyText"
          v-model="val">
          <sp-option 
           v-for="(item, index) in optionsData"
           :key="index+'a'"
           :label="item.name"
           :value="item.id" 
           :disabled="item.disabled"
          ></sp-option>
        </sp-select>
      </div>
      `,
      components: {
        'sp-select': Select,
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('set data', async () => {
      await wrapper.setData({ val: 3 })
      expect(wrapper.find('.sp-select__input').element.value).to.be.equal('pig')
      await wrapper.setData({ val: '' })
    })

    it('Attributes', async () => {
      await wrapper.setData({ readonly: true })
      expect(wrapper.find('.sp-select.is--readonly').exists()).to.be.true
      await wrapper.setData({ readonly: false })

      await wrapper.setData({ disabled: true })
      expect(wrapper.find('.sp-select.is--disabled').exists()).to.be.true
      await wrapper.setData({ disabled: false })

      await wrapper.setData({ placeholder: 'placeholder' })
      expect(wrapper.find('.sp-select__input-placeholder').text()).to.be.equal('placeholder')

      await wrapper.setData({ clearable: true })
      await wrapper.setData({ val: 3 })
      expect(wrapper.vm.val).to.be.equal(3)
      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__suffix').trigger('click')
      await wrapper.setData({ clearable: false })

      expect(wrapper.find('.sp-select__input').element.style.height).to.be.equal('48px')

      await wrapper.setData({ filterable: true })
      await wrapper.find('.sp-select').trigger('click')
      await wrapper.setData({ emptyText: 'emptyText' })
      await wrapper.find('.sp-select__input').trigger('focus')
      await wrapper.find('.sp-select__input').setValue('mmm')
      expect(wrapper.find('.sp-select-list-emptyText').text()).to.be.equal('emptyText')
      await wrapper.find('.sp-select__input').setValue('pig')
      await wrapper.find('.sp-select-other-button').trigger('click')
      await wrapper.find('.sp-select__input').trigger('blur')

      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__input').trigger('focus')
      await wrapper.find('.sp-select__input').setValue('mmm')
      await wrapper.find('.sp-select-other-button').trigger('click')
      await wrapper.find('.sp-select__input').trigger('blur')
    })

    it('events', async () => {
      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__input').trigger('click')
      expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
      await wrapper.find('.sp-select-other-button').trigger('click')
      
    })

    it('Option Attributes', async () => {
      const options = getTestData()
      options[0].disabled = true
      await wrapper.setData({ optionsData: options })
      await wrapper.find('.sp-select').trigger('click')
      expect(wrapper.find('.sp-option.is--disabled').exists()).to.be.true
    })

    it('panel', async () => {
      await wrapper.setData({ val: '' })
      await wrapper.find('.sp-select').trigger('click')
      expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
      expect(wrapper.findAll('.sp-select-list .sp-option').wrappers.length).to.be.equal(6)
      await wrapper.find('.sp-select-list .sp-option').trigger('mouseover')
      await wrapper.findAll('.sp-select-list .sp-option').wrappers[1].trigger('mouseover')
      await wrapper.find('.sp-select-list .sp-option').trigger('click')
      await wrapper.findAll('.sp-select-list .sp-option').wrappers[1].trigger('click')
      expect(wrapper.vm.val).to.be.equal(2)
      await wrapper.find('.sp-select-other-button').trigger('click')
      await wrapper.find('.sp-select').trigger('click')
      expect(wrapper.findAll('.sp-select-list .sp-option').wrappers.length).to.be.equal(6)
      expect(wrapper.find('.sp-select-list .is--selected').text()).to.be.equal('dog')
    })

    it('keyboard operations', async () => {
      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__input').trigger('focus')
      const select = wrapper.vm.$children[1]
      let i = 3
      while (i--) {
        select.navigateOptions('next')
      }
      select.navigateOptions('prev')
      select.handleInputEnter()
      expect(wrapper.vm.val).to.deep.equal(4)

      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__input').trigger('focus')
      await wrapper.setData({ filterable: true })
      i = 13
      while (i--) {
        select.navigateOptions('next')
      }
      select.navigateOptions('prev')
      select.handleInputEnter()
    })


  })

  describe('single 可搜索', () => {
    const wrapper = mount({
      data() {
        return {
          val: '',
          optionsData: getTestData(),
          clearable: false
        }
      },
      template: `
      <div>
      <sp-button class="sp-select-other-button">测试single</sp-button>
        <sp-select 
          ref="select"
          filterable
          v-model="val">
          <i slot="prepend" :class="icon"></i>
          <sp-option 
           v-for="(item, index) in optionsData"
           :key="index"
           :label="item.name"
           :value="item.id" 
           :disabled="item.disabled"
          >
          <i :class="item.label"></i><span>{{item.name}}</span>
          </sp-option>
        </sp-select>
      </div>
      `,
      components: {
        'sp-select': Select,
      },
      computed: {
        icon() {
          return (this.optionsData.find(item => item.id === this.val) || {}).icon
        }
      }
    })
    document.body.appendChild(wrapper.vm.$el)


    describe('默认无值-点选', () => {
      it('点击组件，显示所有下拉选项，全部没有点亮', async () => {
        await clearSelect(wrapper)
        await selectClick(wrapper)
        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(5)
        expect(wrapper.find('.sp-select-list .is--selected').exists()).to.be.false
      })

      it('点击组件，显示所有下拉选项，全部没有点亮，输入异常的值，显示无匹配数据', async () => {
        await setSelectVal(wrapper,'mnh')
        expect(wrapper.find('.sp-select-list-emptyText').isVisible()).to.be.true
        await handelOtherClick(wrapper)
      })

      it('点击组件，显示所有下拉选项，全部没有点亮，输入异常的值，显示无匹配数据，再点击其他地方，清空异常的数据，并隐藏下拉框，组件无新值传出', async () => {
        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.$children[1].inputText).to.be.equal('')
        expect(wrapper.vm.val).to.be.equal('')
      })

      it('点击组件，显示所有下拉选项，全部没有点亮，输入包含的值，正确过滤选项，点击选项，正确显示文案和icon， 并将新值传出', async () => {
        await selectClick(wrapper)
        await setSelectVal(wrapper, 'pi')
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(1)

        await clickFirstOptions(wrapper)

        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.$children[1].inputText).to.be.equal('pig')
        expect(wrapper.vm.val).to.be.equal(3)
        expect(wrapper.vm.icon).to.be.equal('sp-icon-search')
      })

      it('点击组件，显示所有下拉选项，全部没有点亮，输入包含的值，正确过滤选项，点击选项，正确显示文案和icon， 并将新值传出，再点击显示所有的选项，并且请选择的地址显示已选的文案，滚动和点亮已选项', async () => {
        await selectClick(wrapper)
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(5)
        expect(wrapper.vm.$children[1].inputText).to.be.equal('')
        expect(wrapper.find('.sp-select__prepend').isVisible()).to.be.false
        expect(wrapper.find('.sp-select-list .is--selected').exists()).to.be.true
        await handelOtherClick(wrapper)
      })

      it('点击组件，显示所有下拉选项，全部没有点亮，输入完全符合的值，点击其他地方，下拉框隐藏，还是显示请选择，无新值传出', async () => {
        await clearSelect(wrapper)
        expect(wrapper.vm.val).to.be.equal('')
        expect(wrapper.vm.$children[1].inputText).to.be.equal('')

        await selectClick(wrapper)
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(5)
        await setSelectVal(wrapper, 'pig')
        await handelOtherClick(wrapper)

        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.val).to.be.equal('')
        expect(wrapper.vm.$children[1].inputText).to.be.equal('')
      })
    })

    describe('默认无值-键盘操作', () => {
      const select = wrapper.vm.$children[1]
      it('直接使用键盘向上/向下，显示所有下拉选项，全部没有点亮', async () => {
        await handelOtherClick(wrapper)
        await clearSelect(wrapper)
        await select.navigateOptions('next')
        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(5)
        expect(wrapper.find('.sp-select-list .is--selected').exists()).to.be.false
      })

      it('直接使用键盘向上/向下，显示所有下拉选项，全部没有点亮，输入包含的值，正确过滤数据，使用键盘移动，并选择一个选项, 下拉框关闭，正确显示正常的文案和icon, 并将新值传出， 再次使用键盘向上/向下，显示所有下拉选项，并且请选择的地址显示已选的文案，滚动和点亮已选项', async () => {
        await setSelectVal(wrapper, 'pi')
        await select.navigateOptions('next')
        select.handleInputEnter()
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.$children[1].inputText).to.be.equal('pig')
        expect(wrapper.vm.val).to.be.equal(3)
        expect(wrapper.vm.icon).to.be.equal('sp-icon-search')
        expect(wrapper.find('.sp-select__prepend').isVisible()).to.be.true

        await select.navigateOptions('next')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(1)
        expect(wrapper.find('.sp-select-list .is--selected').exists()).to.be.true
      })
    })

    describe('默认有值-点选', () => {
      it('点击组件，显示所有下拉选项，滚动并点亮已选项，输入异常的值，显示无匹配数据，再点击其他地方，正常显示之前的已选项和icon，并隐藏下拉框，组件无新值传出', async () => {
        await wrapper.setData({ val: 3})
        await selectClick(wrapper)
        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(5)
        expect(wrapper.find('.sp-select-list .is--selected').exists()).to.be.true

        await setSelectVal(wrapper, 'uij')
        await handelOtherClick(wrapper)
        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.val).to.be.equal(3)
      })

      it('点击组件，显示所有下拉选项，滚动并点亮已选项，输入包含的值，正确过滤选项，点击选项，正确显示文案和icon， 并将新值传出，再点击显示所有的选项，并且请选择的地址显示已选的文案，滚动和点亮已选项', async () => {
        await selectClick(wrapper)
        await setSelectVal(wrapper, 'dog')

        await clickFirstOptions(wrapper)

        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.$children[1].inputText).to.be.equal('dog')
        expect(wrapper.vm.val).to.be.equal(2)
        expect(wrapper.vm.icon).to.be.equal('sp-icon-check')
      })
    })

    describe('默认有值-键盘操作', () => {
      const select = wrapper.vm.$children[1]
      it('直接使用键盘向上/向下，显示所有下拉选项，滚动并点亮已选项，输入包含的值，正确过滤数据，使用键盘移动，并选择一个选项, 下拉框关闭，正确显示正常的文案和icon, 并将新值传出， 再次使用键盘向上/向下，显示所有下拉选项，并且请选择的地址显示已选的文案，滚动和点亮已选项', async () => {
        await wrapper.setData({ val: 3})
        await wrapper.vm.$nextTick()
        await select.navigateOptions('next')

        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(1)
        expect(wrapper.find('.sp-select-list .is--selected').exists()).to.be.true

        await setSelectVal(wrapper, 'pig')
        await select.navigateOptions('next')
        select.handleInputEnter()
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.$children[1].inputText).to.be.equal('pig')
        expect(wrapper.vm.val).to.be.equal(3)
        expect(wrapper.vm.icon).to.be.equal('sp-icon-search')
        expect(wrapper.find('.sp-select__prepend').isVisible()).to.be.true
      })
    })
    after(() => {
      //  document.body.removeChild(wrapper.vm.$el)
    })
  })

  describe('自定义内容搜索', () => {
    const wrapper = mount({
      data() {
        return {
          optionsData: getFilterableData(),
          clearable: false,
          currentSelectCenterSlot: {
            bankAccountName: '',
            bankName: '',
            bankAccount: ''
          },
          filterValue: '',
          filterList: [],
        }
      },
      template: `
      <div>
        <sp-button class="sp-select-other-button">测试自定义内容搜索</sp-button>
        <sp-select 
          ref="select"
          v-model="filterValue"
          filterable
          :filter-method="filterMethod"
        >
          <div ref="center" slot="center" class="bindCardSelectItemBox">
            <div>{{ currentSelectCenterSlot.bankAccountName }}</div>
            <div>{{ currentSelectCenterSlot.bankName }}尾号({{ currentSelectCenterSlot.bankAccount }})</div>
          </div>
          <sp-option 
            v-for="(item, index) in optionsData"
            :key="index"
            :label="item.accountId"
            :value="item.accountId" 
          >
            <div>
              {{ item.bankAccountName}} {{ item.bankName }} {{ item.bankAccount }}
            </div>
          </sp-option>
        </sp-select>
      </div>
      `,
      components: {
        'sp-select': Select,
      },
      watch: {
        filterValue(val) {
          this.currentSelectCenterSlot = this.filterList.find(item => item.accountId === val) || {}
        },
      },
      methods: {
        filterMethod(value) {
          if(!value) {
            this.filterList = this.optionsData
            return
          }
          this.filterList = this.optionsData.filter(item => {
            return item.bankAccountName.includes(value) || item.bankName.includes(value) || item.bankAccount.includes(value)
          })
        }
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    describe('默认无值-点选', () => {
      it('点击输入框，显示所有下拉选项', async () => {
        await clearSelect(wrapper)
        await selectClick(wrapper)
        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(8)
        expect(wrapper.find('.sp-select-list .is--selected').exists()).to.be.false
      })

      it('点击组件，显示所有下拉选项，全部没有点亮，输入异常的值，显示无匹配数据', async () => {
        await setSelectVal(wrapper,'mnh')
        expect(wrapper.find('.sp-select-list-emptyText').isVisible()).to.be.false
        await handelOtherClick(wrapper)
      })

      it('点击组件，显示所有下拉选项，全部没有点亮，输入异常的值，显示无匹配数据，再点击其他地方，清空异常的数据，并隐藏下拉框，组件无新值传出', async () => {
        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.$children[1].inputText).to.be.equal('')
        expect(wrapper.vm.filterValue).to.be.equal('')
      })

      it('点击组件，显示所有下拉选项，全部没有点亮，输入包含的值，正确过滤选项，点击选项，正确显示自定义内容， 并将新值传出', async () => {
        await selectClick(wrapper)
        await setSelectVal(wrapper, '2021032516BC01987368')
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(8)

        await clickFirstOptions(wrapper)

        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.filterValue).to.be.equal('2021032516BC01987368')
      })

      it('点击组件，显示所有下拉选项，全部没有点亮，输入包含的值，正确过滤选项，点击选项，正确自定义内容，并将新值传出，再点击显示所有的选项，并且请选择的地址显示已选的文案，滚动和点亮已选项', async () => {
        await selectClick(wrapper)
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(8)
        expect(wrapper.vm.$children[1].inputText).to.be.equal('')
        expect(wrapper.find('.sp-select__prepend').isVisible()).to.be.false
        expect(wrapper.find('.sp-select-list .is--selected').exists()).to.be.true
        await handelOtherClick(wrapper)
      })

      it('点击组件，显示所有下拉选项，全部没有点亮，输入完全符合的值，点击其他地方，保留上一次的选择', async () => {
        await clearSelect(wrapper)
        expect(wrapper.vm.filterValue).to.be.equal('2021032516BC01987368')

        await selectClick(wrapper)
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(8)
        await setSelectVal(wrapper, '2021032516BC01987368')
        await handelOtherClick(wrapper)

        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.filterValue).to.be.equal('2021032516BC01987368')
      })
    })

    describe('默认有值-点选', () => {
      it('点击组件，显示所有下拉选项，滚动并点亮已选项，输入异常的值，显示无匹配数据，再点击其他地方，正常显示之前的已选项，并隐藏下拉框，组件无新值传出', async () => {
        await wrapper.setData({ filterValue: '2021032516BC01987368' })
        await selectClick(wrapper)
        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
        expect(getVisibleOptionsLength(wrapper).length).to.be.equal(8)
        expect(wrapper.find('.sp-select-list .is--selected').exists()).to.be.true

        await setSelectVal(wrapper, '2021032516BC01987368')
        await handelOtherClick(wrapper)
        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.filterValue).to.be.equal('2021032516BC01987368')
      })

      it('点击组件，显示所有下拉选项，滚动并点亮已选项，输入包含的值，正确过滤选项，点击选项，正确显示自定义内容，并将新值传出，再点击显示所有的选项，并且请选择的地址显示已选的文案，滚动和点亮已选项', async () => {
        await selectClick(wrapper)
        await setSelectVal(wrapper, '2021032516BC01987368')

        await clickFirstOptions(wrapper)

        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        expect(wrapper.vm.$children[1].inputText).to.be.equal('')
        expect(wrapper.vm.filterValue).to.be.equal('2021032516BC01987368')
      })
    })
  })

  describe('Option Group Attributes', () => {
    const wrapper = mount({
      data() {
        return {
          val: '',
          optionsData: getTestGroupData(),
        }
      },
      template: `
      <div>
      <sp-button class="sp-select-other-button">测试</sp-button>
      <sp-select v-model="val">
      <sp-option-group
        v-for="(group, index) in optionsData"
        :key="index+'b'"
        :label="group.label"
      >
        <sp-option
          v-for="(item, index) in group.options"
          :key="index+'c'"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right;">{{ item.value }}</span>
        </sp-option>
      </sp-option-group>
    </sp-select>
      </div>
      `,
      components: {
        'sp-select': Select,
      }
    })

    it('label', async () => {
      await wrapper.find('.sp-select').trigger('click')
      expect(wrapper.find('.sp-option-group-title').text()).to.be.equal('北京')
    })
  })

  describe('multiple', () => {
    const wrapper = mount({
      data() {
        return {
          val: [],
          optionsData: getTestData(),
          clearable: false,
          filterable: false
        }
      },
      template: `
      <div>
      <sp-button class="sp-select-other-button">测试</sp-button>
        <sp-select 
          ref="select"
          multiple
          :clearable="clearable"
          :filterable="filterable"
          v-model="val">
          <sp-option 
           v-for="(item, index) in optionsData"
           :key="index+'d'"
           :label="item.name"
           :value="item.id" 
           :disabled="item.disabled"
          ></sp-option>
        </sp-select>
      </div>
      `,
      components: {
        'sp-select': Select,
      }
    })

    it('create', async () => {
      expect(wrapper.find('.sp-tag-box').exists()).to.be.true
    })

    it('set data', async () => {
      await wrapper.setData({ val: [2, 3] })
      expect(wrapper.findAll('.sp-tag-box .sp-tag').length).to.be.equal(2)
      await wrapper.setData({ val: [] })
      
    })

    it('panel', async () => {
      await wrapper.setData({ val: [] })
      await wrapper.find('.sp-select').trigger('click')
      expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
      await wrapper.find('.sp-select-list .sp-option').trigger('click')
      expect(wrapper.vm.val).to.deep.equal([1])
      await wrapper.find('.sp-select-list .sp-option').trigger('click')
      expect(wrapper.vm.val).to.deep.equal([])

      await wrapper.find('.sp-select-list .sp-option').trigger('click')
      await wrapper.find('.sp-tag-box .sp-icon-close').trigger('click')
      expect(wrapper.vm.val).to.deep.equal([])
      await wrapper.destroy()
    })

  })

  describe('group-multiple', () => {
    const wrapper = mount({
      data() {
        return {
          val: [],
          optionsData: [
            {
              value: 'parent 1-0',
              label: 'parent 1-0',
              children: [
                {
                  value: 'I dance 1',
                  label: 'I dance 1',
                  disabled: true,
                },
                {
                  value: 'I dance 2',
                  label: 'I dance 2',
                },
                {
                  value: 'I dance 3',
                  label: 'I dance 3',
                },
              ],
            },
            {
              value: 'parent 1-1',
              label: 'parent 1-1',
              children: [
                {
                  value: 'You dance 1',
                  label: 'You dance 1',
                },
              ],
            },
            {
              value: 'parent 1-2',
              label: 'parent 1-2',
              disabled: true,
              children: [
                {
                  value: 'He dances 1',
                  label: 'He dances 1',
                },
                {
                  value: 'He dances 2',
                  label: 'He dances 2',
                },
              ],
            },
          ],
          clearable: false,
          filterable: false
        }
      },
      template: `
      <div>
        <sp-button class="sp-select-other-button">分组多选</sp-button>
        <sp-select
          v-model="val"
          group-multiple
        >
          <sp-option-group
            v-for="(item, index) in optionsData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
            <sp-option
              v-for="child in item.children"
              :key="child.value"
              :label="child.label"
              :value="child.value"
              :disabled="child.disabled"
            ></sp-option>
          </sp-option-group>
        </sp-select>
      </div>
      `,
      components: {
        'sp-select': Select,
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('create', async () => {
      expect(wrapper.find('.sp-tag-box').exists()).to.be.true
    })

    it('set data', async () => {
      await wrapper.setData({ val: ['I dance 2'] })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.sp-tag-box').text()).to.be.equal('I dance 2') // 因为所有可选节点已点亮，所以父节自动点亮，然后input里只显示第一项文案
      await wrapper.vm.$nextTick()
      await wrapper.setData({ val: ['I dance 2', 'I dance 3'] })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.sp-tag-box').text()).to.be.equal('parent 1-0') // 因为所有可选节点已点亮，所以父节自动点亮，然后input里只显示第一项文案
      await wrapper.setData({ val: [] })
    })

    it('select', async () => {
      await wrapper.find('.sp-select').trigger('click')
      expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
      await wrapper.find('.sp-select-list .sp-option').trigger('click') // 点击 disabled 的条目
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.sp-tag-box').text()).to.be.equal('')
      await wrapper.find('.sp-select-list .sp-checkbox__wrap').trigger('click') // 点击第一个父条目，对应非disabled子条目应该都点亮
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.sp-tag-box').text()).to.be.equal('parent 1-0')
      expect(wrapper.findAll('.sp-option-group .sp-option').at(0).find('.sp-checkbox').classes('is--checked')).to.be.false
      expect(wrapper.findAll('.sp-option-group .sp-option').at(1).find('.sp-checkbox').classes('is--checked')).to.be.true
      expect(wrapper.findAll('.sp-option-group .sp-option').at(2).find('.sp-checkbox').classes('is--checked')).to.be.true
      await wrapper.destroy()
    })
  })

  describe('group-multiple:has-default-value', () => {
    const wrapper = mount({
      data() {
        return {
          val: [
            'I dance 2',
            'I dance 3'
          ],
          optionsData: [
            {
              value: 'parent 1-0',
              label: 'parent 1-0',
              children: [
                {
                  value: 'I dance 1',
                  label: 'I dance 1',
                  disabled: true,
                },
                {
                  value: 'I dance 2',
                  label: 'I dance 2',
                },
                {
                  value: 'I dance 3',
                  label: 'I dance 3',
                },
              ],
            },
            {
              value: 'parent 1-1',
              label: 'parent 1-1',
              children: [
                {
                  value: 'You dance 1',
                  label: 'You dance 1',
                },
              ],
            },
            {
              value: 'parent 1-2',
              label: 'parent 1-2',
              disabled: true,
              children: [
                {
                  value: 'He dances 1',
                  label: 'He dances 1',
                },
                {
                  value: 'He dances 2',
                  label: 'He dances 2',
                },
              ],
            },
          ],
          clearable: false,
          filterable: false
        }
      },
      template: `
      <div>
        <sp-button class="sp-select-other-button">分组多选2</sp-button>
        <sp-select
          v-model="val"
          group-multiple
        >
          <sp-option-group
            v-for="(item, index) in optionsData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
            <sp-option
              v-for="child in item.children"
              :key="child.value"
              :label="child.label"
              :value="child.value"
              :disabled="child.disabled"
            ></sp-option>
          </sp-option-group>
        </sp-select>
      </div>
      `,
      components: {
        'sp-select': Select,
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('create', async () => {
      expect(wrapper.find('.sp-tag-box').exists()).to.be.true
      expect(wrapper.find('.sp-tag-box').text()).to.be.equal('parent 1-0')
    })

    it('set data', async () => {
      await wrapper.setData({ val: ['I dance 2'] })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.sp-tag-box').text()).to.be.equal('I dance 2') // 因为所有可选节点已点亮，所以父节自动点亮，然后input里只显示第一项文案
      await wrapper.setData({ val: ['I dance 2', 'I dance 3'] })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.sp-tag-box').text()).to.be.equal('parent 1-0') // 因为所有可选节点已点亮，所以父节自动点亮，然后input里只显示第一项文案
      await wrapper.setData({ val: [] })
      await wrapper.destroy()
    })
  })

  describe('group-multiple&filter', () => {
    const wrapper = mount({
      data() {
        return {
          val: [],
          optionsData: [
            {
              value: 'parent 1-0',
              label: 'parent 1-0',
              children: [
                {
                  value: 'I dance 1',
                  label: 'I dance 1',
                  disabled: true,
                },
                {
                  value: 'I dance 2',
                  label: 'I dance 2',
                },
                {
                  value: 'I dance 3',
                  label: 'I dance 3',
                },
              ],
            },
            {
              value: 'parent 1-1',
              label: 'parent 1-1',
              children: [
                {
                  value: 'You dance 1',
                  label: 'You dance 1',
                },
              ],
            },
            {
              value: 'parent 1-2',
              label: 'parent 1-2',
              disabled: true,
              children: [
                {
                  value: 'He dances 1',
                  label: 'He dances 1',
                },
                {
                  value: 'He dances 2',
                  label: 'He dances 2',
                },
              ],
            },
          ],
          clearable: false,
          filterable: false
        }
      },
      template: `
      <div>
        <sp-button class="sp-select-other-button">分组多选</sp-button>
        <sp-select
          v-model="val"
          group-multiple
          filterable
        >
          <sp-option-group
            v-for="(item, index) in optionsData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
            <sp-option
              v-for="child in item.children"
              :key="child.value"
              :label="child.label"
              :value="child.value"
              :disabled="child.disabled"
            ></sp-option>
          </sp-option-group>
        </sp-select>
      </div>
      `,
      components: {
        'sp-select': Select,
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('create', async () => {
      expect(wrapper.find('.sp-tag-box').exists()).to.be.true
    })

    it('set data', async () => {
      await wrapper.setData({ val: ['I dance 2'] })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.sp-tag-box').text()).to.be.equal('I dance 2') // 因为所有可选节点已点亮，所以父节自动点亮，然后input里只显示第一项文案
      await wrapper.vm.$nextTick()
      await wrapper.setData({ val: ['I dance 2', 'I dance 3'] })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.sp-tag-box').text()).to.be.equal('parent 1-0') // 因为所有可选节点已点亮，所以父节自动点亮，然后input里只显示第一项文案
      await wrapper.setData({ val: [] })
    })

    it('select', async () => {
      await wrapper.find('.sp-select').trigger('click')
      expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
      await wrapper.find('.sp-select-list .sp-option').trigger('click') // 点击 disabled 的条目
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.sp-tag-box').text()).to.be.equal('')
      await wrapper.find('.sp-select-list .sp-checkbox__wrap').trigger('click') // 点击第一个父条目，对应非disabled子条目应该都点亮
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.sp-tag-box').text()).to.be.equal('parent 1-0')
      expect(wrapper.findAll('.sp-option-group .sp-option').at(0).find('.sp-checkbox').classes('is--checked')).to.be.false
      expect(wrapper.findAll('.sp-option-group .sp-option').at(1).find('.sp-checkbox').classes('is--checked')).to.be.true
      expect(wrapper.findAll('.sp-option-group .sp-option').at(2).find('.sp-checkbox').classes('is--checked')).to.be.true
    })

    it('filter', async () => {
      await wrapper.find('.sp-select').trigger('click')
      expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
      expect(wrapper.find('.sp-select__input--filter').isVisible()).to.be.true
      await wrapper.find('.sp-select__input--filter').setValue('parent 1-1')
      expect(getVisibleOptionsLength(wrapper).length).to.be.equal(1)

      await wrapper.destroy()
    })
  })


  describe('other', () => {

    describe('spOptionsAllDisabled', async () => {
      const wrapper = mount({
        data() {
          return {
            val: '',
            optionsData: [
              { id: 1, name: 'cat', disabled: true },
              { id: 2, name: 'dog', disabled: true },
              { id: 3, name: 'pig', disabled: true },
              { id: 4, name: 'tiger', disabled: true },
              { id: 5, name: 'elephant', disabled: true }
            ],
            readonly: true,
            disabled: true,
            clearable: false,
            filterable: false,
            placeholder: '',
            emptyText: '',
            height: 50
          }
        },
        template: `
        <div>
        <sp-button class="sp-select-other-button">测试</sp-button>
          <sp-select 
            ref="select"
            :height="height"
            :readonly="readonly"
            :disabled="disabled"
            :clearable="clearable"
            :placeholder="placeholder"
            :filterable="filterable"
            :emptyText="emptyText"
            v-model="val">
            <sp-option 
             v-for="(item, index) in optionsData"
             :key="index+'e'"
             :label="item.name"
             :value="item.id" 
             :disabled="item.disabled"
            ></sp-option>
          </sp-select>
        </div>
        `,
        components: {
          'sp-select': Select,
        }
      })
  
      it('spOptionsAllDisabled', async () => {
        await wrapper.find('.sp-select').trigger('click')
        expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.false
        await wrapper.find('.sp-select-list .sp-option').trigger('click')
        expect(wrapper.vm.val).to.be.equal('')
        await wrapper.setData({ filterable: true })
        const select = wrapper.vm.$children[1]
        select.handleInputEnter()
        expect(wrapper.vm.val).to.be.equal('')
        await wrapper.destroy()
      })
    })
    

    describe('handleSuffixClick', async () => {
      const wrapper = mount({
        data() {
          return {
            val: '',
            optionsData: getTestData(),
            readonly: false,
            disabled: false,
            clearable: true,
            filterable: false,
            placeholder: '',
            emptyText: ''
          }
        },
        template: `
        <div>
        <sp-button class="sp-select-other-button">测试</sp-button>
          <sp-select 
            ref="select"
            :clearable="clearable"
            :placeholder="placeholder"
            :filterable="filterable"
            :emptyText="emptyText"
            v-model="val">
            <sp-option 
             v-for="(item, index) in optionsData"
             :key="index+'f'"
             :label="item.name"
             :value="item.id" 
             :disabled="item.disabled"
            ></sp-option>
          </sp-select>
        </div>
        `,
        components: {
          'sp-select': Select,
        }
      })
  
      it('handleSuffixClick', async () => {
        await wrapper.find('.sp-select').trigger('click')
        await wrapper.find('.sp-select__input').trigger('focus')
        await wrapper.find('.sp-select__input-box').trigger('mouseover')
        await wrapper.find('.sp-select__input').setValue('pi')
        await wrapper.find('.sp-select__suffix').trigger('click')
        expect(wrapper.vm.val).to.be.equal('')
      })
    })
  })


  describe('native input click', async () => {
    const wrapper = mount({
      data() {
        return {
          val: '',
          optionsData: getTestData(),
          readonly: false,
          disabled: false,
          clearable: true,
          filterable: true,
          placeholder: '',
          emptyText: ''
        }
      },
      template: `
      <div>
      <sp-button class="sp-select-other-button">测试</sp-button>
        <sp-select 
          ref="select"
          :clearable="clearable"
          :placeholder="placeholder"
          :filterable="filterable"
          :emptyText="emptyText"
          v-model="val">
          <sp-option 
           v-for="(item, index) in optionsData"
           :key="index+'g'"
           :label="item.name"
           :value="item.id" 
           :disabled="item.disabled"
          ></sp-option>
        </sp-select>
      </div>
      `,
      components: {
        'sp-select': Select,
      }
    })

    it('click', async () => {
      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__input').trigger('click')
      await wrapper.find('.sp-select__input').trigger('focus')
      expect(wrapper.find('.sp-select.isFocus').exists()).to.be.true
      await wrapper.find('.sp-select__input').setValue('pig')
    })
  })

  describe('keyboard', async () => {
    const wrapper = mount({
      data() {
        return {
          val: [],
          optionsData: getTestData(),
          readonly: false,
          disabled: false,
          clearable: true,
          filterable: false,
          placeholder: '',
          emptyText: '',
          multiple: true,
        }
      },
      template: `
      <div>
      <sp-button class="sp-select-other-button">测试</sp-button>
        <sp-select 
          ref="select"
          :clearable="clearable"
          :placeholder="placeholder"
          :filterable="filterable"
          :emptyText="emptyText"
          :multiple="multiple"
          v-model="val">
          <sp-option 
           v-for="(item, index) in optionsData"
           :key="index+'i'"
           :label="item.name"
           :value="item.id" 
           :disabled="item.disabled"
          ></sp-option>
        </sp-select>
      </div>
      `,
      components: {
        'sp-select': Select,
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('keyboard operations', async () => {
      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__input').trigger('focus')
      const select = wrapper.vm.$children[1]
      let i = 3
      while (i--) {
        select.navigateOptions('next')
      }
      select.navigateOptions('prev')
      select.handleInputEnter()
      expect(wrapper.vm.val).to.deep.equal([2])

      await wrapper.find('.sp-select-other-button').trigger('click')
      await wrapper.find('.sp-select__input').trigger('focus')
      i = 3
      while (i--) {
        select.navigateOptions('next')
      }
      select.navigateOptions('prev')
      expect(wrapper.vm.val).to.deep.equal([2])
    })
  })

  describe('slot', () => {
    const wrapper = mount({
      data() {
        return {
          val: '',
          optionsData: getTestData(),
        }
      },
      computed: {
        icon() {
          return (this.optionsData.find(item => item.id === this.val) || {}).icon
        }
      },
      template: `
      <div>
      <sp-button class="sp-select-other-button">测试slot</sp-button>
        <sp-select 
          ref="select"
          filterable
          v-model="val">
          <i v-if="icon" slot="prepend" :class="icon"></i>
          <sp-option 
           v-for="(item, index) in optionsData"
           :key="index"
           :label="item.name"
           :value="item.id" 
           :disabled="item.disabled"
          >
          <span>{{ item.name }}</span>
          </sp-option>
        </sp-select>
      </div>
      `,
      components: {
        'sp-select': Select,
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('slot', async () => {
      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__input').trigger('focus')
      expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
      await wrapper.find('.sp-select__input').setValue('piuu') // todo 模拟用户输入
      await wrapper.find('.sp-select__input').trigger('focus')
      expect(wrapper.find('.sp-select-list-emptyText').isVisible()).to.be.true
      await wrapper.find('.sp-select__input').setValue('pi')
      await wrapper.find('.sp-select__input').trigger('focus')
      let options = wrapper.findAll('.sp-select-list .sp-option')
      expect(options.wrappers.filter(item => item.element.style.display !=='none').length).to.be.equal(1)
      const select = wrapper.vm.$children[1]
      select.navigateOptions('next')
      select.handleInputEnter()
      expect(wrapper.vm.val).to.be.equal(3)

      await wrapper.find('.sp-select__input').trigger('blur')
      await wrapper.find('.sp-select-other-button').trigger('click')
      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__input').trigger('focus')
      expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
      options = wrapper.findAll('.sp-select-list .sp-option')
      expect(options.wrappers.filter(item => item.element.style.display !=='none').length).to.be.equal(5)
    })

  })
})


describe('interact', () => {
  const wrapper = mount({
    data() {
      return {
        val: '',
        optionsData: getTestData(),
        filterable: false
      }
    },
    template: `
    <div>
    <sp-button class="sp-select-other-button">interact</sp-button>
      <sp-select 
        ref="select"
        :filterable="filterable"
        v-model="val">
        <i slot="prepend" :class="icon"></i>
        <sp-option 
         v-for="(item, index) in optionsData"
         :key="index"
         :label="item.name"
         :value="item.id" 
         :disabled="item.disabled"
        >
        <i :class="item.label"></i><span>{{item.name}}</span>
        </sp-option>
      </sp-select>
    </div>
    `,
    components: {
      'sp-select': Select,
    },
    computed: {
      icon() {
        return (this.optionsData.find(item => item.id === this.val) || {}).icon
      }
    }
  })
  document.body.appendChild(wrapper.vm.$el)

  describe('check prepend', () => {
    it('不可搜索，值为空的时候，不显示icon的位置', async () => {
      expect(wrapper.find('.sp-select__prepend').isVisible()).to.be.false
    })
  
    it('不可搜索，有值的时候，不显示icon的位置', async () => {
      await wrapper.setData({ val: 1 })
      expect(wrapper.find('.sp-select__prepend').isVisible()).to.be.true
    })
  
    it('可搜索，值为空的时候，不显示icon的位置', async () => {
      await wrapper.setData({ val: '', filterable: true })
      expect(wrapper.find('.sp-select__prepend').isVisible()).to.be.false
    })
  
    it('可搜索，有值的时候，不显示icon的位置', async () => {
      await wrapper.setData({ val: 1 })
      expect(wrapper.find('.sp-select__prepend').isVisible()).to.be.true
    })
  })

})


/**
 * 清空组件值
 * @param {*} wrapper
 */
function clearSelect(wrapper) {
  return wrapper.setData({ val: ''})
}

/**
 * 点击组件
 * @param {*} wrapper
 */
function selectClick(wrapper) {
  return wrapper.find('.sp-select').trigger('click')
}

/**
 * 设置值
 * @param {*} wrapper
 * @param {*} val
 */
async function setSelectVal (wrapper, val) {
  await wrapper.find('.sp-select__input').trigger('focus')
  await wrapper.find('.sp-select__input').setValue(val)
  return wrapper.find('.sp-select__input').trigger('focus')
}

/**
 * 点击其他地方，失焦
 * @param {*} wrapper
 */
function handelOtherClick(wrapper) {
  return wrapper.vm.$el.querySelector('.sp-select-other-button').click()
}

/**
 * 获取可见的options
 * @param {*} wrapper
 * @returns
 */
function getVisibleOptionsLength(wrapper) {
  return wrapper.findAll('.sp-select-list .sp-option').filter(item => item.element.style.display!== 'none')
}

/**
 * 点击第一个选项
 * @param {*} wrapper
 * @returns
 */
function clickFirstOptions(wrapper) {
  const options = wrapper.findAll('.sp-select-list .sp-option').filter(item => item.element.style.display!== 'none')
  options.wrappers[0].element.click()
  return options.wrappers[0].trigger('click')
}