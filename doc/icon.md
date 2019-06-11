<script>
  var iconList = require('site/icon.json');
  export default {
    data() {
      return {
        icons: iconList
      };
    }
  }
</script>

## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `sp-icon-iconName` 来使用即可。例如：

:::demo 一般使用`i`加class即可
```vue
<template>
  <div class="demo-icon">
    <i class="sp-icon-picture-outline"></i>
    <i class="sp-icon-goods"></i>
    <i class="sp-icon-date"></i>
    <sp-button type="primary" icon="sp-icon-search">搜索</sp-button>
  </div>
</template>
```
:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in icons" :key="name">
    <span>
      <i :class="'sp-icon-' + name"></i>
      <span class="icon-name">{{'sp-icon-' + name}}</span>
    </span>
  </li>
</ul>

<style>
  .components--main {
    .demo-icon > i {
      color: #606266;
      margin: 0 20px;
      font-size: 1.5em;
      vertical-align: middle;
    }
    .demo-icon > button {
      margin: 0 20px;
    }
    .content > ul.icon-list {
      overflow: hidden;
      list-style: none;
      padding: 0;
      border: solid 1px #eaeefb;
      border-radius: 4px;
    }
    .icon-list li {
      float: left;
      width: 10%;
      text-align: center;
      height: 120px;
      line-height: 120px;
      color: #666;
      font-size: 13px;
      transition: color .15s linear;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin-right: -1px;
      margin-bottom: -1px;
      vertical-align: middle;
      margin-top: 0;
      span {
        display: inline-block;
        line-height: normal;
        vertical-align: middle;
        font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
        color: #99a9bf;
      }
      i {
        display: block;
        font-size: 32px;
        margin-bottom: 15px;
        color: #606266;
      }
      .icon-name {
        display: inline-block;
        padding: 0 3px;
        height: 1em;
        color: #606266;
      }
    }
  }
</style>