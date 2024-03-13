# Form 表单

### 基础用法
由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

:::demo form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 form-Item 的 prop 属性设置为需校验的字段名即可。校验规则参见`async-validator`
```vue
<template>
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
      label-tip-width="150px"
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
      <div slot="tip">输入你的名字吧，靓仔!</div>
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
    <!-- 支付密码 -->
    <sp-form-item
      prop="password"
      label="支付密码"
      :rules="[
        { required: true, message: '支付密码不能为空'}
      ]"
    >
      <sp-password-input
        v-model="validateForm1.password"
      ></sp-password-input>
      <div slot="tip">输入你的支付密码!</div>
    </sp-form-item>
    <!-- 怪兽 -->
    <sp-form-item
      label="拥有的怪兽"
      :rules="[
        { required: true, message: '支付密码不能为空'}
      ]"
    >
      <sp-form-item
        prop="monsterFeed"
        :rules="[
          { required: true, message: '请选择怪兽种类'}
        ]"
      >
        <sp-select v-model="validateForm1.monsterFeed">
          <sp-option label="水系" value="water"></sp-option>
          <sp-option label="火系" value="fire"/></sp-option>
          <sp-option label="冰系" value="ice"/></sp-option>
        </sp-select>
      </sp-form-item>
      <sp-form-item
        prop="monsterName"
        :rules="[
          { required: true, message: '请输入怪兽名字'}
        ]"
      >
        <sp-input v-model="validateForm1.monsterName" placeholder="请输入怪兽名字" />
      </sp-form-item>
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
        placeholder="请输入"
        autocomplete="off"
      />
    </sp-form-item>
    <!-- 出生日期 -->
    <sp-form-item
      label="出生日期"
      prop="birth"
      :rules="[
        { required: true, message: '出生日期不能为空'}
      ]"
    >
      <sp-date-picker 
        v-model="validateForm1.birth" 
        clearable
        />
    </sp-form-item>
     <!-- 时间区间 -->
    <sp-form-item
      prop="timeSelectList"
      label="时间区间"
      label-tip-width="150px"
      :rules="[
        { required: true, message: '时间区间不能为空'}
      ]"
    >
    <sp-time-select 
      type="range" 
      v-model="validateForm1.timeSelectList" 
      clearable></sp-time-select>
      <div slot="tip">输入时间区间吧，靓仔!</div>
    </sp-form-item>
    <!-- 时间 -->
     <sp-form-item
      prop="timeSelect"
      label="时间"
      label-tip-width="150px"
      :rules="[
        { required: true, message: '时间不能为空'}
      ]"
    >
      <sp-time-select
        v-model="validateForm1.timeSelect"
        clearable
      ></sp-time-select>
      <div slot="tip">输入时间吧，靓仔!</div>
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
      <div slot="tip">最多选两个</div>
    </sp-form-item>
    <!-- 喜欢的运功 -->
    <sp-form-item
      label="喜欢的运功"
      prop="sports"
      :rules="[
        { required: true, message: '喜欢的运功不能为空'}
      ]"
    >
      <sp-select
        v-model="validateForm1.sports"
        group-multiple
      >
        <sp-option-group
          v-for="(item, index) in sportsOptions"
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
          <sp-option
            :label="`王多鱼${ index }`"
            :value="`X${ index }`"
          >
            王多鱼
            <p style="font-size: 12px;color:#747d8c">我是小tip</p>
          </sp-option>
        </sp-option-group>
      </sp-select>
    </sp-form-item>
    <!-- 性别 -->
    <sp-form-item
      label="最喜欢的水果"
      prop="favoriteFruit"
      :rules="[
        { required: true, message: '性别不能为空'}
      ]"
    >
      <sp-radio-group v-model="validateForm1.favoriteFruit">
        <sp-radio label="apple">苹果</sp-radio>
        <sp-radio label="banana">香蕉</sp-radio>
        <sp-radio label="pear">梨</sp-radio>
      </sp-radio-group>
    </sp-form-item>
    <!-- 靓照 -->
    <sp-form-item
      label="靓照"
      prop="picture"
      for-upload
      :rules="[
        { required: true, message: '靓照不能为空'}
      ]"
    >
      <sp-upload
        :files="validateForm1.picture"
        action="/api/upload"
        type="picture"
        example-image="https://i.epay.126.net/a/ge/static/img/ex_supplier.5f209565.png"
        example-big-image="https://i.epay.126.net/a/ge/static/img/eg_vat_big.932d392b.png"
        @change="handlePictureChange"
        :limit="1"
      >
        <div slot="desc">上传文件说明，可多行（sp-upload不再推荐，推荐使用sp-upload-pro）</div>
      </sp-upload>
    </sp-form-item>
    <!-- 多文件上传 -->
    <sp-form-item
      prop="files"
      for-upload
      :rules="[
        { required: true, message: '认证文件不能为空'}
      ]"
    >
      <template slot="label">认证文件</template>
      <template slot="labelSecondLine">form-item必须加for-upload</template>
      <sp-upload
        :files="validateForm1.files"
        ref="filesUploader"
        action="/api/upload"
        example-image="https://i.epay.126.net/a/ge/static/img/ex_supplier.5f209565.png"
        example-big-image="https://i.epay.126.net/a/ge/static/img/eg_vat_big.932d392b.png"
        @change="handleFilesChange"
        multiple
      >
        多文件上传
        <div slot="desc">上传文件说明，可多行（sp-upload不再推荐，推荐使用sp-upload-pro）</div>
        <div slot="tip">注意：最终提交，upload组件需要自行调用getSuccessUploadFiles方法拿到只上传成功的文件</div>
      </sp-upload>
      <div slot="error" slot-scope="scope">{{ scope.error }}<a style="color: #1977ea">（by hello kitty）</a></div>
    </sp-form-item>
    <!-- 作品 -->
    <sp-form-item
      label="作品"
      prop="card"
      :rules="[
        { required: true, message: '作品不能为空'}
      ]"
    >
      <sp-upload-pro
        v-model="validateForm1.card"
        action="/api/upload"
        value-type="stringArray"
        type="card"
        example-image="https://i.epay.126.net/a/ge/static/img/ex_supplier.5f209565.png"
        example-big-image="https://i.epay.126.net/a/ge/static/img/eg_vat_big.932d392b.png"
        :limit="1"
      >
        <div slot="desc">上传推荐使用</div>
      </sp-upload-pro>
    </sp-form-item>
    <sp-form-item label="备注" prop="note">
      <sp-input
        v-model="validateForm1.note"
        type="textarea"
        :autosize="{ minRows: 5 }"
        placeholder="请输入内容"
      />
    </sp-form-item>
    <sp-form-item 
      label="地区" 
      prop="area"
      :rules="[
        { required: true, message: '地区不能为空'}
      ]"
    >
     <sp-cascader
      v-model="validateForm1.area"
      :options="areaOptions"
     />
    </sp-form-item>
    <!-- 按钮 -->
    <sp-form-submit-btns>
      <sp-form-item
        prop="agree"
        :rules="[{
          validator: () => { return validateForm1.agree },
          message: '请阅读用户服务协议'
        }]"
      >
        <sp-checkbox v-model="validateForm1.agree">
          <span>我已阅读并同意</span>
          <a>《网易跨境付款服务补充协议》</a>
        </sp-checkbox>
        <sp-button
          type="primary"
          @click="submitForm('validateForm1')"
        >提交</sp-button>
        <sp-button plain @click="handleResetForm1">重置</sp-button>
        <sp-button
          type="primary"
          @click="validateFormPart('validateForm1')"
        >部分提交</sp-button>
      </sp-form-item>
    </sp-form-submit-btns>
  </sp-form>
</template>

<script>
  export default {
    data() {
      return {
        validateForm1: {
          timeSelect: '',
          timeSelectList: [],
          name: '',
          localBankCode: '',
          password: '',
          age: '',
          birth: '',
          favorite: '',
          sports: [],
          cities: [],
          favoriteFruit: '',
          picture: [],
          files: [],
          card: [],
          area: [],
          note: '',
          agree: false,
          monsterFeed: '',
          monsterName: '',
        },
        favouriteList: [
          { label: '唱歌', value: 'sing' },
          { label: '跳舞', value: 'dance' },
          { label: '篮球', value: 'basketball' },
          { label: '电影', value: 'movie' }
        ],
        sportsOptions: [
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
        citiesList: ['上海', '北京', '广州', '深圳'],
        areaOptions: [{
          value: 1,
          label: '东南',
          children: [{
            value: 2,
            label: '上海',
            children: [
              { value: 3, label: '普陀' },
              { value: 4, label: '黄埔' },
              { value: 5, label: '徐汇' }
            ]
          }, {
            value: 7,
            label: '江苏',
            children: [
              { value: 8, label: '南京' },
              { value: 9, label: '苏州' },
              { value: 10, label: '无锡' }
            ]
          }, {
            value: 12,
            label: '浙江',
            children: [
              { value: 13, label: '杭州' },
              { value: 14, label: '宁波' },
              { value: 15, label: '嘉兴' }
            ]
          }]
        }, {
          value: 17,
          label: '西北',
          children: [{
            value: 18,
            label: '陕西',
            children: [
              { value: 19, label: '西安' },
              { value: 20, label: '延安' }
            ]
          }, {
            value: 21,
            label: '新疆维吾尔族自治区',
            children: [
              { value: 22, label: '乌鲁木齐' },
              { value: 23, label: '克拉玛依' }
            ]
          }]
        }]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate().then(() => {
          alert('submit!')
          console.log(this.validateForm1)
        }).catch(() => {
          console.log('error submit', this.$refs[formName].getFirstErrorText())
        })
        // 或者写成
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!')
        //     console.log(this.validateForm1)
        //   } else {
        //     console.log('error submit')
        //   }
        // })
      },
      validateFormPart(formName) {
        this.$refs[formName].validate(null, ['name', 'password']).then(() => {
          alert('submit!')
          console.log(this.validateForm1)
        }).catch(() => {
          console.log('error submit', this.$refs[formName].getFirstErrorText())
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handlePictureChange(list) {
        this.validateForm1.picture = list
      },
      handleResetForm1() {
        this.resetForm('validateForm1')
        console.log(this.validateForm1)
      },
      handleFilesChange(allFiles) {
        this.validateForm1.files = allFiles
      },
      onExceed() {
        this.$sparta.error('最多上传3张图片')
      },
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
      <sp-button plain @click="resetForm('validateForm2')">重置</sp-button>
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
        },
        rules2: {
          name: [
            { required: true, message: '姓名不能为空'},
            { max: 5, message: '长度最长5个字符'}
          ],
          age: [
            { required: true, message: '年龄不能为空'}
          ],
        }
      }
    }
  }
</script>
```
:::

