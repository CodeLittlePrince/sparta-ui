import Header from './src'

Header.install = Vue => {
  Vue.component(Header.name, Header)
}

export default Header
