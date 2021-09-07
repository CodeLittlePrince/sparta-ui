<template>
  <div class="sp-upload">
    <input
      ref="reference"
      class="sp-upload__input"
      type="file"
      :name="name"
      :multiple="multiple"
      :accept="accept"
      @change="handleChange"
    >
    <div v-if="$slots.desc" class="sp-upload__desc">
      <slot name="desc"></slot>
      <!-- tip永远是配合desc使用的 -->
      <div v-if="$slots.tip" class="sp-upload__tip">
        <slot name="tip"></slot>
      </div>
    </div>
    <!-- 上传文件 -->
    <template v-if="type === 'text'">
      <div class="sp-upload-file">
        <!-- 上传文件按钮区域 -->
        <div class="sp-upload-file__upload-area">
          <div
            class="sp-upload-file__btn"
            :class="{'is--disabled': disabled}"
            :disabled="disabled"
            @click="handleSelect"
          >
            <div class="sp-upload-file__btn__box">
              <div class="sp-icon-add-box"><i class="sp-icon-add-bold"></i></div>
              <span class="sp-upload-file__btn__text">
                <slot>点击批量上传</slot>
              </span>
            </div>
          </div>
          <div class="sp-upload__right-content">
            <div
              v-if="exampleImage"
              class="sp-upload__example-image"
              :class="{ 'has--big-img': exampleBigImage }"
            >
              <img :src="exampleImage" alt="" @click="handleExampleImagePreview">
            </div>
          </div>
        </div>
        <p v-show="uploadFiles.length" class="sp-upload-file__text">以下为已上传文件：</p>
        <!-- 展示 -->
        <ul class="sp-upload-file__show">
          <li
            v-for="(item, index) in uploadFiles"
            :key="item.uid"
            class="sp-upload-file__item"
            :class="{'is--error': item.status === 'fail'}"
          >
            <template v-if="item.status === 'uploading'">
              <!-- IE9情况显示 -->
              <img
                v-if="isIE9"
                class="sp-upload-file__item__ie9-loading"
                src="./img/loading-small.gif"
                alt=""
              />
              <!-- 非IE9 -->
              <i v-else class="sp-icon-loading"></i>
            </template>
            <i v-else-if="item.status === 'fail'" class="sp-icon-warning-circle" />
            <i v-else class="sp-icon-file" />
            <a
              v-if="item.fileUrl"
              class="sp-upload-file__item-name"
              :href="item.fileUrl"
              :title="item.fileName"
              target="_blank"
            >{{ item.fileName }}</a>
            <!-- 文件名 -->
            <span
              v-else
              :title="item.fileName"
              class="sp-upload-file__item-name"
            >{{ item.fileName }}</span>
            <!-- 错误提示 -->
            <span
              v-if="item.status === 'fail'"
              class="sp-upload-file__item__error-tip"
            >上传失败</span>
            <!-- 删除按钮 -->
            <i
              class="sp-icon-close"
              @click="handleRemoveItem(index)"
            ></i>
          </li>
        </ul>
      </div>
    </template>

    <!-- 上传图片 -->
    <template v-else>
      <div class="sp-upload-picture" :class="{ 'is--show-upload-btn': showUploadBtn }">
        <ul class="sp-upload-picture__show">
          <li
            v-for="(item, index) in uploadFiles"
            :key="item.uid"
            class="sp-upload-picture__item"
            :class="{
              'is--error': item.status === 'fail',
              'is--uploading': item.status === 'uploading',
              'is--ready': item.status === 'ready'
            }"
          >
            <div class="sp-upload-picture__item-info">
              <img
                v-if="item.status === 'success' && (item.fileType === 'image' || isIE9)"
                :src="_getImgUrl(item)"
                alt=""
              >
              <!-- 不是图片的文件兼容 -->
              <div
                v-if="item.status === 'success' && item.fileType !== 'image' && !isIE9"
                class="sp-upload-picture__item-info-file"
              >
                <i class="sp-icon-file"></i>
                <div class="sp-upload-picture__item-info-name">
                  {{ item.fileName }}
                </div>
              </div>
              <!-- 上传中 -->
              <div v-if="item.status === 'uploading'" class="sp-upload-picture__item__box">
                <!-- IE9情况显示 -->
                <img
                  v-if="isIE9"
                  class="sp-upload-picture__item__ie9-loading"
                  src="./img/loading.gif"
                  alt=""
                />
                <!-- 非IE9 -->
                <i v-else class="sp-icon-loading-bold" />
                <p class="sp-upload-picture__item__text">上传中...</p>
              </div>
              <!-- 上传错误 -->
              <div
                v-if="item.status === 'fail'"
                class="sp-upload-picture__item__error"
              >
                <i class="sp-icon-warning-circle"></i>
                <p>上传失败</p>
              </div>
            </div>
            <!-- 查看和删除按钮 -->
            <span v-show="item.status !== 'uploading'" class="sp-upload-picture__item-actions">
              <i class="sp-icon-view" @click="handleFilePreview(item)" />
              <i class="sp-icon-delete" @click="handleRemoveItem(index)" />
            </span>
          </li>
          <!-- 上传图片按钮 -->
          <li
            v-show="showUploadBtn"
            class="sp-upload-picture__btn"
            :class="{'is--disabled': disabled}"
            :disabled="disabled"
            @click="handleSelect"
          >
            <div class="sp-upload-picture__btn__box">
              <div class="sp-icon-add-box"><i class="sp-icon-add"></i></div>
              <div class="sp-upload-picture__btn__text">
                <slot>点击上传</slot>
              </div>
            </div>
          </li>
        </ul>
        <div class="sp-upload__right-content">
          <div
            v-if="exampleImage"
            class="sp-upload__example-image"
            :class="{ 'has--big-img': exampleBigImage }"
          >
            <img :src="exampleImage" alt="" @click="handleExampleImagePreview">
          </div>
          <sp-button
            v-if="limit == 1 && uploadFiles.length === 1"
            type="text"
            class="sp-upload__reupload-text"
            @click="handleSelect"
          >重新上传</sp-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Toast from 'sparta/components/toast'
