import { mount, shallowMount } from '@vue/test-utils'
import Select from 'sparta/components/select'
import { createTest, createVue, destroyVM , sleep } from '../../util';

const getTestData = function() {
  return [
    { id: 1, name: 'cat', disabled: false, icon: 'sp-icon-file' },
    { id: 2, name: 'dog', disabled: false, icon: 'sp-icon-check' },
    { id: 3, name: 'pig', disabled: false, icon:'sp-icon-search'},
    { id: 4, name: 'tiger', disabled: false, icon: 'sp-icon-file'   },
    { id: 5, name: 'elephant', disabled: false, icon: 'sp-icon-check'  }
  ];
};

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
  }];
};

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

    it('create', async () => {
      expect(wrapper.find('.sp-select').exists()).to.be.true
      expect(wrapper.find('.sp-select__input-placeholder').isVisible()).to.be.true
    });

    it('set data', async () => {
     await wrapper.setData({ val: 3 })
     expect(wrapper.find('.sp-select__input').element.value).to.be.equal('pig')
     await wrapper.setData({ val: '' })
    });

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
      await wrapper.setData({ emptyText: "emptyText" })
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
    });

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
    });

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
    });

    it('keyboard operations', async () => {
      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__input').trigger('focus')
      const select = wrapper.vm.$children[1];
      let i = 3;
      while (i--) {
         select.navigateOptions('next');
      }
      select.navigateOptions('prev');
      select.handleInputEnter()
      expect(wrapper.vm.val).to.deep.equal(4)

      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__input').trigger('focus')
      await wrapper.setData({ filterable: true })
      i = 13;
      while (i--) {
         select.navigateOptions('next');
      }
      select.navigateOptions('prev');
      select.handleInputEnter()
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

  describe('other', () => {

    describe('spOptionsAllDisabled', async () => {
      const wrapper = mount({
        data() {
          return {
            val: '',
            optionsData: [
              { id: 1, name: 'cat', disabled: true },
              { id: 2, name: 'dog', disabled: true  },
              { id: 3, name: 'pig', disabled: true  },
              { id: 4, name: 'tiger', disabled: true  },
              { id: 5, name: 'elephant', disabled: true  }
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
        const select = wrapper.vm.$children[1];
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


  describe('handleFocusSelectInput', async () => {
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

    it('handleFocusSelectInput', async () => {
      await wrapper.find('.sp-select').trigger('click')
      await wrapper.find('.sp-select__input').trigger('click')
      const select = wrapper.vm.$children[1];
      select.handleFocusSelectInput()
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
      const select = wrapper.vm.$children[1];
      let i = 3;
      while (i--) {
         select.navigateOptions('next');
      }
      select.navigateOptions('prev');
      select.handleInputEnter()
      expect(wrapper.vm.val).to.deep.equal([2])

      await wrapper.find('.sp-select-other-button').trigger('click')
      await wrapper.find('.sp-select__input').trigger('focus')
      i = 3;
      while (i--) {
         select.navigateOptions('next');
      }
      select.navigateOptions('prev');
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
      await wrapper.find(".sp-select").trigger('click')
      await wrapper.find(".sp-select__input").trigger('focus')
      expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
      await wrapper.find(".sp-select__input").setValue('piuu') // todo 模拟用户输入
      await wrapper.find(".sp-select__input").trigger('focus')
      expect(wrapper.find('.sp-select-list-emptyText').isVisible()).to.be.true
      await wrapper.find(".sp-select__input").setValue('pi')
      await wrapper.find(".sp-select__input").trigger('focus')
      let options = wrapper.findAll(".sp-select-list .sp-option")
      expect(options.wrappers.filter(item => item.element.style.display !=='none').length).to.be.equal(1)
      const select = wrapper.vm.$children[1];
      select.navigateOptions('next')
      select.handleInputEnter()
      expect(wrapper.vm.val).to.be.equal(3)

      await wrapper.find(".sp-select__input").trigger('blur')
      await wrapper.find('.sp-select-other-button').trigger('click')
      await wrapper.find(".sp-select").trigger('click')
      await wrapper.find(".sp-select__input").trigger('focus')
      expect(wrapper.find('.sp-select-dropdown').isVisible()).to.be.true
      options = wrapper.findAll(".sp-select-list .sp-option")
      expect(options.wrappers.filter(item => item.element.style.display !=='none').length).to.be.equal(5)
    })

  })
})