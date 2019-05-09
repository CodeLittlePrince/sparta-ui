import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { triggerEvent, createVue, destroyVM, isVisable } from '../../util'
import Select from '@/components/select'

// Tip
// 1. UI组件单测注重功能型测试，类似e2e测试，不过e2e无法做代码覆盖率的检测
// 2. 因为测试库是mocha，所以异步的测试可使用回调参数声明的方式处理，如实例中的done；返回promise
// 3. 对于nextTick的现象expect可以使用return nextTick().then来处理（即promise）；或者用done + setTimeout处理
// 4. 如果希望可视化测试过程，可以使用done + setTimeout方式（注意超时时间，默认为2000ms）
// 5. 除非逻辑非常简单，也不涉及异步，否则，都遵守一个功能一it的方式
// 6. 有些dom操作受动画影响，无法拿到最终需要的值，需要做延时处理（参考tip-4）
const ACTION_SPACE_TIME = 1500

describe('Select', () => {
  it('use', () => {
    Vue.use(Select)
    expect(Vue.component(Select.name))
      .to.be.a('function')
  })

  describe('props', () => {
    let wrapper
    let vm
    afterEach(() => {
      return Vue.nextTick().then(() => {
        wrapper && wrapper.destroy() // destory wrapper each time
        vm && destroyVM(vm)
      })
    })
    it('value', () => {
      wrapper = mount(Select, {
        propsData: {
          value: 'kitty'
        }
      })
      expect(wrapper.vm.value)
        .to.equal('kitty')
    })
    it('placeholder', () => {
      wrapper = mount(Select, {
        propsData: {
          placeholder: '请选择合适的选项'
        }
      })
      expect(wrapper.find('.ev-select-input-placeholder').text())
        .to.equal('请选择合适的选项')
    })
    it('disabled', () => {
      wrapper = mount(Select, {
        propsData: {
          disabled: true
        }
      })
      expect(wrapper.find('.is-disabled'))
        .to.exist
    })
    it('clearable', () => {
      wrapper = mount(Select, {
        propsData: {
          clearable: true
        }
      })
      // inputText为空时候，点击select-suffix
      const selectSuffix = wrapper.find('.ev-select-suffix')
      selectSuffix.trigger('click')
      expect(wrapper.vm.inputText)
        .to.equal('')
      // nputText不为空时候，点击select-suffix，清除输入
      wrapper.vm.inputText = '热狗'
      wrapper.find('.ev-select-input-box').trigger('mouseover')
      expect(wrapper.find('.ev-icon-close').isVisible())
        .to.equal(true)
      selectSuffix.trigger('click')
      expect(wrapper.vm.inputText)
        .to.equal('')
    })
  })
  describe('setDefault', () => {
    let vm
    after(() => {
      return Vue.nextTick().then(() => {
        vm && destroyVM(vm)
      })
    })

    it('inputText is Franky', () => {
      vm = createVue({
        data(){
          return {
            list1: [
              { label: 'Tom', value: 1 },
              { label: 'Jerry', value: 2 },
              { label: 'Kitty', value: 3 },
              { label: 'Adam', value: 4 },
              { label: 'Bob', value: 5 },
              { label: 'Cancy', value: 6 },
              { label: 'David', value: 7 },
              { label: 'Evan', value: 8 },
              { label: 'Franky', value: 9 },
              { label: 'Jerry', value: 10 },
              { label: 'Kitty', value: 11 },
              { label: 'Kathy', value: 12 }
            ],
            value1: 9
          }
        },
        template: `
          <ev-select v-model="value1">
            <ev-option
              v-for="item in list1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></ev-option>
          </ev-select>
        `
      }, true)
      expect(vm.$children[0].inputText)
        .to.equal('Franky')
    })
  })
  describe('filterable', () => {
    let vm
    after(() => {
      return Vue.nextTick().then(() => {
        vm && destroyVM(vm)
      })
    })

    let options
    let selectInputVm
    let selectInput
    it('click to show all options', () => {
      vm = createVue({
        data(){
          return {
            list4: [
              { label: 'cat', value: 1 },
              { label: 'dog', value: 2 },
              { label: 'pig', value: 3 }
            ],
            value4: 0
          }
        },
        template: `
          <ev-select
            v-model="value4"
            filterable
          >
            <ev-option
              v-for="item in list4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></ev-option>
          </ev-select>
        `
      }, true)
      // 查看初始是否下拉框为不可见
      const selectList = document.querySelector('.ev-select-list')
      expect(isVisable(selectList))
        .to.be.false
      // 点击select框，下拉框为可见
      options = selectList.querySelectorAll('.ev-option')
      selectInput = document.querySelector('.ev-select-input')
      selectInput.focus()
      selectInput.click()
      return Vue.nextTick().then(() => {
        expect(isVisable(selectList))
          .to.be.true
        expect(isVisable(options[0]) && isVisable(options[1]) && isVisable(options[2]))
          .to.be.true
      })
    })
    it('input character "c" to search', done => {
      // 输入文字后，过滤掉不匹配的条目；当文字刚好能在条目1比1找到，则显示所有的条目
      selectInputVm = vm.$children[0]
      triggerEvent(selectInput, 'input')
      selectInputVm.inputText = 'c'
      setTimeout(() => {
        expect(isVisable(options[0]))
          .to.equal(true)
        expect(isVisable(options[1]))
          .to.equal(false)
        done()
      }, ACTION_SPACE_TIME)
    })
    it('input "cat" to search', done => {
      // 输入文字后，过滤掉不匹配的条目；当文字刚好能在条目1比1找到，则显示所有的条目
      triggerEvent(selectInput, 'input')
      selectInputVm.inputText = 'cat'
      setTimeout(() => {
        expect(isVisable(options[0]) && isVisable(options[1]) && isVisable(options[2]))
          .to.be.true
        done()
      }, ACTION_SPACE_TIME)
    })
    it('input "cattt" to search', done => {
      // 输入文字后，过滤掉不匹配的条目；当文字刚好能在条目1比1找到，则显示所有的条目
      triggerEvent(selectInput, 'input')
      selectInputVm.inputText = 'cattt'
      setTimeout(() => {
        selectInputVm.handleInputEnter()
        expect(!isVisable(options[0]) && !isVisable(options[1]) && !isVisable(options[2]))
          .to.be.true
        done()
      }, ACTION_SPACE_TIME)
    })
    it('click and blur other area, clear the inputText which is not matched', () => {
      document.body.click()
      document.querySelector('.ev-select-input').blur()
      return Vue.nextTick().then(() => {
        expect(selectInputVm.inputText)
          .to.equal('')
      })
    })
    it('input "cat", reserve inputText which is matched', () => {
      selectInput.focus()
      selectInput.click()
      triggerEvent(selectInput, 'input')
      selectInputVm.inputText = 'cat'
      document.body.click()
      document.querySelector('.ev-select-input').blur()
      return Vue.nextTick().then(() => {
        expect(selectInputVm.inputText)
          .to.equal('cat')
      })
    })
  })
  describe('multiple', () => {
    let vm
    after(() => {
      return Vue.nextTick().then(() => {
        vm && destroyVM(vm)
      })
    })
    
    let options
    it('select all option one by one by mouse', done => {
      vm = createVue({
        data(){
          return {
            list7: [
              { label: '音乐', value: 'music' },
              { label: '电影', value: 'movie' },
              { label: '绘画', value: 'drawing' }
            ],
            value7: []
          }
        },
        template: `
          <ev-select
            v-model="value7"
            multiple
          >
            <ev-option
              v-for="item in list7"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </ev-option>
          </ev-select>
        `
      }, true)
      // 查看初始是否下拉框为不可见
      const selectList = document.querySelector('.ev-select-list')
      expect(isVisable(selectList))
        .to.equal(false)
      // 点击select框，下拉框为可见
      document.querySelector('.ev-select-input').click()
      // 鼠标click，选择下拉的条目，value更新
      options = selectList.querySelectorAll('.ev-option')
      options[0].click()
      options[1].click()
      options[2].click()
      setTimeout(() => {
        expect(vm.value7)
          .to.deep.equal(['music', 'movie', 'drawing'])
        done()
      }, ACTION_SPACE_TIME)
    })
    it('select first option by mouse', done => {
      options[0].click()
      setTimeout(() => {
        expect(vm.value7)
          .to.deep.equal(['movie', 'drawing'])
        done()
      }, ACTION_SPACE_TIME)
    })
    it('select second option by mouse', done => {
      options[1].click()
      setTimeout(() => {
        expect(vm.value7)
          .to.deep.equal(['drawing'])
        done()
      }, ACTION_SPACE_TIME)
    })
    it('select third option by mouse', done => {
      options[2].click()
      setTimeout(() => {
        expect(vm.value7)
          .to.deep.equal([])
        done()
      }, ACTION_SPACE_TIME)
    })
    // 用键盘up/down/enter，控制选择下拉的条目，value更新
    let selectInput
    it('select first option by keyboard', done => {
      selectInput = vm.$children[0]
      selectInput.navigateOptions('next')
      selectInput.handleInputEnter()
      setTimeout(() => {
        expect(vm.value7)
          .to.deep.equal(['music'])
        done()
      }, ACTION_SPACE_TIME)
    })
    it('select first option by keyboard, agian', done => {
      selectInput.handleInputEnter()
      setTimeout(() => {
        expect(vm.value7)
          .to.deep.equal([])
        done()
      }, ACTION_SPACE_TIME)
    })
    it('select prev option by keyboard', done => {
      selectInput.navigateOptions('prev')
      selectInput.handleInputEnter()
      setTimeout(() => {
        expect(vm.value7)
          .to.deep.equal(['drawing'])
        done()
      }, ACTION_SPACE_TIME)
    })
    it('delete tag by mouse', done => {
      const closeIcon = document.querySelector('.ev-icon-close')
      closeIcon.click()
      setTimeout(() => {
        expect(vm.value7)
          .to.deep.equal([])
        done()
      }, ACTION_SPACE_TIME)
    })
  })
  describe('option', () => {
    let vm
    after(() => {
      return Vue.nextTick().then(() => {
        vm && destroyVM(vm)
      })
    })

    let options
    it('click', () => {
      vm = createVue({
        data(){
          return {
            list2: [
              { label: 'Tony', value: 1 },
              { label: 'Bob', value: 2 },
              { label: 'Jack', value: 3 }
            ],
            value2: 0
          }
        },
        template: `
          <ev-select v-model="value2">
            <ev-option
              v-for="item in list2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.value === 2"
            ></ev-option>
          </ev-select>
        `,
      }, true)
      // 点击select框，下拉框为可见
      document.querySelector('.ev-select-input').click()
      options = document.querySelectorAll('.ev-option')
      // 点击Jack条目
      options[2].click()
      expect(vm.value2)
        .to.equal(3)
    })
    it('click disabled item', () => {
      // 点击select框，下拉框为可见
      document.querySelector('.ev-select-input').click()
      // 点击select框，下拉框为可见
      expect(options[1].className.indexOf('is-disabled') > -1)
        .to.be.true
        // 鼠标hover在disabled的条目
      triggerEvent(options[1], 'mouseover')
      expect(vm.$children[0].evOptionHoverIndex)
        .to.equal(-1)
        // 点击disabled的条目
      options[1].click()
      expect(vm.value2)
        .to.equal(3)
    })
    it('mouse hover', () => {
      // 鼠标hover在Jack条目
      triggerEvent(options[2], 'mouseover')
      expect(vm.$children[0].evOptionHoverIndex)
        .to.equal(2)
    })
    it('keybord operation', () => {
      const selectInputVm = vm.$children[0]
      selectInputVm.navigateOptions('prev')
      selectInputVm.navigateOptions('prev')
      selectInputVm.navigateOptions('next')
      selectInputVm.navigateOptions('next')
      selectInputVm.handleInputEnter()
      expect(vm.value2)
        .to.equal(3)
      selectInputVm.navigateOptions('next') // show options
      selectInputVm.navigateOptions('next') // move to Tony
      selectInputVm.handleInputEnter()
      expect(vm.value2)
        .to.equal(1)
    })
  })
  describe('option-group', () => {
    let vm
    after(() => {
      return Vue.nextTick().then(() => {
        vm && destroyVM(vm)
      })
    })

    it('keybord operation', () => {
      vm = createVue({
        data(){
          return {
            list6: [{
              label: '北京',
              options: [{
                value: 'Sanlitun',
                label: '三里屯'
              }, {
                value: 'Wangfujing',
                label: '王府井'
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
            }],
            value6: ''
          }
        },
        template: `
          <ev-select v-model="value6">
            <ev-option-group
              v-for="group in list6"
              :key="group.label"
            >
              <ev-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right;">{{ item.value }}</span>
              </ev-option>
            </ev-option-group>
          </ev-select>
        `,
      }, true)
      const selectInput = document.querySelector('.ev-select-input')
      selectInput.focus()
      selectInput.click()
      const selectInputVm = vm.$children[0]
      selectInputVm.navigateOptions('prev')
      selectInputVm.navigateOptions('prev')
      selectInputVm.navigateOptions('prev')
      selectInputVm.handleInputEnter()
      expect(vm.value6)
        .to.equal('Wangfujing')
    })
  })
})