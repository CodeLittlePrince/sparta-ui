# Upload 上传

文件选择上传和图片选择上传控件。

### 注意
当页面需要IE9的时候，后端返回的数据格式必须为text/plain或text/html，因为底层是iframe实现的，multipart/form-data无法注入。

### 文件上传
经典款式，用户点击按钮弹出文件选择框

:::demo `action`为必填的字段，为上传的地址；<br>由于服务器不一定按照组件预先定义的格式返回数据，所以需要借助`processResult`处理；<br>每次上传成功/删除后，都会触发`change`，可在此事件回调中获取最终的值；<br>组件的值可用`v-model`绑定。
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload
      v-model="fileList1"
      action="/api/upload"
      :processResult="processResult"
    >
      上传文件
      <template slot="tip">
        温馨提示：大文件可能会上传更长时间
      </template>
    </sp-upload>
  </div>
</template>

<script>
export default{
  data() {
    return {
      files1: [{name: 'food.jpg', url: 'https://cn.vuejs.org/images/logo.png'}]
    }
  },
  watch: {
    fileList1(val) {
      console.log(val)
    }
  },
  methods: {
    processResult(item) {
      return item.path
    }
  }
}
</script>
```
:::

### 多文件上传

:::demo 加`multiple`字段即可
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload
      action="/api/upload"
      :processResult="processResult"
      @change="handleChange"
      multiple
    >
      多文件上传
    </sp-upload>
  </div>
</template>

<script>
export default{
  methods: {
    handleChange(list) {
      console.log(list)
    },
    processResult(item) {
      return item.path
    }
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
    <sp-upload
      action="/api/upload"
      :processResult="processResult"
      :data="data3"
      name="file"
      withCredentials
    >
      上传文件
    </sp-upload>
  </div>
</template>
```
:::

### 图片上传
图片虽然也属于文件，但是我们希望明确是图片的情况下，应该有更好的展示形式。

:::demo 设置 `type` 为 `picture`即可
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload
      type="picture"
      action="/api/upload"
      :processResult="processResult"
      @change="handleChange"
    >
      添加图片
    </sp-upload>
  </div>
</template>

<script>
export default{
  methods: {
    handleChange(list) {
      console.log(list)
    },
    processResult(item) {
      return item.path
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
    <sp-upload
      type="picture"
      action="/api/upload"
      multiple
      :processResult="processResult"
      :limit="3"
      :onExceed="onExceed"
      @change="handleChange"
    >
      添加图片
      <template slot="tip">
        温馨提示：图片最多上传3张
      </template>
    </sp-upload>
  </div>
</template>
```
:::

### 文件类型限制

:::demo 使用`accept`控制。
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload
      type="picture"
      action="/api/upload"
      multiple
      :processResult="processResult"
      :limit="3"
      :onExceed="onExceed"
      @change="handleChange"
      accept="image/*"
    >
      添加图片
    </sp-upload>
  </div>
</template>
```
:::

### 禁用

:::demo 使用`disabled`即可。
```vue
<template>
  <div class="sp-upload-demo is-disabled">
    <sp-upload
      action="/api/upload"
      disabled
    >
      添加文件
    </sp-upload>
    <sp-upload
      type="picture"
      action="/api/upload"
      disabled
    >
      添加图片
    </sp-upload>
  </div>
</template>
```
:::


### Attribute
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] | array | — | [] |
| action | 必选参数，上传的地址 | string | — | — |
| headers | 设置上传的请求头部 | object | — | — |
| multiple | 是否支持多选文件 | boolean | — | — |
| limit | 最大允许上传个数 |  number | — | — |
| data | 上传时附带的额外参数 | object | — | — |
| name | 上传的文件字段名 | string | — | file |
| with-credentials | 支持发送 cookie 凭证信息 | boolean | — | false |
| accept | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效）| string | — | — |
| on-error | 文件上传失败时的钩子 | function(err, file, fileList) | — | — |
| on-progress | 文件上传时的钩子 | function(event, file, fileList) | — | — |
| on-change | 文件状态改变时的钩子，上传成功和删除文件时都会被调用 | function(file, fileList) | — | — |
| before-upload | 上传文件之前的钩子，参数为上传的文件，若返回false则停止上传 | function(file) | — | — |
| before-remove | 删除文件之前的钩子，参数为上传的文件，若返回false则停止删除。| function(file, fileList) | — | — |
| type | 文件列表的类型 | string | text/picture| text |
| disabled | 是否禁用 | boolean | — | false |
| on-exceed | 文件超出个数限制时的钩子 | function(files, fileList) | — | - |

### Slot
| name | 说明 |
|------|--------|
| default | 文件选择框的内容 |
| tip | 提示说明文字 |

<script>
export default{
  data() {
    return {
      fileList1: [{name: 'food.jpg', url: 'https://cn.vuejs.org/images/logo.png'}],
      data3: {
        name: 'kitty',
        age: 7
      }
    }
  },
  watch: {
    fileList1(val) {
      console.log(val)
    }
  },
  methods: {
    handleChange(list) {
      console.log(list)
    },
    processResult(item) {
      return item.path
    },
    thumbProcess(url) {
      return url + '?w=200'
    },
    onExceed() {
      this.$error('最多上传3张图片')
    }
  }
}
</script>

<style>
.sp-upload-demo {
  width: 400px;
  &.is-disabled .sp-upload {
    margin-bottom: 10px;
  }
}

</style>