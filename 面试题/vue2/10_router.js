/**
 * $route和 $router的区别是什么？
 * $route是一个对象，包含了当前路由的信息，如路径、参数、查询字符串等。它是只读的，不能直接修改。
 * $router是Vue Router的实例，提供了编程式导航的方法，如push、replace等。通过 $router 可以实现路由的跳转和导航。
 * 总结：$route 用于获取当前路由信息，$router 用于进行路由导航。
 */

/**
 * router有哪几种导航钩子？
 * 1. 全局前置守卫（beforeEach）：在路由跳转开始时触发，可以用于权限验证、登录检查等。
 * 2. 全局解析守卫（beforeResolve）：在路由跳转开始时触发，且在所有组件内守卫和异步路由组件被解析之后触发。
 * 3. 全局后置钩子（afterEach）：在路由跳转完成后触发，可以用于页面统计、日志记录等。
 * 4. 路由独享守卫（beforeEnter）：在路由配置中定义，只对该路由生效。
 * 5. 组件内守卫（beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave）：在组件内定义，分别在路由进入、更新和离开时触发。
 * 总结：Vue Router 提供了多种导航钩子，开发者可以根据具体需求选择合适的钩子来处理路由导航逻辑。
 */

/**
 *  vue-router 传参的几种方式？
 * 1. 动态路由参数（params）：在路由配置中使用冒号（:）定义动态参数，通过$route.params获取参数值。例如：/user/:id，可以通过this.$route.params.id获取id值。
 * 2. 查询参数（query）：通过在路由路径后添加问号（?）和键值对来传递查询参数，通过$route.query获取参数值。
 *    例如：/search?keyword=vue，可以通过this.$route.query.keyword获取keyword值。
 * 3. 编程式导航传参：使用$router.push或$router.replace方法传递参数，可以通过对象形式传递params或query参数。
 * 4. props传参：在路由配置中使用props选项，将路由参数作为组件的props传递。可以设置为true（将params作为props传递）、对象（静态props）或函数（动态props）。
 * 总结：vue-router 提供了多种传参方式，包括动态路由参数、查询参数、编程式导航传参和props传参，开发者可以根据具体需求选择合适的方式进行参数传递。
 */

/**
 * params和query的区别？
 * 1. 定义方式不同：params是通过在路由路径中使用冒号（:）定义动态参数，而query是通过在URL中使用问号（?）和键值对来传递参数。
 * 2. 获取方式不同：params参数通过$route.params获取，而query参数通过$route.query获取。
 * 3. 必须性不同：params参数通常是必须的，因为它们是路由路径的一部分，而query参数是可选的，可以没有。
 * 4. URL表现形式不同：params参数会直接出现在URL路径中，而query参数会出现在URL的查询字符串中。
 * 5. 适用场景不同：params适用于标识资源的唯一标识符，如用户ID，而query适用于传递过滤、排序等可选参数。
 * 总结：params和query在定义方式、获取方式、必须性、URL表现形式和适用场景上都有所不同，开发者应根据具体需求选择合适的参数传递方式。
 */

/**
 * vue-router响应路由参数的变化？
 * 1. 监听$route对象的变化：在组件中，可以通过监听$route对象的变化来响应路由参数的变化。可以使用watch选项或者计算属性来监听$route对象的变化，从而触发相应的逻辑。
 * 2. 使用beforeRouteUpdate导航守卫：在组件中，可以使用beforeRouteUpdate导航守卫来响应路由参数的变化。该守卫会在路由参数变化时被调用，可以在其中执行相应的逻辑。
 * 3. 使用$route.params和$route.query：在组件中，可以直接访问$route.params和$route.query来获取路由参数的变化，从而进行相应的处理。
 * 4. 使用路由钩子函数：在路由配置中，可以使用路由钩子函数（如beforeEnter）来响应路由参数的变化，从而执行相应的逻辑。
 * 总结：通过监听$route对象的变化、使用导航守卫、直接访问$route.params和$route.query以及使用路由钩子函数，可以有效地响应路由参数的变化。
 */


/**
 * hash模式和history模式的区别？
 * 1. URL结构不同：hash模式的URL中包含#符号，后面跟随路由路径，如http://example.com/#/home；而history模式的URL没有#符号，直接使用路径，如http://example.com/home。
 * 2. 服务器配置不同：hash模式不需要服务器配置，因为#符号后的部分不会被发送到服务器；而history模式需要服务器配置，将所有路由请求重定向到index.html，以便前端路由能够正确处理。
 * 3. 浏览器兼容性不同：hash模式在所有现代浏览器中都能正常工作，而history模式在较老的浏览器中可能不支持，需要使用polyfill来兼容。
 * 4. SEO优化不同：hash模式的URL对搜索引擎不友好，因为#符号后的内容不会被搜索引擎索引；而history模式的URL更符合SEO优化，有利于搜索引擎抓取和排名。
 * 5. 用户体验不同：history模式的URL更简洁和美观，有利于用户记忆和分享；而hash模式的URL相对较长且不美观。
 * 总结：hash模式和history模式在URL结构、服务器配置、浏览器兼容性、SEO优化和用户体验等方面存在显著区别，开发者应根据具体需求选择合适的路由模式。
 */