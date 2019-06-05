import './common/scss'
import Row from './components/row'
import Col from './components/col'
import Layout from './components/layout'
import Header from './components/header'
import Footer from './components/footer'
import Aside from './components/aside'
import Main from './components/main'
import Menu from './components/menu'
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
import Tag from './components/tag'
import Table from './components/table'
import TableCell from './components/table-cell'
import TableColumn from './components/table-column'

const components = [
  Row,
  Col,
  Layout,
  Header,
  Footer,
  Aside,
  Main,
  Menu,
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
  Tag,
  Table,
  TableCell,
  TableColumn
]

let Sparta = {}
Sparta.install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
    Sparta[component.name] = component.name
  })
}

// 整体引入
export default Sparta
// 按需引入支持
export {
  Row,
  Col,
  Layout,
  Header,
  Footer,
  Aside,
  Main,
  Menu,
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
  Tag,
  Table,
  TableCell,
  TableColumn
}