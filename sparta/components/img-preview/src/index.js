import Vue from 'vue'
import Main from './main.vue'
import PopManage from 'sparta/model/PopManage'

let ImgPreviewConstructor = Vue.extend(Main)

const ImgPreview = () => {
  const instance = new ImgPreviewConstructor()
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)

  return function(imgUrl) {
    instance.vm.imgUrl = imgUrl
    const popManage = PopManage.getInstance()
    instance.vm.zIndex = popManage.getZIndex()
    instance.vm.visible = true
  }
}

export default ImgPreview