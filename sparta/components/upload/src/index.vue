<template>
  <div class="sp-upload">
    <sp-button
      plain
      class="sp-upload__btn"
      icon="sp-icon-upload"
      @click="handleSelect"
    >
      upload file
      <input
        ref="reference"
        type="file"
        :multiple="multiple"
        :accept="accept"
        @change="handleChange"
      >
    </sp-button>
  </div>
</template>

<script>
export default {
  name: 'SpUpload',

  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ''
    }
  },
  
  methods: {
    handleSelect() {
      this.$refs.reference.click()
    },
    handleChange() {
      
    }
  }
}
</script>

<style lang="scss">
@import "~sparta/common/scss/variable";

.sp-upload {
  &__btn {
    input {
      display: none;
    }
  }
}
</style>

