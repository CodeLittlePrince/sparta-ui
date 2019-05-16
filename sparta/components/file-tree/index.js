import FileTree from './src'

FileTree.install = Vue => {
  Vue.component(FileTree.name, FileTree)
}

export default FileTree
