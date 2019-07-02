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
    <template v-if="type === 'text'">
      <div class="sp-upload-file">
        <!-- 上传文件按钮 -->
        <sp-button
          plain
          class="sp-upload-file__btn"
          icon="sp-icon-upload"
          @click="handleSelect"
        >
          <slot>上传文件</slot>
        </sp-button>
        <ul class="sp-upload-file__show">
          <li
            v-for="(item, index) in uploadFiles"
            :key="item.url"
            class="sp-upload-file__item"
            :class="{'is-error': item.status === 'fail'}"
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
            <div
              v-if="item.status !== 'success' && item.status !== 'fail' && isIE9"
            >上传中...</div>
            <sp-progress
              v-if="item.status !== 'success' && item.status !== 'fail' && !isIE9"
              type="line"
              :percentage="_parsePercentage(item.percentage)"
            />
          </li>
        </ul>
      </div>
    </template>

    <!-- 上传图片 -->
    <template v-else>
      <div class="sp-upload-picture">
        <ul class="sp-upload-picture__show">
          <li
            v-for="(item, index) in uploadFiles"
            :key="item.url"
            class="sp-upload-picture__item"
            :class="{'is-error': item.status === 'fail'}"
          >
            <div class="sp-upload-picture__item-info">
              <img
                v-if="item.status === 'success'"
                :src="isIE9 ? item.url : item.urlBase64"
                alt=""
              >
              <!-- 上传中 -->
              <div
                v-if="item.status !== 'success' && item.status !== 'fail' && isIE9"
              >上传中...</div>
              <sp-progress
                v-if="item.status !== 'success' && item.status !== 'fail' && !isIE9"
                type="circle"
                :width="86"
                :percentage="_parsePercentage(item.percentage)"
              />
              <!-- 上传错误 -->
              <div
                v-if="item.status === 'fail' && isIE9"
              >上传失败</div>
              <sp-progress
                v-if="item.status === 'fail' && !isIE9"
                type="circle"
                :percentage="100"
                :width="86"
                status="exception"
              >上传失败</sp-progress>
            </div>
            <!-- 查看和删除按钮 -->
            <span class="sp-upload-picture__item-actions">
              <a
                :href="item.url"
                target="_blank"
              ><i class="sp-icon-view"></i></a>
              <i
                class="sp-icon-delete"
                @click="handleRemoveItem(index)"
              ></i>
            </span>
          </li>
        </ul>
        <!-- 上传文件按钮 -->
        <sp-button
          v-show="showUploadBtn"
          plain
          class="sp-upload-picture__btn"
          @click="handleSelect"
        >
          <div><i class="sp-icon-plus"></i></div>
          <slot>上传图片</slot>
        </sp-button>
      </div>
    </template>
  </div>
</template>

<script>
import SPProgress from 'sparta/components/progress'
import httpRequest from './ajax'

