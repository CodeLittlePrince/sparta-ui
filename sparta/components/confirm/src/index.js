import Vue from 'vue'
import Main from './main.vue'
let ComfirmConstructor = Vue.extend(Main)

const Comfirm = function (options) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  // 如果是直接字符串，那直接赋值给message就好了
  // 实例化
  const instance = new ComfirmConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  instance.vm.visible = true
}

export default Comfirm