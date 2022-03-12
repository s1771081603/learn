# [应用配置](https://v3.cn.vuejs.org/api/application-config.html#应用配置)

每个 Vue 应用都会暴露一个 `config` 对象，该对象包含此应用的配置设置：

```js
const app = createApp({})
console.log(app.config)
```

在挂载应用之前，你可以修改其 property，如下所示。



##  [errorHandler](https://v3.cn.vuejs.org/api/application-config.html#errorHandler)

- **类型**：`Function`

- **默认**：`undefined`

- **用法**：

  ```js
  app.config.errorHandler = (err, vm, info) => {
    // 处理错误
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  }
  ```

  指定一个处理函数，来处理组件渲染方法和侦听器执行期间抛出的未捕获错误。这个处理函数被调用时，可获取错误信息和应用实例。



##  [warnHandler](https://v3.cn.vuejs.org/api/application-config.html#warnHandler)

- 

- **类型**：`Function`

- **默认**：`undefined`

- **用法**：

  ```js
  app.config.warnHandler = function(msg, vm, trace) {
    // `trace` 是组件的继承关系追踪
  }
  ```

​		为 Vue 的运行时警告指定一个自定义处理函数。注意这只会在开发环境下生效，在生产环境下它会被忽略。



## [globalProperties](https://v3.cn.vuejs.org/api/application-config.html#globalProperties)

- **类型**：`[key: string]: any`
- **默认**：`undefined`
- **用法**：

```js
app.config.globalProperties.foo = 'bar'

app.component('child-component', {
  mounted() {
    console.log(this.foo) // 'bar'
  }
})
```

添加一个可以在应用的任何组件实例中访问的全局 property。组件的 property 在命名冲突具有优先权。

这可以代替 Vue 2.x `Vue.prototype` 扩展：

```js
// 之前(Vue 2.x)
Vue.prototype.$http = () => {}

// 之后(Vue 3.x)
const app = createApp({})
app.config.globalProperties.$http = () => {}
```



## [optionMergeStrategies](https://v3.cn.vuejs.org/api/application-config.html#optionMergeStrategies)

- **类型**：`{ [key: string]: Function }`
- **默认**：`{}`
- **用法**：

```js
const app = createApp({
  mounted() {
    console.log(this.$options.hello)
  }
})

app.config.optionMergeStrategies.hello = (parent, child) => {
  return `Hello, ${child}`
}

app.mixin({
  hello: 'Vue'
})

// 'Hello, Vue'
```

为自定义选项定义合并策略。

合并策略选项分别接收在父实例和子实例上定义的选项的值作为第一个和第二个参数。

