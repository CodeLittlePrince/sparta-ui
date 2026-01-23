import './style'
import Row from './row'
import Button from './button'
import Input from './input'
import Radio from './radio'
import RadioGroup from './radio-group'
import Form from './form'
import FormItem from './form-item'
import Modal from './modal'
import Toast from './toast'
import confirm from './confirm'
import PasswordInput from './password-input'
import PopupTip from './popup-tip'
import PopLayerManage from 'sparta/model/PopLayerManage'

const components = [
  Row,
  Button,
  Input,
  Radio,
  RadioGroup,
  Form,
  FormItem,
  Modal,
  Toast,
  confirm,
  PasswordInput,
  PopupTip,
]

let Sparta = {}
Sparta.install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
    Sparta[component.name] = component.name
  })

  Vue.prototype.$sparta = {
    THEME: 'miniCashier'
  }
  Vue.prototype.$sparta.error = Toast('error')
  Vue.prototype.$sparta.success = Toast('success')
  Vue.prototype.$sparta.warning = Toast('warning')
  Vue.prototype.$sparta.info = Toast('info')
  Vue.prototype.$sparta.confirm = confirm
  Vue.prototype.$sparta.popLayerManage = PopLayerManage.getInstance()
}


// 整体引入
export default Sparta