<template>
  <div class="home">
    <div class="content jello">
      <h1>
        组件库来啦！
        <span>- by 咻</span>
      </h1>
      <sp-select v-model="value2">
        <sp-option
          v-for="item in list2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.value === 2"
        ></sp-option>
      </sp-select>
      <a
        href="https://github.com/CodeLittlePrince/blog"
        target="__blank"
      >
        <div class="cover"></div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list2: [
        { label: 'Tony', value: 1 },
        { label: 'Bob', value: 2 },
        { label: 'Jack', value: 3 }
      ],
      value2: 0
    }
  }
}
</script>


<style lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';

.home {
  .content {
    position: relative;
    width: 1200px;
    height: 400px;
    margin: 0 auto;
    animation-duration: 1s;
    h1 {
      position: absolute;
      bottom: 30px;
      left: 120px;
      font-size: $font-size-amazing;
      text-align: center;
      margin-top: 50px;
      color: $color-text-gray;
      font-weight: bolder;
      span {
        font-size: $font-size-xl;
      }
    }
    .cover {
      position: absolute;
      z-index: 2;
      right: 62px;
      bottom: 90px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      @include bg-image('~common/img/home');
      background-size: contain;
    }
  }
}
</style>