### 提交后后端接口校验错误
虽然我们前端有一些校验了，但是，有时候，有些字段还是依赖后端接口的，这个时候我们需要在对应的`item`下显示后端的错误

:::demo 只需要在接口错误的时候，调用`showErrors`方法，然后将错误信息作为参数即可
```vue
<template>
  <sp-form
    :model="validateFormRemote"
    ref="validateFormRemote"
    label-width="100px"
    class="sp-form-demo"
    :rules="rules2"
  >
    <!-- 姓名 -->
    <sp-form-item label="姓名" prop="name">
      <sp-input
        v-model="validateFormRemote.name"
        autocomplete="off"
      />
    </sp-form-item>
    <!-- 年龄 -->
    <sp-form-item label="年龄" prop="age">
      <sp-input
        v-model.number="validateFormRemote.age"
        autocomplete="off"
      />
    </sp-form-item>
    <!-- 按钮 -->
    <sp-form-item>
      <sp-button
        type="primary"
        @click="submitFormRemote"
      >提交</sp-button>
      <sp-button plain @click="resetForm('validateFormRemote')">重置</sp-button>
    </sp-form-item>
  </sp-form>
</template>

<script>
  export default {
    data() {
      return {
        validateFormRemote: {
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
        }
      }
    },
    methods: {
      submitFormRemote() {
        const validateFormRemote = this.$refs['validateFormRemote']
        validateFormRemote.validate().then(() => {
          this.$ajax.post('/api/submitError').then(() => {
            alert('submit!')
          }).catch((err) => {
            validateFormRemote.showErrors(err.errors)
          })
        }).catch(() => {
          console.log('error submit', validateFormRemote.getFirstErrorText())
        })
      },
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
      <sp-button plain @click="resetForm('validateForm3')">重置</sp-button>
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

### label单行自定义样式
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
        雷火<a style="color: #1977ea" href="">牛啊</a>
      </template>
      <sp-input />
    </sp-form-item>
    <!-- 年龄 -->
    <sp-form-item>
      <template slot="label">
        伏羲<a style="color: #1977ea" href="">牛啊</a>
      </template>
      <sp-input />
    </sp-form-item>
  </sp-form>
</template>
```
:::

