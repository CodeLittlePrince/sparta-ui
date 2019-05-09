import Vue from 'vue'
Vue.config.productionTip = false
/**
 * karma入口文件
 */

// require all test files (files that ends with .spec.js)
// 语法说明：https://doc.webpack-china.org/guides/dependency-management/#require-context
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files which in the src/common/js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../sparta', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)