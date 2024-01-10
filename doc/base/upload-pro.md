# UploadPro 上传

文件选择上传和图片选择上传控件。

### 注意
当页面需要IE9的时候，后端返回的数据格式必须为text/plain或text/html，因为底层是iframe实现的，multipart/form-data无法注入。

### 基本用法（绑定值为string）
用于只有一个文件上传的情况。
上传完后格式，如：'https://xxx.com/a.png'

:::demo `action`为必填的字段，为上传的地址；由于服务器不一定按照组件预先定义的格式返回数据，所以需要借助`processResult`处理；每次上传成功/删除后，都会触发`change`，可在此事件回调中获取最终的值；默认情况，`value-type`为`string`，这个时候`limit`为`1`，即只允许上传1个文件。
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload-pro
      v-model="file1"
      action="/api/upload"
      :process-result="processResult"
      @change="handleChange"
    ></sp-upload-pro>
  </div>
</template>

<script>
export default{
  data() {
    return {
      file1: ''
    }
  }
  watch: {
    file1(val) {
      console.log('watch value：', val)
    }
  },
  methods: {
    handleChange(list) {
      console.log('change：', list)
    },
    processResult(item) {
      return item.result.fileUrl
    }
  }
}
</script>
```
:::

### 基本用法（绑定值为stringArray）
用于多个文件上传。
上传完后格式，如：['https://xxx.com/a.png', 'https://xxx.com/b.png', 'https://xxx.com/c.png']

:::demo `value-type`为`stringArray`，那对于`v-model`绑定值默认必须是数组。
```vue
<template>
  <div class="sp-upload-demo">
    <sp-button
      @click="file2 = ['https://xxx.com/a.png', 'https://xxx.com/b.png', 'https://xxx.com/c.png']"
    >add data</sp-button>
    <sp-button
      @click="file2 = []"
    >clear data</sp-button>
    <sp-upload-pro
      v-model="file2"
      value-type="stringArray"
      action="/api/upload"
      :process-result="processResult"
      @change="handleChange"
    ></sp-upload-pro>
  </div>
</template>

<script>
export default{
  data() {
    return {
      file2: []
    }
  }
  methods: {
    handleChange(list) {
      console.log('change：', list)
    },
    processResult(item) {
      return item.result.fileUrl
    }
  }
}
</script>
```
:::

### 基本用法（绑定值为objectArray）
用于多个文件上传。
上传完后格式，如：
[{ name: 'a.png', url: 'https://xxx.com/a.png' }
{ name: 'b.png', url: 'https://xxx.com/b.png' }
{ name: 'c.png', url: 'https://xxx.com/c.png' }]

:::demo `value-type`为`objectArray`，那对于`v-model`绑定值默认必须是数组。选择多个文件上传加`multiple`字段即可
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload-pro
      v-model="file3"
      multiple
      value-type="objectArray"
      action="/api/upload"
      :process-result="processResult"
      @change="handleChange"
    ></sp-upload-pro>
  </div>
</template>

<script>
export default{
  data() {
    return {
      file3: []
    }
  }
  methods: {
    handleChange(list) {
      console.log('change：', list)
    },
    processResult(item) {
      return item.result.fileUrl
    }
  }
}
</script>
```
:::

### 示例图

:::demo `example-image`为缩略图url，`example-big-image`为点击缩略图后的大图url
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload-pro
      v-model="file4"
      value-type="objectArray"
      action="/api/upload"
      example-image="https://i.epay.126.net/a/ge/static/img/ex_supplier.5f209565.png"
      example-big-image="https://i.epay.126.net/a/ge/static/img/eg_vat_big.932d392b.png"
      @change="handleChange"
      multiple
    >
      多文件上传
    </sp-upload-pro>
  </div>
</template>

<script>
export default{
  data() {
    return {
      file4: [{fileName: 'food.jpg', fileUrl: 'https://cn.vuejs.org/images/logo.png'}]
    }
  }
  methods: {
    handleChange(list) {
      console.log('change：', list)
    },
  }
}
</script>
```
:::

### 文件上传 - 自定义http参数格式
文件上传时，需要定义文件字段的参数名字，好给后端解析。可通过 `name` 设置，默认为 `myFile` ；
如果，http请求中需要额外自定义参数，则需要通过 `data` 设置。
另外，还可以设置 `withCredentials`。

:::demo 使用`data`和`name`控制http request params
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload-pro
      v-model="file5"
      value-type="objectArray"
      action="/api/upload"
      :data="data3"
      name="file"
      withCredentials
      @change="handleChange"
    >
      上传文件
    </sp-upload-pro>
  </div>
</template>

<script>
export default{
  data() {
    return {
      file5: [],
      data3: {
        name: 'kitty',
        age: 7
      }
    }
  }
  methods: {
    handleChange(list) {
      console.log('change：', list)
    },
    processResult(item) {
      return item.result.fileUrl
    }
  }
}
</script>
```
:::

