import Modal from './src/index'

Modal.install = Vue => {
  Vue.component(Modal.name, Modal)
}

export default Modal