export default {
  name: 'SpUpload',

  components: {
    'sp-progress': SPProgress
  },

  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    files: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'text',
      validator(val) {
        return [ 'text', 'picture'].indexOf(val) > -1
      }
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
    limit: [Number, String],
    headers: {
      type: Object,
      default: () => {}
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    processResult: {
      type: Function,
      default: item => item
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

  computed: {
    isIE9() {
      return navigator.appVersion.indexOf('MSIE 9.0') > -1
    },
    showUploadBtn() {
      return !this.limit || this.uploadFiles.length < this.limit
    }
  },

  mounted() {
    if (this.isIE9) {
      // 为了IE9的时候无刷新上传，使用iframe方式
      this._createIframe()
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
    },

    handleRemoveItem(index) {
      const file = this.uploadFiles.splice(index, 1)
      this._abort(file[0])
      this.$emit('change', JSON.parse(JSON.stringify(this.uploadFiles)))
    },

    _uploadFiles(files) {
      // 超过文件数量限制处理
      if (this.limit && this.uploadFiles.length + files.length > this.limit) {
        this.onExceed(files, this.uploadFiles)
        return
      }

      // 文件遍历上传
      let postFiles = Array.prototype.slice.call(files)
      if (!this.multiple) { postFiles = postFiles.slice(0, 1) }

      if (postFiles.length === 0) return

      postFiles.forEach(rawFile => {
        this._onStart(rawFile)
        this._upload(rawFile)
      })
    },

    _upload(rawFile) {
      // 清理之前数据
      this.$refs.reference.value = null

      // 勾子调用
      this.beforeUpload(rawFile)

      // 正式上传
      const { uid } = rawFile
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          const file = this._getFile(rawFile)
          this.onProgress(e, file, rawFile)
          file.status = 'uploading'
          file.percentage = e.percent || 0
        },
        onSuccess: res => {
          const file = this._getFile(rawFile)
          this.onSuccess(res, rawFile)
          res = this.processResult(res)
          file.url = res
          file.status = 'success'
          const rst = this._getSuccessUploadFiles()
          this.$emit('change', rst)
          delete this.request[uid]
        },
        onError: err => {
          const file = this._getFile(rawFile)
          this.onError(err, file, rawFile)
          file.status = 'fail'
          delete this.request[uid]
        }
      }
      const req = httpRequest(options)
      this.request[uid] = req
    },

    /**
     * 取消上传
     */
    _abort(file) {
      const { request } = this
      if (file) {
        let uid = file
        if (file.uid) uid = file.uid
        if (request[uid]) {
          request[uid].abort()
        }
      } else {
        Object.keys(request).forEach((uid) => {
          if (request[uid]) request[uid].abort()
          delete request[uid]
        })
      }
    },

    /**
     * 结合uid获取目标文件
     */
    _getFile(rawFile) {
      let fileList = this.uploadFiles
      let target
      fileList.every(item => {
        target = rawFile.uid === item.uid ? item : null
        return !target
      })
      return target
    },

    _onStart(rawFile) {
      rawFile.uid = Date.now() + this.uidIndex++
      let file = {
        status: 'ready',
        uid: rawFile.uid,
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        raw: rawFile
      }
      // 预显示
      if (this.type === 'picture') {
        try {
          file.urlBase64 = URL.createObjectURL(rawFile)
        } catch (err) {
          console.error('[Sparta Error][Upload]', err)
          return
        }
      }

      this.uploadFiles.push(file)
    },

    _getSuccessUploadFiles() {
      let copy = JSON.parse(JSON.stringify(this.uploadFiles))
      const rst = []
      for (let i = 0, len = copy.length; i < len; i++) {
        const item = copy[i]
        if (item.status === 'success') {
          rst.push({
            name: item.name,
            url: item.url
          })
        }
      }
      return rst
    },

    _createIframe() {
      // IE9只能通过form方式上传文件，但要做到无刷新上传，就得借助iframe
      const now = Date.now()
      let hiddenframe = document.createElement('iframe')
      let hiddenform = document.createElement('form')
      const iframeId = 'x-upload-iframe' + now
      const formId = 'x-upload-form' + now
      hiddenframe.name = this.name
      hiddenframe.id = iframeId
      hiddenframe.setAttribute('style', 'width:0;height:0;display:none')
      hiddenform.id = formId
      hiddenform.setAttribute('style', 'width:0;height:0;display:none')
      document.body.appendChild(hiddenframe)
      document.body.appendChild(hiddenform)

      const form = document.getElementById(hiddenform.id)
      form.target = hiddenframe.name
    },

    _parsePercentage(val) {
      return parseInt(val, 10)
    }
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
    &__item {
      position: relative;
      height: 22px;
      margin-top: 8px;
      font-size: 14px;
      transition: $transition-all;
      color: $upload-file__item-color;

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
        font-size: 14px;
        line-height: 22px;
      }

      .sp-icon-close {
        opacity: 0;
        position: absolute;
        top: 1px;
        right: 4px;
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

      &.is-error {
        color: $upload-file__item--is-error-color;

        .sp-icon-close, .sp-icon-document {
          opacity: 1;
          color: $upload-file__item--is-error-color;
        }
      }
    }
  }

  &-picture {
    @include clearfix();

    &__show {
      @include clearfix();
      float: left;
    }

    &__item {
      position: relative;
      float: left;
      width: 104px;
      height: 104px;
      padding: 8px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      box-sizing: border-box;
      margin-right: 8px;
      margin-bottom: 8px;

      .sp-progress {
        position: absolute;
        top: 0;
        left: 0;
      }

      &-info {
        position: relative;
        height: 100%;
        overflow: hidden;
        transition: $transition-all;

        img {
          width: 100%;
        }

        &::before {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 10;
          content: '';
          display: inline-block;
          transition: $transition-all;
        }
      }

      &-actions {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        white-space: nowrap;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: $transition-all;
        color: #fff;
        font-size: 16px;

        i {
          cursor: pointer;
          color: #fff;
        }
      }

      &:hover &-actions {
        opacity: 1;
      }

      &:hover &-info::before {
        background: rgba(0, 0, 0, 0.5);
      }
    }

    &__btn {
      display: table;
      width: 104px;
      height: 104px;
      margin-right: 8px;
      margin-bottom: 8px;
      text-align: center;
      vertical-align: middle;
      background-color: #fafafa;
      border: 1px dashed #d9d9d9;
      border-radius: 4px;
      transition: $transition-all;
      cursor: pointer;

      .sp-icon-plus {
        font-size: 26px;
        margin-bottom: 10px;
        color: #999;
      }

      &.is-plain:hover, &.is-plain:focus {
        color: inherit;
      }
    }
  }
}
</style>

