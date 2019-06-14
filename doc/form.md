# Form 表单

### 基础用法
由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

:::demo form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 form-Item 的 prop 属性设置为需校验的字段名即可。校验规则参见`async-validator`
```vue
<template>
  <sp-form
    :model="validateForm1"
    ref="validateForm1"
    label-width="100px"
    class="sp-form-demo"
  >
    <!-- 姓名 -->
    <sp-form-item
      prop="name"
      label="姓名"
      :rules="[
        { required: true, message: '姓名不能为空'}
      ]"
    >
      <sp-input
        v-model="validateForm1.name"
        autocomplete="off"
      />
    </sp-form-item>
    <!-- 年龄 -->
    <sp-form-item
      label="年龄"
      prop="age"
      :rules="[
        { required: true, message: '年龄不能为空'},
        { type: 'number', message: '年龄必须为数字'}
      ]"
    >
      <sp-input
        v-model.number="validateForm1.age"
        autocomplete="off"
      />
    </sp-form-item>
    <!-- 爱好 -->
    <sp-form-item
      label="爱好"
      prop="favorite"
      :rules="[
        { required: true, message: '爱好不能为空'}
      ]"
    >
      <sp-select v-model="validateForm1.favorite">
        <sp-option
          v-for="item in favouriteList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </sp-select>
    </sp-form-item>
    <!-- 喜欢城市 -->
    <sp-form-item
      label="喜欢城市"
      prop="cities"
      :rules="[
        { required: true, message: '喜欢城市不能为空'}
      ]"
    >
      <sp-checkbox-group 
        v-model="validateForm1.cities"
        :max="2">
        <sp-checkbox
          v-for="city in citiesList"
          :label="city"
          :key="city"
        >{{city}}</sp-checkbox>
      </sp-checkbox-group>
    </sp-form-item>
    <!-- 按钮 -->
    <sp-form-item>
      <sp-button
        type="primary"
        @click="submitForm('validateForm1')"
      >提交</sp-button>
      <sp-button @click="resetForm('validateForm1')">重置</sp-button>
    </sp-form-item>
  </sp-form>
</template>

<script>
  export default {
    data() {
      return {
        validateForm1: {
          name: '',
          age: '',
          favorite: '',
          cities: []
        },
        favouriteList: [
          { label: '唱歌', value: 'sing' },
          { label: '跳舞', value: 'dance' },
          { label: '篮球', value: 'basketball' },
          { label: '电影', value: 'movie' }
        ],
        citiesList: ['上海', '北京', '广州', '深圳']
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
```
:::

### rules统一传入方式
在`基础用法`的里面，我们使用了在每个`form-item`里加`rules`的方式来指定规则。
为了方便，其实可以通过在`form`处定义`rules`的方式来统一处理。

:::demo form 在`form`处统一定义rules的方式
```vue
<template>
  <sp-form
    :model="validateForm2"
    ref="validateForm2"
    label-width="100px"
    class="sp-form-demo"
    :rules="rules2"
  >
    <!-- 姓名 -->
    <sp-form-item
      label="姓名"
      prop="name"
    >
      <sp-input
        v-model="validateForm2.name"
        autocomplete="off"
      />
    </sp-form-item>
    <!-- 年龄 -->
    <sp-form-item
      label="年龄"
      prop="age"
    >
      <sp-input
        v-model.number="validateForm2.age"
        autocomplete="off"
      />
    </sp-form-item>
    <!-- 按钮 -->
    <sp-form-item>
      <sp-button
        type="primary"
        @click="submitForm('validateForm2')"
      >提交</sp-button>
      <sp-button @click="resetForm('validateForm2')">重置</sp-button>
    </sp-form-item>
  </sp-form>
</template>

<script>
  export default {
    data() {
      return {
        validateForm2: {
          favorite: '',
          cities: []
        }
      }
    }
  }
</script>
```
:::

### 校验触发方式
指定校验的方式，用`trigger`指定即可，`trigger`只有`blur`或`change`两种方式，默认是`blur`加`change`。

