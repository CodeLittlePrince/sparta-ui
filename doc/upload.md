# Upload 上传

文件选择上传和图片选择上传控件。

### 文件上传
经典款式，用户点击按钮弹出文件选择框

:::demo `action`为必填的字段，为上传的地址；由于服务器不一定按照组件预先定义的格式返回数据，所以需要借助`processResult`处理；每次上传成功/删除后，都会触发`change`，可在此事件回调中获取最终的值；
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload
      action="http://10.242.38.235:9999/upload"
      :processResult="processResult"
      @change="handleChange"
    >
      上传文件
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

### 多文件上传

:::demo 加`multiple`字段即可
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload
      action="http://10.242.38.235:9999/upload"
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

### 文件上传 - 自定义http-request参数格式
文件上传时，需要定义文件字段的参数名字，好给后端解析。可通过 `name` 设置，默认为 `myFile` ；
如果，http请求中需要额外自定义参数，则需要通过 `data` 设置。
另外，还可以设置 `withCredentials`。

:::demo 使用`data`和`name`控制http request params
```vue
<template>
  <div class="sp-upload-demo">
    <sp-upload
      action="http://10.242.38.235:9999/upload"
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
      action="http://10.242.38.235:9999/upload"
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
      action="http://10.242.38.235:9999/upload"
      multiple
      :processResult="processResult"
      :limit="3"
      :onExceed="onExceed"
      @change="handleChange"
    >
      添加图片
    </sp-upload>
  </div>
</template>
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value    | 绑定值，默认格式必须为YYYY:MM:DD的字符串   | string  | — | — |
| disabled | 是否禁用 | boolean | — | true |
| disableDay | 是否禁用日期指定的条目 | Function | — | () => false |
| disableMonth | 是否禁用月份指定的条目 | Function | — | () => false |
| disableYear | 是否禁用年份指定的条目 | Function | — | () => false |

<script>
export default{
  data() {
    return {
      fileList1: [],
      data3: {
        name: 'kitty',
        age: 7
      }
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
}
</style>