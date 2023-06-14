/**一、mixin是什么
 * Mixin 是面向对象程序设计语言中的类，提供了方法的实现。其他类可以访问 mixin 类的方法而不必成为其子类。
 * Mixin类通常作为功能模块使用，在需要该功能时“混入”，有利于代码复用又避免了多继承的复杂。
 *
 * Vue 中的 mixin
 * 先来看一下官方定义
 * mixin（混入），提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
 * 本质其实就是一个js对象，它可以包含我们组件中任意功能选项，如data、components、methods 、created、computed等等。
 * 我们只要将共用的功能以对象的方式传入 mixins 选项中，当组件使用 mixins 对象时所有 mixins 对象的选项都将被混入该组件本身的选项中来。
 * 在 Vue 中我们可以局部混入跟全局混入。
 *
 * 局部混入
 * 定义一个mixin对象，有组件options的data、methods属性
 * var myMixin = {
 *   created: function () {
 *     this.hello()
 *   },
 *   methods: {
 *     hello: function () {
 *       console.log('hello from mixin!')
 *     }
 *   }
 * }
 *
 * 组件通过 mixins 属性调用 mixin 对象
 * Vue.component('componentA',{
 *   mixins: [myMixin]
 * })
 * 该组件在使用的时候，混合了 mixin 里面的方法，在自动执行 create 生命钩子，执行 hello 方法。
 *
 * 全局混入
 * 通过 Vue.mixin() 进行全局的混入
 * Vue.mixin({
 *   created: function () {
 *       console.log("全局混入")
 *     }
 * })
 * 使用全局混入需要特别注意，因为它会影响到每一个组件实例（包括第三方组件）。
 * PS：全局混入常用于插件的编写。
 * 注意事项：
 * 当组件存在与 mixin 对象相同的选项的时候，进行递归合并的时候组件的选项会覆盖 mixin 的选项
 * 但是如果相同选项为生命周期钩子的时候，会合并成一个数组，先执行 mixin 的钩子，再执行组件的钩子
 * */

/**二、使用场景
 * 在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立
 * 这时，可以通过 Vue 的 mixin 功能将相同或者相似的代码提出来
 * 举个例子
 * 定义一个modal弹窗组件，内部通过isShowing来控制显示
 * const Modal = {
 *   template: '#modal',
 *   data() {
 *     return {
 *       isShowing: false
 *     }
 *   },
 *   methods: {
 *     toggleShow() {
 *       this.isShowing = !this.isShowing;
 *     }
 *   }
 * }
 * 定义一个tooltip提示框，内部通过isShowing来控制显示
 * const Tooltip = {
 *   template: '#tooltip',
 *   data() {
 *     return {
 *       isShowing: false
 *     }
 *   },
 *   methods: {
 *     toggleShow() {
 *       this.isShowing = !this.isShowing;
 *     }
 *   }
 * }
 * 通过观察上面两个组件，发现两者的逻辑是相同，代码控制显示也是相同的，这时候 mixin 就派上用场了
 *
 * 首先抽出共同代码，编写一个 mixin
 * 两个组件在使用上，只需要引入 mixin
 * const Modal = {
 *   template: '#modal',
 *   mixins: [toggle]
 * };
 *
 * const Tooltip = {
 *   template: '#tooltip',
 *   mixins: [toggle]
 * }
 * 通过上面小小的例子，让我们知道了 Mixin 对于封装一些可复用的功能如此有趣、方便、实用。
 * */