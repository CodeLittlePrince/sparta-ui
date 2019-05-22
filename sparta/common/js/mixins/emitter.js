/**
 * 广播所有目标子组件，触发指定事件（自上往下）
 * @param {string} componentName 组件的name
 * @param {string} eventName 事件名字
 * @param {any} params 参数
 */
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export default {
  methods: {
    /**
     * 触发父级中目标组件中的指定事件（自下往上）
     * @param {string} componentName 组件的name
     * @param {string} eventName 事件名字
     * @param {any} params 参数
     */
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}