import Emitter from 'sparta/common/js/mixins/emitter'
import httpRequest from './ajax'

export default {
  name: 'SpUpload',

  mixins: [Emitter],

  inject: {
    spForm: {
      default: ''
    },
    spFormItem: {
      default: ''
    }
  },

  props: {
    files: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
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
      default: 'file'
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
    exampleImage: {
      type: String,
      default: ''
    },
    exampleBigImage: {
      type: String,
      default: ''
    },
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
      default: item => item.result.fileUrl
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
    responseValidate: {
      type: Function,
      default: response => {
        return {
          pass: response.status == 200,
          errMsg: response.message
        }
      }
    },
    beforeUpload: {
      type: Function,
      default: function() {}
    },
    beforeRemove: {
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
    isIE10() {
      return window.navigator.userAgent.indexOf('MSIE') >= 1
    },
    showUploadBtn() {
      return !this.limit || this.uploadFiles.length < this.limit
    }
  },

  watch: {
    files(val) {
      this.uploadFiles = val
    }
  },

  mounted() {
    this.toastError = Toast('error')
    this._initUploadFilesData()
  },

  methods: {
    handleSelect() {
      if (!this.disabled) {
        this.$refs.reference.click()
      }
    },
    
    /**
     * 选取文件以后操作
     */
    handleChange(e) {
      if (!this.$refs.reference || !this.$refs.reference.value) {
        return
      }

      // 当limit为1，并且不允许批量上传，并且已经有1个文件上传过了
      // 那说明，这个upload肯定是用户点击了“重新上传”按钮触发的
      const isReUploading = this.limit == 1 && !this.multiple && this.uploadFiles.length === 1
      if (isReUploading) {
        this.uploadFiles.pop()
      }
      
      // 区分IE9和其它浏览器的上传
      if (this.isIE9) {
        this._uploadByIframe()
      } else {
        const files = e.target.files
        if (files) {
          this._uploadFiles(files)
        }
      }
    },

    handleFilePreview(item) {
      if (item.fileType === 'image') {
        this.$sparta.imgPreview(this._getImgUrl(item))
      } else {
        window.open(item.fileUrl)
      }
    },

    handleRemoveItem(index) {
      const file = this.uploadFiles.splice(index, 1)
      this._abort(file[0])
      this._emitChange()
    },

    handleExampleImagePreview() {
      if (this.exampleBigImage) {
        this.$sparta.imgPreview(this.exampleBigImage)
      }
    },

    /**
     * 初始化files的状态
     */
    _initUploadFilesData() {
      this.uploadFiles = this.files.map(item => {
        item.status = 'success'
        item.fileType = item.fileType || 'image'
        item.percentage = 100
        item.uid = Date.now() + this.uidIndex++
        return item
      })
    },

    _uploadFiles(files) {
      // 超过文件数量限制处理
      if (!this._limitValidate(files)) {
        return
      }
      // 文件遍历上传
      let postFiles = Array.prototype.slice.call(files)
      if (!this.multiple) { postFiles = postFiles.slice(0, 1) }

      if (postFiles.length === 0) return
      postFiles.forEach(rawFile => {
        this._onStart(rawFile)
        this._uploadByXHR(rawFile)
      })
    },

    _limitValidate(files) {
      if (this.limit && this.uploadFiles.length + files.length > this.limit) {
        this.toastError(`最多上传${ this.limit }个文件`)
        this.onExceed(files, this.uploadFiles)
        this._resetUploadValue()
        return false
      }

      return true
    },

    _uploadByXHR(rawFile) {
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
        responseValidate: this.responseValidate,
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
          file.fileUrl = res
          file.status = 'success'
          this._emitChange()
          delete this.request[uid]
          this._resetUploadValue()
        },
        onError: err => {
          const file = this._getFile(rawFile)
          this.onError(err, file, rawFile)
          file.status = 'fail'
          delete this.request[uid]
          this._resetUploadValue()
          this.toastError(err instanceof Error ? '服务器开小差了，请稍后重试' : err)
        }
      }
      const req = httpRequest(options)
      this.request[uid] = req
    },

    // 为了某些浏览器，比如IE，上传同一文件触发change事件而存在
    _resetUploadValue() {
      if (this.isIE9) {
        // 解决IE9上传同一张图片无法触发change
        this.hiddenform.reset()
      } else if (this.isIE10) {
        // 解决IE10上传同一张图片无法触发change
        let form = document.createElement('form')
        const ele = this.$refs.reference
        let nextSibling = ele.nextSibling
        let parentNode = ele.parentNode
        form.appendChild(this.$refs.reference)
        form.reset()
        parentNode.insertBefore(ele, nextSibling)
        form = null
      }
      this.$refs.reference.value = null
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
        fileName: rawFile.name,
        suffix: this._getFileSuffix(rawFile.name),
        size: rawFile.size,
        percentage: 0,
        raw: rawFile,
        fileType: rawFile.type.startsWith('image') ? 'image' : 'file'
      }
      // 预显示
      if (this.fileType === 'picture' && !this.isIE9) {
        try {
          file.urlBase64 = URL.createObjectURL(rawFile)
        } catch (err) {
          console.error('[Sparta Error][Upload]', err)
          return
        }
      }

      this.uploadFiles.push(file)
    },

    getSuccessUploadFiles() {
      let copy = JSON.parse(JSON.stringify(this.uploadFiles))
      const rst = []

      for (let i = 0, len = copy.length; i < len; i++) {
        const item = copy[i]
        if (item.status === 'success') {
          let data = {
            fileName: item.fileName,
            suffix: this._getFileSuffix(item.fileName),
            fileUrl: item.fileUrl,
            fileType: item.fileType
          }
          rst.push(data)
        }
      }
      return rst
    },

    _getAllUploadFiles() {
      let copy = JSON.parse(JSON.stringify(this.uploadFiles))
      const rst = []

      for (let i = 0, len = copy.length; i < len; i++) {
        const item = copy[i]
        let data = {
          fileName: item.fileName,
          suffix: this._getFileSuffix(item.fileName),
          fileUrl: item.fileUrl,
          status: item.status,
          fileType: item.fileType
        }
        if (this.fileType === 'picture' && !this.isIE9) {
          data.urlBase64 = item.urlBase64
        }
        rst.push(data)
      }
      return rst
    },

    _uploadByIframe() {
      // 超过文件数量限制处理
      if (!this._limitValidate([file])) {
        return
      }
      // IE9只能通过form方式上传文件，但要做到无刷新上传，就得借助iframe
      // this.$refs.reference.value
      let namePieces = this.$refs.reference.value.split('\\')
      const file = {
        uid: Date.now() + this.uidIndex++,
        status: 'ready',
        fileName: namePieces[namePieces.length - 1],
        suffix: this._getFileSuffix(namePieces[namePieces.length - 1]),
      }
      this.uploadFiles.push(file)
      const now = Date.now()
      let hiddenframe = document.createElement('iframe')
      let hiddenform = document.createElement('form')
      const input = this.$refs.reference
      let inputClone = input.cloneNode()
      const iframeId = 'x-upload-iframe' + now
      const formId = 'x-upload-form' + now

      input.parentNode.insertBefore(inputClone, input)

      hiddenframe.src = 'javascript:void(0);'
      hiddenframe.name = iframeId
      hiddenframe.setAttribute('style', 'width:0;height:0;display:none')

      hiddenform.id = formId
      hiddenform.setAttribute('style', 'width:0;height:0;display:none')
      hiddenform.target = hiddenframe.name
      hiddenform.action = this.action
      hiddenform.method = 'post'
      hiddenform.enctype = 'multipart/form-data'

      document.body.appendChild(hiddenform)
      hiddenform.appendChild(input)
      hiddenform.appendChild(hiddenframe)
      this.hiddenform = hiddenform
      const index = this.uploadFiles.indexOf(file)
      this.uploadFiles[index].status = 'uploading'

      hiddenframe.addEventListener('load', () => {
        this._iframeUpload(hiddenform, hiddenframe, file)
      })

      hiddenform.submit()
    },

    _iframeUpload(form, iframe, file) {
      // 获取iframe的内容，即服务返回的数据
      // 🔥服务端返回的数据必须为text/plain或者text/html，否则会各种报错
      // 如果resData解析不了说明上传失败
      const index = this.uploadFiles.indexOf(file)
      try {
        const resData = iframe.contentDocument.body.textContent || iframe.contentWindow.document.body.textContent
        // 处理数据 。。。
        this.uploadFiles[index].fileUrl = this.processResult(JSON.parse(resData))
        this.uploadFiles[index].status = 'success'
        this._emitChange()
      } catch (e) {
        this.uploadFiles[index].status = 'fail'
      }
      // 删除form
      setTimeout(() => {
        this._resetUploadValue()
        document.body.removeChild(form)
      }, 0)
    },

    _emitChange() {
      // 如果上传队列uploadFiles中还有status为ready或uploading的文件，则暂不emit
      const uploadNotFinish = this.uploadFiles.some(item => {
        return item.status === 'ready' || item.status === 'uploading'
      })
      if (uploadNotFinish) return

      // 都上传结束后emit事件
      const allFiles = this._getAllUploadFiles()
      this.$emit('change', allFiles)
      this.dispatch('SpFormItem', 'sp.form.change', allFiles)
    },

    _getImgUrl(item) {
      return (this.isIE9 || !item.urlBase64) ? item.fileUrl : item.urlBase64
    },

    _parsePercentage(val) {
      return parseInt(val, 10)
    },

    _getFileSuffix(fileName) {
      if (!fileName) return ''

      const pieces = fileName.split('.')
      
      if (pieces.length === 1) return ''
      
      return '.' + pieces[pieces.length - 1]
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";
@import "sparta/common/scss/mixin";

.sp-upload {
  @include clearfix();
  color: $color-text-tip;

  &__desc {
    font-size: 14px;
    line-height: 20px;
    color: $color-text-secondary;
    padding-bottom: 8px;
  }

  &__tip {
    font-size: 12px;
    line-height: 17px;
    color: $color-text-tip;
    margin-top: 3px;
  }

  &__input {
    display: none;
  }

  &-file {
    line-height: 1;

    &__upload-area {
      @include clearfix();
    }

    &__btn {
      float: left;
      width: $upload-picture__item-width;
      height: 76px;
      text-align: center;
      background-color: $upload-bg-grey;
      border-radius: 4px;
      cursor: pointer;
      box-sizing: border-box;
      font-size: 0;
      padding: 4px;
      line-height: 1;
      margin-right: 10px;

      &__box {
        border: 1px dashed #d9d9d9;
        height: 100%;
        padding-top: 25px;
        box-sizing: border-box;
      }

      .sp-icon-add-bold {
        font-size: 14px;
        vertical-align: middle;
        margin-right: 8px;
      }

      &__text {
        font-size: 12px;
        line-height: 18px;
      }

      &:hover {
        transition: $transition-all;
        background-color: $upload-picture__btn-background-hover;
        border-color: $color-primary;
      }

      &.is--disabled {
        color: $upload-picture__btn--is--disabled-color;
        background-color: $upload-picture__btn--is--disabled-background;
        border-color: $upload-picture__btn--is--disabled-border-color;
        cursor: not-allowed;

        .sp-icon-add {
          color: $upload-picture__btn--is--disabled-color;
        }
      }
    }

    .sp-upload__right-content {
      height: 76px;
    }

    &__text {
      font-size: 12px;
      line-height: 17px;
      color: $color-text-regular;
      margin-top: 8px;
    }

    &__item {
      position: relative;
      margin-top: 3px;
      font-size: 0;
      transition: $transition-all;
      color: $upload-file__item-color;

      &:first-child {
        margin-top: 6px;
      }

      a {
        color: $color-text-regular;
      }

      &-name {
        display: inline-block;
        width: 100%;
        padding-left: 18px;
        padding-right: 78px;
        font-size: 12px;
        line-height: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }

      &__ie9-loading {
        width: 12px;
        height: 12px;
      }

      .sp-icon-file,
      .sp-icon-warning-circle,
      .sp-icon-loading,
      .sp-upload-file__item__ie9-loading {
        position: absolute;
        top: 0;
        font-size: 12px;
        line-height: 18px;
        color: $color-text-tip;
      }

      .sp-upload-file__item__ie9-loading {
        top: 50%;
        transform: translateY(-50%);
      }

      .sp-icon-close {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        font-size: 12px;
        line-height: 18px;
        color: $color-text-tip;
      }

      &__error-tip {
        position: absolute;
        top: 0;
        right: 18px;
        font-size: 12px;
        line-height: 18px;
      }

      &:hover {
        background-color: $upload-file__item-background-hover;
      }

      &.is--error {
        color: $upload-file__item--is--error-color;

        .sp-icon-warning-circle {
          color: $upload-file__item--is--error-color;
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
      width: $upload-picture__item-width;
      height: $upload-picture__item-height;
      border: $upload-picture__item-border;
      border-radius: 4px;
      box-sizing: border-box;
      margin-right: 10px;
      overflow: hidden;

      &-info {
        position: relative;
        height: 100%;
        overflow: hidden;
        line-height: 1;

        > img {
          width: 100%;
          height: 100%;
        }

        &::before {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 10;
          content: '';
          display: inline-block;
        }

        &-file {
          text-align: center;
          color: $color-text-tip;

          .sp-icon-file {
            margin-top: 32px;
            font-size: 24px;
          }
        }

        .sp-icon-picture-outline {
          margin-top: 15px;
          font-size: 24px;
          color: $color-primary;
        }

        &-name {
          @include ellipsis();
          font-size: 12px;
          line-height: 18px;
          margin-top: 10px;
          padding: 0 5px;
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
        font-size: 0;

        i {
          cursor: pointer;
          color: #fff;
          font-size: 22px;

          &:first-child {
            margin-right: 20px;
          }
        }
      }

      &__error {
        text-align: center;
        color: $color-danger;

        .sp-icon-warning-circle {
          font-size: 24px;
          margin-top: 32px;
          margin-bottom: 10px;
        }

        p {
          font-size: 12px;
          line-height: 18px;
        }
      }

      &__ie9-loading {
        width: 24px;
        height: 24px;
        margin-bottom: 11px;
        margin-top: 29px;
      }

      &:hover &-actions {
        opacity: 1;
      }

      &:hover &-info::before {
        background: rgba(0, 0, 0, 0.5);
      }

      &.is--uploading:hover &-info::before {
        background: transparent;
      }

      &.is--uploading,
      &.is--ready {
        border: none;
      }

      &.is--error {
        border-color: $color-danger;

        .sp-icon-view {
          display: none;
        }
      }
    }

    &__item.is--uploading,
    &__item.is--ready,
    &__btn {
      float: left;
      width: $upload-picture__item-width;
      height: $upload-picture__item-height;
      text-align: center;
      background-color: $upload-bg-grey;
      border-radius: 4px;
      cursor: pointer;
      box-sizing: border-box;
      font-size: 0;
      padding: 4px;
      line-height: 1;

      .sp-upload-picture__item__box,
      .sp-upload-picture__btn__box {
        border: 1px dashed #d9d9d9;
        height: 100%;
        box-sizing: border-box;
      }

      .sp-icon-add,
      .sp-icon-loading-bold {
        font-size: 24px;
        margin-bottom: 11px;
        margin-top: 29px;
      }

      .sp-upload-picture__item__text,
      .sp-upload-picture__btn__text {
        font-size: 12px;
        line-height: 18px;
      }

      &:hover {
        transition: $transition-all;
        background-color: $upload-picture__btn-background-hover;
        border-color: $color-primary;
      }

      &.is--disabled {
        color: $upload-picture__btn--is--disabled-color;
        background-color: $upload-picture__btn--is--disabled-background;
        border-color: $upload-picture__btn--is--disabled-border-color;
        cursor: not-allowed;

        .sp-icon-add {
          color: $upload-picture__btn--is--disabled-color;
        }
      }
    }

    &.is--show-upload-btn .sp-upload__right-content {
      margin-left: 10px;
    }
  }

  &__right-content {
    position: relative;
    float: left;
    height: $upload-picture__item-height;
  }

  &__reupload-text {
    position: absolute;
    bottom: 0;
    font-size: 12px;
    line-height: 18px;
    padding: 0;
    border: none;
  }

  &__example-image {
    position: relative;
    width: 120px;
    height: 76px;
    background-color: $upload-picture__btn-background;
    overflow: hidden;

    &::before {
      content: "示例图";
      position: absolute;
      display: inline-block;
      width: 46px;
      height: 20px;
      font-size: 12px;
      color: #fff;
      line-height: 20px;
      text-align: center;
      background-color: rgba(1, 34, 87, 0.4);
    }

    &.has--big-img {
      cursor: pointer;
    }

    img {
      width: 100%;
    }
  }
}
</style>

