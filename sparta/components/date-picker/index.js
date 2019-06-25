import DatePicker from './src'

DatePicker.install = Vue => {
  Vue.component(DatePicker.name, DatePicker)
}

export default DatePicker