### 卡片风格
和之前的相比，其实只有样式的展示不同，多用于纯图片或只上传一个文件场景。

:::demo 设置 `type` 为 `card`即可
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload-pro
      v-model="file6"
      value-type="objectArray"
      type="card"
      action="/api/upload"
      :process-result="processResult"
      @change="handleChange"
    >
      添加图片
    </sp-upload-pro>
  </div>
</template>

<script>
export default{
  data() {
    return {
      file6: []
    }
  }
  methods: {
    handleChange(list) {
      console.log('change：', list)
    },
    processResult(item) {
      return item.result.fileUrl
    }
  }
}
</script>
```
:::

### 文件数量限制

:::demo 使用`limit`控制，`onExceed`为超过限制的回调。
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload-pro
      v-model="file7"
      value-type="objectArray"
      action="/api/upload"
      :limit="3"
      multiple
      :process-result="processResult"
      @change="handleChange"
    ></sp-upload-pro>
    <div style="margin-top: 10px;"></div>
    <sp-upload-pro
      v-model="file8"
      value-type="objectArray"
      type="card"
      action="/api/upload"
      multiple
      :process-result="processResult"
      example-image="https://i.epay.126.net/a/ge/static/img/ex_supplier.5f209565.png"
      example-big-image="https://i.epay.126.net/a/ge/static/img/eg_vat_big.932d392b.png"
      :onExceed="onExceed"
      @change="handleChange"
    >添加图片</sp-upload-pro>
  </div>
</template>

<script>
export default{
  data() {
    return {
      file7: [],
      file8: []
    }
  }
  methods: {
    handleChange(list) {
      console.log('change：', list)
    },
    processResult(item) {
      return item.result.fileUrl
    },
    onExceed() {
      console.log('exceed')
    },
  }
}
</script>
```
:::

### 文件大小限制

:::demo 使用`maxSize`控制，`onOversize`为超过限制的回调。
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload-pro
      v-model="file15"
      value-type="objectArray"
      type="card"
      :max-size="500 * 1024"
      action="/api/upload"
      multiple
      :process-result="processResult"
      :on-oversize="onOversize"
      @change="handleChange"
    >添加图片</sp-upload-pro>
  </div>
</template>

<script>
export default{
  data() {
    return {
      file15: []
    }
  }
  methods: {
    handleChange(list) {
      console.log('change：', list)
    },
    processResult(item) {
      return item.result.fileUrl
    },
    onOversize() {
      console.log('oversize')
    },
  }
}
</script>
```
:::

### 文件数量限制，限制数量只有1的特殊场景

:::demo 使用`limit`控制，`onExceed`为超过限制的回调。
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload-pro
      v-model="file9"
      type="card"
      action="/api/upload"
      :process-result="processResult"
      :limit="1"
      example-image="https://i.epay.126.net/a/ge/static/img/ex_supplier.5f209565.png"
      example-big-image="https://i.epay.126.net/a/ge/static/img/eg_vat_big.932d392b.png"
      :onExceed="onExceed1"
      @change="handleChange"
    >添加图片</sp-upload-pro>
  </div>
</template>

<script>
export default{
  data() {
    return {
      file9: ''
    }
  }
  methods: {
    handleChange(list) {
      console.log('change：', list)
    },
    processResult(item) {
      return item.result.fileUrl
    },
    onExceed1() {
      this.$sparta.error('最多上传1张图片')
    },
  }
}
</script>
```
:::

### 文件类型限制

:::demo 使用`accept`控制。
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload-pro
      v-model="file10"
      type="card"
      action="/api/upload"
      :process-result="processResult"
      :onExceed="onExceed"
      @change="handleChange"
      accept="image/*"
    >
      添加图片
    </sp-upload-pro>
  </div>
</template>
```
:::

### 文件上传后response校验
在业务中，往往会根据后端给的response，进行状态码的判断，来觉定这个上传事务是否成功，如果失败，就应该触发onError的事件和行为。

:::demo `responseValidate`为函数，入参为服务端返回的数据，通过return的pass值来觉得是否真的上传成功，如果失败，还需要多返回一个errMsg作为报错文案；
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload-pro
      v-model="file11"
      action="/api/upload/error"
      :response-validate="responseValidate"
    ></sp-upload-pro>
  </div>
</template>

<script>
export default{
  data() {
    return {
      file11: ''
    }
  },
  methods: {
    responseValidate(response) {
      return {
        pass: response.status == 200,
        errMsg: response.message
      }
    }
  }
}
</script>
```
:::

