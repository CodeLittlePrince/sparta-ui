<template>
  <div class="sp-upload">
    <input
      ref="reference"
      class="sp-upload__input"
      type="file"
      :multiple="multiple"
      :accept="accept"
      @change="handleChange"
    >
    <!-- 上传文件 -->
    <div class="sp-upload-file">
      <!-- 上传文件按钮 -->
      <sp-button
        plain
        class="sp-upload-file__btn"
        icon="sp-icon-upload"
        @click="handleSelect"
      >
        upload file
      </sp-button>
      <ul class="sp-upload-file__show">
        <li
          v-for="(item, index) in uploadFiles"
          :key="item.url"
          class="sp-upload-file__item"
        >
          <i class="sp-icon-document"></i>
          <a
            v-if="item.url"
            class="sp-upload-file__item-name"
            :href="item.url"
            target="_blank"
          >{{ item.name }}</a>
          <span
            v-else
            class="sp-upload-file__item-name"
          >
            {{ item.name }}
          </span>
          <i
            class="sp-icon-close"
            @click="handleRemoveItem(index)"
          ></i>
        </li>
      </ul>
    </div>
    <!-- 上传图片 -->
    
  </div>
</template>

<script>
import httpRequest from './ajax'

export default {
  name: 'SpUpload',

  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    files: {
      type: Array,
      default: () => []
    },
    // 上传时http参数的文件参数名
    name: {
      type: String,
      default: 'myFile'
    },
    // 上传地址
    action: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    },
    accept: {
      type: String,
      default: ''
    },
    limit: Number,
    headers: {
      type: Object,
      default: () => {}
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    // 处理上传完之后服务端返回的结果
    processResult: {
      type: Function,
      default: item => item
    },
    onStart: {
      type: Function,
      default: function() {}
    },
    onProgress: {
      type: Function,
      default: function() {}
    },
    onSuccess: {
      type: Function,
      default: function() {}
    },
    onError: {
      type: Function,
      default: function() {}
    },
    beforeUpload: {
      type: Function,
      default: function() {}
    },
    onExceed: {
      type: Function,
      default: function() {}
    }
  },

  data() {
    return {
      request: {},
      uidIndex: 1,
      uploadFiles: this.files
    }
  },
  
  methods: {
    handleSelect() {
      this.$refs.reference.click()
    },
    /**
     * 选取文件以后操作
     */
    handleChange(e) {
      const files = e.target.files
      if (files) {
        this._uploadFiles(files)
      }
      // const xhr = new XMLHttpRequest()
      // const formData = new FormData()
      // const files = e.target.files
      // if (files.length) {
      //   const file = files[0]
      //   formData.append('myFile', file)
  
      //   xhr.open('POST', 'http://localhost:9999/upload')
  
      //   xhr.onload = function() {
      //     if(this.status === 200) {
      //       //对请求成功的处理
      //     }
      //   }
  
      //   xhr.send(formData)
    },

    handleRemoveItem(index) {
      this.uploadFiles.splice(index, 1)
      this.$emit('change', JSON.parse(JSON.stringify(this.uploadFiles)))
    },

    _uploadFiles(files) {
      // 超过文件数量限制处理
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed(files, this.fileList)
        return
      }

      // 文件遍历上传
      let postFiles = Array.prototype.slice.call(files)
      if (!this.multiple) { postFiles = postFiles.slice(0, 1) }

      if (postFiles.length === 0) return

      postFiles.forEach(rawFile => {
        this.onStart(rawFile)
        this._upload(rawFile)
      })
    },

    _upload(rawFile) {
      // 清理之前数据
      this.$refs.reference.value = null

      // 勾子调用
      this.beforeUpload(rawFile)

      // 正式上传
      const uid = Date.now() + this.uidIndex++
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, rawFile)
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile)
          res = this.processResult(res)
          this.uploadFiles.push({
            name: rawFile.name,
            url: res
          })
          this.$emit('change', JSON.parse(JSON.stringify(this.uploadFiles)))
          delete this.request[uid]
        },
        onError: err => {
          this.onError(err, rawFile)
          delete this.request[uid]
        }
      }
      const req = httpRequest(options)
      this.request[uid] = req
    },

  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-upload {

  &__input {
    display: none;
  }

  &-file {
    &__show {
      
    }
    &__item {
      position: relative;
      height: 22px;
      margin-top: 8px;
      font-size: 14px;
      transition: $transition-all;

      a {
        color: $color-primary;
      }

      &-name {
        display: inline-block;
        width: 100%;
        padding-left: 22px;
        line-height: 22px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }

      .sp-icon-document {
        position: absolute;
        top: 0;
        color: #00000073;
        font-size: 14px;
        line-height: 22px;
      }

      .sp-icon-close {
        opacity: 0;
        position: absolute;
        top: 1px;
        right: 4px;
        color: #00000073;
        cursor: pointer;
        font-size: 14px;
        line-height: 22px;
      }

      &:hover {
        background-color: $upload-file__item-background-hover;
        .sp-icon-close {
          opacity: 1;
        }
      }
    }
  }
}
</style>

