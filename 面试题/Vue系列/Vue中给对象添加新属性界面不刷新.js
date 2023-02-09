/**一、直接添加属性的问题
 * 我们从一个例子开始
 * 定义一个 p 标签，通过 v-for 指令进行遍历
 * 然后给 botton 标签绑定点击事件，我们逾期点击按钮时。数据新增一个属性，页面也新增一行
 * <p v-for="(value,key) in item" :key="key">
 *     {{ value }}
 * </p>
 * <button @click="addProperty">动态添加新属性</button>
 * */
// 实例化一个 vue 实例，定义 data 属性和 methods 方法
const app = new Vue({
    el:"#app",
    // 箭头函数中，返回键值对的对象应该用()。
    data:()=>({
        item:{
            oldProperty:"旧属性"
        }
    }),
    methods:{
        addProperty(){
            // this.items.newProperty = "新属性";  // 为items添加新属性
            // 新属性添加到应该是item中。上面直接访问items.newProperty前面items没有创建，直接报错
            this.item.newProperty = "新属性";  // 为item添加新属性
            console.log(this.item);  // 输出带有newProperty的item
        }
    }
});
// 点击按钮，发现结果不及预期，数据里面虽然更新了（console 打印出了新属性），但页面并没有更新。

/**二、原理分析
 * 为什么产生上面的情况呢
 * 下面来分析一下
 * vue2 使用过 object.defineProperty 实现数据响应式
 * */
const obj = {}
Object.defineProperty(obj, 'foo', {
    get() {
        console.log(`get foo:${val}`);
        return val
    },
    set(newVal) {
        if (newVal !== val) {
            console.log(`set foo:${ newVal }`);
            val = newVal
        }
    }
})
// 当我们访问 foo 属性或者设置 foo 值的时候都能够触发 setter 与 getter。
obj.foo
obj.foo = 'new'
// 但是我们为 obj 添加新属性的时候，却无法触发事件属性的拦截。
obj.bar  = '新属性'
// 原因是一开始 obj 的 foo 属性被设成了响应式数据，而 bar 是后面新增的属性，并没有通过
// Object.defineProperty 设置成响应式数据

/**三、解决方案
 * Vue 不允许在已经创建的实例上动态添加新的响应式属性，若想实现数据与视图同步更新，可采取下面三种解决方案：
 *      1.Vue.set()
 *      2.Object.assign()
 *      3.$forcecUpdated()
 *
 * Vue.set( target, propertyName/index, value )
 * 参数：
 *      1.{Object | Array} target
 *      2.{string | number} propertyName/index
 *      3.{any} value
 * 返回值：设置的值
 * 通过 Vue.set 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
 * 关于 Vue.set 源码（省略了很多与本节不相关的代码）。
 * 源码位置：src\core\observer\index.js
 * function set (target: Array<any> | Object, key: any, val: any): any {
 *   ...
 *   defineReactive(ob.value, key, val)
 *   ob.dep.notify()
 *   return val
 * }
 * 这里无非再次调用 defineReactive 方法，实现新增属性的响应式。
 * 关于 defineReactive 方法，内部还是通过 Object.defineProperty 实现属性拦截。
 * 大致代码如下：
 * function defineReactive(obj, key, val) {
 *     Object.defineProperty(obj, key, {
 *         get() {
 *             console.log(`get ${key}:${val}`);
 *             return val
 *         },
 *         set(newVal) {
 *             if (newVal !== val) {
 *                 console.log(`set ${key}:${newVal}`);
 *                 val = newVal
 *             }
 *         }
 *     })
 * }
 *
 * Object.assign()
 * 直接使用Object.assign()添加到对象的新属性不会触发更新。
 * 应创建一个新的对象，合并原对象和混入对象的属性。
 * this.someObject = Object.assign( {}, this.someObject, { newProperty1:1,newProperty2:2 ... } )
 *
 * $forceUpdate
 * 如果你发现你自己需要在 Vue 中做一次强制更新，99.9% 的情况，是你在某个地方做错了事。
 * $forceUpdate 迫使 Vue 实例重新渲染。
 * PS：仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。
 * */

/**小结
 *      1.如果为对象添加少量的新属性，可以直接采用 Vue.set()。
 *      2.如果需要为新对象添加大量的新属性，则通过 Object.assign() 创建新对象。
 *      3.如果你实在不知道怎么操作时，可采取 $forceUpdate() 进行强制刷新 (不建议)。
 *      PS：vue3 是用过 proxy 实现数据响应式的，直接动态添加新属性仍可以实现数据响应式。
 * */