/**一、v-show与v-if的共同点
 * 我们都知道在 vue 中 v-show 与 v-if 的作用效果是相同的（不含v-else），都能控制元素在页面是否显示
 * 在用法上也是相同的
 * <Model v-show="ifShow" />
 * <Model v-if="ifShow"/>
 * 当表达式为 true 的时候都会占据页面的位置，当表达式为 false 的时候都不会占据页面位置。
 * */

/**二、v-show与v-if的区别
 * 控制手段不同
 * 编译过程不同
 * 编译条件不同
 *
 * 控制手段：v-show隐藏则是为该元素添加 css-display：none，dom 元素依旧还在；v-if 显示隐藏是将 dom 元素整个添加或删除。
 * 编译过程：v-if 切换有一个局部编译/卸载的过程，切换过程中合适的销毁和重构内部的事件监听和子组件；v-show只是简单的基于css切换。
 * 编译条件：v-if 是真正的条件渲染，他会确保在切换过程中条件块内的事件监听和子组件适当的被销毁和重建。只有渲染条件为假时，并不做操作。
 *      1.v-show 由 false 变为 true 的时候不会触发组件的生命周期。
 *      2.v-if 由 false 变为 true 的时候，触发组件的 beforeCreate、create、beforeMount、mounted 钩子，
 *      由 true 变为 false 的时候触发组件的 beforeDestory、destoryed 方法。
 * 性能消耗：v-if 有更高的切换消耗；v-show v-show 有更高的初始渲染消耗。
 * */

/**三、v-show与v-if原理分析
 * 具体解析流程大致如下：
 *      1.将模板 template 转为 ast 结构的 js 对象。
 *      2.用 ast 得到的 js 对象拼装 render 和 staticRenderFns 函数。
 *      3.render 和 staticRenderFns 函数被调用后生成虚拟 VNODE 节点，该节点包含创建 DOM 节点所需信息。
 *      4.vm.patch 函数通过虚拟 DOM 算法利用 VNODE 节点创建爱你真实 DOM 节点。
 *
 * v-show 原理：不管初始条件是什么，元素总是会被渲染。
 * v-if 原理：在实现上比 v-show 要复杂的多，因为还有 else else-if 等条件需要处理，返回一个 node 节点，render 函数通过表达式的值来决定是否生成 DOM
 * */

/**四、v-show与v-if的使用场景
 * v-if 与 v-show 都能控制dom元素在页面的显示
 * v-if 相比 v-show 开销更大的（直接操作dom节点增加与删除）
 * 如果需要非常频繁地切换，则使用 v-show 较好
 * 如果在运行时条件很少改变，则使用 v-if 较好
 * */