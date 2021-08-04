import Vue from 'vue'
import Main from './main.vue'
let ImgPreviewConstructor = Vue.extend(Main)

const ImgPreview = () => {
  return function(imgUrl) {
    const instance = new ImgPreviewConstructor({
      data: {
        imgUrl,
      }
    })

    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
  }
}

export default ImgPreview