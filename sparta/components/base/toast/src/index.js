import Vue from 'vue'
import Main from './main.vue'
let ToastConstructor = Vue.extend(Main)

const Toast = (type, globalCustomOptions) => {
  return function(message, customOptions) {
    let durationGlobal = globalCustomOptions?.durationGlobal || globalCustomOptions
    if (typeof durationGlobal !== 'number') {
      durationGlobal = 3000
    }
    let durationLocal = customOptions?.duration || customOptions
    if (typeof durationLocal !== 'number') {
      durationLocal = 3000
    }
    const options = {
      type,
      message,
      duration: durationGlobal || durationLocal || 3000,
      ...(globalCustomOptions||{}),
      ...(customOptions || {})
    } || {}
    // 如果是直接字符串，那直接赋值给message就好了
    // 实例化
    const instance = new ToastConstructor({
      data: options
    })
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
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