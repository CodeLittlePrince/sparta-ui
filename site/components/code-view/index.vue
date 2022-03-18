<template>
  <div class="c-code-view">
    <div class="c-code-view-box">
      <div class="demo">
        <div class="demo-content">
          <slot name="demo"></slot>
        </div>
      </div>
      <transition name="segment">
        <div
          v-if="visible"
          class="segment"
        >
          <p
            v-if="desc"
            class="desc"
            v-html="desc"
          ></p>
          <div class="code">
            <slot></slot>
          </div>
        </div>
      </transition>
      <div
        class="button"
        @click="handleToggleShow"
      >
        <span>{{ codeTextBtn }}</span>
        <!-- <span
          class="run"
          @click="runCode"
        >在线运行</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CCodeView',
  props: {
    text: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      codeTextBtn: '显示代码'
    }
  },
  methods: {
    handleToggleShow() {
      this.visible = !this.visible
      this.codeTextBtn = this.visible ? '隐藏代码' : '显示代码'
    },
    runCode() {
      window.onlineCode = this.info
      this.$router.push({
        path: '/codeOnline/',
      })
    }
  }
}
</script>

<style lang="scss">
.c-code-view {
  .c-code-view-box {
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 2px 0 rgb(232 237 250 / 60%), 0 1px 2px 0 rgb(232 237 250 / 50%);
  }
  .demo {
    .demo-content {
      box-sizing: border-box;
      padding: 30px;
      border-bottom: 1px solid #ddd;
    }
  }
  .button {
    position: relative;
    background: #fafbfc;
    color: rgb(24 144 255);
    font-weight: 400;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: all 0.2s;
    box-shadow: 0 0 8px 0 rgb(232 237 250 / 60%), 0 2px 4px 0 rgb(232 237 250 / 50%);
    &:hover {
      font-size: 16px;
    }
    .run {
      position: absolute;
      right: 10px;
      top: 0;
    }
  }
  &.code {
    margin-top: 10px;
  }
  &:not(:first-child) {
    margin-top: 10px;
  }
  .desc {
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 0 10px 10px;
    background-color: #fff;
  }
  .segment {
    padding-top: 10px;
    .code {
      background-color: #f7f7f7;
      box-sizing: border-box;
      padding: 10px;
      pre {
        background-color: #f7f7f7;
        margin-bottom: 0;
      }
    }
    p > p {
      padding: 0;
      margin: 0;
    }
  }
  .segment-enter-active {
    transition: all 0.2s;
  }
  .segment-enter {
    opacity: 0;
  }
}
</style>

