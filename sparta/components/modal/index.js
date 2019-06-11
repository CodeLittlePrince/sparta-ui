import Modal from './src'

Modal.install = Vue => {
  Vue.component(Modal.name, Modal)
}

export default Modal