- **参考**：[自定义选项合并策略](https://v3.cn.vuejs.org/guide/mixins.html#自定义选项合并策略)



## [performance](https://v3.cn.vuejs.org/api/application-config.html#performance)

- **类型**：`boolean`
- **默认**：`false`
- **用法**：

设置为 `true` 以在浏览器开发工具的 performance/timeline 面板中启用对组件初始化、编译、渲染和更新的性能追踪。只适用于开发模式和支持 [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API 的浏览器。



## [compilerOptions 3.1+](https://v3.cn.vuejs.org/api/application-config.html#compileroptions)

- **类型**：`Object`

配置运行时编译器的选项。设置在这个对象上的值将会被传入浏览器内的模板编译器，并影响配置过的应用内的每个组件。注意，你也可以使用 [`compilerOptions` 选项](https://v3.cn.vuejs.org/api/options-misc.html#compileroptions)在每个组件的基础上覆写这些选项。

重要

该配置选项只在完整的构建版本中生效 (例如可以在浏览器中编译模板的独立版 `vue.js`)。如果你使用的是附带额外构建设置的仅运行时版本，编译器选项必须传入 `@vue/compiler-dom` 构建工具的配置来替代

- 对 `vue-loader` 来说：[通过 `compilerOptions` loader 选项传入](https://vue-loader.vuejs.org/options.html#compileroptions)。也可以查阅 [`vue-cli` 中的配置方式](https://cli.vuejs.org/zh/guide/webpack.html#修改-loader-选项)。
- 对 `vite` 来说：[通过 `@vitejs/plugin-vue` 选项传入](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom)。



### [compilerOptions.isCustomElement](https://v3.cn.vuejs.org/api/application-config.html#compileroptions-iscustomelement)

- **类型**：`(tag: string) => boolean`
- **默认值**：`undefined`
- **用法**：

```js
// 任何 'ion-' 开头的元素都会被识别为自定义元素
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-')
```

指定一个方法来识别 Vue 以外 (例如通过 Web Components API) 定义的自定义元素。如果组件匹配了这个条件，就不需要本地或全局注册，Vue 也不会抛出 `Unknown custom element` 的警告。

> 注意所有的原生 HTML 和 SVG 标记不需要被这个函数匹配——Vue 的解析器会自动检测它们。



### [compilerOptions.whitespace](https://v3.cn.vuejs.org/api/application-config.html#compileroptions-whitespace)

- **类型**：`'condense' | 'preserve'`
- **默认值**：`'condense'`
- **用法**：

```js
app.config.compilerOptions.whitespace = 'preserve'
```

默认情况下，Vue 会移除/压缩模板元素之间的空格以产生更高效的编译结果：

1. 元素内的多个开头/结尾空格会被压缩成一个空格
2. 元素之间的包括折行在内的多个空格会被移除
3. 文本结点之间可被压缩的空格都会被压缩成为一个空格

设置 `'preserve'` 的值可以禁用 (2) 和 (3)。



### [compilerOptions.delimiters](https://v3.cn.vuejs.org/api/application-config.html#compileroptions-delimiters)

- **类型**：`Array<string>`
- **默认值**：`['{{', '}}']`
- **用法**：

```js
// 将边界符改变为 ES6 模板字符串风格
app.config.compilerOptions.delimiters = ['${', '}']    
```

设置用在模板内的文本插值的边界符。

这个选项一般会用于避免和同样使用大括号语法的服务端框架发生冲突。



### [compilerOptions.comments](https://v3.cn.vuejs.org/api/application-config.html#compileroptions-comments)

- **类型**：`boolean`
- **默认值**：`false`
- **用法**：

```js
app.config.compilerOptions.comments = true
```

默认情况下，Vue 会在生产环境下移除模板内的 HTML 注释。将这个选项设置为 `true` 可以强制 Vue 在生产环境下保留注释。而在开发环境下注释是始终被保留的。

这个选项一般会用于依赖 HTML 注释的其它库和 Vue 配合使用。



# [应用 API](https://v3.cn.vuejs.org/api/application-api.html#应用-api)

在 Vue 3 中，改变全局 Vue 行为的 API 现在被移动到了由新的 `createApp` 方法所创建的应用实例上。此外，现在它们的影响仅限于该特定应用实例：

```js
import { createApp } from 'vue'

const app = createApp({})
```

调用 `createApp` 返回一个应用实例。该实例提供了一个应用上下文。应用实例挂载的整个组件树共享相同的上下文，该上下文提供了之前在 Vue 2.x 中“全局”的配置。

另外，由于 `createApp` 方法返回应用实例本身，因此可以在其后链式调用其它方法，这些方法可以在以下部分中找到。

## [component](https://v3.cn.vuejs.org/api/application-api.html#component)

- **参数：**

  - `{string} name`
  - `{Function | Object} [definition]`

- **返回值：**

  - 如果传入 `definition` 参数，返回应用实例。
  - 如果不传入 `definition` 参数，返回组件定义。

- **用法：**

  注册或检索全局组件。注册还会使用给定的 `name` 参数自动设置组件的 `name`。

- **示例：**

```js
import { createApp } from 'vue'

const app = createApp({})

// 注册一个名为my-component的组件
app.component('my-component', {
  /* ... */
})

// 检索注册的组件(始终返回构造函数)
const MyComponent = app.component('my-component')
```

- **参考：**[组件基础](https://v3.cn.vuejs.org/guide/component-basics.html)



## [config](https://v3.cn.vuejs.org/api/application-api.html#config)

- **用法：**

包含应用配置的对象。

- **示例：**

```js
import { createApp } from 'vue'
const app = createApp({})

app.config = {...}
```

- **参考：**[应用配置](https://v3.cn.vuejs.org/api/application-config.html)



## [directive](https://v3.cn.vuejs.org/api/application-api.html#directive)

- **参数：**

  - `{string} name`
  - `{Function | Object} [definition]`

- **返回值：**

  - 如果传入 `definition` 参数，返回应用实例。
  - 如果不传入 `definition` 参数，返回指令定义。

- **用法：**

  注册或检索全局指令。

- **示例：**

```js
import { createApp } from 'vue'
const app = createApp({})

// 注册
app.directive('my-directive', {
  // 指令是具有一组生命周期的钩子：
  // 在绑定元素的 attribute 或事件监听器被应用之前调用
  created() {},
  // 在绑定元素的父组件挂载之前调用
  beforeMount() {},
  // 绑定元素的父组件被挂载时调用
  mounted() {},
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() {},
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated() {},
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() {},
  // 卸载绑定元素的父组件时调用
  unmounted() {}
})

// 注册 (功能指令)
app.directive('my-directive', () => {
  // 这将被作为 `mounted` 和 `updated` 调用
})

// getter, 如果已注册，则返回指令定义
const myDirective = app.directive('my-directive')
```

指令钩子传递了这些参数：



### [el](https://v3.cn.vuejs.org/api/application-api.html#el)

指令绑定到的元素。这可用于直接操作 DOM。



### [binding](https://v3.cn.vuejs.org/api/application-api.html#binding)

包含以下 property 的对象。

- `instance`：使用指令的组件实例。
- `value`：传递给指令的值。例如，在 `v-my-directive="1 + 1"` 中，该值为 `2`。
- `oldValue`：先前的值，仅在 `beforeUpdate` 和 `updated` 中可用。值是否已更改都可用。
- `arg`：参数传递给指令 (如果有)。例如在 `v-my-directive:foo` 中，arg 为 `"foo"`。
- `modifiers`：包含修饰符 (如果有) 的对象。例如在 `v-my-directive.foo.bar` 中，修饰符对象为 `{foo: true，bar: true}`。
- `dir`：一个对象，在注册指令时作为参数传递。例如，在以下指令中

```js
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
```

`dir` 将会是以下对象：

```js
{
  mounted(el) {
    el.focus()
  }
}
```



### [vnode](https://v3.cn.vuejs.org/api/application-api.html#vnode)

上面作为 el 参数收到的真实 DOM 元素的蓝图。



### [prevNode](https://v3.cn.vuejs.org/api/application-api.html#prevnode)

上一个虚拟节点，仅在 `beforeUpdate` 和 `updated` 钩子中可用。



### Note

除了 `el` 之外，你应该将这些参数视为只读，并且永远不要修改它们。如果你需要跨钩子共享信息，建议通过元素的[自定义数据属性集](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset)进行共享。

- **参考：**[自定义指令](https://v3.cn.vuejs.org/guide/custom-directive.html)

  

## [mixin](https://v3.cn.vuejs.org/api/application-api.html#mixin)

- **参数：**

  - `{Object} mixin`

- **返回值：**

  - 应用实例

- **用法：**

  将一个 mixin 应用在整个应用范围内。一旦注册，它们就可以在当前的应用中任何组件模板内使用它。插件作者可以使用此方法将自定义行为注入组件。**不建议在应用代码中使用**。

- **参考：**[全局 mixin](https://v3.cn.vuejs.org/guide/mixins.html#全局-mixin)

  

## [mount](https://v3.cn.vuejs.org/api/application-api.html#mount)

- **参数：**

  - `{Element | string} rootContainer`
  - `{boolean} isHydrate`

- **返回值：**

  - 根组件实例

- **用法：**

  所提供 DOM 元素的 `innerHTML` 将被替换为应用根组件的模板渲染结果。

- **示例：**

```html
<body>
  <div id="my-app"></div>
</body>
```

```js
import { createApp } from 'vue'

const app = createApp({})
// 做一些必要的准备
app.mount('#my-app')
```

- 参考：

  - [生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)

    

## [provide](https://v3.cn.vuejs.org/api/application-api.html#provide)

- **参数：**

  - `{string | Symbol} key`
  - `value`

- **返回值：**

  - 应用实例

- **用法：**

  设置一个可以被注入到应用范围内所有组件中的值。组件应该使用 `inject` 来接收 provide 的值。

  从 `provide`/`inject` 的角度来看，可以将应用程序视为根级别的祖先，而根组件是其唯一的子级。

  该方法不应该与 [provide 组件选项](https://v3.cn.vuejs.org/api/options-composition.html#provide-inject)或组合式 API 中的 [provide 方法](https://v3.cn.vuejs.org/api/composition-api.html#provide-inject)混淆。虽然它们也是相同的 `provide`/`inject` 机制的一部分，但是是用来配置组件 provide 的值而不是应用 provide 的值。

  通过应用提供值在写插件时尤其有用，因为插件一般不能使用组件提供值。这是使用 [globalProperties](https://v3.cn.vuejs.org/api/application-config.html#globalproperties) 的替代选择。

  Note

  `provide` 和 `inject` 绑定不是响应式的。这是有意为之。不过，如果你向下传递一个响应式对象，这个对象上的 property 会保持响应式。

- **示例：**

  向根组件中注入一个 property，值由应用提供。

```js
import { createApp } from 'vue'

const app = createApp({
  inject: ['user'],
  template: `
    <div>
      {{ user }}
    </div>
  `
})

app.provide('user', 'administrator')
```

- 参考：

  - [Provide / Inject](https://v3.cn.vuejs.org/guide/component-provide-inject.html)

    

## [unmount](https://v3.cn.vuejs.org/api/application-api.html#unmount)

- **用法：**

  卸载应用实例的根组件。

- **示例：**

```html
<body>
  <div id="my-app"></div>
</body>
```

```js
import { createApp } from 'vue'

const app = createApp({})
// 做一些必要的准备
app.mount('#my-app')

// 挂载5秒后，应用将被卸载
setTimeout(() => app.unmount(), 5000)
```



## [use](https://v3.cn.vuejs.org/api/application-api.html#use)

- **参数：**

  - `{Object | Function} plugin`
  - `...options (可选)`

- **返回值：**

  - 应用实例

- **用法：**

  安装 Vue.js 插件。如果插件是一个对象，它必须暴露一个 `install` 方法。如果它本身是一个函数，它将被视为安装方法。

  该安装方法将以应用实例作为第一个参数被调用。传给 `use` 的其他 `options` 参数将作为后续参数传入该安装方法。

  当在同一个插件上多次调用此方法时，该插件将仅安装一次。

- **示例：**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'
  
  const app = createApp({})
  
  app.use(MyPlugin)
  app.mount('#app')
  ```

- **参考：**[插件](https://v3.cn.vuejs.org/guide/plugins.html)

  

## [version](https://v3.cn.vuejs.org/api/application-api.html#version)

- **用法：**

  以字符串形式提供已安装的 Vue 的版本号。这对于基于不同版本使用不同策略的社区[插件](https://v3.cn.vuejs.org/guide/plugins.html)来说特别有用。

- **示例：**

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
        console.warn('This plugin requires Vue 3')
      }
      // ...
    }
  }
  ```



# [全局 API](https://v3.cn.vuejs.org/api/global-api.html#全局-api)

如果你使用的是 CDN 构建版本，那么全局 API 可以通过全局对象 `Vue` 来访问，例如：

```js
const { createApp, h, nextTick } = Vue
```

如果你使用的是 ES 模块，那么它们可以直接导入：

```js
import { createApp, h, nextTick } from 'vue'
```

处理响应性的全局函数，如 `reactive` 和 `ref`，其文档是单独编写的。关于这些函数，请参见[响应性 API](https://v3.cn.vuejs.org/api/reactivity-api.html)。

## [createApp](https://v3.cn.vuejs.org/api/global-api.html#createapp)

返回一个提供应用上下文的应用实例。应用实例挂载的整个组件树共享同一个上下文。

```js
const app = createApp({})
```

你可以在 `createApp` 之后链式调用其它方法，这些方法可以在[应用 API](https://v3.cn.vuejs.org/api/application-api.html) 中找到。



## [参数](https://v3.cn.vuejs.org/api/global-api.html#参数)

该函数接收一个根组件选项对象作为第一个参数：

```js
const app = createApp({
  data() {
    return {
      ...
    }
  },
  methods: {...},
  computed: {...}
  ...
})
```

使用第二个参数，我们可以将根 prop 传递给应用程序：

```js
const app = createApp(
  {
    props: ['username']
  },
  { username: 'Evan' }
)
```

```html
<div id="app">
  <!-- 会显示 'Evan' -->
  {{ username }}
</div>
```

根 prop 是原始的 prop，就像那些通过 [`h`](https://v3.cn.vuejs.org/api/global-api.html#h) 创建的 VNode。除了组件 prop，它们也包含应用于根组件的 attributes 和事件监听器。



### [类型声明](https://v3.cn.vuejs.org/api/global-api.html#类型声明)

```ts
interface Data {
  [key: string]: unknown
}

export type CreateAppFunction<HostElement> = (
  rootComponent: PublicAPIComponent,
  rootProps?: Data | null
) => App<HostElement>
```



## [h](https://v3.cn.vuejs.org/api/global-api.html#h)

返回一个”虚拟节点“，通常缩写为 **VNode**：一个普通对象，其中包含向 Vue 描述它应在页面上渲染哪种节点的信息，包括所有子节点的描述。它的目的是用于手动编写的[渲染函数](https://v3.cn.vuejs.org/guide/render-function.html)：

```js
render() {
  return h('h1', {}, 'Some title')
}
```

### [参数](https://v3.cn.vuejs.org/api/global-api.html#参数-2)

接收三个参数：`type`，`props` 和 `children`

#### [type](https://v3.cn.vuejs.org/api/global-api.html#type)

- **类型：**`String | Object | Function`

- **详细：**

  HTML 标签名、组件、异步组件或函数式组件。使用返回 null 的函数将渲染一个注释。此参数是必需的。

#### [props](https://v3.cn.vuejs.org/api/global-api.html#props)

- **类型：**`Object`

- **详细：**

  一个对象，与我们将在模板中使用的 attribute、prop 和事件相对应。可选。

#### [children](https://v3.cn.vuejs.org/api/global-api.html#children)

- **类型：**`String | Array | Object`

- **详细：**

  子代 VNode，使用 `h()` 生成，或者使用字符串来获取“文本 VNode”，或带有插槽的对象。可选。

  ```js
  h('div', {}, [
    'Some text comes first.',
    h('h1', 'A headline'),
    h(MyComponent, {
      someProp: 'foobar'
    })
  ])
  ```

  

## [defineComponent](https://v3.cn.vuejs.org/api/global-api.html#definecomponent)

从实现上看，`defineComponent` 只返回传递给它的对象。但是，就类型而言，返回的值有一个合成类型的构造函数，用于手动渲染函数、TSX 和 IDE 工具支持。

### [参数](https://v3.cn.vuejs.org/api/global-api.html#参数-3)

具有组件选项的对象

```js
import { defineComponent } from 'vue'

const MyComponent = defineComponent({
  data() {
    return { count: 1 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
```

或者是一个 `setup` 函数，函数名称将作为组件名称来使用

```js
import { defineComponent, ref } from 'vue'

const HelloWorld = defineComponent(function HelloWorld() {
  const count = ref(0)
  return { count }
})
```



## [defineAsyncComponent](https://v3.cn.vuejs.org/api/global-api.html#defineasynccomponent)

创建一个只有在需要时才会加载的异步组件。

### [参数](https://v3.cn.vuejs.org/api/global-api.html#参数-4)

对于基本用法，`defineAsyncComponent` 可以接受一个返回 `Promise` 的工厂函数。Promise 的 `resolve` 回调应该在服务端返回组件定义后被调用。你也可以调用 `reject(reason)` 来表示加载失败。

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

app.component('async-component', AsyncComp)
```

当使用[局部注册](https://v3.cn.vuejs.org/guide/component-registration.html#局部注册)时，你也可以直接提供一个返回 `Promise` 的函数：

```js
import { createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
})
```

对于高阶用法，`defineAsyncComponent` 可以接受一个对象：

`defineAsyncComponent` 方法还可以返回以下格式的对象：

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent({
  // 工厂函数
  loader: () => import('./Foo.vue'),
  // 加载异步组件时要使用的组件
  loadingComponent: LoadingComponent,
  // 加载失败时要使用的组件
  errorComponent: ErrorComponent,
  // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
  delay: 200,
  // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
  // 默认值：Infinity（即永不超时，单位 ms）
  timeout: 3000,
  // 定义组件是否可挂起 | 默认值：true
  suspensible: false,
  /**
   *
   * @param {*} error 错误信息对象
   * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
   * @param {*} fail  一个函数，指示加载程序结束退出
   * @param {*} attempts 允许的最大重试次数
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // 请求发生错误时重试，最多可尝试 3 次
      retry()
    } else {
      // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
      // 必须调用其中一个才能继续错误处理。
      fail()
    }
  }
})
```

**参考**：[动态和异步组件](https://v3.cn.vuejs.org/guide/component-dynamic-async.html)



## [defineCustomElement 3.2+](https://v3.cn.vuejs.org/api/global-api.html#definecustomelement)

该方法接受和 [`defineComponent`](https://v3.cn.vuejs.org/api/global-api.html#definecomponent) 相同的参数，但是返回一个原生的[自定义元素](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements)，该元素可以用于任意框架或不基于框架使用。

用法示例：

```html
<my-vue-element></my-vue-element>
```

```js
import { defineCustomElement } from 'vue'
const MyVueElement = defineCustomElement({
  // 这里是普通的 Vue 组件选项
  props: {},
  emits: {},
  template: `...`,
  // 只用于 defineCustomElement：注入到 shadow root 中的 CSS
  styles: [`/* inlined css */`]
})
// 注册该自定义元素。
// 注册过后，页面上所有的 `<my-vue-element>` 标记会被升级。
customElements.define('my-vue-element', MyVueElement)
// 你也可以用编程的方式初始化这个元素：
// (在注册之后才可以这样做)
document.body.appendChild(
  new MyVueElement({
    // 初始化的 prop (可选)
  })
)
```

关于使用 Vue，尤其是通过单文件组件构建 Web Components 的更多细节，请查阅[Vue 和 Web Components](https://v3.cn.vuejs.org/guide/web-components.html#使用-Vue-构建自定义元素)。



## [resolveComponent](https://v3.cn.vuejs.org/api/global-api.html#resolvecomponent)

WARNING

`resolveComponent` 只能在 `render` 或 `setup` 函数中使用。

如果在当前应用实例中可用，则允许按名称解析 `component`。

返回一个 `Component`。如果没有找到，则返回接收的参数 `name`。

```js
const app = createApp({})
app.component('MyComponent', {
  /* ... */
})
```

```js
import { resolveComponent } from 'vue'
render() {
  const MyComponent = resolveComponent('MyComponent')
}
```

### [参数](https://v3.cn.vuejs.org/api/global-api.html#参数-5)

接受一个参数：`name`

#### [name](https://v3.cn.vuejs.org/api/global-api.html#name)

- **类型：**`String`

- **详细：**

  已加载的组件的名称。



## [resolveDynamicComponent](https://v3.cn.vuejs.org/api/global-api.html#resolvedynamiccomponent)

WARNING

`resolveDynamicComponent` 只能在 `render` 或 `setup` 函数中使用。

允许使用与 `<component :is="">` 相同的机制来解析一个 `component`。

返回已解析的 `Component` 或新创建的 `VNode`，其中组件名称作为节点标签。如果找不到 `Component`，将发出警告。

```js
import { resolveDynamicComponent } from 'vue'
render () {
  const MyComponent = resolveDynamicComponent('MyComponent')
}
```

### [参数](https://v3.cn.vuejs.org/api/global-api.html#参数-6)

接受一个参数：`component`

#### [component](https://v3.cn.vuejs.org/api/global-api.html#component)

- **类型：**`String | Object (组件的选项对象)`

- **详细：**

  有关详细信息，请参阅[动态组件](https://v3.cn.vuejs.org/guide/component-dynamic-async.html)上的文档。



## [resolveDirective](https://v3.cn.vuejs.org/api/global-api.html#resolvedirective)

WARNING

`resolveDirective` 只能在 `render` 或 `setup` 函数中使用。

如果在当前应用实例中可用，则允许通过其名称解析一个 `directive`。

返回一个 `Directive`。如果没有找到，则返回 `undefined`。

```js
const app = createApp({})
app.directive('highlight', {})
```

```js
import { resolveDirective } from 'vue'
render () {
  const highlightDirective = resolveDirective('highlight')
}
```

### [参数](https://v3.cn.vuejs.org/api/global-api.html#参数-7)

接受一个参数：`name`

#### [name](https://v3.cn.vuejs.org/api/global-api.html#name-2)

- **类型：**`String`

- **详细：**

  已加载的指令的名称。



## [withDirectives](https://v3.cn.vuejs.org/api/global-api.html#withdirectives)

WARNING

`withDirectives` 只能在 `render` 或 `setup` 函数中使用。

允许将指令应用于 **VNode**。返回一个包含应用指令的 VNode。

```js
import { withDirectives, resolveDirective } from 'vue'
const foo = resolveDirective('foo')
const bar = resolveDirective('bar')

return withDirectives(h('div'), [
  [foo, this.x],
  [bar, this.y]
])
```

### [参数](https://v3.cn.vuejs.org/api/global-api.html#参数-8)

接受两个参数：`vnode` 和 `directives`。

#### [vnode](https://v3.cn.vuejs.org/api/global-api.html#vnode)

- **类型：**`vnode`

- **详细：**

  一个虚拟节点，通常使用 `h()` 创建。

#### [directives](https://v3.cn.vuejs.org/api/global-api.html#directives)

- **类型：**`Array`

- **详细：**

  一个指令数组。

  每个指令本身都是一个数组，最多可以定义 4 个索引，如以下示例所示。

  - `[directive]` - 该指令本身。必选。

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [[MyDirective]])
  ```

  - `[directive, value]` - 上述内容，再加上分配给指令的类型为 `any` 的值。

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [[MyDirective, 100]])
  ```

  - `[directive, value, arg]` - 上述内容，再加上一个 `string` 参数，比如：在 `v-on:click` 中的 `click`。

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [
    [MyDirective, 100, 'click']
  ])
  ```

  - `[directive, value, arg, modifiers]` - 上述内容，再加上定义任何修饰符的 `key: value` 键值对 `Object`。

  ```js
  const MyDirective = resolveDirective('MyDirective')
  const nodeWithDirectives = withDirectives(h('div'), [
    [MyDirective, 100, 'click', { prevent: true }]
  ])
  ```

  

## [createRenderer](https://v3.cn.vuejs.org/api/global-api.html#createrenderer)

createRenderer 函数接受两个泛型参数： `HostNode` 和 `HostElement`，对应于宿主环境中的 Node 和 Element 类型。

例如，对于 runtime-dom，HostNode 将是 DOM `Node` 接口，HostElement 将是 DOM `Element` 接口。

自定义渲染器可以传入特定于平台的类型，如下所示：

```ts
import { createRenderer } from 'vue'
const { render, createApp } = createRenderer<Node, Element>({
  patchProp,
  ...nodeOps
})
```

### [参数](https://v3.cn.vuejs.org/api/global-api.html#参数-9)

接受两个参数：`HostNode` 和 `HostElement`。

#### [HostNode](https://v3.cn.vuejs.org/api/global-api.html#hostnode)

- **类型：**`Node`

- **详细：**

  宿主环境中的节点。

#### [HostElement](https://v3.cn.vuejs.org/api/global-api.html#hostelement)

- **类型：**`Element`

- **详细：**

  宿主环境中的元素。



## [nextTick](https://v3.cn.vuejs.org/api/global-api.html#nexttick)

将回调推迟到下一个 DOM 更新周期之后执行。在更改了一些数据以等待 DOM 更新后立即使用它。

```js
import { createApp, nextTick } from 'vue'

const app = createApp({
  setup() {
    const message = ref('Hello!')
    const changeMessage = async newMessage => {
      message.value = newMessage
      await nextTick()
      console.log('Now DOM is updated')
    }
  }
})
```

**参考**：[`$nextTick` 实例方法](https://v3.cn.vuejs.org/api/instance-methods.html#nexttick)



## [mergeProps](https://v3.cn.vuejs.org/api/global-api.html#mergeprops)

将包含 VNode prop 的多个对象合并为一个单独的对象。其返回的是一个新创建的对象，而作为参数传递的对象则不会被修改。

可以传递不限数量的对象，后面参数的 property 优先。事件监听器被特殊处理，`class` 和 `style` 也是如此，这些 property 的值是被合并的而不是覆盖的。

```js
import { h, mergeProps } from 'vue'
export default {
  inheritAttrs: false,
  render() {
    const props = mergeProps(
      {
        // 该 class 将与 $attrs 中的其他 class 合并。
        class: 'active'
      },
      this.$attrs
    )

    return h('div', props)
  }
}
```



## [useCssModule](https://v3.cn.vuejs.org/api/global-api.html#usecssmodule)

WARNING

`useCssModule` 只能在 `render` 或 `setup` 函数中使用。

允许在 [`setup`](https://v3.cn.vuejs.org/api/composition-api.html#setup) 的[单文件组件](https://v3.cn.vuejs.org/guide/single-file-component.html)函数中访问 CSS 模块。

```vue
<script>
import { h, useCssModule } from 'vue'
export default {
  setup() {
    const style = useCssModule()
    return () =>
      h(
        'div',
        {
          class: style.success
        },
        'Task complete!'
      )
  }
}
</script>
<style module>
.success {
  color: #090;
}
</style>
```

关于使用 CSS 模块的更多信息，请参阅 [单文件组件样式特性：``](https://v3.cn.vuejs.org/api/sfc-style.html#style-module)。

### [参数](https://v3.cn.vuejs.org/api/global-api.html#参数-10)

接受一个参数：`name`

#### [名词](https://v3.cn.vuejs.org/api/global-api.html#名词)

- **类型：** `String`

- **详细：**

  CSS 模块的名称。默认为 `'$style'`。



## [version](https://v3.cn.vuejs.org/api/global-api.html#version)

以字符串形式提供已安装的 Vue 的版本号。

```js
const version = Number(Vue.version.split('.')[0])
if (version === 3) {
  // Vue 3
} else if (version === 2) {
  // Vue 2
} else {
  // 不支持的 Vue 的版本
}
```

**参考：**[应用 API - version](https://v3.cn.vuejs.org/api/application-api.html#version)



# [选项式 API](https://v3.cn.vuejs.org/api/options-api.html#选项式-api)

## Data

### [data](https://v3.cn.vuejs.org/api/options-data.html#data-2)

- **类型：**`Function`

- **详细：**

  该函数返回组件实例的 data 对象。在 `data` 中，我们不建议观察具有自身状态行为的对象，如浏览器 API 对象和原型 property。一个好主意是这里只有一个表示组件 data 的普通对象。

  一旦被侦听后，你就无法在根数据对象上添加响应式 property。因此推荐在创建实例之前，就声明所有的根级响应式 property。

  实例创建之后，可以通过 `vm.$data` 访问原始数据对象。组件实例也代理了 data 对象上所有的 property，因此访问 `vm.a` 等价于访问 `vm.$data.a`。

  以 `_` 或 `$` 开头的 property 不会被组件实例代理，因为它们可能和 Vue 内置的 property、API 方法冲突。你可以使用例如 `vm.$data._property` 的方式访问这些 property。

- **示例：**

  ```js
  // 直接创建一个实例
  const data = { a: 1 }
  
  // 这个对象将添加到组件实例中
  const vm = createApp({
    data() {
      return data
    }
  }).mount('#app')
  
  console.log(vm.a) // => 1
  ```

  注意，如果你为 data property 使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以通过该函数的第一个参数来访问实例：

  ```js
  data: vm => ({ a: vm.myProp })
  ```

- **参考**[深入响应性原理](https://v3.cn.vuejs.org/guide/reactivity.html)



### [props](https://v3.cn.vuejs.org/api/options-data.html#props)

- **类型：**`Array<string> | Object`

- **详细：**

  一个用于从父组件接收数据的数组或对象。它可以是基于数组的简单语法，也可以是基于对象的支持诸如类型检测、自定义验证和设置默认值等高阶配置的语法。

  你可以基于对象的语法使用以下选项：

  - `type`：可以是下列原生构造函数中的一种：`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`、任何自定义构造函数、或上述内容组成的数组。会检查一个 prop 是否是给定的类型，否则抛出警告。Prop 类型的[更多信息在此](https://v3.cn.vuejs.org/guide/component-props.html#prop-类型)。
  - `default`：`any` 为该 prop 指定一个默认值。如果该 prop 没有被传入，则使用这个值。对象或数组的默认值必须从一个工厂函数返回
  - `required`：`Boolean` 定义该 prop 是否是必填项。在非生产环境中，如果这个值为 truthy 且该 prop 没有被传入的，则一个控制台警告将会被抛出。
  - `validator`：`Function` 自定义验证函数会将该 prop 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 falsy 的值 (也就是验证失败)，一个控制台警告将会被抛出。你可以在[这里](https://v3.cn.vuejs.org/guide/component-props.html#prop-验证)查阅更多 prop 验证的相关信息。

- **示例：**

  ```js
  const app = createApp({})
  
  // 简单语法
  app.component('props-demo-simple', {
    props: ['size', 'myMessage']
  })
  
  // 对象语法，提供验证
  app.component('props-demo-advanced', {
    props: {
      // 类型检查
      height: Number,
      // 类型检查 + 其他验证
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: value => {
          return value >= 0
        }
      }
    }
  })
  ```

- **参考** [Props](https://v3.cn.vuejs.org/guide/component-props.html)



### [computed](https://v3.cn.vuejs.org/api/options-data.html#computed)

- **类型：**`{ [key: string]: Function | { get: Function, set: Function } }`

- **详细：**

  计算属性将被混入到组件实例中。所有 getter 和 setter 的 `this` 上下文自动地绑定为组件实例。

  注意，如果你为一个计算属性使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以通过该函数的第一个参数来访问实例：

  ```js
  computed: {
    aDouble: vm => vm.a * 2
  }
  ```

  计算属性的结果会被缓存，只有当依赖的响应式 property 变化时才会重新计算。注意，如果某个依赖 (比如非响应式 property) 在该实例范畴之外，则计算属性是**不会**被更新的。

- **示例：**

  ```js
  const app = createApp({
    data() {
      return { a: 1 }
    },
    computed: {
      // 仅读取
      aDouble() {
        return this.a * 2
      },
      // 读取和设置
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    }
  })
  
  const vm = app.mount('#app')
  console.log(vm.aPlus) // => 2
  vm.aPlus = 3
  console.log(vm.a) // => 2
  console.log(vm.aDouble) // => 4
  ```

- **参考** [Computed Properties](https://v3.cn.vuejs.org/guide/computed.html)



### [methods](https://v3.cn.vuejs.org/api/options-data.html#methods)

- **类型：**`{ [key: string]: Function }`

- **详细：**

  methods 将被混入到组件实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为组件实例。

  注意

  注意，**不应该使用箭头函数来定义 method 函数** (例如 plus：() => this.a++)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向组件实例，`this.a` 将是 undefined。

- **示例：**

  ```js
  const app = createApp({
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    }
  })
  
  const vm = app.mount('#app')
  
  vm.plus()
  console.log(vm.a) // => 2
  ```

- **参考** [Event Handling](https://v3.cn.vuejs.org/guide/events.html)



### [watch](https://v3.cn.vuejs.org/api/options-data.html#watch)

- **类型：**`{ [key: string]: string | Function | Object | Array}`
- **详细：**

一个对象，键是要侦听的响应式 property——包含了 [data](https://v3.cn.vuejs.org/api/options-data.html#data-2) 或 [computed](https://v3.cn.vuejs.org/api/options-data.html#computed) property，而值是对应的回调函数。值也可以是方法名，或者包含额外选项的对象。组件实例将会在实例化时调用 `$watch()`，参阅 [$watch](https://v3.cn.vuejs.org/api/instance-methods.html#watch)，以了解更多关于 `deep`、`immediate` 和 `flush` 选项的信息。

- **示例：**

  ```js
  const app = createApp({
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 5,
        f: 6
      }
    },
    watch: {
      // 侦听顶级 property
      a(val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`)
      },
      // 字符串方法名
      b: 'someMethod',
      // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
      c: {
        handler(val, oldVal) {
          console.log('c changed')
        },
        deep: true
      },
      // 侦听单个嵌套 property
      'c.d': function (val, oldVal) {
        // do something
      },
      // 该回调将会在侦听开始之后被立即调用
      e: {
        handler(val, oldVal) {
          console.log('e changed')
        },
        immediate: true
      },
      // 你可以传入回调数组，它们会被逐一调用
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 triggered')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 triggered')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b changed')
      },
      handle1() {
        console.log('handle 1 triggered')
      }
    }
  })
  
  const vm = app.mount('#app')
  
  vm.a = 3 // => new: 3, old: 1
  ```

  注意

  注意，*不应该使用箭头函数来定义 watcher 函数* (例如 `searchQuery: newValue => this.updateAutocomplete(newValue)`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向组件实例，`this.updateAutocomplete` 将是 undefined。

- **参考** [Watchers](https://v3.cn.vuejs.org/guide/computed.html#侦听器)



### [emits](https://v3.cn.vuejs.org/api/options-data.html#emits)

- **类型：**`Array<string> | Object`

- **详细：**

  emits 可以是数组或对象，从组件触发自定义事件，emits 可以是简单的数组，也可以是对象，后者允许配置事件验证。

  在对象语法中，每个 property 的值可以为 `null` 或验证函数。验证函数将接收传递给 `$emit` 调用的其他参数。如果 `this.$emit('foo',1)` 被调用，`foo` 的相应验证函数将接收参数 `1`。验证函数应返回布尔值，以表示事件参数是否有效。

- **用法：**

  ```js
  const app = createApp({})
  
  // 数组语法
  app.component('todo-item', {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  })
  
  // 对象语法
  app.component('reply-form', {
    emits: {
      // 没有验证函数
      click: null,
  
      // 带有验证函数
      submit: payload => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`Invalid submit event payload!`)
          return false
        }
      }
    }
  })
  ```

  注意

  `emits` 选项中列出的事件**不会**从组件的根元素继承，也将从 `$attrs` property 中移除。

- **参考** [Attribute 继承](https://v3.cn.vuejs.org/guide/component-attrs.html#attribute-继承)



### [expose 3.2+](https://v3.cn.vuejs.org/api/options-data.html#expose)

- **类型：** `Array<string>`

- **详细：**

  一个将暴露在公共组件实例上的 property 列表。

  默认情况下，通过 [`$refs`](https://v3.cn.vuejs.org/api/instance-properties.html#refs)、[`$parent`](https://v3.cn.vuejs.org/api/instance-properties.html#parent) 或 [`$root`](https://v3.cn.vuejs.org/api/instance-properties.html#root) 访问到的公共实例与模板使用的组件内部实例是一样的。`expose` 选项将限制公共实例可以访问的 property。

  由 Vue 自身定义的 property，比如 `$el` 和 `$parent`，将始终可以被公共实例访问，并不需要列出。

- **用法：**

  ```js
  export default {
    // increment 将被暴露，
    // 但 count 只能被内部访问
    expose: ['increment'],
  
    data() {
      return {
        count: 0
      }
    },
  
    methods: {
      increment() {
        this.count++
      }
    }
  }
  ```

- **参考：** [defineExpose](https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineexpose)



## [DOM](https://v3.cn.vuejs.org/api/options-dom.html#dom)

### [template](https://v3.cn.vuejs.org/api/options-dom.html#template)

- **类型：**`string`

- **详细：**

  一个字符串模板，用作 component 实例的标记。模板将会**替换**所挂载元素的 `innerHTML`。挂载元素的任何现有标记都将被忽略，除非模板中存在通过插槽分发的内容。

  如果字符串以 `#` 开始，则它将被用作 `querySelector`，并使用匹配元素的 innerHTML 作为模板字符串。这允许使用常见的 `<script type="x-template">` 技巧来包含模板。

  注意

  出于安全考虑，你应该只使用你信任的 Vue 模板。永远不要使用用户生成的内容作为你的模板。

  注意

  如果 Vue 选项中包含渲染函数，模板将被忽略。

- **参考**

- [生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)

- [通过插槽分发内容](https://v3.cn.vuejs.org/guide/component-basics.html#通过插槽分发内容)

### [render](https://v3.cn.vuejs.org/api/options-dom.html#render)

- **类型：**`Function`

- **详细：**

  字符串模板之外的另一种选择，允许你充分利用 JavaScript 的编程功能。

- **用法：**

  ```html
  <div id="app" class="demo">
    <my-title blog-title="A Perfect Vue"></my-title>
  </div>
  ```

  ```js
  const { createApp, h } = Vue
  const app = createApp({})
  app.component('my-title', {
    render() {
      return h(
        'h1',           // 标签名称
        this.blogTitle  // 标签内容
      )
    },
    props: {
      blogTitle: {
        type: String,
        required: true
      }
    }
  })
  
  app.mount('#app')
  ```

  注意

  `render` 函数的优先级高于根据 `template` 选项或挂载元素的 DOM 内 HTML 模板编译的渲染函数。

- **参考** [渲染函数](https://v3.cn.vuejs.org/guide/render-function.html)



## [生命周期钩子](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#生命周期钩子)

注意

所有生命周期钩子的 `this` 上下文将自动绑定至实例中，因此你可以访问 data、computed 和 methods。这意味着**你不应该使用箭头函数来定义一个生命周期方法** (例如 `created: () => this.fetchTodos()`)。因为箭头函数绑定了父级上下文，所以 `this` 不会指向预期的组件实例，并且`this.fetchTodos` 将会是 undefined。



### [beforeCreate](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#beforecreate)

- **类型：**`Function`

- **详细：**

  在实例初始化之后、进行数据侦听和事件/侦听器的配置之前同步调用。

- **参考：**[生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)



### [created](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#created)

- **类型：**`Function`

- **详细：**

  在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 `$el` property 目前尚不可用。

- **参考：**[生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)



### [beforeMount](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#beforemount)

- **类型：**`Function`

- **详细：**

  在挂载开始之前被调用：相关的 `render` 函数首次被调用。

  **该钩子在服务器端渲染期间不被调用。**

- **参考：**[生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)



### [mounted](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#mounted)

- **类型：**`Function`

- **详细：**

  在实例挂载完成后被调用，这时候传递给 [`app.mount`](https://v3.cn.vuejs.org/api/application-api.html#mount) 的元素已经被新创建的 `vm.$el` 替换了。如果根实例被挂载到了一个文档内的元素上，当 `mounted` 被调用时， `vm.$el` 也会在文档内。 注意 `mounted` **不会**保证所有的子组件也都被挂载完成。如果你希望等待整个视图都渲染完毕，可以在 `mounted` 内部使用 [vm.$nextTick](https://v3.cn.vuejs.org/api/instance-methods.html#nexttick)：

  ```js
  mounted() {
    this.$nextTick(function () {
      // 仅在整个视图都被渲染之后才会运行的代码
    })
  }
  ```

  **该钩子在服务器端渲染期间不被调用。**

- **参考：**[生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)



### [beforeUpdate](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#beforeupdate)

- **类型：**`Function`

- **详细：**

  在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。

  **该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。**

- **参考：**[生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)



### [updated](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#updated)

- **类型：**`Function`

- **详细：**

  在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。

  当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用[计算属性](https://v3.cn.vuejs.org/api/options-data.html#computed)或[侦听器](https://v3.cn.vuejs.org/api/options-data.html#watch)取而代之。

  注意，`updated` **不会**保证所有的子组件也都被重新渲染完毕。如果你希望等待整个视图都渲染完毕，可以在 `updated` 内部使用 [vm.$nextTick](https://v3.cn.vuejs.org/api/instance-methods.html#nexttick)：

  ```js
  updated() {
    this.$nextTick(function () {
      // 仅在整个视图都被重新渲染完毕之后才会运行的代码
    })
  }
  ```

  **该钩子在服务器端渲染期间不被调用。**

- **参考：**[生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)



### [activated](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#activated)

- **类型：**`Function`

- **详细：**

  被 keep-alive 缓存的组件激活时调用。

  **该钩子在服务器端渲染期间不被调用。**

- **参考：**

- [动态组件 - keep-alive](https://v3.cn.vuejs.org/guide/component-dynamic-async.html#在动态组件上使用-keep-alive)



### [deactivated](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#deactivated)

- **类型：**`Function`

- **详细：**

  被 keep-alive 缓存的组件失活时调用。

  **该钩子在服务器端渲染期间不被调用。**

- **参考：**

- [动态组件 - keep-alive](https://v3.cn.vuejs.org/guide/component-dynamic-async.html#在动态组件上使用-keep-alive)



### [beforeUnmount](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#beforeunmount)

- **类型：**`Function`

- **详细：**

  在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。

  **该钩子在服务器端渲染期间不被调用。**

- **参考：**[生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)



### [unmounted](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#unmounted)

- **类型：**`Function`

- **详细：**

  卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。

  **该钩子在服务器端渲染期间不被调用。**

- **参考：**[生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)



### [errorCaptured](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#errorcaptured)

- **类型：**`(err: Error, instance: Component, info: string) => ?boolean`

- **详细：**

  在捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播。

  TIP

  你可以在此钩子中修改组件的状态。因此在捕获错误时，在模板或渲染函数中有一个条件判断来绕过其它内容就很重要；不然该组件可能会进入一个无限的渲染循环。

  **错误传播规则**

  - 默认情况下，如果全局的 `config.errorHandler` 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一的分析服务的地方进行汇报。
  - 如果一个组件的继承链或父级链中存在多个 `errorCaptured` 钩子，则它们将会被相同的错误逐个唤起。
  - 如果此 `errorCaptured` 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 `config.errorHandler`。
  - 一个 `errorCaptured` 钩子能够返回 `false` 以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的 `errorCaptured` 钩子和全局的 `config.errorHandler`。



### [renderTracked](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#rendertracked)

- **类型：**`(e: DebuggerEvent) => void`

- **详细：**

  跟踪虚拟 DOM 重新渲染时调用。钩子接收 `debugger event` 作为参数。此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键。

- **用法：**

  ```html
  <div id="app">
    <button v-on:click="addToCart">Add to cart</button>
    <p>Cart({{ cart }})</p>
  </div>
  ```

  ```js
  const app = createApp({
    data() {
      return {
        cart: 0
      }
    },
    renderTracked({ key, target, type }) {
      console.log({ key, target, type })
      /* 当组件第一次渲染时，这将被记录下来:
      {
        key: "cart",
        target: {
          cart: 0
        },
        type: "get"
      }
      */
    },
    methods: {
      addToCart() {
        this.cart += 1
      }
    }
  })
  
  app.mount('#app')
  ```

  

### [renderTriggered](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#rendertriggered)

- **类型：**`(e: DebuggerEvent) => void`

- **详细：**

  当虚拟 DOM 重新渲染被触发时调用。和 [`renderTracked`](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#rendertracked) 类似，接收 `debugger event` 作为参数。此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键。

- **用法：**

  ```html
  <div id="app">
    <button v-on:click="addToCart">Add to cart</button>
    <p>Cart({{ cart }})</p>
  </div>
  ```

  ```js
  const app = createApp({
    data() {
      return {
        cart: 0
      }
    },
    renderTriggered({ key, target, type }) {
      console.log({ key, target, type })
    },
    methods: {
      addToCart() {
        this.cart += 1
        /* 这将导致 renderTriggered 被调用
          {
            key: "cart",
            target: {
              cart: 1
            },
            type: "set"
          }
        */
      }
    }
  })
  
  app.mount('#app')
  ```





## [选项/资源](https://v3.cn.vuejs.org/api/options-assets.html#选项-资源)

### [directives](https://v3.cn.vuejs.org/api/options-assets.html#directives)

- **类型：**`Object`

- **详细：**

  声明一组可用于组件实例中的指令。

- **用法：**

  ```js
  const app = createApp({})
  
  app.component('focused-input', {
    directives: {
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    },
    template: `<input v-focus>`
  })
  ```

- **参考：**[自定义指令](https://v3.cn.vuejs.org/guide/custom-directive.html)



### [components](https://v3.cn.vuejs.org/api/options-assets.html#components)

- **类型：**`Object`

- **详细：**

  声明一组可用于组件实例中的组件。

- **用法：**

  ```js
  const Foo = {
    template: `<div>Foo</div>`
  }
  
  const app = createApp({
    components: {
      Foo
    },
    template: `<Foo />`
  })
  ```

- **参考：**[组件基础](https://v3.cn.vuejs.org/guide/component-basics.html)



## [组合](https://v3.cn.vuejs.org/api/options-composition.html#组合)

### [mixins](https://v3.cn.vuejs.org/api/options-composition.html#mixins)

- **类型：**`Array<Object>`

- **详细：**

  `mixins` 选项接收一个 mixin 对象的数组。这些 mixin 对象可以像正常的实例对象一样包含实例选项，这些选项将会被合并到最终的选项中，使用特定的选项合并逻辑。例如，如果 mixin 包含一个 `created` 钩子，而创建组件本身也有一个，那么两个函数都会被调用。

  Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。

  INFO

  在 Vue 2 中，mixin 是创建可复用组件逻辑的主要机制。在 Vue 3 继续支持 mixin 的同时，[组合式 API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)是更推荐的在组件之间共享代码的方式。

- **示例：**

  ```js
  const mixin = {
    created() {
      console.log(1)
    }
  }
  
  createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })
  
  // => 1
  // => 2
  ```

- **参考：** [Mixins](https://v3.cn.vuejs.org/guide/mixins.html)



### [extends](https://v3.cn.vuejs.org/api/options-composition.html#extends)

- **类型：**`Object`

- **详细：**

  允许一个组件扩展到另一个组件，且继承该组件选项。

  从实现的角度看，`extends` 几乎等同于 `mixins`。可以认为其作为第一个 mixin 作用在被 `extends` 的组件上。

  然而，`extends` 和 `mixins` 表达了不同的意图。`mixins` 选项主要用来组合功能，而 `extends` 主要用来考虑继承性。

  和 `mixins` 类似，任何选项都会通过对应的合并策略被合并。

- **示例：**

  ```js
  const CompA = { ... }
  
  const CompB = {
    extends: CompA,
    ...
  }
  ```

  

### [provide / inject](https://v3.cn.vuejs.org/api/options-composition.html#provide-inject)

- **类型：**

  - **provide：**`Object | () => Object`
  - **inject：**`Array<string> | { [key: string]: string | Symbol | Object }`

- **详细：**

  这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的 `context` 特性很相似。

  `provide` 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的 property。在该对象中你可以使用 ES2015 Symbols 作为 key，但是只在原生支持 `Symbol` 和 `Reflect.ownKeys` 的环境下可工作。

  `inject` 选项应该是：

  - 一个字符串数组，或
  - 一个对象，对象的 key 是本地的绑定名，value 是：
    - 在可用注入内容中搜索用的 key (字符串或 Symbol)，或
    - 一个对象，该对象的：
      - `from` property 是在可用的注入内容中搜索用的 key (字符串或 Symbol)
      - `default` property 是降级情况下使用的 value

  > 提示：`provide` 和 `inject` 绑定并不是响应式的。这是刻意为之的。然而，如果你传入了一个响应式的对象，那么其对象的 property 仍是响应式的。

- **示例：**

  ```js
  // 父级组件 provide  'foo'
  const Provider = {
    provide: {
      foo: 'bar'
    }
    // ...
  }
  
  // 子组件 inject  'foo'
  const Child = {
    inject: ['foo'],
    created() {
      console.log(this.foo) // => "bar"
    }
    // ...
  }
  ```

  利用 ES2015 Symbols、函数 `provide` 和对象 `inject`：

  ```js
  const s = Symbol()
  
  const Provider = {
    provide() {
      return {
        [s]: 'foo'
      }
    }
  }
  
  const Child = {
    inject: { s }
    // ...
  }
  ```

  使用一个 inject 的值作为一个 property 的默认值：

  ```js
  const Child = {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

  使用一个 inject 的值作为数据入口：

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

  Inject 可以通过设置默认值使其变成可选项：

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

  如果它需要从一个不同名字的 property 注入，则使用 `from` 来表示其源 property：

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  与 prop 的默认值类似，你需要对非原始值使用一个工厂方法：

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **参考：** [Provide / Inject](https://v3.cn.vuejs.org/guide/component-provide-inject.html)



## [setup](https://v3.cn.vuejs.org/api/options-composition.html#setup)

- **类型：**`Function`

`setup` 函数是一个新的组件选项。它是组件内部使用组合式 API 的入口点。

- **调用时间：**

  在创建组件实例时，在初始 prop 解析之后立即调用 `setup`。在生命周期方面，它是在 [beforeCreate](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#beforecreate) 钩子之前调用的。

- **模板使用：**

  如果 `setup` 返回一个对象，则该对象的属性将合并到组件模板的渲染上下文中：

  ```html
  <template>
    <div>{{ count }} {{ object.foo }}</div>
  </template>
  
  <script>
    import { ref, reactive } from 'vue'
  
    export default {
      setup() {
        const count = ref(0)
        const object = reactive({ foo: 'bar' })
  
        // 暴露到template中
        return {
          count,
          object
        }
      }
    }
  </script>
  ```

  请注意，从 `setup` 返回的 [refs](https://v3.cn.vuejs.org/api/refs-api.html#ref) 在模板中访问时会自动解包，因此模板中不需要 `.value`。

- **渲染函数/JSX 的方法：**

  `setup` 还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态：

  ```js
  import { h, ref, reactive } from 'vue'
  
  export default {
    setup() {
      const count = ref(0)
      const object = reactive({ foo: 'bar' })
  
      return () => h('div', [count.value, object.foo])
    }
  }
  ```

- **参数：**

  该函数将接收到的 prop 作为其第一个参数：

  ```js
  export default {
    props: {
      name: String
    },
    setup(props) {
      console.log(props.name)
    }
  }
  ```

  请注意，此 `props` 对象是响应式的——即在传入新的 props 时会对其进行更新，通过使用 `watchEffect` 或 `watch` 进行观测和响应：

  ```js
  export default {
    props: {
      name: String
    },
    setup(props) {
      watchEffect(() => {
        console.log(`name is: ` + props.name)
      })
    }
  }
  ```

  但是，请不要解构 `props` 对象，因为它会失去响应式：

  ```js
  export default {
    props: {
      name: String
    },
    setup({ name }) {
      watchEffect(() => {
        console.log(`name is: ` + name) // 没有响应式
      })
    }
  }
  ```

  `props` 对象在开发过程中对于用户区代码是不可变的 (如果用户代码尝试对其进行更改，则会发出警告)。

  第二个参数提供了一个上下文对象，该对象暴露了多个可能在 `setup` 中有用的对象和函数：

  ```js
  const MyComponent = {
    setup(props, context) {
      context.attrs
      context.slots
      context.emit
      context.expose
    }
  }
  ```

  `attrs`、`slots` 和 `emit` 分别等同于 [`$attrs`](https://v3.cn.vuejs.org/api/instance-properties.html#attrs)、[`$slots`](https://v3.cn.vuejs.org/api/instance-properties.html#slots) 和 [`$emit`](https://v3.cn.vuejs.org/api/instance-methods.html#emit) 实例 property。

  `attrs` 和 `slots` 是内部组件实例上相应值的代理。这样可以确保它们即使在更新后也始终会显示最新值，以便我们可以对它们进行解构，而不必担心访问过时的引用：

  ```js
  const MyComponent = {
    setup(props, { attrs }) {
      // 稍后可能会调用的函数
      function onClick() {
        console.log(attrs.foo) // 保证是最新引用
      }
    }
  }
  ```

  在 Vue 3.2 中新增的 `expose` 是一个函数，该函数允许通过公共组件实例暴露特定的 property。默认情况下，通过 ref、`$parent` 或 `$root` 获取的公共实例等同于模板所使用的内部实例。调用 `expose` 将以指定的 property 创建一个独立的实例：

  ```js
  const MyComponent = {
    setup(props, { expose }) {
      const count = ref(0)
      const reset = () => count.value = 0
      const increment = () => count.value++
  
      // 只有 reset 能被外部访问，例如通过 $refs
      expose({
        reset
      })
  
      // 在组件内部，模板可以访问 count 和 increment
      return { count, increment }
    }
  }
  ```

  有很多理由将 `props` 作为单独的第一个参数而不是将其包含在上下文中：

  - 组件使用 `props` 比其他 property 更常见，并且很多情况下组件仅使用 `props`。
  - 将 `props` 作为单独的参数可以使单独键入更容易，而不会弄乱上下文中其他 property 的类型。这也使得在具有 TSX 支持的 `setup`、`render` 和普通功能组件之间保持一致的签名成为可能。

- **参考：** [组合式 API](https://v3.cn.vuejs.org/api/composition-api.html)



## [杂项](https://v3.cn.vuejs.org/api/options-misc.html#杂项)

### [name](https://v3.cn.vuejs.org/api/options-misc.html#name)

- **类型：**`string`

- **详情：**

  允许组件模板递归地调用自身。注意，组件在全局用 [`app.component`](https://v3.cn.vuejs.org/api/application-api.html#component) 注册时，全局 ID 自动作为组件的 name。

  指定 `name` 选项的另一个好处是便于调试。有名字的组件有更友好的警告信息。另外，当在有 [vue-devtools](https://github.com/vuejs/vue-devtools)，未命名组件将显示成 `<AnonymousComponent>`，这很没有语义。通过提供 `name` 选项，可以获得更有语义信息的组件树。

### [inheritAttrs](https://v3.cn.vuejs.org/api/options-misc.html#inheritattrs)

- **类型：**`boolean`

- **默认：**`true`

- **详情：**

  默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 `inheritAttrs` 到 `false`，这些默认行为将会被去掉。而通过实例 property `$attrs` 可以让这些 attribute 生效，且可以通过 `v-bind` 显性的绑定到非根元素上。

- **用法：**

  ```js
  app.component('base-input', {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input'],
    template: `
      <label>
        {{ label }}
        <input
          v-bind="$attrs"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
        >
      </label>
    `
  })
  ```

- **参考**[禁用 Attribute 继承](https://v3.cn.vuejs.org/guide/component-attrs.html#禁用-attribute-继承)



### [compilerOptions 3.1+](https://v3.cn.vuejs.org/api/options-misc.html#compileroptions)

- **类型：**`Object`

- **详情：**

  这是与[应用级别的 `compilerOptions` 配置](https://v3.cn.vuejs.org/api/application-config.html#compileroptions)相对应的组件级别配置。

- **用法：**

  ```js
  const Foo = {
    // ...
    compilerOptions: {
      delimiters: ['${', '}'],
      comments: true
    }
  }
  ```

  重要

  和应用级别的 `compilerOptions` 配置类似，该选项只会在使用完整的构建版本在浏览器内编译模板时生效。



# [实例 property](https://v3.cn.vuejs.org/api/instance-properties.html#实例-property)

## [$data](https://v3.cn.vuejs.org/api/instance-properties.html#data)

- **类型：**`Object`

- **详细：**

  组件实例正在侦听的数据对象。组件实例代理了对其 data 对象 property 的访问。

- **参考：**[选项 / 数据 - data](https://v3.cn.vuejs.org/api/options-data.html#data-2)



## [$props](https://v3.cn.vuejs.org/api/instance-properties.html#props)

- **类型：**`Object`

- **详细：**

  当前组件接收到的 props 对象。组件实例代理了对其 props 对象 property 的访问。



## [$el](https://v3.cn.vuejs.org/api/instance-properties.html#el)

- **类型：**`any`

- **仅可读**

- **详细：**

  组件实例正在使用的根 DOM 元素。

  对于使用了[片段](https://v3.cn.vuejs.org/guide/migration/fragments)的组件，`$el` 是占位 DOM 节点，Vue 使用它来跟踪组件在 DOM 中的位置。建议使用[模板引用](https://v3.cn.vuejs.org/guide/component-template-refs.html)来直接访问 DOM 元素，而不是依赖于 `$el`。



## [$options](https://v3.cn.vuejs.org/api/instance-properties.html#options)

- **类型：**`Object`

- **仅可读**

- **详细：**

  用于当前组件实例的初始化选项。当你需要在选项中包含自定义 property 时会有用处：

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

  

## [$parent](https://v3.cn.vuejs.org/api/instance-properties.html#parent)

- **类型：**`Vue instance`

- **仅可读**

- **详细：**

  父实例，如果当前实例有的话。

## [#](https://v3.cn.vuejs.org/api/instance-properties.html#root)

- **类型：**`Vue instance`

- **仅可读**

- **详细：**

  当前组件树的根组件实例。如果当前实例没有父实例，此实例将会是其自己。



## [$root](https://v3.cn.vuejs.org/api/instance-properties.html#slots)$slots

- **类型：**`{ [name: string]: (...args: any[]) => Array<VNode> | undefined }`

- **仅可读**

- **详细：**

  用来以编程方式访问通过[插槽分发](https://v3.cn.vuejs.org/guide/component-basics.html#通过插槽分发内容)的内容。每个[具名插槽](https://v3.cn.vuejs.org/guide/component-slots.html#具名插槽)都有其相应的 property (例如：`v-slot:foo` 中的内容将会在 `this.$slots.foo()` 中被找到)。`default` property 包括了所有没有被包含在具名插槽中的节点，或 `v-slot:default` 的内容。

  在使用[渲染函数](https://v3.cn.vuejs.org/guide/render-function.html)编写一个组件时，访问 `this.$slots` 会很有帮助。

- **示例：**

  ```html
  <blog-post>
    <template v-slot:header>
      <h1>About Me</h1>
    </template>
  
    <template v-slot:default>
      <p>
        Here's some page content, which will be included in $slots.default.
      </p>
    </template>
  
    <template v-slot:footer>
      <p>Copyright 2020 Evan You</p>
    </template>
  </blog-post>
  ```

  ```js
  const app = createApp({})
  
  app.component('blog-post', {
    render() {
      return h('div', [
        h('header', this.$slots.header()),
        h('main', this.$slots.default()),
        h('footer', this.$slots.footer())
      ])
    }
  })
  ```

- **参考：**

  - [`` 组件](https://v3.cn.vuejs.org/api/built-in-components.html#slot)
  - [通过插槽分发内容](https://v3.cn.vuejs.org/guide/component-basics.html#通过插槽分发内容)
  - [渲染函数 - 插槽](https://v3.cn.vuejs.org/guide/render-function.html#插槽)



## [$refs](https://v3.cn.vuejs.org/api/instance-properties.html#refs)

- **类型：**`Object`
- **仅可读**
- **详细：**

一个对象，持有注册过 [`ref` attribute](https://v3.cn.vuejs.org/guide/component-template-refs.html) 的所有 DOM 元素和组件实例。

- 参考：
  - [模板 refs](https://v3.cn.vuejs.org/guide/component-template-refs.html)
  - [特殊 attributes - ref](https://v3.cn.vuejs.org/api/special-attributes.html#ref)



## [$attrs](https://v3.cn.vuejs.org/api/instance-properties.html#attrs)

- **类型：**`Object`
- **仅可读**
- **详细：**

包含了父作用域中不作为组件 [props](https://v3.cn.vuejs.org/api/options-data.html#props) 或[自定义事件](https://v3.cn.vuejs.org/api/options-data.html#emits)的 attribute 绑定和事件。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定，并且可以通过 `v-bind="$attrs"` 传入内部组件——这在创建高阶的组件时会非常有用。

- 参考：
  - [非 Prop Attributes](https://v3.cn.vuejs.org/guide/component-attrs.html)
  - [选项/杂项 - inheritAttrs](https://v3.cn.vuejs.org/api/options-misc.html#inheritattrs)



# [实例方法](https://v3.cn.vuejs.org/api/instance-methods.html#实例方法)

## [$watch](https://v3.cn.vuejs.org/api/instance-methods.html#watch)

- **参数：**

  - `{string | Function} source`

  - `{Function | Object} callback`

  - ```
    {Object} [options]
    ```

    - `{boolean} deep`
    - `{boolean} immediate`
    - `{string} flush`

- **返回：**`{Function} unwatch`

- **用法：**

  侦听组件实例上的响应式 property 或函数计算结果的变化。回调函数得到的参数为新值和旧值。我们只能将顶层的 `data`、`props` 或 `computed` property 名作为字符串传递。对于更复杂的表达式，用一个函数取代。

- **示例：**

  ```js
  const app = createApp({
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: 4
        }
      }
    },
    created() {
      // 顶层property 名
      this.$watch('a', (newVal, oldVal) => {
        // 做点什么
      })
  
      // 用于监视单个嵌套property 的函数
      this.$watch(
        () => this.c.d,
        (newVal, oldVal) => {
          // 做点什么
        }
      )
  
      // 用于监视复杂表达式的函数
      this.$watch(
        // 表达式 `this.a + this.b` 每次得出一个不同的结果时
        // 处理函数都会被调用。
        // 这就像监听一个未被定义的计算属性
        () => this.a + this.b,
        (newVal, oldVal) => {
          // 做点什么
        }
      )
    }
  })
  ```

  当侦听的值是一个对象或者数组时，对其属性或元素的任何更改都不会触发侦听器，因为它们引用相同的对象/数组：

  ```js
  const app = createApp({
    data() {
      return {
        article: {
          text: 'Vue is awesome!'
        },
        comments: ['Indeed!', 'I agree']
      }
    },
    created() {
      this.$watch('article', () => {
        console.log('Article changed!')
      })
  
      this.$watch('comments', () => {
        console.log('Comments changed!')
      })
    },
    methods: {
      // 这些方法不会触发侦听器，因为我们只更改了Object/Array的一个property，
      // 不是对象/数组本身
      changeArticleText() {
        this.article.text = 'Vue 3 is awesome'
      },
      addComment() {
        this.comments.push('New comment')
      },
  
      // 这些方法将触发侦听器，因为我们完全替换了对象/数组
      changeWholeArticle() {
        this.article = { text: 'Vue 3 is awesome' }
      },
      clearComments() {
        this.comments = []
      }
    }
  })
  ```

  `$watch` 返回一个取消侦听函数，用来停止触发回调：

  ```js
  const app = createApp({
    data() {
      return {
        a: 1
      }
    }
  })
  
  const vm = app.mount('#app')
  
  const unwatch = vm.$watch('a', cb)
  // later, teardown the watcher
  unwatch()
  ```

- **选项：deep**

  为了发现对象内部值的变化，可以在选项参数中指定 `deep: true`。这个选项同样适用于监听数组变更。

  > 注意：当变更（不是替换）对象或数组并使用 deep 选项时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。

  ```js
  vm.$watch('someObject', callback, {
    deep: true
  })
  vm.someObject.nestedValue = 123
  // callback is fired
  ```

- **选项：immediate**

  在选项参数中指定 `immediate: true` 将立即以表达式的当前值触发回调：

  ```js
  vm.$watch('a', callback, {
    immediate: true
  })
  // 立即以 `a` 的当前值触发 `callback`
  ```

  注意，在带有 `immediate` 选项时，你不能在第一次回调时取消侦听给定的 property。

  ```js
  // 这会导致报错
  const unwatch = vm.$watch(
    'value',
    function() {
      doSomething()
      unwatch()
    },
    { immediate: true }
  )
  ```

  如果你仍然希望在回调内部调用一个取消侦听的函数，你应该先检查其函数的可用性：

  ```js
  let unwatch = null
  
  unwatch = vm.$watch(
    'value',
    function() {
      doSomething()
      if (unwatch) {
        unwatch()
      }
    },
    { immediate: true }
  )
  ```

- **选项：flush**

  `flush` 选项可以更好地控制回调的时间。它可以设置为 `'pre'`、`'post'` 或 `'sync'`。

  默认值是 `'pre'`，指定的回调应该在渲染前被调用。它允许回调在模板运行前更新了其他值。

  `'post'` 值是可以用来将回调推迟到渲染之后的。如果回调需要通过 `$refs` 访问更新的 DOM 或子组件，那么则使用该值。

  如果 `flush` 被设置为 `'sync'`，一旦值发生了变化，回调将被同步调用。

  对于 `'pre'` 和 `'post'`，回调使用队列进行缓冲。回调只被添加到队列中一次，即使观察值变化了多次。值的中间变化将被跳过，不会传递给回调。

  缓冲回调不仅可以提高性能，还有助于保证数据的一致性。在执行数据更新的代码完成之前，侦听器不会被触发。

  `'sync'` 侦听器应少用，因为它们没有这些好处。

  更多关于 `flush` 的信息，请参阅[副作用刷新时机](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#副作用刷新时机)。

- **参考** [Watchers](https://v3.cn.vuejs.org/guide/computed.html#侦听器)



## [$emit](https://v3.cn.vuejs.org/api/instance-methods.html#emit)

- **参数：**

  - `{string} eventName`
  - `[...args]`

  触发当前实例上的事件。附加参数都会传给监听器回调。

- **示例：**

  只配合一个事件名使用 $emit：

  ```html
  <div id="emit-example-simple">
    <welcome-button v-on:welcome="sayHi"></welcome-button>
  </div>
  ```

  ```js
  const app = createApp({
    methods: {
      sayHi() {
        console.log('Hi!')
      }
    }
  })
  
  app.component('welcome-button', {
    emits: ['welcome'],
    template: `
      <button v-on:click="$emit('welcome')">
        Click me to be welcomed
      </button>
    `
  })
  
  app.mount('#emit-example-simple')
  ```

  配合额外的参数使用 `$emit`：

  ```html
  <div id="emit-example-argument">
    <advice-component v-on:advise="showAdvice"></advice-component>
  </div>
  ```

  ```js
  const app = createApp({
    methods: {
      showAdvice(advice) {
        alert(advice)
      }
    }
  })
  
  app.component('advice-component', {
    emits: ['advise'],
    data() {
      return {
        adviceText: 'Some advice'
      }
    },
    template: `
      <div>
        <input type="text" v-model="adviceText">
        <button v-on:click="$emit('advise', adviceText)">
          Click me for sending advice
        </button>
      </div>
    `
  })
  
  app.mount('#emit-example-argument')
  ```

- **参考**

- [`emits` 选项](https://v3.cn.vuejs.org/api/options-data.html#emits)

- [事件抛出一个值](https://v3.cn.vuejs.org/guide/component-basics.html#使用事件抛出一个值)



## [$forceUpdate](https://v3.cn.vuejs.org/api/instance-methods.html#forceupdate)

- **用法：**

  迫使组件实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。



## [$nextTick](https://v3.cn.vuejs.org/api/instance-methods.html#nexttick)

- **参数：**

  - `{Function} [callback]`

- **用法：**

  将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 `nextTick` 一样，不同的是回调的 `this` 自动绑定到调用它的实例上。

- **示例：**

  ```js
  createApp({
    // ...
    methods: {
      // ...
      example() {
        // 修改数据
        this.message = 'changed'
        // DOM 尚未更新
        this.$nextTick(function() {
          // DOM 现在更新了
          // `this` 被绑定到当前实例
          this.doSomethingElse()
        })
      }
    }
  })
  ```

- **参考** [nextTick](https://v3.cn.vuejs.org/api/global-api.html#nexttick)



# [指令](https://v3.cn.vuejs.org/api/directives.html#指令)

## [v-text](https://v3.cn.vuejs.org/api/directives.html#v-text)

- **预期**：`string`

- **详细**：

  更新元素的 [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)。如果要更新部分的 `textContent`，需要使用 [Mustache 插值](https://v3.cn.vuejs.org/guide/template-syntax.html#文本)。

- **示例**：

  ```html
  <span v-text="msg"></span>
  <!-- 等价于 -->
  <span>{{msg}}</span>
  ```

- **参考**：[数据绑定语法 - 插值](https://v3.cn.vuejs.org/guide/template-syntax.html#文本)



## [v-html](https://v3.cn.vuejs.org/api/directives.html#v-html)

- **预期**：`string`

- **详细**：

  更新元素的 [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)。**注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译**。如果试图使用 `v-html` 组合模板，可以重新考虑是否通过使用组件来替代。

  WARNING

  在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。只在可信内容上使用 `v-html`，**永不**用在用户提交的内容上。

  在[单文件组件](https://v3.cn.vuejs.org/guide/single-file-component.html)里，`scoped` 的样式不会应用在 `v-html` 内部，因为那部分 HTML 没有被 Vue 的模板编译器处理。如果你希望针对 `v-html` 的内容设置带作用域的 CSS，你可以替换为 [CSS modules](https://vue-loader.vuejs.org/zh/guide/css-modules.html) 或用一个额外的全局 `<style>` 元素手动设置类似 BEM 的作用域策略。

- **示例**：

  ```html
  <div v-html="'<h1>Hello World</h1>'"></div>
  ```

- **参考**：[数据绑定语法 - 插值](https://v3.cn.vuejs.org/guide/template-syntax.html#原始-html)



## [v-show](https://v3.cn.vuejs.org/api/directives.html#v-show)

- **预期**：`any`

- **用法**：

  根据表达式的真假值，切换元素的 `display` CSS property。

  当条件变化时该指令触发过渡效果。

- **参考**：[条件渲染 - v-show](https://v3.cn.vuejs.org/guide/conditional.html#v-show)



## [v-if](https://v3.cn.vuejs.org/api/directives.html#v-if)

- **预期**：`any`

- **用法**：

  根据表达式的真假值来有条件地渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 `<template>`，将提取它的内容作为条件块。

  当条件变化时该指令触发过渡效果。

  当和 `v-for` 一起使用时，`v-if` 的优先级比 `v-for` 更高。详见[列表渲染教程](https://v3.cn.vuejs.org/guide/list.html#v-for-与-v-if-一同使用)

- **参考**：[条件渲染 - v-if](https://v3.cn.vuejs.org/guide/conditional.html#v-if)



## [v-else](https://v3.cn.vuejs.org/api/directives.html#v-else)

- **不需要表达式**

- **限制**：前一兄弟元素必须有 `v-if` 或 `v-else-if`。

- **用法**：

  为 `v-if` 或者 `v-else-if` 添加“else 块”。

  ```html
  <div v-if="Math.random() > 0.5">
    Now you see me
  </div>
  <div v-else>
    Now you don't
  </div>
  ```

- **参考**：[条件渲染 - v-else](https://v3.cn.vuejs.org/guide/conditional.html#v-else)



## [v-else-if](https://v3.cn.vuejs.org/api/directives.html#v-else-if)

- **预期**：`any`

- **限制**：前一兄弟元素必须有 `v-if` 或 `v-else-if`。

- **用法**：

  表示 `v-if` 的“else if 块”。可以链式调用。

  ```html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```

- **参考**：[条件渲染- v-else-if](https://v3.cn.vuejs.org/guide/conditional.html#v-else-if)



## [v-for](https://v3.cn.vuejs.org/api/directives.html#v-for)

- **预期**：`Array | Object | number | string | Iterable`

- **用法**：

  基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 `alias in expression`，为当前遍历的元素提供别名：

  ```html
  <div v-for="item in items">
    {{ item.text }}
  </div>
  ```

  另外也可以为数组索引指定别名 (或者用于对象的键)：

  ```html
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  ```

  `v-for` 的默认行为会尝试原地修改元素而不是移动它们。要强制其重新排序元素，你需要用特殊 attribute `key` 来提供一个排序提示：

  ```html
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  ```

  `v-for` 也可以在实现了[可迭代协议](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)的值上使用，包括原生的 `Map` 和 `Set`。

  `v-for` 的详细用法可以通过以下链接查看教程详细说明。

- **参考**：

  - [列表渲染](https://v3.cn.vuejs.org/guide/list.html)



## [v-on](https://v3.cn.vuejs.org/api/directives.html#v-on)

- **缩写**：`@`

- **预期**：`Function | Inline Statement | Object`

- **参数**：`event`

- **修饰符**：

  - `.stop` - 调用 `event.stopPropagation()`。
  - `.prevent` - 调用 `event.preventDefault()`。
  - `.capture` - 添加事件侦听器时使用 capture 模式。
  - `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  - `.{keyAlias}` - 仅当事件是从特定键触发时才触发回调。
  - `.once` - 只触发一次回调。
  - `.left` - 只当点击鼠标左键时触发。
  - `.right` - 只当点击鼠标右键时触发。
  - `.middle` - 只当点击鼠标中键时触发。
  - `.passive` - `{ passive: true }` 模式添加侦听器

- **用法**：

  绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

  用在普通元素上时，只能监听[原生 DOM 事件](https://developer.mozilla.org/en-US/docs/Web/Events)。用在自定义元素组件上时，也可以监听子组件触发的**自定义事件**。

  监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event` property：`v-on:click="handle('ok', $event)"`。

  `v-on` 同样支持不带参数绑定一个事件/监听器键值对的对象。注意当使用对象语法时，是不支持任何修饰器的。

- **示例**：

  ```html
  <!-- 方法处理器 -->
  <button v-on:click="doThis"></button>
  
  <!-- 动态事件 -->
  <button v-on:[event]="doThis"></button>
  
  <!-- 内联语句 -->
  <button v-on:click="doThat('hello', $event)"></button>
  
  <!-- 缩写 -->
  <button @click="doThis"></button>
  
  <!-- 动态事件缩写 -->
  <button @[event]="doThis"></button>
  
  <!-- 停止冒泡 -->
  <button @click.stop="doThis"></button>
  
  <!-- 阻止默认行为 -->
  <button @click.prevent="doThis"></button>
  
  <!-- 阻止默认行为，没有表达式 -->
  <form @submit.prevent></form>
  
  <!-- 串联修饰符 -->
  <button @click.stop.prevent="doThis"></button>
  
  <!-- 键修饰符，键别名 -->
  <input @keyup.enter="onEnter" />
  
  <!-- 点击回调只会触发一次 -->
  <button v-on:click.once="doThis"></button>
  
  <!-- 对象语法 -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  在子组件上监听自定义事件 (当子组件触发“my-event”时将调用事件处理器)：

  ```html
  <my-component @my-event="handleThis"></my-component>
  
  <!-- 内联语句 -->
  <my-component @my-event="handleThis(123, $event)"></my-component>
  ```

- **参考**：

  - [事件处理器](https://v3.cn.vuejs.org/guide/events.html)
  - [组件 - 自定义事件](https://v3.cn.vuejs.org/guide/component-basics.html#监听子组件事件)



## [v-bind](https://v3.cn.vuejs.org/api/directives.html#v-bind)

- **缩写**：`:` 或 `.` (当使用 `.prop` 修饰符时)

- **预期**：`any (with argument) | Object (without argument)`

- **参数**：`attrOrProp (optional)`

- **修饰符**：

  - `.camel` - 将 kebab-case attribute 名转换为 camelCase。
  - `.prop` - 将一个绑定强制设置为一个 DOM property。3.2+
  - `.attr` - 将一个绑定强制设置为一个 DOM attribute。3.2+

- **用法**：

  动态地绑定一个或多个 attribute，或一个组件 prop 到表达式。

  在绑定 `class` 或 `style` attribute 时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。

  在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。

  没有参数时，可以绑定到一个包含键值对的对象。注意此时 `class` 和 `style` 绑定不支持数组和对象。

- **示例**：

  ```html
  <!-- 绑定 attribute -->
  <img v-bind:src="imageSrc" />
  
  <!-- 动态 attribute 名 -->
  <button v-bind:[key]="value"></button>
  
  <!-- 缩写 -->
  <img :src="imageSrc" />
  
  <!-- 动态 attribute 名缩写 -->
  <button :[key]="value"></button>
  
  <!-- 内联字符串拼接 -->
  <img :src="'/path/to/images/' + fileName" />
  
  <!-- class 绑定 -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]"></div>
  
  <!-- style 绑定 -->
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>
  
  <!-- 绑定一个全是 attribute 的对象 -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
  
  <!-- prop 绑定。"prop" 必须在 my-component 声明 -->
  <my-component :prop="someThing"></my-component>
  
  <!-- 将父组件的 props 一起传给子组件 -->
  <child-component v-bind="$props"></child-component>
  
  <!-- XLink -->
  <svg><a :xlink:special="foo"></a></svg>
  ```

  当在一个元素上设置一个绑定的时候，Vue 会默认通过 `in` 操作检测该元素是否有一个被定义为 property 的 key。如果该 property 被定义了，Vue 会将这个值设置为一个 DOM property 而不是 attribute。大多数情况下，这样工作是正常的，但你也可以通过 `.prop` 或 `.attr` 修饰符显性地覆写这个行为。有的时候这是必要的，尤其是[基于自定义元素的工作](https://v3.cn.vuejs.org/guide/web-components.html#传递-dom-property)。

  `.prop` 修饰符也有一个专用的缩写 `.`:

  ```html
  <div :someProperty.prop="someObject"></div>
  
  <!-- 相当于 -->
  <div .someProperty="someObject"></div>
  ```

  `.camel` 修饰符允许在使用 DOM 模板时将 `v-bind` property 名称驼峰化，例如 SVG 的 `viewBox` property：

  ```html
  <svg :view-box.camel="viewBox"></svg>
  ```

  在使用字符串模板或通过 `vue-loader` / `vueify` 编译时，无需使用 `.camel`。

- **参考**：

  - [Class 和 Style 绑定](https://v3.cn.vuejs.org/guide/class-and-style.html)
  - [组件 - Props](https://v3.cn.vuejs.org/guide/component-basics.html#通过-prop-向子组件传递数据)



## [v-model](https://v3.cn.vuejs.org/api/directives.html#v-model)

- **预期**：随表单控件类型不同而不同。

- **限制于**：

  - `<input>`
  - `<select>`
  - `<textarea>`
  - components

- **修饰符**：

  - [`.lazy`](https://v3.cn.vuejs.org/guide/forms.html#lazy) - 监听 `change` 而不是 `input` 事件
  - [`.number`](https://v3.cn.vuejs.org/guide/forms.html#number) - 输入字符串转为有效的数字
  - [`.trim`](https://v3.cn.vuejs.org/guide/forms.html#trim) - 输入首尾空格过滤

- **用法**：

  在表单控件或者组件上创建双向绑定。细节请看下面的教程链接。

- **参考**：

  - [表单控件绑定](https://v3.cn.vuejs.org/guide/forms.html)
  - [组件 - 在输入组件上使用自定义事件](https://v3.cn.vuejs.org/guide/component-custom-events.html#v-model-参数)



## [v-slot](https://v3.cn.vuejs.org/api/directives.html#v-slot)

- **缩写**：`#`

- **预期**：可放置在函数参数位置的 JavaScript 表达式 (在[支持的环境](https://v3.cn.vuejs.org/guide/component-slots.html#解构插槽-prop)下可使用解构)。可选，即只需要在为插槽传入 prop 的时候使用。

- **参数**：插槽名 (可选，默认值是 `default`)

- **限用于**：

  - `<template>`
  - [组件](https://v3.cn.vuejs.org/guide/component-slots.html#独占默认插槽的缩写语法) (对于一个单独的带 prop 的默认插槽)

- **用法**：

  提供具名插槽或需要接收 prop 的插槽。

- **示例**：

  ```html
  <!-- 具名插槽 -->
  <base-layout>
    <template v-slot:header>
      Header content
    </template>
  
    <template v-slot:default>
      Default slot content
    </template>
  
    <template v-slot:footer>
      Footer content
    </template>
  </base-layout>
  
  <!-- 接收 prop 的具名插槽 -->
  <infinite-scroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </infinite-scroll>
  
  <!-- 接收 prop 的默认插槽，使用了解构 -->
  <mouse-position v-slot="{ x, y }">
    Mouse position: {{ x }}, {{ y }}
  </mouse-position>
  ```

  更多细节请查阅以下链接。

- **参考**：

  - [组件 - 插槽](https://v3.cn.vuejs.org/guide/component-slots.html)



## [v-pre](https://v3.cn.vuejs.org/api/directives.html#v-pre)

- **不需要表达式**

- **用法**：

  跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

- **示例**：

  ```html
  <span v-pre>{{ this will not be compiled }}</span>
  ```

  

## [v-cloak](https://v3.cn.vuejs.org/api/directives.html#v-cloak)

- **不需要表达式**

- **用法**：

  这个指令保持在元素上直到关联组件实例结束编译。和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到组件实例准备完毕。

- **示例**：

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```html
  <div v-cloak>
    {{ message }}
  </div>
  ```

  <div> 不会显示，直到编译结束。



## [v-once](https://v3.cn.vuejs.org/api/directives.html#v-once)

- **不需要表达式**

- **详细**：

  只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

  ```html
  <!-- 单个元素 -->
  <span v-once>This will never change: {{msg}}</span>
  <!-- 有子元素 -->
  <div v-once>
    <h1>comment</h1>
    <p>{{msg}}</p>
  </div>
  <!-- 组件 -->
  <my-component v-once :comment="msg"></my-component>
  <!-- `v-for` 指令 -->
  <ul>
    <li v-for="i in list" v-once>{{i}}</li>
  </ul>
  ```

  自 3.2 开始，你还可以通过 [`v-memo`](https://v3.cn.vuejs.org/api/directives.html#v-memo) 来记住带有失效条件的部分模板。

- **参考**：

  - [数据绑定语法- 插值](https://v3.cn.vuejs.org/guide/template-syntax.html#文本)
  - [v-memo](https://v3.cn.vuejs.org/api/directives.html#v-memo)



## [v-memo 3.2+](https://v3.cn.vuejs.org/api/directives.html#v-memo)

- **预期**：`Array`

- **用法**：

  记住一个模板的子树。元素和组件上都可以使用。该指令接收一个固定长度的数组作为依赖值进行记忆比对。如果数组中的每个值都和上次渲染的时候相同，则整个该子树的更新会被跳过。例如：

  ```html
  <div v-memo="[valueA, valueB]">
    ...
  </div>
  ```

  当组件重新渲染的时候，如果 `valueA` 与 `valueB` 都维持不变，那么对这个 `<div>` 以及它的所有子节点的更新都将被跳过。事实上，即使是虚拟 DOM 的 VNode 创建也将被跳过，因为子树的记忆副本可以被重用。

  正确地声明记忆数组是很重要的，否则某些事实上需要被应用的更新也可能会被跳过。带有空依赖数组的 `v-memo` (`v-memo="[]"`) 在功能上等效于 `v-once`。

  **结合 `v-for` 使用**

  `v-memo` 仅供性能敏感场景的针对性优化，会用到的场景应该很少。渲染 `v-for` 长列表 (长度大于 1000) 可能是它最有用的场景：

  ```html
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
    <p>...more child nodes</p>
  </div>
  ```

  当组件的 `selected` 状态发生变化时，即使绝大多数 item 都没有发生任何变化，大量的 VNode 仍将被创建。此处使用的 `v-memo` 本质上代表着“仅在 item 从未选中变为选中时更新它，反之亦然”。这允许每个未受影响的 item 重用之前的 VNode，并完全跳过差异比较。注意，我们不需要把 `item.id` 包含在记忆依赖数组里面，因为 Vue 可以自动从 item 的 `:key` 中把它推断出来。

  WARNING

  在 `v-for` 中使用 `v-memo` 时，确保它们被用在了同一个元素上。 **`v-memo` 在 `v-for` 内部是无效的。**

  `v-memo` 也可以用于组件，在子组件的更新检查未进行优化的某些极端场景下，手动防止不必要的更新。但是，重申一遍，开发者有责任指定正确的依赖数组，以避免必要的更新被跳过。

- **参考:**

  - [v-once](https://v3.cn.vuejs.org/api/directives.html#v-once)



# [特殊 attribute](https://v3.cn.vuejs.org/api/special-attributes.html#特殊-attribute)

## [key](https://v3.cn.vuejs.org/api/special-attributes.html#key)

- **预期：**`number | string | symbol`

  `key` 特殊 attribute 主要用做 Vue 的虚拟 DOM 算法的提示，以在比对新旧节点组时辨识 VNodes。如果不使用 key，Vue 会使用一种算法来最小化元素的移动并且尽可能尝试就地修改/复用相同类型元素。而使用 key 时，它会基于 key 的顺序变化重新排列元素，并且那些使用了已经不存在的 key 的元素将会被移除/销毁。

  有相同父元素的子元素必须有**唯一的 key**。重复的 key 会造成渲染错误。

  最常见的用例是和 `v-for` 一起使用：

  ```html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  它也可以用于强制替换元素/组件而不是重复使用它。当你遇到如下场景时它可能会很有用：

  - 完整地触发组件的生命周期钩子
  - 触发过渡

  例如：

  ```html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  当 `text` 发生改变时，`<span>` 总是会被替换而不是被修改，因此会触发过渡。



## [ref](https://v3.cn.vuejs.org/api/special-attributes.html#ref)

- **预期：**`string | Function`

  `ref` 被用来给元素或子组件注册引用信息。引用信息将会被注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的就是那个 DOM 元素；如果用在子组件上，引用就指向组件实例：

  ```html
  <!-- vm.$refs.p 会是 DOM 节点 -->
  <p ref="p">hello</p>
  
  <!-- vm.$refs.child 会是子组件实例 -->
  <child-component ref="child"></child-component>
  
  <!-- 当动态绑定时，我们可以将 ref 定义为回调函数，显式地传递元素或组件实例 -->
  <child-component :ref="(el) => child = el"></child-component>
  ```

  关于 ref 注册时机的重要说明：因为 ref 本身是作为渲染函数的结果而创建的，在初始渲染时你不能访问它们——它们还不存在！`$refs` 也是非响应式的，因此你不应该试图用它在模板中做数据绑定。

- **参考**[子组件 Refs](https://v3.cn.vuejs.org/guide/component-template-refs.html)



## [is](https://v3.cn.vuejs.org/api/special-attributes.html#is)

- **预期：**`string | Object (component’s options object)`

  使用[动态组件](https://v3.cn.vuejs.org/guide/component-dynamic-async.html)。

  例如：

  ```html
  <!-- 当 currentView 改变时组件就改变 -->
  <component :is="currentView"></component>
  ```

- **在原生元素上使用** 3.1+

  当 `is` attribute 被用在一个原生 HTML 元素上时，它会被作为一个[自定义的内置元素](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example)进行转译，这是一个原生 web platform 的特性。

  不过，如[解析 DOM 模板时的注意事项](https://v3.cn.vuejs.org/guide/component-basics.html#解析-dom-模板时的注意事项)里解释的，有的时候你可能需要 Vue 将一个原生元素替换为一个 Vue 组件。这时你可以把 `is` attribute 的值加上 `vue:` 前缀，这样 Vue 就会将这些元素换为 Vue 组件进行渲染：

  ```html
  <table>
    <tr is="vue:my-row-component"></tr>
  </table>
  ```

- **参考**

- [动态组件](https://v3.cn.vuejs.org/guide/component-dynamic-async.html)

- [RFC explaining the change from Vue 2](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0027-custom-elements-interop.md#customized-built-in-elements)



# [内置组件](https://v3.cn.vuejs.org/api/built-in-components.html#内置组件)

内置组件可以直接在模板中使用，而不需注册。

`<keep-alive>`、`<transition>`、`<transition-group>` 和 `<teleport>` 组件都可以被打包工具 tree-shake。所以它们只会在被使用的时候被引入。如果你需要直接访问它们，也可以将它们显性导入。

```js
// Vue 的 CDN 构建版本
const { KeepAlive, Teleport, Transition, TransitionGroup } = Vue
```

```js
// Vue 的 ESM 构建版本
import { KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'
```

`<component>` 和 `<slot>` 是模板语法中组件形式的特性。它们不是真正的组件且无法像上述组件那样被导入。



## [component](https://v3.cn.vuejs.org/api/built-in-components.html#component)

- **Props：**

  - `is` - `string | Component | VNode`

- **用法：**

  渲染一个“元组件”为动态组件。依 `is` 的值，来决定哪个组件被渲染。`is` 的值是一个字符串，它既可以是 HTML 标签名称也可以是组件名称。

  ```html
  <!--  动态组件由 vm 实例的 `componentId` property 控制 -->
  <component :is="componentId"></component>
  
  <!-- 也能够渲染注册过的组件或 prop 传入的组件-->
  <component :is="$options.components.child"></component>
  
  <!-- 可以通过字符串引用组件 -->
  <component :is="condition ? 'FooComponent' : 'BarComponent'"></component>
  
  <!-- 可以用来渲染原生 HTML 元素 -->
  <component :is="href ? 'a' : 'span'"></component>
  ```

- **结合内置组件的用法：**

  内置组件 `KeepAlive`、`Transition`、`TransitionGroup` 和 `Teleport` 都可以被传递给 `is`，但是如果你想要通过名字传入它们，就必须注册。例如：

  ```js
  const { Transition, TransitionGroup } = Vue
  const Component = {
    components: {
      Transition,
      TransitionGroup
    },
    template: `
      <component :is="isGroup ? 'TransitionGroup' : 'Transition'">
        ...
      </component>
    `
  }
  ```

  如果你传递组件本身到 `is` 而不是其名字，则不需要注册。

- **结合 VNode 的用法**

  在高阶使用场景中，通过模板来渲染现有的 VNode 有时候会是很有用的。通过 `<component>` 可以实现这种场景，但它应该被视为一种回退策略，用来避免将整个模板改写为 `render` 函数。

  ```html
  <component :is="vnode" :key="aSuitableKey" />
  ```

  以这种方式混用 VNode 与模板的注意事项是你需要提供一个合适的 `key` attribute。VNode 将被认为是静态的，所以除非 `key` 发生变化，任何更新都将被忽略。`key` 可以设置在 VNode 或者 `<component>` 标签上，但无论哪种方式，你都需要在想要 VNode 重新渲染时更改它。如果这些节点具有不同的类型，比如将 `span` 更改为 `div`，那么此注意事项将不适用。

- **参考：**[动态组件](https://v3.cn.vuejs.org/guide/component-dynamic-async.html)



## [transition](https://v3.cn.vuejs.org/api/built-in-components.html#transition)

- **Props：**

  - `name` - `string` 用于自动生成 CSS 过渡类名。例如：`name: 'fade'` 将自动拓展为 `.fade-enter`，`.fade-enter-active` 等。
  - `appear` - `boolean`，是否在初始渲染时使用过渡。默认为 `false`。
  - `persisted` - `boolean`。如果是 true，表示这是一个不真实插入/删除元素的转换，而是切换显示/隐藏状态。过渡钩子被注入，但渲染器将跳过。相反，自定义指令可以通过调用注入的钩子 (例如 `v-show`) 来控制转换。
  - `css` - `boolean`。是否使用 CSS 过渡类。默认为 `true`。如果设置为 `false`，将只通过组件事件触发注册的 JavaScript 钩子。
  - `type` - `string`。指定过渡事件类型，侦听过渡何时结束。有效值为 `"transition"` 和 `"animation"`。默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。
  - `mode` - `string` 控制离开/进入过渡的时间序列。有效的模式有 `"out-in"` 和 `"in-out"`；默认同时进行。
  - `duration` - `number | { enter: number, leave: number }`。指定过渡的持续时间。默认情况下，Vue 会等待过渡所在根元素的第一个 `transitionend` 或 `animationend` 事件。
  - `enter-from-class` - `string`
  - `leave-from-class` - `string`
  - `appear-class` - `string`
  - `enter-to-class` - `string`
  - `leave-to-class` - `string`
  - `appear-to-class` - `string`
  - `enter-active-class` - `string`
  - `leave-active-class` - `string`
  - `appear-active-class` - `string`

- **事件：**

  - `before-enter`
  - `before-leave`
  - `enter`
  - `leave`
  - `appear`
  - `after-enter`
  - `after-leave`
  - `after-appear`
  - `enter-cancelled`
  - `leave-cancelled` (仅 `v-show`)
  - `appear-cancelled`

- **用法：**

  `<transition>` 元素作为**单个**元素/组件的过渡效果。`<transition>` 只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在可被检查的组件层级中。

  ```html
  <!-- 单个元素 -->
  <transition>
    <div v-if="ok">toggled content</div>
  </transition>
  
  <!-- 动态组件 -->
  <transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </transition>
  
  <!-- 事件钩子 -->
  <div id="transition-demo">
    <transition @after-enter="transitionComplete">
      <div v-show="ok">toggled content</div>
    </transition>
  </div>
  ```

  ```js
  const app = createApp({
    ...
    methods: {
      transitionComplete (el) {
        // 因为传递了'el'的DOM元素作为参数
      }
    }
    ...
  })
  
  app.mount('#transition-demo')
  ```

- **参考：** [进入 & 离开过渡](https://v3.cn.vuejs.org/guide/transitions-enterleave.html#单元素-组件的过渡)

## [transition-group](https://v3.cn.vuejs.org/api/built-in-components.html#transition-group)

- **Props：**

  - `tag` - `string` - 如果未定义，则不渲染动画元素。
  - `move-class` - 覆盖移动过渡期间应用的 CSS 类。
  - 除了 `mode` - 其他 attribute 和 `<transition>` 相同。

- **事件：**

  - 事件和 `<transition>` 相同。

- **用法：**

  `<transition-group>` 提供了**多个**元素/组件的过渡效果。默认情况下，它不会渲染一个 DOM 元素包裹器，但是可以通过 `tag` attribute 来定义。

  注意，每个 `<transition-group>` 的子节点必须有[**独立的 key**](https://v3.cn.vuejs.org/api/special-attributes.html#key)，动画才能正常工作。

`<transition-group>` 支持通过 CSS transform 过渡移动。当一个子节点被更新，从屏幕上的位置发生变化，它会被应用一个移动中的 CSS 类 (通过 `name` attribute 或配置 `move-class` attribute 自动生成)。如果 CSS `transform` property 是“可过渡” property，当应用移动类时，将会使用 [FLIP 技术](https://aerotwist.com/blog/flip-your-animations/)使元素流畅地到达动画终点。

```html
<transition-group tag="ul" name="slide">
  <li v-for="item in items" :key="item.id">
    {{ item.text }}
  </li>
</transition-group>
```

- **参考：** [列表过渡](https://v3.cn.vuejs.org/guide/transitions-list.html)



## [keep-alive](https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive)

- **Props：**

  - `include` - `string | RegExp | Array`。只有名称匹配的组件会被缓存。
  - `exclude` - `string | RegExp | Array`。任何名称匹配的组件都不会被缓存。
  - `max` - `number | string`。最多可以缓存多少组件实例。

- **用法：**

  `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。

  当组件在 `<keep-alive>` 内被切换时，它的 `mounted` 和 `unmounted` 生命周期钩子不会被调用，取而代之的是 `activated` 和 `deactivated`。(这会运用在 `<keep-alive>` 的直接子节点及其所有子孙节点。)

  主要用于保留组件状态或避免重新渲染。

  ```html
  <!-- 基本 -->
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
  
  <!-- 多个条件判断的子组件 -->
  <keep-alive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </keep-alive>
  
  <!-- 和 `<transition>` 一起使用 -->
  <transition>
    <keep-alive>
      <component :is="view"></component>
    </keep-alive>
  </transition>
  ```

  注意，`<keep-alive>` 是用在其一个直属的子组件被切换的情形。如果你在其中有 `v-for` 则不会工作。如果有上述的多个条件性的子元素，`<keep-alive>` 要求同时只有一个子元素被渲染。

- **`include` 和 `exclude`**

  `include` 和 `exclude` prop 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

  ```html
  <!-- 逗号分隔字符串 -->
  <keep-alive include="a,b">
    <component :is="view"></component>
  </keep-alive>
  
  <!-- regex (使用 `v-bind`) -->
  <keep-alive :include="/a|b/">
    <component :is="view"></component>
  </keep-alive>
  
  <!-- Array (使用 `v-bind`) -->
  <keep-alive :include="['a', 'b']">
    <component :is="view"></component>
  </keep-alive>
  ```

  匹配首先检查组件自身的 `name` 选项，如果 `name` 选项不可用，则匹配它的局部注册名称 (父组件 `components` 选项的键值)。匿名组件不能被匹配。

- **`max`**

  最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。

  ```html
  <keep-alive :max="10">
    <component :is="view"></component>
  </keep-alive>
  ```

  WARNING

  `<keep-alive>` 不会在函数式组件中正常工作，因为它们没有缓存实例。

- **参考：** [动态组件 - keep-alive](https://v3.cn.vuejs.org/guide/component-dynamic-async.html#在动态组件上使用-keep-alive)



## [slot](https://v3.cn.vuejs.org/api/built-in-components.html#slot)

- **Props：**

  - `name` - `string`，用于具名插槽

- **用法：**

  `<slot>` 元素作为组件模板之中的内容分发插槽。`<slot>` 元素自身将被替换。

  详细用法，请参考下面教程的链接。

- **参考：** [通过插槽分发内容](https://v3.cn.vuejs.org/guide/component-basics.html#通过插槽分发内容)



## [teleport](https://v3.cn.vuejs.org/api/built-in-components.html#teleport)

- **Props：**

  - `to` - `string`。需要 prop，必须是有效的查询选择器或 HTMLElement (如果在浏览器环境中使用)。指定将在其中移动 `<teleport>` 内容的目标元素

  ```html
  <!-- 正确 -->
  <teleport to="#some-id" />
  <teleport to=".some-class" />
  <teleport to="[data-teleport]" />
  
  <!-- 错误 -->
  <teleport to="h1" />
  <teleport to="some-string" />
  ```

  - `disabled` - `boolean`。此可选属性可用于禁用 `<teleport>` 的功能，这意味着其插槽内容将不会移动到任何位置，而是在你在周围父组件中指定了 `<teleport>` 的位置渲染。

  ```html
  <teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </teleport>
  ```

  请注意，这将移动实际的 DOM 节点，而不是被销毁和重新创建，并且它还将保持任何组件实例的活动状态。所有有状态的 HTML 元素 (即播放的视频) 都将保持其状态。

- **参考：** [Teleport 组件](https://v3.cn.vuejs.org/guide/teleport.html#teleport)



# 响应性API

## [响应性基础 API](https://v3.cn.vuejs.org/api/basic-reactivity.html#响应性基础-api)

> 本节例子中代码使用[单文件组件](https://v3.cn.vuejs.org/guide/single-file-component.html)语法

### [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive)

返回对象的响应式副本

```js
const obj = reactive({ count: 0 })
```

响应式转换是“深层”的——它影响所有嵌套 property。在基于 [ES2015 Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 的实现中，返回的 proxy 是**不**等于原始对象的。建议只使用响应式 proxy，避免依赖原始对象。

**类型声明：**

```ts
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

提示

`reactive` 将解包所有深层的 [refs](https://v3.cn.vuejs.org/api/refs-api.html#ref)，同时维持 ref 的响应性。

```ts
const count = ref(1)
const obj = reactive({ count })

// ref 会被解包
console.log(obj.count === count.value) // true

// 它会更新 `obj.count`
count.value++
console.log(count.value) // 2
console.log(obj.count) // 2

// 它也会更新 `count` ref
obj.count++
console.log(obj.count) // 3
console.log(count.value) // 3
```

重要

当将 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref) 分配给 `reactive` property 时，ref 将被自动解包。

```ts
const count = ref(1)
const obj = reactive({})

obj.count = count

console.log(obj.count) // 1
console.log(obj.count === count.value) // true
```



### [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly)

接受一个对象 (响应式或纯对象) 或 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref) 并返回原始对象的只读代理。只读代理是深层的：任何被访问的嵌套 property 也是只读的。

```js
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 用于响应性追踪
  console.log(copy.count)
})

// 变更 original 会触发依赖于副本的侦听器
original.count++

// 变更副本将失败并导致警告
copy.count++ // 警告!
```

与 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 一样，如果任何 property 使用了 `ref`，当它通过代理访问时，则被自动解包：

```js
const raw = {
  count: ref(123)
}

const copy = readonly(raw)

console.log(raw.count.value) // 123
console.log(copy.count) // 123
```



### [`isProxy`](https://v3.cn.vuejs.org/api/basic-reactivity.html#isproxy)

检查对象是否是由 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 或 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 创建的 proxy。

### [`isReactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#isreactive)

检查对象是否是由 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 创建的响应式代理。

```js
import { reactive, isReactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      name: 'John'
    })
    console.log(isReactive(state)) // -> true
  }
}
```

如果该代理是 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 创建的，但包裹了由 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 创建的另一个代理，它也会返回 `true`。

```js
import { reactive, isReactive, readonly } from 'vue'
export default {
  setup() {
    const state = reactive({
      name: 'John'
    })
    // 从普通对象创建的只读 proxy
    const plain = readonly({
      name: 'Mary'
    })
    console.log(isReactive(plain)) // -> false

    // 从响应式 proxy 创建的只读 proxy
    const stateCopy = readonly(state)
    console.log(isReactive(stateCopy)) // -> true
  }
}
```



### [`isReadonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#isreadonly)

检查对象是否是由 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 创建的只读代理。

### [`toRaw`](https://v3.cn.vuejs.org/api/basic-reactivity.html#toraw)

返回 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 或 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 代理的原始对象。这是一个“逃生舱”，可用于临时读取数据而无需承担代理访问/跟踪的开销，也可用于写入数据而避免触发更改。**不**建议保留对原始对象的持久引用。请谨慎使用。

```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```



### [`markRaw`](https://v3.cn.vuejs.org/api/basic-reactivity.html#markraw)

标记一个对象，使其永远不会转换为 proxy。返回对象本身。

```js
const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// 嵌套在其他响应式对象中时也可以使用
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false
```

重要

`markRaw` 和下方的 shallowXXX API 使你可以有选择地退出默认的深度响应式/只读转换模式，并将原始的，未被代理的对象嵌入状态图中。它们可以根据情况灵活运用：

- 有些值不应该是响应式的，例如复杂的第三方类实例或 Vue 组件对象。
- 当渲染具有不可变数据源的大列表时，跳过 proxy 转换可以提高性能。

这些例子是进阶的运用，因为原始选择退出仅在根级别，因此，如果将嵌套在内的、未标记的原始对象添加进响应式对象，然后再次访问该响应式对象，就会得到原始对象被代理后的版本。这可能会导致**同一性风险**——即执行一个依赖于对象本身的操作，但同时使用同一对象的原始版本和被代理后的版本：

```js
const foo = markRaw({
  nested: {}
})

const bar = reactive({
  // 虽然 `foo` 被标记为原始，但 foo.nested 不是。
  nested: foo.nested
})

console.log(foo.nested === bar.nested) // false
```

同一性风险通常很少见。然而，为了正确地使用这些 API，同时安全地避免同一性风险，就需要对响应性系统的工作原理有一个充分的理解。



### [`shallowReactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#shallowreactive)

创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (暴露原始值)。

```js
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 改变 state 本身的性质是响应式的
state.foo++
// ...但是不转换嵌套对象
isReactive(state.nested) // false
state.nested.bar++ // 非响应式
```

与 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 不同，任何使用 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref) 的 property 都**不会**被代理自动解包。



### [`shallowReadonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#shallowreadonly)

创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值)。

```js
const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 改变 state 本身的 property 将失败
state.foo++
// ...但适用于嵌套对象
isReadonly(state.nested) // false
state.nested.bar++ // 适用
```

与 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 不同，任何使用 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref) 的 property 都**不会**被代理自动解包。



## [Refs](https://v3.cn.vuejs.org/api/refs-api.html#refs)

> 本节例子中的示例代码使用[单文件组件](https://v3.cn.vuejs.org/guide/single-file-component.html)语法

### [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)

接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 `.value` property，指向该内部值。

**示例：**

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

如果将对象分配为 ref 值，则它将被 [reactive](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 函数处理为深层的响应式对象。

**类型声明：**

```ts
interface Ref<T> {
  value: T
}

function ref<T>(value: T): Ref<T>
```

有时我们可能需要为 ref 的内部值指定复杂类型。可以在调用 `ref` 时传递一个泛型参数以覆盖默认推断，从而简洁地做到这一点：

```ts
const foo = ref<string | number>('foo') // foo 的类型：Ref<string | number>

foo.value = 123 // ok!
```

如果泛型的类型未知，则建议将 `ref` 转换为 `Ref<T>`：

```ts
function useState<State extends string>(initial: State) {
  const state = ref(initial) as Ref<State> // state.value -> State extends string
  return state
}
```



### [`unref`](https://v3.cn.vuejs.org/api/refs-api.html#unref)

如果参数是一个 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 的语法糖函数。

```ts
function useFoo(x: number | Ref<number>) {
  const unwrapped = unref(x) // unwrapped 现在一定是数字类型
}
```



### [`toRef`](https://v3.cn.vuejs.org/api/refs-api.html#toref)

可以用来为源响应式对象上的某个 property 新创建一个 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

当你要将 prop 的 ref 传递给复合函数时，`toRef` 很有用：

```js
export default {
  setup(props) {
    useSomeFeature(toRef(props, 'foo'))
  }
}
```

即使源 property 不存在，`toRef` 也会返回一个可用的 ref。这使得它在使用可选 prop 时特别有用，可选 prop 并不会被 [`toRefs`](https://v3.cn.vuejs.org/api/refs-api.html#torefs) 处理。



### [`toRefs`](https://v3.cn.vuejs.org/api/refs-api.html#torefs)

将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)。

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型:

{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// ref 和原始 property 已经“链接”起来了
state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```

当从组合式函数返回响应式对象时，`toRefs` 非常有用，这样消费组件就可以在不丢失响应性的情况下对返回的对象进行解构/展开：

```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // 操作 state 的逻辑

  // 返回时转换为ref
  return toRefs(state)
}

export default {
  setup() {
    // 可以在不失去响应性的情况下解构
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}
```

`toRefs` 只会为源对象中包含的 property 生成 ref。如果要为特定的 property 创建 ref，则应当使用 [`toRef`](https://v3.cn.vuejs.org/api/refs-api.html#toref)



### [`isRef`](https://v3.cn.vuejs.org/api/refs-api.html#isref)

检查值是否为一个 ref 对象。



### [`customRef`](https://v3.cn.vuejs.org/api/refs-api.html#customref)

创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 `track` 和 `trigger` 函数作为参数，并且应该返回一个带有 `get` 和 `set` 的对象。

- 使用自定义 ref 通过 `v-model` 实现 debounce 的示例：

  ```html
  <input v-model="text" />
  ```

  ```js
  function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }
  
  export default {
    setup() {
      return {
        text: useDebouncedRef('hello')
      }
    }
  }
  ```

**类型声明**：

```ts
function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

type CustomRefFactory<T> = (
  track: () => void,
  trigger: () => void
) => {
  get: () => T
  set: (value: T) => void
}
```



### [`shallowRef`](https://v3.cn.vuejs.org/api/refs-api.html#shallowref)

创建一个跟踪自身 `.value` 变化的 ref，但不会使其值也变成响应式的。

```js
const foo = shallowRef({})
// 改变 ref 的值是响应式的
foo.value = {}
// 但是这个值不会被转换。
isReactive(foo.value) // false
```

**参考**：[创建独立的响应式值作为 `refs`](https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html#创建独立的响应式值作为-refs)



### [`triggerRef`](https://v3.cn.vuejs.org/api/refs-api.html#triggerref)

手动执行与 [`shallowRef`](https://v3.cn.vuejs.org/api/refs-api.html#shallowref) 关联的任何作用 (effect)。

```js
const shallow = shallowRef({
  greet: 'Hello, world'
})

// 第一次运行时记录一次 "Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet)
})

// 这不会触发作用 (effect)，因为 ref 是浅层的
shallow.value.greet = 'Hello, universe'

// 记录 "Hello, universe"
triggerRef(shallow)
```



**参考**[计算和侦听 - watchEffect](https://v3.cn.vuejs.org/api/computed-watch-api.html#watcheffect)



## [Computed 与 watch](https://v3.cn.vuejs.org/api/computed-watch-api.html#computed-与-watch)

> 本节例子中的代码使用[单文件组件](https://v3.cn.vuejs.org/guide/single-file-component.html)语法

### [`computed`](https://v3.cn.vuejs.org/api/computed-watch-api.html#computed)

接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref) 对象。

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // 错误
```

或者，接受一个具有 `get` 和 `set` 函数的对象，用来创建可写的 ref 对象。

```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```

**类型声明：**

```ts
// 只读的
function computed<T>(
  getter: () => T,
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: () => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>
interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}
interface DebuggerEvent {
  effect: ReactiveEffect
  target: any
  type: OperationTypes
  key: string | symbol | undefined
}
```



### [`watchEffect`](https://v3.cn.vuejs.org/api/computed-watch-api.html#watcheffect)

立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

**类型声明：**

```ts
function watchEffect(
  effect: (onInvalidate: InvalidateCbRegistrator) => void,
  options?: WatchEffectOptions
): StopHandle

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

interface DebuggerEvent {
  effect: ReactiveEffect
  target: any
  type: OperationTypes
  key: string | symbol | undefined
}

type InvalidateCbRegistrator = (invalidate: () => void) => void

type StopHandle = () => void
```

**参考**：[`watchEffect` 指南](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#watcheffect)



### [`watchPostEffect` 3.2+](https://v3.cn.vuejs.org/api/computed-watch-api.html#watchposteffect)

`watchEffect` 的别名，带有 `flush: 'post'` 选项。

### [`watchSyncEffect` 3.2+](https://v3.cn.vuejs.org/api/computed-watch-api.html#watchsynceffect)

`watchEffect` 的别名，带有 `flush: 'sync'` 选项。



### [`watch`](https://v3.cn.vuejs.org/api/computed-watch-api.html#watch)

`watch` API 与选项式 API [this.$watch](https://v3.cn.vuejs.org/api/instance-methods.html#watch) (以及相应的 [watch](https://v3.cn.vuejs.org/api/options-data.html#watch) 选项) 完全等效。`watch` 需要侦听特定的数据源，并在单独的回调函数中执行副作用。默认情况下，它也是惰性的——即回调仅在侦听源发生变化时被调用。

- 与 [watchEffect](https://v3.cn.vuejs.org/api/computed-watch-api.html#watcheffect) 相比，`watch` 允许我们：
  - 惰性地执行副作用；
  - 更具体地说明应触发侦听器重新运行的状态；
  - 访问被侦听状态的先前值和当前值。

#### [侦听单一源](https://v3.cn.vuejs.org/api/computed-watch-api.html#侦听单一源)

侦听器数据源可以是一个具有返回值的 getter 函数，也可以直接是一个 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref)：

```js
// 侦听一个 getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 直接侦听一个 ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```



#### [侦听多个源](https://v3.cn.vuejs.org/api/computed-watch-api.html#侦听多个源)

侦听器还可以使用数组以同时侦听多个源：

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```



#### [与 `watchEffect` 相同的行为](https://v3.cn.vuejs.org/api/computed-watch-api.html#与-watcheffect-相同的行为)

`watch` 与 [`watchEffect`](https://v3.cn.vuejs.org/api/computed-watch-api.html#watcheffect) 在[手动停止侦听](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#停止侦听)、[清除副作用](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#清除副作用) (将 `onInvalidate` 作为第三个参数传递给回调)、[刷新时机](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#副作用刷新时机)和[调试](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#侦听器调试)方面有相同的行为。

**类型声明：**

```ts
// 侦听单一源
function watch<T>(
  source: WatcherSource<T>,
  callback: (
    value: T,
    oldValue: T,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options?: WatchOptions
): StopHandle

// 侦听多个源
function watch<T extends WatcherSource<unknown>[]>(
  sources: T
  callback: (
    values: MapSources<T>,
    oldValues: MapSources<T>,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options? : WatchOptions
): StopHandle

type WatcherSource<T> = Ref<T> | (() => T)

type MapSources<T> = {
  [K in keyof T]: T[K] extends WatcherSource<infer V> ? V : never
}

// 参见 `watchEffect` 共享选项的类型声明
interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // 默认：false
  deep?: boolean
}
```

**参考**：[`watch` 指南](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#watch)



## [Effect 作用域 API3.2+](https://v3.cn.vuejs.org/api/effect-scope.html#effect-作用域-api)

INFO

Effect 作用域是一个高阶的 API，主要服务于库作者。关于其使用细节请咨询相应的 [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md)。

### [`effectScope`](https://v3.cn.vuejs.org/api/effect-scope.html#effectscope)

创建一个 effect 作用域对象，以捕获在其内部创建的响应式 effect (例如计算属性或侦听器)，使得这些 effect 可以一起被处理。

**类型**：

```ts
function effectScope(detached?: boolean): EffectScope

interface EffectScope {
  run<T>(fn: () => T): T | undefined // 如果这个域不活跃则为 undefined
  stop(): void
}
```

**示例**：

```js
const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})

// 处理该作用域内的所有 effect
scope.stop()
```



### [`getCurrentScope`](https://v3.cn.vuejs.org/api/effect-scope.html#getcurrentscope)

如果有，则返回当前活跃的 [effect 作用域](https://v3.cn.vuejs.org/api/effect-scope.html#effectscope)。

**类型**：

```ts
function getCurrentScope(): EffectScope | undefined
```



### [`onScopeDispose`](https://v3.cn.vuejs.org/api/effect-scope.html#onscopedispose)

在当前活跃的 [effect 作用域](https://v3.cn.vuejs.org/api/effect-scope.html#effectscope)上注册一个处理回调。该回调会在相关的 effect 作用域结束之后被调用。

该方法在复用组合式函数时可用作 `onUmounted` 的非组件耦合替代品，因为每个 Vue 组件的 `setup()` 函数也同样在 effect 作用域内被调用。

**类型**：

```ts
function onScopeDispose(fn: () => void): void
```



# [组合式 API](https://v3.cn.vuejs.org/api/composition-api.html#组合式-api)

> 本节例子中代码使用的[单文件组件](https://v3.cn.vuejs.org/guide/single-file-component.html)语法

## [`setup`](https://v3.cn.vuejs.org/api/composition-api.html#setup)

一个组件选项，在组件被创建**之前**，`props` 被解析之后执行。它是组合式 API 的入口。

- **入参：**

  - `{Data} props`
  - `{SetupContext} context`

  与使用选项式 API 时的 `this.$props` 类似，该 `props` 对象将仅包含显性声明的 prop。并且，所有声明了的 prop，不管父组件是否向其传递了，都将出现在 `props` 对象中。其中未被传入的可选的 prop 的值会是 `undefined`。

  如果需要检测一个可选的 prop 是否未被传递，你可以将其默认值设置为一个 Symbol：

  ```js
  const isAbsent = Symbol()
  export default {
    props: {
      foo: { default: isAbsent }
    },
    setup(props) {
      if (props.foo === isAbsent) {
        // foo 没有被传入。
      }
    }
  }
  ```

- **类型声明**：

  ```ts
  interface Data {
    [key: string]: unknown
  }
  
  interface SetupContext {
    attrs: Data
    slots: Slots
    emit: (event: string, ...args: unknown[]) => void
    expose: (exposed?: Record<string, any>) => void
  }
  
  function setup(props: Data, context: SetupContext): Data
  ```

  TIP

  若要对传递给 `setup()` 的参数进行类型推断，你需要使用 [defineComponent](https://v3.cn.vuejs.org/api/global-api.html#definecomponent)。

- **示例：**

  使用模板：

  ```vue-html
  <!-- MyBook.vue -->
  <template>
    <div>{{ readersNumber }} {{ book.title }}</div>
  </template>
  
  <script>
    import { ref, reactive } from 'vue'
  
    export default {
      setup() {
        const readersNumber = ref(0)
        const book = reactive({ title: 'Vue 3 Guide' })
  
        // 暴露给模板
        return {
          readersNumber,
          book
        }
      }
    }
  </script>
  
  ```

  使用渲染函数：

  ```js
  // MyBook.vue
  
  import { h, ref, reactive } from 'vue'
  
  export default {
    setup() {
      const readersNumber = ref(0)
      const book = reactive({ title: 'Vue 3 Guide' })
      // 请注意，我们需要在这里显式地使用 ref 值
      return () => h('div', [readersNumber.value, book.title])
    }
  }
  ```

  如果返回了渲染函数，则不能再返回其他 property。如果需要将 property 暴露给外部访问，比如通过父组件的 `ref`，可以使用 `expose`：

  ```js
  // MyBook.vue
  
  import { h } from 'vue'
  
  export default {
    setup(props, { expose }) {
      const reset = () => {
        // 某些重置逻辑
      }
  
      // expose 只能被调用一次。
      // 如果需要暴露多个 property，则它们
      // 必须全部包含在传递给 expose 的对象中。
      expose({
        reset
      })
  
      return () => h('div')
    }
  }
  ```

- **参考**：[组合式 API `setup`](https://v3.cn.vuejs.org/guide/composition-api-setup.html)



## [生命周期钩子](https://v3.cn.vuejs.org/api/composition-api.html#生命周期钩子)

可以通过直接导入 `onX` 函数来注册生命周期钩子：

```js
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  }
}
```

这些生命周期钩子注册函数只能在 [`setup()`](https://v3.cn.vuejs.org/api/composition-api.html#setup) 期间同步使用，因为它们依赖于内部的全局状态来定位当前活动的实例 (此时正在调用其 `setup()` 的组件实例)。在没有当前活动实例的情况下，调用它们将会出错。

组件实例的上下文也是在生命周期钩子的同步执行期间设置的，因此，在生命周期钩子内同步创建的侦听器和计算属性也会在组件卸载时自动删除。

**选项式 API 的生命周期选项和组合式 API 之间的映射**

- `beforeCreate` -> 使用 `setup()`
- `created` -> 使用 `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeUnmount` -> `onBeforeUnmount`
- `unmounted` -> `onUnmounted`
- `errorCaptured` -> `onErrorCaptured`
- `renderTracked` -> `onRenderTracked`
- `renderTriggered` -> `onRenderTriggered`
- `activated` -> `onActivated`
- `deactivated` -> `onDeactivated`
- **参考**：[组合式 API 生命周期钩子](https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html)



## [Provide / Inject](https://v3.cn.vuejs.org/api/composition-api.html#provide-inject)

`provide` 和 `inject` 启用依赖注入。这两者只能在使用当前活动实例的 [`setup()`](https://v3.cn.vuejs.org/api/composition-api.html#setup) 期间被调用。

- **类型声明**：

  ```ts
  interface InjectionKey<T> extends Symbol {}
  
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  
  // 没有默认值
  function inject<T>(key: InjectionKey<T> | string): T | undefined
  // 有默认值
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T
  // 有工厂函数
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

  Vue 提供了一个 `InjectionKey` 接口，该接口是扩展了 `Symbol` 的泛型类型。它可用于在生产者和消费者之间同步 inject 值的类型：

  ```ts
  import { InjectionKey, provide, inject } from 'vue'
  
  const key: InjectionKey<string> = Symbol()
  
  provide(key, 'foo') // 若提供非字符串值将出错
  
  const foo = inject(key) // foo 的类型: string | undefined
  ```

  如果使用了字符串 key 或非类型化的 symbol，则需要显式声明 inject 值的类型：

  ```ts
  const foo = inject<string>('foo') // string | undefined
  ```

- **参考**：

  - [Provide / Inject](https://v3.cn.vuejs.org/guide/component-provide-inject.html)
  - [组合式 API Provide / Inject](https://v3.cn.vuejs.org/guide/composition-api-provide-inject.html)



## [`getCurrentInstance`](https://v3.cn.vuejs.org/api/composition-api.html#getcurrentinstance)

`getCurrentInstance` 支持访问内部组件实例。

WARNING

`getCurrentInstance` 只暴露给高阶使用场景，典型的比如在库中。强烈反对在应用的代码中使用 `getCurrentInstance`。请**不要**把它当作在组合式 API 中获取 `this` 的替代方案来使用。

```ts
import { getCurrentInstance } from 'vue'

const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance()

    internalInstance.appContext.config.globalProperties // 访问 globalProperties
  }
}
```

`getCurrentInstance` **只能**在 [setup](https://v3.cn.vuejs.org/api/composition-api.html#setup) 或[生命周期钩子](https://v3.cn.vuejs.org/api/composition-api.html#生命周期钩子)中调用。

> 如需在 [setup](https://v3.cn.vuejs.org/api/composition-api.html#setup) 或[生命周期钩子](https://v3.cn.vuejs.org/api/composition-api.html#生命周期钩子)外使用，请先在 `setup` 中调用 `getCurrentInstance()` 获取该实例然后再使用。

```ts
const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance() // 有效

    const id = useComponentId() // 有效

    const handleClick = () => {
      getCurrentInstance() // 无效
      useComponentId() // 无效

      internalInstance // 有效
    }

    onMounted(() => {
      getCurrentInstance() // 有效
    })

    return () =>
      h(
        'button',
        {
          onClick: handleClick
        },
        `uid: ${id}`
      )
  }
}

// 在组合式函数中调用也可以正常执行
function useComponentId() {
  return getCurrentInstance().uid
}
```



