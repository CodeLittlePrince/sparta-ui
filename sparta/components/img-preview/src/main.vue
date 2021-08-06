<template>
  <transition name="sp-fade">
    <div
      v-show="visible" class="sp-img-preview" :style="{'z-index': zIndex}"
      @click="handleClose"
    >
      <div class="sp-img-preview__close"><i class="sp-icon-close"></i></div>
      <div class="sp-img-preview__img-box" @click.stop>
        <img :src="imgUrl" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
import PopManage from 'sparta/model/PopManage'

export default {
  name: 'SpImgPreview',

  data() {
    return {
      imgUrl: '',
      visible: false,
      zIndex: 1,
    }
  },

  mounted() {
    this.zIndex = PopManage.zIndex
  },

  methods: {
    handleClose() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-img-preview {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(41, 46, 51, 0.6);

  &__img-box {
    position: absolute;
    top: 5%;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);

    img {
      height: 100%;
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