### label两行自定义样式
在`slot`为`labelSecondLine`的template中自定义第两行的内容。

:::demo 通过`labelSecondLine`slot的添加
```vue
<template>
  <sp-form
    label-width="150px"
    class="sp-form-demo"
  >
    <sp-form-item
      :rules="[
        { required: true, message: '银行所在地'}
      ]"
    >
      <template slot="label">银行所在地</template>
      <template slot="labelSecondLine">Bank Location</template>
      <sp-input placeholder="银行所在地" />
    </sp-form-item>
    <sp-form-item>
      <template slot="label">账户类型</template>
      <template slot="labelSecondLine">
        <a style="color: #1977ea" href="">Account Type</a>
      </template>
      <div slot="labelTip">靓仔，有什么疑问吗？</div>
      <sp-input placeholder="账户类型" />
    </sp-form-item>
  </sp-form>
</template>
```
:::

### Form Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 具体的规则文档见：https://github.com/yiminghe/async-validator | object | — | — |
| label-width | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| status-icon  | 是否在输入框中显示校验结果反馈图标 | boolean | — | false |
| validate-on-rule-change  | 是否在 `rules` 属性改变后立即触发一次验证 | boolean | — | true |
| validate-fail-tip | 当有错误信息的时候，是否提示错误信息 | boolean | — | true |
| scroll-when-error | 当有错误信息的时候，是否滚动定位到对应位置 | boolean | — | false |
| scroll-offset-top | 如果有scroll-offset-top，说明默认的scrollIntoView滚动方式不满足需求，比如网易跨境顶部有个fixed的head，需要额外滚动一定距离 | number/string | — | 0 |

