Modal 模态弹窗
---
弹窗组件

### 基本使用
:::demo 通过`v-model`控制modal的是否可见
```vue
<template>
  <sp-button type="primary" @click="visible1 = true">show</sp-button>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visible1"
    @show="showHandle"
    @close="closeHandle"
    width="650"
  >
    <div class="content">
      <p>我是modal1的内容</p>
      <sp-form
      :model="validateForm1"
      ref="validateForm1"
      label-width="150px"
      class="sp-form-demo"
      scroll-when-error
      @enter="submitForm('validateForm1')"
      >
        <!-- 姓名 -->
        <sp-form-item
          prop="name"
          label="姓名"
          labelTipWidth="150px"
          :rules="[
            { required: true, message: '姓名不能为空'}
          ]"
        >
          <sp-input
            v-model="validateForm1.name"
            placeholder="请输入"
            autocomplete="off"
          ></sp-input>
          <div slot="labelTip">靓仔，有什么疑问吗？</div>
        </sp-form-item>
        <sp-form-item
          label="银行编号"
          prop="localBankCode"
          :rules="[
            { required: true, message: '请输入3位数字Bank Code' },
          ]"
        >
          <sp-input
            v-model="validateForm1.localBankCode"
            maxlength="3"
            :filter-char="/[^\d]/g"
            placeholder="请输入3位数字Bank Code"
          />
        </sp-form-item>
      </sp-form>
      <sp-button type="default" @click="visible1 = false">取消</sp-button>
      <sp-button type="primary" @click="visible1 = false">确定</sp-button>
    </div>
  </sp-modal>
</template>

<script>
export default{
  data() {
    return {
      visible1: false
    }
  },
  methods: {
    showHandle() {
      console.log('show')
    },
    closeHandle() {
      console.log('close')
    }
  }
}
</script>
```
:::

### before-close
:::demo 通过`before-close`控制点击`x`时候的交互
```vue
<template>
  <sp-button type="primary" @click="visible12 = true">show</sp-button>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visible12"
    :before-close="beforeClose"
  >
    <div class="content">
      <p>我是before-close的内容</p>
      <sp-button type="default" @click="visible12 = false">取消</sp-button>
      <sp-button type="primary" @click="visible12 = false">确定</sp-button>
    </div>
  </sp-modal>
</template>

<script>
export default{
  data() {
    return {
      visible12: false
    }
  },
  methods: {
    beforeClose(done) {
      console.log('before-close')
      done()
    },
  }
}
</script>
```
:::

### 唯一弹窗模式
:::demo 设置`unique`属性为`true`，则弹窗只能同时存在最多一个
```vue
<template>
  <sp-button type="primary" @click="visible2 = true">show</sp-button>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visible2"
    @show="showHandle"
    @close="closeHandle"
  >
    <div class="content">
      <p>我是modal2的内容</p>
      <p>我是modal2的内容</p>
      <p>我是modal2的内容</p>
      <p>我是modal2的内容</p>
      <sp-button type="default" @click="visible3 = true">新开非unique弹窗</sp-button>
      <sp-button type="primary" @click="visible4 = true">新开unique弹窗</sp-button>
    </div>
  </sp-modal>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visible3"
  >
    <div class="content">
      <p>我是非unique弹窗内容</p>
      <sp-button type="default" @click="visible3 = false">取消</sp-button>
      <sp-button type="primary" @click="visible3 = false">确定</sp-button>
    </div>
  </sp-modal>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visible4"
    unique
  >
    <div class="content">
      <p>我是unique弹窗内容</p>
      <sp-button type="default" @click="visible4 = false">取消</sp-button>
      <sp-button type="primary" @click="visible4 = false">确定</sp-button>
    </div>
  </sp-modal>
</template>

<script>
export default{
  data() {
    return {
      visible2: false,
      visible3: false,
      visible4: false,
    }
  },
  methods: {
    showHandle() {
      console.log('show')
    },
    closeHandle() {
      console.log('close')
    }
  }
}
</script>
```
:::

### 控制弹窗优先级
:::demo 通过`priority`控制弹窗是否显示。priority是unique的一种特殊方式，它会通过判断优先级来决定是否关闭已经出现了的弹窗。
```vue
<template>
  <sp-button type="primary" @click="handleShowTwoModal">show two modal</sp-button>
  <sp-modal
    class="components--main__sp-modal"
    priority="2"
    v-model="visible8"
  >
    <div class="content">
      <p>我是优先级高的Modal</p>
      <sp-button type="primary" @click="visible8 = false">确定</sp-button>
    </div>
  </sp-modal>
  <sp-modal 
    class="components--main__sp-modal"
    v-model="visible9"
  >
    <div class="content">
      <p>我是普通的Modal</p>
      <sp-button type="primary" @click="visible9 = false">确定</sp-button>
    </div>
  </sp-modal>
  <sp-modal 
    class="components--main__sp-modal"
    unique
    v-model="visible10"
  >
    <div class="content">
      <p>我是unique的Modal</p>
      <sp-button type="primary" @click="visible10 = false">确定</sp-button>
    </div>
  </sp-modal>
  <sp-modal 
    class="components--main__sp-modal"
    priority="1"
    v-model="visible11"
  >
    <div class="content">
      <p>我是优先级低的Modal</p>
      <sp-button type="primary" @click="visible11 = false">确定</sp-button>
    </div>
  </sp-modal>
</template>

<script>
export default{
  data() {
    return {
      visible8: false,
      visible9: false,
      visible10: false,
      visible11: false,
    }
  },
  methods() {
    handleShowTwoModal() {
      this.visible8 = true
      this.visible9 = true
      this.visible10 = true
      this.visible11 = true
    }
  }
}
</script>
```
:::

