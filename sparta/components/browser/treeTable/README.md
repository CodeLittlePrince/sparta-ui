Vue2.x extends混合策略
https://v2.cn.vuejs.org/v2/api/#extends []

data:数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。[Title](https://v2.cn.vuejs.org/v2/api/#extends)
同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
data 变量冲突 [递归合并]
数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。 优先级是：

组件内 > 最后一个mixins文件 > 最前一个mixins文件
computed 变量冲突
是覆盖的，覆盖的优先级是：

组件内 > 最后一个mixins文件 > 最前一个mixins文件
同名钩子函数 [都运行]
同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。 优先级

最前一个mixins文件 > 最后一个mixins文件 > 组件内
watch 重复监听 [都运行]
将合并为一个数组，因此都将被调用。 优先级

最前一个mixins文件 > 最后一个mixins文件 > 组件内
methods 重复定义
其余值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。 是覆盖的，覆盖的优先级是：

组件内 > 最后一个mixins文件 > 最前一个mixins文件