:::demo 在`rules`中使用`trigger`来指定触发的方式
```vue
<template>
  <sp-form
    :model="validateForm3"
    ref="validateForm3"
    label-width="100px"
    class="sp-form-demo"
    :rules="rules3"
  >
    <!-- 姓名 -->
    <sp-form-item
      label="姓名"
      prop="name"
    >
      <sp-input
        v-model="validateForm3.name"
        autocomplete="off"
      />
    </sp-form-item>
    <!-- 年龄 -->
    <sp-form-item
      label="年龄"
      prop="age"
    >
      <sp-input
        v-model.number="validateForm3.age"
        autocomplete="off"
      />
    </sp-form-item>
    <!-- 按钮 -->
    <sp-form-item>
      <sp-button
        type="primary"
        @click="submitForm('validateForm3')"
      >提交</sp-button>
      <sp-button @click="resetForm('validateForm3')">重置</sp-button>
    </sp-form-item>
  </sp-form>
</template>

<script>
  export default {
    data() {
      return {
        validateForm3: {
          name: '',
          age: ''
        },
        rules3: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'change'},
            { max: 5, message: '长度最长5个字符', trigger: 'change'}
          ],
          age: [
            { required: true, message: '年龄不能为空', trigger: 'blur'},
            { type: 'number', message: '年龄必须为数字', trigger: 'blur'}
          ],
        }
      }
    }
  }
</script>
```
:::

### label两行样式
在`form-item`中指定`two-line`为`true`，然后再`slot`为`label`的template中自定义两行的内容。
另外，因为自定义元素的特殊性，两行样式时候，仅仅在`rules`指定`require`想显示`*`号是不够的，需要在你自己想要显示`*`的元素加`require`属性。

:::demo 通过`two-line`的添加
```vue
<template>
  <sp-form
    label-width="150px"
    class="sp-form-demo"
  >
    <!-- 姓名 -->
    <sp-form-item two-line>
      <template slot="label">
        <div require>银行所在地</div>
        <div>Bank Location</div>
      </template>
      <sp-input />
    </sp-form-item>
    <!-- 年龄 -->
    <sp-form-item two-line>
      <template slot="label">
        <div require>账户类型</div>
        <div>Account Type</div>
      </template>
      <sp-input />
    </sp-form-item>
  </sp-form>
</template>
```
:::

### label自定义内容
在上面的 **label两行样式** 中，其实已经可以看到，通过`slot`可以自定义label的内容。

:::demo `slot`为`label`的template中自定义的内容
```vue
<template>
  <sp-form
    label-width="150px"
    class="sp-form-demo"
  >
    <!-- 姓名 -->
    <sp-form-item>
      <template slot="label">
        <div>
          雷火
          <i class="sp-icon-question"></i>
        </div>
      </template>
      <sp-input />
    </sp-form-item>
    <!-- 年龄 -->
    <sp-form-item>
      <template slot="label">
        <div>
          伏羲
          <i class="sp-icon-info"></i>
        </div>
      </template>
      <sp-input />
    </sp-form-item>
  </sp-form>
</template>
```
:::

### Form Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| label-width | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| status-icon  | 是否在输入框中显示校验结果反馈图标 | boolean | — | false |
| validate-on-rule-change  | 是否在 `rules` 属性改变后立即触发一次验证 | boolean | — | true |

### Form Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —

### Form Events
| 事件名称 | 说明    | 回调参数  |
|--------- |-------- |---------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

### Form-Item Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px' | string |       —       | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | — | false |
| rules    | 表单验证规则 | object | — | — |
| error    | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |

### Form-Item Slot
| name | 说明 |
|------|--------|
| — | Form Item 的内容 |
| label | 标签文本的内容 |

<script>
  export default {
    data() {
      return {
        validateForm1: {
          name: '',
          age: '',
          favorite: '',
          cities: []
        },
        favouriteList: [
          { label: '唱歌', value: 'sing' },
          { label: '跳舞', value: 'dance' },
          { label: '篮球', value: 'basketball' },
          { label: '电影', value: 'movie' }
        ],
        citiesList: ['上海', '北京', '广州', '深圳'],
        validateForm2: {
          name: '',
          age: '',
          favorite: '',
          cities: []
        },
        rules2: {
          name: [
            { required: true, message: '姓名不能为空'},
            { max: 5, message: '长度最长5个字符'}
          ],
          age: [
            { required: true, message: '年龄不能为空'}
          ],
        },
        validateForm3: {
          name: '',
          age: '',
          favorite: '',
          cities: []
        },
        rules3: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'change'},
            { max: 5, message: '长度最长5个字符', trigger: 'change'}
          ],
          age: [
            { required: true, message: '年龄不能为空', trigger: 'blur'},
            { type: 'number', message: '年龄必须为数字', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style>
.components--main {
  .sp-form-demo {
    width: 500px
  }
}
</style>