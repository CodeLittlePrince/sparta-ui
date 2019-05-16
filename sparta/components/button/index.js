import Button from './src'

Button.install = Vue => {
  Vue.component(Button.name, Button)
}

export default Button
