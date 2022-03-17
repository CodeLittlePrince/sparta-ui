<template>
  <transition name="sp-fade">
    <div
      v-show="visible" class="sp-img-preview" :style="{'z-index': zIndex}"
      @click="handleClose"
    >
      <div class="sp-img-preview__close"><i class="sp-icon-close"></i></div>
      <div class="sp-img-preview__img-box">
        <img
          ref="image" :src="imgUrl" alt=""
          :style="imageStyle"
          @click.stop @load="handleImageLoadEvent"
        >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SpImgPreview',

  data() {
    return {
      imgUrl: '',
      visible: false,
      zIndex: 1,
      imageStyle: {}
    }
  },

  methods: {
    handleClose() {
      this.visible = false
    },
    handleImageLoadEvent() {
      const { width, height } = this.$refs.image || {}
      const { innerWidth, innerHeight } = window

      if ((innerWidth / innerHeight) > (width / height)) {
        this.imageStyle = { height: '100%' }
      } else {
        this.imageStyle = { width: '100%' }
      }
    }
  }
}
</script>

<style lang="scss">
.sp-img-preview {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(41, 46, 51, 0.6);

  img {
    /* 因为坑爹的IE */
    width: auto;
    height: auto;
  }

  &__img-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: calc(100% - 105px);
    height: 90%;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }

  &__close {
    position: absolute;
    width: 37px;
    height: 37px;
    right: 15px;
    top: 15px;
    border-radius: 50%;
    background: #4e4e52;
    color: #fff;
    text-align: center;
    line-height: 37px;
    cursor: pointer;
    font-size: 0;

    i {
      font-size: 16px;
    }
  }
}
</style>