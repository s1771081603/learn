/**一、Keep-alive 是什么
 * keep-alive是vue中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM
 * keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
 * keep-alive可以设置以下props属性：
 *      1.include - 字符串或正则表达式。只有名称匹配的组件会被缓存
 *      2.exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存
 *      3.max - 数字。最多可以缓存多少组件实例
 * 关于keep-alive的基本用法：
 * <keep-alive>
 *   <component :is="view"></component>
 * </keep-alive>
 *
 * 使用 includes 和 exclude：
 * <keep-alive include="a,b">
 *   <component :is="view"></component>
 * </keep-alive>
 * <!-- 正则表达式 (使用 `v-bind`) -->
 * <keep-alive :include="/a|b/">
 *   <component :is="view"></component>
 * </keep-alive>
 * <!-- 数组 (使用 `v-bind`) -->
 * <keep-alive :include="['a', 'b']">
 *   <component :is="view"></component>
 * </keep-alive>
 * 匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)，匿名组件不能被匹配
 * 设置了 keep-alive 缓存的组件，会多出两个生命周期钩子（activated与deactivated）：
 *      1.首次进入组件时：beforeRouteEnter > beforeCreate > created> mounted > activated > ... ... > beforeRouteLeave > deactivated
 *      2.再次进入组件时：beforeRouteEnter >activated > ... ... > beforeRouteLeave > deactivated
 * */

/**二、使用场景
 * 使用原则：当我们在某些场景下不需要让页面重新加载时我们可以使用keepalive
 * 举个栗子:
 * 当我们从首页–>列表页–>商详页–>再返回，这时候列表页应该是需要keep-alive
 * 从首页–>列表页–>商详页–>返回到列表页(需要缓存)–>返回到首页(需要缓存)–>再次进入列表页(不需要缓存)，这时候可以按需来控制页面的keep-alive
 * 在路由中设置keepAlive属性判断是否需要缓存
 * {
 *   path: 'list',
 *   name: 'itemList', // 列表页
 *   component (resolve) {
 *     require(['@/pages/item/list'], resolve)
 *  },
 *  meta: {
 *   keepAlive: true,
 *   title: '列表页'
 *  }
 * }
 * 使用<keep-alive>
 * <div id="app" class='wrapper'>
 *      <keep-alive>
 *         <!-- 需要缓存的视图组件 -->
 *         <router-view v-if="$route.meta.keepAlive"></router-view>
 *      </keep-alive>
 *       <!-- 不需要缓存的视图组件 -->
 *      <router-view v-if="!$route.meta.keepAlive"></router-view>
 * </div>
 * */