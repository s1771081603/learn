// Vue实例挂载的过程中发生了什么
/**一、思考
 * 我们都听过知其然不知其所以然这句话
 * 那么不知道大家是否思考过 new Vue() 这个过程中究竟做了哪些事？
 * 过程中是如何完成数据的绑定，又是如何姜树咀渲染到视图的等等。
 * */

/**结论
 * 1.new Vue 的时候调用会调用 _init 方法。
 *      1.定义 $set、 $get 、$delete、$watch 等方法。
 *      2.定义 $on、$off、$emit、$off 等事件。
 *      3.定义 _update、$forceUpdate、$destroy 生命周期。
 * 2.调用 $mount 进行页面的挂载。
 * 3.挂载的时候主要是通过 mountComponent 方法。
 * 4.定义 updateComponent 更新函数。
 * 5.执行 render 生成虚拟 DOM。
 * 6. _update 将虚拟 DOM 生成真实 DOM 结构，并且渲染到页面中。
 */