import { mount, shallowMount } from '@vue/test-utils'
import TimeSelect from 'sparta/components/time-select'
import { createTest, createVue, destroyVM } from '../../util';
import sinon from 'sinon'
const spy = sinon.stub()

describe('time-select', () => {
 
  describe('single', () => {
    const wrapper = mount({
      data() {
        return {
          val: '',
          disabled: false,
          pickerOptions: {}
        }
      },
      template: `
        <sp-time-select 
          ref="spTimeSelect" 
          v-model="val" 
          clearable 
          :pickerOptions="pickerOptions">
        </sp-time-select>
      `,
      components: {
        'sp-time-select': TimeSelect,
      }
    })
    document.body.appendChild(wrapper.vm.$el)

    it('set data', async () => {
      await wrapper.setData({ val: '02:00' })
      expect(wrapper.vm.val).to.equal('02:00')
      await wrapper.setData({ val: null })
      expect(wrapper.vm.val).to.equal('')
      await wrapper.setData({ val: undefined })
      expect(wrapper.vm.val).to.equal('')
      await wrapper.setData({ val: '897098790987' })
      expect(wrapper.vm.val).to.equal('')
      await wrapper.setData({ val: '' })
      expect(wrapper.vm.val).to.equal('')
    })

    it('input blur', async () => {
      await wrapper.vm.$children[0].handleSingleBlur()
      expect(wrapper.vm.val).to.equal('')
    })

    it('input change', async () => {
      await wrapper.setData({ val: '02:00' })
      const input = wrapper.find('input')
      await input.setValue('03:00')
      expect(wrapper.vm.val).to.equal('03:00')
      await wrapper.setData({ val: '' })
    })

    it('pane click', async () => {
      const input = wrapper.find('input')
      await input.trigger('focus')
      const selectOption = wrapper.find('.sp-time-picker-option')
      await selectOption.trigger('click')
      expect(wrapper.vm.val).to.equal('00:00')
      await wrapper.setData({ val: '' })
    })

    it('disabled', async () => {
      await wrapper.setData({ val: '05:00', disabled: true })
      const dropdown = wrapper.find('.is--single-dropdown')
      expect(dropdown.element.style.display).to.equal('none')
      await wrapper.setData({ val: '', disabled: false })
    })

    it('clear data', async () => {
      const input = wrapper.find('input')
      await input.setValue('02:00')
      expect(wrapper.vm.val).to.equal('02:00')
      input.trigger('focus')
      await wrapper.find('.sp-icon-close-bold').trigger("click")
      expect(wrapper.vm.val).to.equal('')
    })

    it('setValue fail data', async () => {
      const input = wrapper.find('input')
      await input.setValue('03:00')
      expect(wrapper.vm.val).to.equal('03:00')
      await input.setValue('50:00')
      expect(wrapper.vm.val).to.equal('03:00')
      await wrapper.setData({ val: ''})
      expect(wrapper.vm.val).to.equal('')
    })

    it('pickerOptions set', async () => {
      await wrapper.setData({ pickerOptions: {
        start: '02:00',
        end: '20:00',
        step: '01:00',
        minTime: '05:00',
        maxTime: '06:00',
      }
     })
     const input = wrapper.find('input')
     await input.trigger('focus')
     const selectOption = wrapper.find('.sp-time-picker-option')
     await selectOption.trigger('click')
     expect(wrapper.vm.val).to.equal('')
    })

    it('pickerOptions set', async () => {
      await wrapper.setData({ pickerOptions: {
        start: '02:00',
        end: '20:00',
        step: '01:00',
        minTime: '05:00',
        maxTime: '06:00',
      }
     })
     await wrapper.setData({ val: ''})
     expect(wrapper.vm.val).to.equal('')
    })
  })

  describe('range', () => {
    const wrapper = mount({
      data() {
        return {
          val: [],
          disabled: false,
          pickerOptions: {},
          clearable: true,
        }
      },
      template: `
        <sp-time-select 
          ref="spTimeSelect" 
          v-model="val" 
          :clearable="clearable"
          type="range" 
          :pickerOptions="pickerOptions">
        </sp-time-select>
      `,
      components: {
        'sp-time-select': TimeSelect,
      }
    })

    const div = document.createElement('div')
    div.id = 'testDiv'
    document.body.appendChild(div)

    const inputList = wrapper.findAll('input')

    it('out set data', async () => {
      // 正常的值
      await wrapper.setData({ val: ['02:00','18:00'] })
      expect(wrapper.vm.val).to.deep.equal(['02:00','18:00'])

      // 异常的值
      await wrapper.setData({ val: ['0:00','6:00'] })
      expect(wrapper.vm.val).to.deep.equal([])

      // 异常的值
      await wrapper.setData({ val: null })
      expect(wrapper.vm.val).to.deep.equal([])

      // 异常的值
      await wrapper.setData({ val: undefined })
      expect(wrapper.vm.val).to.deep.equal([])

      // 异常的值
      await wrapper.setData({ val: ['05:00', '03:00'] })
      expect(wrapper.vm.val).to.deep.equal([])

      // 异常的值
      await wrapper.setData({ val: ['0:00', '03:00'] })
      expect(wrapper.vm.val).to.deep.equal([])

      // 异常的值
      await wrapper.setData({ val: [null, '03:00'] })
      expect(wrapper.vm.val).to.deep.equal([])

      // 异常的值
      await wrapper.setData({ val: ['05:00', undefined] })
      expect(wrapper.vm.val).to.deep.equal([])
    })

    it('blur validator timeStart', async () => {
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.setValue('100:00')
      await input.trigger('blur')
      expect(wrapper.vm.val).to.deep.equal([])

      await input.trigger('focus')
      await input.setValue('10:00')
      await input.trigger('blur')
      expect(wrapper.vm.val).to.deep.equal([])

      await wrapper.setData({ val: ['08:00', '18:00'] })
      expect(wrapper.vm.val).to.deep.equal(['08:00', '18:00'])
      await input.trigger('focus')
      await input.setValue('19:00')
      await input.trigger('blur')
      expect(wrapper.vm.val).to.deep.equal(['08:00', '18:00'])

      await wrapper.setData({ val: [] })
    })

    it('blur validator timeEnd', async () => {
      await inputList.wrappers[1].trigger('focus')
      await inputList.wrappers[1].setValue('100:00')
      await inputList.wrappers[1].trigger('blur')
      expect(wrapper.vm.val).to.deep.equal([])
    })

    it('time Input', async () => {
      // 初始值为空
      await wrapper.setData({ val: [] })
      expect(wrapper.vm.val).to.deep.equal([])

      // 初始值为空 只输入开始值
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[0].setValue('03:00')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])

      // 初始值为空 只输入结束值
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[1].setValue('05:00')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])

      // 初始值为空 输入正常的开始值和异常的结束值
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[0].setValue('02:00')
      await inputList.wrappers[1].setValue('6789809809')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[0].setValue('03:00')
      await inputList.wrappers[1].setValue('01:00')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])

      // 初始值为空 输入异常的开始值和正常的结束值
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[0].setValue('324234234')
      await inputList.wrappers[1].setValue('05:00')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])

      // 初始值为空 输入异常的开始值和异常的结束值
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[0].setValue('46235235')
      await inputList.wrappers[1].setValue('4534500')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])

      // 初始值为空 输入正常的结束值和异常的开始值
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[1].setValue('03:00')
      await inputList.wrappers[0].setValue('6789809809')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[1].setValue('08:00')
      await inputList.wrappers[0].setValue('09:00')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])

      // 两者都变更手动输入正常的值
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[0].setValue('01:00')
      await inputList.wrappers[1].setValue('09:00')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal(['01:00','09:00'])

      // 只变更开始时间 手动输入异常的值
      await inputList.wrappers[0].setValue('10:00')
      expect(wrapper.vm.val).to.deep.equal(['01:00','09:00'])

      // 只变更开始时间 清空开始时间
      await inputList.wrappers[0].setValue('')
      expect(wrapper.vm.val).to.deep.equal(['01:00','09:00'])

      // 只变更结束时间 清空结束时间
      await inputList.wrappers[1].setValue('')
      expect(wrapper.vm.val).to.deep.equal(['01:00','09:00'])

      // 只变更结束时间 手动输入异常的值
      await inputList.wrappers[1].setValue('01:00')
      expect(wrapper.vm.val).to.deep.equal(['01:00','09:00'])

      // 只变更开始时间 手动输入正常的值
      await inputList.wrappers[0].setValue('03:00')
      expect(wrapper.vm.val).to.deep.equal(['03:00','09:00'])

      // 只变更结束时间 手动输入正常的值
      await inputList.wrappers[1].setValue('08:00')
      expect(wrapper.vm.val).to.deep.equal(['03:00','08:00'])

      await wrapper.setData({ val: [] })
      expect(wrapper.vm.val).to.deep.equal([])

      // 手动连续输入 开始时间03:00， 结束时间03:00
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[0].setValue('03:00')
      await inputList.wrappers[1].setValue('03:00')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])

      // 手动连续输入 结束时间05:00， 开始时间05:00
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[1].setValue('05:00')
      await inputList.wrappers[0].setValue('05:00')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])

    })

    it('pane click', async () => {
      // 两者都变更
      const input = wrapper.find('input')
      await input.trigger('focus')
      await wrapper.find('.sp-time-select__range').trigger('click')
      const dropdown =  wrapper.find('.is--range-dropdown')
      let timeStartSelectOption = dropdown.find('.sp-time-picker-pane').find('.sp-time-picker-option')
      let timeEndSelectOption = dropdown.findAll('.sp-time-picker-pane').wrappers[1].findAll('.sp-time-picker-option').wrappers[8]
      await timeStartSelectOption.trigger('click')
      await timeEndSelectOption.trigger('click')
      expect(wrapper.vm.val).to.deep.equal(['00:00','08:00'])

      // 只变更开始时间
      timeStartSelectOption = dropdown.find('.sp-time-picker-pane').findAll('.sp-time-picker-option').wrappers[2]
      await timeStartSelectOption.trigger('click')
      await timeEndSelectOption.trigger('click')
      expect(wrapper.vm.val).to.deep.equal(['02:00','08:00'])

      // 只变更结束时间 
      timeEndSelectOption = dropdown.findAll('.sp-time-picker-pane').wrappers[1].findAll('.sp-time-picker-option').wrappers[6]
      await timeStartSelectOption.trigger('click')
      await timeEndSelectOption.trigger('click')
      expect(wrapper.vm.val).to.deep.equal(['02:00','06:00'])

      //都不变更
      await timeEndSelectOption.trigger('click')
      await timeEndSelectOption.trigger('click')
      expect(wrapper.vm.val).to.deep.equal(['02:00','06:00'])

      await wrapper.setData({ val: [] })

      // 手动点选 开始时间07:00, 输入结束时间 07:00
      await wrapper.find('.sp-time-select__range').trigger('click')
      timeStartSelectOption = dropdown.find('.sp-time-picker-pane').findAll('.sp-time-picker-option').wrappers[7]
      await timeStartSelectOption.trigger('click')
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[1].setValue('07:00')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])

      // 手动点选 结束时间07:00, 输入开始时间 07:00
      await wrapper.find('.sp-time-select__range').trigger('click')
      timeEndSelectOption = dropdown.findAll('.sp-time-picker-pane').wrappers[1].findAll('.sp-time-picker-option').wrappers[7]
      await timeEndSelectOption.trigger('click')
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[0].setValue('07:00')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal([])

      // 有值的情况下【00:00，22:00】， 点选一个正常的开始值06:00，输入一个正常的结束值18:00，预期得到【06:00，18:00】
      await wrapper.setData({ val: ['00:00','22:00'] })
      await wrapper.find('.sp-time-select__range').trigger('click')
      timeStartSelectOption = dropdown.find('.sp-time-picker-pane').findAll('.sp-time-picker-option').wrappers[6]
      await timeStartSelectOption.trigger('click')
      await wrapper.find('.sp-time-select__range').trigger('click')
      await inputList.wrappers[1].setValue('18:00')
      document.getElementById('testDiv') && document.getElementById('testDiv').click()
      expect(wrapper.vm.val).to.deep.equal(['06:00','18:00'])
    })

    describe('other', async () => {
      const inputList = wrapper.findAll('input')

      const paneList = wrapper.findAll('.sp-time-picker-pane__list')
      const timeStartList = paneList.wrappers[0].findAll('.sp-time-picker-option')
      const timeEndList = paneList.wrappers[1].findAll('.sp-time-picker-option')

      it('查看开始时间的点亮逻辑和结束时间的disabled逻辑', async () => {
        // 查看开始时间的点亮逻辑和结束时间的disabled逻辑
        await inputList.wrappers[0].setValue('03:00')
        const selectedOption =  wrapper.find('.is--selected')
        expect(selectedOption.text()).to.be.equal('03:00')
        expect(paneList.wrappers[1].find('.is-disabled').text()).to.be.equal('00:00')
      })


      it('初始时为空 先点选正常开始值，再输入正常结束值，注意点亮逻辑', async () => {
        await wrapper.setData({ val: [] })
        // 初始时为空 先点选正常开始值，再输入正常结束值，注意点亮逻辑
        await wrapper.find('.sp-time-select__range').trigger('click')
        await timeStartList.wrappers[0].trigger('click')
        expect(paneList.wrappers[0].find('.is--selected').text()).to.be.equal('00:00')
        await inputList.wrappers[1].setValue('09:00')
        wrapper.vm.$nextTick(() => {
          expect(paneList.wrappers[1].find('.is--selected').text()).to.be.equal('09:00')
          expect(wrapper.vm.val).to.deep.equal(['00:00','09:00'])
        })
      })
  
      it('初始时为空 先点选正常开始值，再输入异常结束值，查看点亮逻辑', async () => {
        await wrapper.setData({ val: [] })
        // 初始时为空 先点选正常开始值，再输入异常结束值，注意点亮逻辑
        await timeStartList.wrappers[0].trigger('click')
        expect(paneList.wrappers[0].find('.is--selected').text()).to.be.equal('00:00')
        await inputList.wrappers[1].setValue('234234234234')
        document.getElementById('testDiv') && document.getElementById('testDiv').click()
        expect(wrapper.vm.val).to.deep.equal([])
        await wrapper.setData({ val: [] })
      })

      it('初始时为空 先输入正常开始值，再点选正常结束值，查看点亮逻辑', async () => {
        await wrapper.setData({ val: [] })
        // 初始时为空 先输入正常开始值，再点选正常结束值，注意点亮逻辑
        await inputList.wrappers[0].setValue('01:00')
        expect(paneList.wrappers[0].find('.is--selected').text()).to.be.equal('01:00')
        await timeEndList.wrappers[7].trigger('click')
        expect(paneList.wrappers[1].find('.is--selected').text()).to.be.equal('07:00')
        expect(wrapper.vm.val).to.deep.equal(['01:00','07:00'])
        await wrapper.setData({ val: [] })
      })


      it('初始时为空 先输入正常结束值，再输入异常开始值，注意点亮逻辑', async () => {
        await wrapper.setData({ val: [] })
        // 初始时为空 先输入正常结束值，再输入异常开始值，注意点亮逻辑
        await inputList.wrappers[1].setValue('15:00')
        expect(paneList.wrappers[1].find('.is--selected').text()).to.be.equal('15:00')
        await inputList.wrappers[0].setValue('234234234234234')
        document.getElementById('testDiv') && document.getElementById('testDiv').click()
        expect(wrapper.vm.val).to.deep.equal([])
        await wrapper.setData({ val: [] })
      })


      it('初始时为空 先输入正常结束值，再输入正常开始值，注意点亮逻辑', async () => {
        await wrapper.setData({ val: [] })
        // 初始时为空 先输入正常结束值，再输入正常开始值，注意点亮逻辑
        await inputList.wrappers[1].setValue('13:00')
        expect(paneList.wrappers[1].find('.is--selected').text()).to.be.equal('13:00')
        await inputList.wrappers[0].setValue('10:00')
        expect(paneList.wrappers[0].find('.is--selected').text()).to.be.equal('10:00')
        expect(wrapper.vm.val).to.deep.equal(['10:00','13:00'])
        await wrapper.setData({ val: [] })
      })

      it('初始时有值 点选开始值，结束值选择面板点亮清空', async () => {
        // 初始时有值 点选开始值，结束值选择面板点亮清空
        await wrapper.setData({ val: ['02:00','18:00'] })
        await timeStartList.wrappers[12].trigger('click')
        wrapper.vm.$nextTick(() => {
          expect(paneList.wrappers[0].find('.is--selected').text()).to.be.equal('12:00')
          expect(paneList.wrappers[1].find('.is--selected').exists()).to.be.false
        })
      })

      it('初始时有值 输入开始值，结束值选择面板点亮保持', async () => {
        // 初始时有值 输入开始值，结束值选择面板点亮保持
        await wrapper.setData({ val: ['02:00','18:00'] })
        await inputList.wrappers[0].setValue('11:00')
        expect(paneList.wrappers[0].find('.is--selected').text()).to.be.equal('11:00')
      })
    })


    describe('pickerOptions', async () => {
      it('pickerOptions set, click disable value', async () => {
        await wrapper.setData({ val: [] })
        await wrapper.setData({ pickerOptions: {
          start: '02:00',
          end: '20:00',
          step: '01:00',
          minTime: '05:00',
          maxTime: '06:00',
        }
       })
       const input = wrapper.find('input')
       await input.trigger('focus')
       await handleRangePaneClick(wrapper)
       expect(wrapper.vm.val).to.deep.equal([])
      })

      it('pickerOptions set, click able value', async () => {
        await wrapper.setData({ pickerOptions: {
          start: '06:00',
          end: '20:00',
          step: '01:00',
          maxTime: '15:00',
        }
       })
       const input = wrapper.find('input')
       await input.trigger('focus')
       await handleRangePaneClick(wrapper)
       expect(wrapper.vm.val).to.deep.equal(['06:00','07:00'])
      })

      it('pickerOptions set, set data', async () => {
        await wrapper.setData({  
          val: [],
          pickerOptions: {
            start: '06:00',
            end: '20:00',
            step: '01:00',
            maxTime: '19:00',
          }
        })
        expect(wrapper.vm.val).to.deep.equal([])
        
        // 两者都变更手动输入正常的值
        const inputList = wrapper.findAll('input')
        await inputList.wrappers[0].setValue('07:00')
        await inputList.wrappers[1].setValue('18:00')
        expect(wrapper.vm.val).to.deep.equal(['07:00','18:00'])

        // 只变更开始时间 手动输入异常的值
        await inputList.wrappers[0].setValue('05:00')
        expect(wrapper.vm.val).to.deep.equal(['07:00','18:00'])
        // 只变更开始时间 清空开始时间
        await inputList.wrappers[0].setValue('')
        expect(wrapper.vm.val).to.deep.equal(['07:00','18:00'])
        // 只变更结束时间 清空结束时间
        await inputList.wrappers[1].setValue('')
        expect(wrapper.vm.val).to.deep.equal(['07:00','18:00'])
        // 只变更结束时间 手动输入异常的值
        await inputList.wrappers[1].setValue('01:00')
        expect(wrapper.vm.val).to.deep.equal(['07:00','18:00'])
      })

      it('destroy', async () => {
        await wrapper.destroy()
        expect(spy.calledOnce).to.be.false
      })
    })

    it('clear data', async () => {
      await wrapper.setData({ val: ['02:00','18:00'] })
      const input = wrapper.find('input')
      await input.trigger('focus')
      await wrapper.find('.sp-icon-close-bold').trigger("click")
      expect(wrapper.vm.val).to.deep.equal([])
    })

    it('clearable', async () => {
      await wrapper.setData({ clearable: false })
      await wrapper.setData({ val: ['02:00','18:00'] })
      const input = wrapper.find('input')
      await input.trigger('focus')
      expect(wrapper.find('.sp-icon-close-bold').isVisible()).to.be.false
      await wrapper.setData({ clearable: true })
      await wrapper.setData({ val: [] })
      await input.trigger('focus')
      expect(wrapper.find('.sp-icon-close-bold').isVisible()).to.be.false
    })

  })

  describe('range no pickerOptions', () => {
    mount({
      data() {
        return {
          val: []
        }
      },
      template: `
        <sp-time-select 
          ref="spTimeSelect" 
          v-model="val" 
          clearable
          type="range" >
        </sp-time-select>
      `,
      components: {
        'sp-time-select': TimeSelect,
      }
    })
  })

})


async function handleRangePaneClick(wrapper) {
  const dropdown =  wrapper.find('.is--range-dropdown')
  const timeStartSelectOption = dropdown.find('.sp-time-picker-pane').find('.sp-time-picker-option')
  const timeEndSelectOption = dropdown.findAll('.sp-time-picker-pane').wrappers[1].findAll('.sp-time-picker-option').wrappers[1]
  await timeStartSelectOption.trigger('click')
  await timeEndSelectOption.trigger('click')
}
