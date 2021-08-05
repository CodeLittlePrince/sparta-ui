import Style from './components/style'
import Row from './components/row'
import Col from './components/col'
import Layout from './components/layout'
import Header from './components/header'
import Footer from './components/footer'
import Aside from './components/aside'
import Main from './components/main'
import Menu from './components/menu'
import Window from './components/window'
import Dropdown from './components/dropdown'
import DropdownItem from './components/dropdown-item'
import Button from './components/button'
import ButtonGroup from './components/button-group'
import Checkbox from './components/checkbox'
import CheckboxGroup from './components/checkbox-group'
import Input from './components/input'
import OptionGroup from './components/option-group'
import Option from './components/option'
import Radio from './components/radio'
import RadioGroup from './components/radio-group'
import Select from './components/select'
import TimePicker from './components/time-picker'
import DatePicker from './components/date-picker'
import Progress from './components/progress'
import Upload from './components/upload'
import ImgPreview from './components/img-preview'
import Form from './components/form'
import FormItem from './components/form-item'
import Tag from './components/tag'
import Table from './components/table'
import TableCell from './components/table-cell'
import TableColumn from './components/table-column'
import Tabs from './components/tabs'
import TabPane from './components/tab-pane'
import Pagination from './components/pagination'
import Modal from './components/modal'
import Toast from './components/toast'
import confrim from './components/confirm'
import PasswordInput from './components/password-input'

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
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  OptionGroup,
  Option,
  Radio,
  RadioGroup,
  Select,
  TimePicker,
  DatePicker,
  Progress,
  Upload,
  Form,
  FormItem,
  Tag,
  Table,
  TableCell,
  TableColumn,
  Tabs,
  TabPane,
  Pagination,
  Modal,
  PasswordInput
]

let Sparta = {}
Sparta.install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
    Sparta[component.name] = component.name
  })

  Vue.prototype.$sparta = {}
  Vue.prototype.$sparta.imgPreview = ImgPreview()
  Vue.prototype.$sparta.error = Toast('error')
  Vue.prototype.$sparta.success = Toast('success')
  Vue.prototype.$sparta.warning = Toast('warning')
  Vue.prototype.$sparta.info = Toast('info')
  Vue.prototype.$sparta.confirm = confrim
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
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  OptionGroup,
  Option,
  Radio,
  RadioGroup,
  Select,
  TimePicker,
  DatePicker,
  Progress,
  Upload,
  Form,
  FormItem,
  Tag,
  Table,
  TableCell,
  TableColumn,
  Tabs,
  TabPane,
  Pagination,
  Modal,
  PasswordInput
}