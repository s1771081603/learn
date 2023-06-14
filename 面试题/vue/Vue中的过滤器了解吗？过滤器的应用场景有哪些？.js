/**一、过滤器是什么
 * 过滤器（filter）就是把一些不需要的东西过滤掉
 * 过滤器实质上不改变原始数据，只是对数据进行加工处理后返回过滤后的数据再进行调用处理，我们也可以理解为一个纯函数
 * vue 允许你自定义过滤器，可被用于一些常见的文本格式化
 * PS：Vue3 中已废弃 filter
 * */

/**二、filter如何使用
 * vue 中的过滤器可以用在两个地方：双花括号插值和 v-bind 表达式，过滤器应该被添加在 JavaScript 表达式的尾部，由管道符号指示
 * <!-- 在双花括号中 -->
 * {{ message | capitalize }}
 * <!-- 在 `v-bind` 中 -->
 * <div v-bind:id="rawId | formatId"></div>
 *
 * 定义 filter
 * 在组件的选项中定义本地的过滤器
 * filters: {
 *     capitalize: function(value) {
 *         if(!value) return ''
 *         value = value.toString()
 *         return value.charAt(0).toUpperCase() + value.slice(1)
 *     }
 * }
 *
 * 定义全局过滤器：
 * Vue.filter('capitalize', function(value) {
 *     if(!value) return ''
 *     value = value.toString()
 *     return value.charAt(0).toUpperCase + value.slice(1)
 * })
 * new Vue({
 *     // ...
 * })
 *
 * 注意：当全局过滤器和局部过滤器重名时，会采用局部过滤器
 * 过滤器函数总接收表达式的值（之前的操作链的结果）作为一个参数。在上述例子中，capitalize 过滤器函数将会收到 message 的值作为第一个参数
 * 过滤器可以串联
 * {{ message | filterA | filterB }}
 * 在这个例子中，filterA 被定义为接收单个参数的过滤器函数。表达式 message 的值将作为参数传入到函数中，然后继续调用
 * 同样被定义为接收单个参数的过滤器函数 filterB ，将 filterA 的结果传递到 filterB 中。
 * 过滤器是 JavaScript 函数，因此可以接收参数：
 * {{ message | filterA('arg1', arg2) }}
 * 这里，filterA 被定义为接收三个参数的过滤器函数。
 * 其中 message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数
 * 举个例子：
 * <div id="app">
 *     <p>{{ msg | msgFormat('疯狂','--')}}</p>
 * </div>
 * <script>
 *     // 定义一个 Vue 全局的过滤器，名字叫做  msgFormat
 *     Vue.filter('msgFormat', function(msg, arg, arg2) {
 *         // 字符串的  replace 方法，第一个参数，除了可写一个 字符串之外，还可以定义一个正则
 *         return msg.replace(/单纯/g, arg+arg2)
 *     })
 * </script>
 *
 * 小结：
 *      1.局部过滤器优先局全局过滤器被调用
 *      2.一个表达式可以使用多个过滤器。过滤器之间需要用管道符号 "|" 隔开。其执行顺序从左往右。
 * */

/**三、应用场景
 * 平时开发中，需要用到过滤器的地方很多，比如单位转换、数字打点、文本格式化、时间格式化之类的等
 * */