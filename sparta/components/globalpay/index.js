import Style from './style'
import Row from './row'
import Col from './col'
import Layout from './layout'
import Header from './header'
import Footer from './footer'
import Aside from './aside'
import Main from './main'
import Menu from './menu'
import Window from './window'
import Dropdown from './dropdown'
import DropdownItem from './dropdown-item'
import Button from './button'
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import Input from './input'
import OptionGroup from './option-group'
import Option from './option'
import Radio from './radio'
import RadioButton from './radio-button'
import RadioGroup from './radio-group'
import Select from './select'
import TimePicker from './time-picker'
import DatePicker from './date-picker'
import Progress from './progress'
import Upload from './upload'
import UploadPro from './upload-pro'
import Step from './step'
import SpStepItem from './step-item'
import ImgPreview from './img-preview'
import Form from './form'
import FormItem from './form-item'
import FormSubmitBtns from './form-submit-btns'
import Tag from './tag'
import Table from './table'
import TableCell from './table-cell'
import TableColumn from './table-column'
import Tabs from './tabs'
import TabPane from './tab-pane'
import Pagination from './pagination'
import Modal from './modal'
import Toast from './toast'
import confirm from './confirm'
import PasswordInput from './password-input'
import PopupTip from './popup-tip'
import TimeSelect from './time-select'
import Cascader from './cascader'
import CascaderPanel from './cascader-panel'
import ScrollBar from './scrollbar'

const components = [
  Row,
  Col,
  Layout,
  Header,
  Footer,
  Aside,
  Main,
  Menu,
  Window,
  Dropdown,
  DropdownItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  OptionGroup,
  Option,
  Radio,
  RadioButton,
  RadioGroup,
  Select,
  TimePicker,
  DatePicker,
  Progress,
  Upload,
  UploadPro,
  Step,
  SpStepItem,
  Form,
  FormItem,
  FormSubmitBtns,
  Tag,
  Table,
  TableCell,
  TableColumn,
  Tabs,
  TabPane,
  Pagination,
  Modal,
  PasswordInput,
  PopupTip,
  TimeSelect,
  Cascader,
  CascaderPanel,
  ScrollBar
]

let Sparta = {}
Sparta.install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
    Sparta[component.name] = component.name
  })

  Vue.prototype.$sparta = {
    THEME: 'globalpay'
  }
  Vue.prototype.$sparta.imgPreview = ImgPreview()
  Vue.prototype.$sparta.error = Toast('error')
  Vue.prototype.$sparta.success = Toast('success')
  Vue.prototype.$sparta.warning = Toast('warning')
  Vue.prototype.$sparta.info = Toast('info')
  Vue.prototype.$sparta.confirm = confirm
}


// 整体引入
export default Sparta
// 按需引入支持
export {
  Style,
  Row,
  Col,
  Layout,
  Header,
  Footer,
  Aside,
  Main,
  Menu,
  Window,
  Dropdown,
  DropdownItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  OptionGroup,
  Option,
  Radio,
  RadioButton,
  RadioGroup,
  Select,
  TimePicker,
  DatePicker,
  Progress,
  Upload,
  UploadPro,
  Step,
  SpStepItem,
  Form,
  FormItem,
  FormSubmitBtns,
  Tag,
  Table,
  TableCell,
  TableColumn,
  Tabs,
  TabPane,
  Pagination,
  Modal,
  PasswordInput,
  PopupTip,
  ImgPreview,
  Toast,
  TimeSelect,
  Cascader,
  CascaderPanel,
  ScrollBar
}