### Form Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入2个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise；validate的第二个参数为支持部分字段校验，不传则为全部字段校验 | Function(callback: Function(boolean, object), partFields)
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果果 | Function(props: array | string)
| getFirstErrorText | 获取第一个报错元素的错误文案 | —
| showErrors | 获取第一个报错元素的错误文案 | Function(errors: object)

### Form Events
| 事件名称 | 说明    | 回调参数  |
|--------- |-------- |---------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |
| enter | 用户在表单内按回车触发 | - |

### Form-Item Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px' | string |       —       | — |
| label-tip-width | 标签文本悬浮提示的宽度 | string/number | — | 230 |
| for-upload | 如果form-item中校验对象是upload的话，就必须加该标签，否则文件上传失败也认为通过 | boolean | — | false |
| required | 是否必填，如不设置，则会根据校验规则自动生成（暂时，需要特别样式，所以可忽略） | boolean | — | false |
| rules    | 表单验证规则 具体的规则文档见：https://github.com/yiminghe/async-validator | object | — | — |
| error    | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |

### Form-Item Slot
| name | 说明 |
|------|--------|
| — | Form Item 的内容 |
| label | 标签文本的内容 |
| labelSecondLine | 第两行标签文本的内容 |
| labelTip | 标签文本后的悬浮提示内容 |
| tip | 提示文本的内容 |

<script>
  export default {
    data() {
      return {
        validateForm1: {
          timeSelect: '',
          timeSelectList: [],
          name: '',
          localBankCode: '',
          password: '',
          age: '',
          birth: '',
          favorite: '',
          sports: [],
          cities: [],
          favoriteFruit: '',
          picture: [],
          files: [],
          card: [],
          area: [],
          note: '',
          agree: false,
          monsterFeed: '',
          monsterName: '',
        },
        favouriteList: [
          { label: '唱歌', value: 'sing' },
          { label: '跳舞', value: 'dance' },
          { label: '篮球', value: 'basketball' },
          { label: '电影', value: 'movie' }
        ],
        sportsOptions: [
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
        validateFormRemote: {
          favorite: '',
          cities: []
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
        },
        areaOptions: [{
          value: 1,
          label: '东南',
          children: [{
            value: 2,
            label: '上海',
            children: [
              { value: 3, label: '普陀' },
              { value: 4, label: '黄埔' },
              { value: 5, label: '徐汇' }
            ]
          }, {
            value: 7,
            label: '江苏',
            children: [
              { value: 8, label: '南京' },
              { value: 9, label: '苏州' },
              { value: 10, label: '无锡' }
            ]
          }, {
            value: 12,
            label: '浙江',
            children: [
              { value: 13, label: '杭州' },
              { value: 14, label: '宁波' },
              { value: 15, label: '嘉兴' }
            ]
          }]
        }, {
          value: 17,
          label: '西北',
          children: [{
            value: 18,
            label: '陕西',
            children: [
              { value: 19, label: '西安' },
              { value: 20, label: '延安' }
            ]
          }, {
            value: 21,
            label: '新疆维吾尔族自治区',
            children: [
              { value: 22, label: '乌鲁木齐' },
              { value: 23, label: '克拉玛依' }
            ]
          }]
        }]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate().then(() => {
          alert('submit!')
          console.log(this.validateForm1)
        }).catch(() => {
          console.log('error submit', this.$refs[formName].getFirstErrorText())
        })
      },
      submitFormRemote() {
        const validateFormRemote = this.$refs['validateFormRemote']
        validateFormRemote.validate().then(() => {
          this.$ajax.post('/api/submitError').then(() => {
            alert('submit!')
          }).catch((err) => {
            validateFormRemote.showErrors(err.errors)
          })
        }).catch(() => {
          console.log('error submit', validateFormRemote.getFirstErrorText())
        })
      },
      validateFormPart(formName) {
        this.$refs[formName].validate(null, ['name', 'password']).then(() => {
          alert('submit!')
          console.log(this.validateForm1)
        }).catch(() => {
          console.log('error submit', this.$refs[formName].getFirstErrorText())
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handlePictureChange(list) {
        this.validateForm1.picture = list
      },
      handleResetForm1() {
        this.resetForm('validateForm1')
        console.log(this.validateForm1)
      },
      handleFilesChange(allFiles) {
        this.validateForm1.files = allFiles
      },
      onExceed() {
        this.$sparta.error('最多上传3张图片')
      },
    }
  }
</script>