### card类型文件过多换行
需要显示声明`one-line-count`控制图片上下间距

:::demo 使用`one-line-count`指定一行最多能放下的图片个数。
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload-pro
      v-model="file14"
      type="card"
      value-type="objectArray"
      multiple
      :limit="6"
      one-line-count="3"
      action="/api/upload"
    >
      添加图片
    </sp-upload-pro>
  </div>
</template>
```
:::

### 禁用

:::demo 使用`disabled`即可。
```vue
<template>
  <div class="sp-upload-demo is-disabled">
    <sp-upload-pro
      v-model="file12"
      action="/api/upload"
      disabled
    >
      添加文件
    </sp-upload-pro>
    <sp-upload-pro
      v-model="file13"
      type="card"
      action="/api/upload"
      disabled
    >
      添加图片
    </sp-upload-pro>
  </div>
</template>
```
:::


### Attribute
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 绑定值（初始值必须和value-type类型对应） | string/array | — | '' |
| value-type | 绑定值的具体类型 | string | 'string'/'stringArray'/'objectArray' | 'string' |
| example-image | 示例图 | string | — | — |
| example-big-image | 示例图点击后放大的大图 | string | — | — |
| action | 必选参数，上传的地址 | string | — | — |
| headers | 设置上传的请求头部 | object | — | — |
| multiple | 是否支持多选文件 | boolean | — | — |
| limit | 最大允许上传个数 |  number/string | — | — |
| max-size | 最大允许上传的文件大小 |  number/string | — | 1024 * 1024 * 10 |
| one-line-count | 当`card`类型的文件上传很多导致换行，会发现图片上下没有间距，因此需要通过此属性指定一行最多显示几个文件 |  string/number | — | — |
| data | 上传时附带的额外参数 | object | — | — |
| name | 上传的文件字段名 | string | — | file |
| with-credentials | 支持发送 cookie 凭证信息 | boolean | — | false |
| accept | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效）| string | — | — |
| process-result | 处理上传接口的返回结果 | function(response) | — | item => item.result.fileUrl |
| on-error | 文件上传失败时的钩子 | function(err, file, fileList) | — | — |
| on-progress | 文件上传时的钩子 | function(event, file, fileList) | — | — |
| on-change | 文件状态改变时的钩子，上传成功和删除文件时都会被调用 | function(file, fileList) | — | — |
| before-upload | 上传文件之前的钩子，参数为上传的文件，若返回false则停止上传 | function(file) | — | — |
| before-remove | 删除文件之前的钩子，参数为上传的文件，若返回false则停止删除。| function(file, fileList) | — | — |
| type | 文件列表的类型 | string | text/card| text |
| disabled | 是否禁用 | boolean | — | false |
| on-exceed | 文件超出个数限制时的钩子 | function(files, fileList) | — | - |
| response-validate | 入参为服务端返回的数据，通过return的pass值来觉得是否真的上传成功，如果失败，还需要多返回一个errMsg作为报错文案 | function(response) | — | response => { return { pass: response.status == 200, errMsg: response.message }} |

### Slot
| name | 说明 |
|------|--------|
| default | 文件选择框的内容 |
| desc | 顶部描述说明文字 |

<script>
export default{
  data() {
    return {
      file1: '',
      file2: [],
      file3: [],
      file4: [{fileName: 'food.jpg', fileUrl: 'https://cn.vuejs.org/images/logo.png'}],
      file5: [],
      file6: [],
      file7: [],
      file8: [],
      file9: '',
      file10: '',
      file11: '',
      file12: '',
      file13: '',
      file14: [],
      file15: [],
      data3: {
        name: 'kitty',
        age: 7
      }
    }
  },
  watch: {
    file1(val) {
      console.log('watch value：', val)
    },
  },
  methods: {
    handleChange(list) {
      console.log('change：', list)
    },
    processResult(item) {
      return item.result.fileUrl
    },
    thumbProcess(url) {
      return url + '?w=200'
    },
    onExceed() {
      console.log('exceed')
    },
    onExceed1() {
      this.$sparta.error('最多上传1张图片')
    },
    responseValidate(response) {
      return {
        pass: response.status == 200,
        errMsg: response.message
      }
    },
    onOversize() {
      console.log('oversize')
    },
  }
}
</script>

<style>
.sp-upload-demo {
  width: 700px;
  &.is-disabled .sp-upload {
    margin-bottom: 10px;
  }
}

</style>