### head自定义
:::demo 通过`title`控制标题文案；或者通过`slot`定制更多样的顶部
```vue
<template>
  <sp-button type="primary" @click="visible5 = true">用title</sp-button>
  <sp-modal
    class="components--main__sp-modal"
    v-model="visible5"
  >
    <div class="content">
      <p>我是modal的内容</p>
      <sp-button type="primary" @click="visible5 = false">确定</sp-button>
    </div>
  </sp-modal>
  <sp-button type="primary" @click="visible6 = true">用slot head</sp-button>
  <sp-modal 
    class="components--main__sp-modal"
    v-model="visible6"
  >
    <div slot="head">我是更灵活的head</div>
    <div class="content">
      <p>我是modal的内容</p>
      <sp-button type="primary" @click="visible6 = false">确定</sp-button>
    </div>
  </sp-modal>
</template>

<script>
export default{
  data() {
    return {
      visible5: false,
      visible6: false
    }
  },
}
</script>
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 控制 modal 的可见不可见 | boolean | — | false |
| width | 设置 modal 的宽度| string/number | — | 500 |
| title | 设置 modal 的标题文案（fullscreen模式不再需要） | string | — | '提示' |
| hasClose | 设置 modal 的close按钮是否显示 | boolean | — | true |
| unique | 设置 modal 是否为唯一展示 | boolean | — | false |
| priority | 设置 modal 的优先级，弹窗根据优先级只展示一个 | string/number | — | 0 |
| fullscreen | 全屏模式 | boolean | — | false |
| before-close | 关闭前的回调，会暂停 Modal 的关闭 | function(done)，done 用于关闭 Modal	 | — | — |
| max-body-height | 设置 modal 内容的最大高度，如：100px | string | — | '' |

### Slot
| name | 说明 |
|------|--------|
| — | modal 的内容 |
| head | modal 的顶部内容，默认是title文案 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close  | modal 关闭的回调 | — |
| show  | modal 打开的回调 | — |
| after-leave  | modal 消失动画结束的回调 | — |
| sp-modal--show | 自定义事件，modal出现时候全局触发，使用通过`window.addEventListener('sp-modal--show', xx)`来监听 | - |
| sp-modal--hide | 自定义事件，modal消失时候全局触发，使用通过`window.addEventListener('sp-modal--hide', xx)`来监听 | - |


<script>
export default{
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      visible8: false,
      visible9: false,
      visible10: false,
      visible11: false,
      visible12: false,
      validateForm1: {
        name: '',
        area: '',
        localBankCode: '',
        password: '',
        age: '',
        birth: '',
        favorite: '',
        cities: [],
        favoriteFruit: '',
        picture: [],
        files: [],
        agree: false
      },
      favouriteList: [
        { label: '唱歌', value: 'sing' },
        { label: '跳舞', value: 'dance' },
        { label: '篮球', value: 'basketball' },
        { label: '电影', value: 'movie' }
      ],
      citiesList: ['上海', '北京', '广州', '深圳'],
    }
  },
  created() {
    window.addEventListener('sp-modal--show', () => {
      console.log('sp-modal--show')
    })
    window.addEventListener('sp-modal--hide', () => {
      console.log('sp-modal--hide')
    })
  },
  methods: {
    showHandle() {
      console.log('show')
    },
    closeHandle() {
      console.log('close')
    },
    submitForm(formName) {
      this.$refs[formName].validate().then(() => {
        alert('submit!')
        console.log(this.validateForm1)
      }).catch(() => {
        console.log('error submit')
      })
    },
    handlePictureChange(list) {
      this.validateForm1.picture = list
    },
    handleFilesChange(allFiles) {
      this.validateForm1.files = allFiles
    },
    onExceed() {
      this.$sparta.error('最多上传3张图片')
    },
    handleShowTwoModal() {
      this.visible8 = true
      this.visible9 = true
      this.visible10 = true
      this.visible11 = true
    },
    beforeClose(done) {
      console.log('before-close')
      done()
    },
  }
}
</script>

<style>
  .components--main__sp-modal {
    .content {
      text-align: center;
      padding: 30px;
      .sp-button {
        margin-top: 20px
      }
    }
    h3 {
      line-height: 28px;
      font-size: 20px;
      font-weight: 600;
      padding-top: 23px;
    }
  }
</style>