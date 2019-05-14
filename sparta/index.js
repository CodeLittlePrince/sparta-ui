import './common/scss'
import Row from './components/row'
import Col from './components/col'
import Button from './components/button'
import Checkbox from './components/checkbox'
import Input from './components/input'
import OptionGroup from './components/option-group'
import Option from './components/option'
import Radio from './components/radio'
import Select from './components/select'
import Tag from './components/tag'

const components = [
  Row,
  Col,
  Button,
  Checkbox,
  Input,
  OptionGroup,
  Option,
  Radio,
  Select,
  Tag
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
  Button,
  Checkbox,
  Input,
  OptionGroup,
  Option,
  Radio,
  Select,
  Tag
}