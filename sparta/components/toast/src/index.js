import Vue from 'vue'
import Main from './main.vue'
let ToastConstructor = Vue.extend(Main)

const Toast = type => {
  return function(message) {
    const options = {
      type: type,
      message: message
    } || {}
    // 如果是直接字符串，那直接赋值给message就好了
    // 实例化
    const instance = new ToastConstructor({
      data: options
    })
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visiable = true
  }
}

// 四种类型的toast
['success', 'warning', 'info', 'error'].forEach(type => {
  Toast[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Toast(options)
  }
})

export default Toast