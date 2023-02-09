/**一、什么是双向绑定？
 * 我们首先从单向绑定切入，单向绑定非常简单，就是把 Model 绑定到 View ，当我们用 JavaScript 代码更新 Model 时，
 * View 就会自动更新。双向绑定就很容易联想到了，在单向绑定的基础上，用户更新了 View ，Model 的数据也会自动更新，
 * 这种情况就是双向绑定了。
 * 用户填写表单时，View 的状态就被更新了，如果此时可以自动更新 Model 的状态，那就相当于我们把 Model 和 View 做成双向绑定。
 * */

/**二、双向绑定的原理是什么？
 * 我们都知道 Vue 是数据双向绑定的框架，双向绑定由三个重要部分构成
 *      数据层（Model）：应用的数据及业务逻辑。
 *      视图层（View）：应用的展示效果，各类UI组件。
 *      业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来。
 * 而上面的这个分层的架构方案，可以用一个专业术语进行称呼：MVVM 这里的控制层的核心功能便是“双向数据绑定”。
 * 理解 ViewModel
 * 它的主要职责就是：
 *      数据变化后更新视图
 *      视图变化后更新数据
 * 当然，他还有两个主要部分组成
 *      监听器（Observer）：对所有数据的属性进行监听。
 *      解析器（Compiler）：对每个元素节点的指令进行扫描跟解析，根据指令模板替换数据以及绑定相应的更新函数。
 * */

/**三、实现双向绑定
 * 我们还是以 Vue 为例，先来看看 Vue 中的双向绑定流程是什么
 *      1.new Vue() 首先执行初始化，对 data 执行响应化处理，这个过程发生 Observer 中。
 *      2.同时对模板执行编译，找到其中动态绑定的数据，从 data 中获取并初始化视图，这个过程发生在 Compile 中。
 *      3.同时定义一个更新函数和 Watcher ，将来对应数据变化时 Watcher 会调用更新函数。
 *      4.由于 data 的某个 key 在一个视图中可能出现多次，所以每个 key 都需要一个管家 Dep 来管理多个 Watcher 。
 *      5.将来 data 中数据一旦发生变化，会首先找到对应的 Dep ，通知所有 Watcher 执行更新函数。
 * */
// 实现
// 先来一个构造函数:执行初始化,对 data 执行响应化处理
class Vue{
    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        observe(this.$data);
        proxy(this);
        new Compile(options.el, this);
    }
}
// 对 data 选项执行响应化具体操作
function observe(obj) {
    if (typeof obj !== "object" || obj == null) {
        return;
    }
    new Observer(obj);
}
class Observer {
    constructor(value) {
        this.value = value;
        this.walk(value);
    }
    walk(obj) {
        Object.keys(obj).forEach((key) => {
            defineReactive(obj, key, obj[key]);
        });
    }
}
// 编译Compile
// 对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数
class Compile {
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = document.querySelector(el);  // 获取dom
        if (this.$el) {
            this.compile(this.$el);
        }
    }
    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach((node) => { // 遍历子元素
            if (this.isElement(node)) {   // 判断是否为节点
                console.log("编译元素" + node.nodeName);
            } else if (this.isInterpolation(node)) {
                console.log("编译插值⽂本" + node.textContent);  // 判断是否为插值文本 {{}}
            }
            if (node.childNodes && node.childNodes.length > 0) {  // 判断是否有子元素
                this.compile(node);  // 对子元素进行递归遍历
            }
        });
    }
    isElement(node) {
        return node.nodeType == 1;
    }
    isInterpolation(node) {
        return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
}
// 视图中会用到 data 中某key，这称为依赖。同⼀个 key 可能出现多次，每次都需要收集出来用⼀个 Watcher 来维护它们，
// 此过程称为依赖收集多个 Watcher 需要⼀个 Dep 来管理，需要更新时由 Dep 统⼀通知。
/**实现思路
 * 1.defineReactive 时为每一个 key 创建一个 Dep 实例。
 * 2.初始化视图时读取某个 key ，例如 name1 对应的 Dep 中
 * 3.由于触发 name1 的 getter 方法，便将 watcher1 添加到 name1 对应的 Dep 中
 * 4. 当 name1 更新，setter 触发时，便可通过对应 Dep 通知其管理所有 watcher 更新
 * */
class Watcher {
    constructor(vm, key, updater) {
        this.vm = vm;
        this.key = key;
        this.updaterFn = updater;

        // 创建实例时，把当前实例指定到 Dep.target 静态属性上
        Dep.target = this
        // 读一下 key ，触发 get
        vm[key]
        // 置空
        Dep.target = null
    }
    // 未来执行 dom 更新函数，由 dep 调用的
    update(){
        this.updaterFn.call(this.vm,this.vm[this.key])
    }
}

// 声明 Dep
class Dep {
    constructor() {
        this.deps = [] // 依赖管理
    }
    addDep(dep){
        this.deps.push(dep)
    }
    notify(){
        this.deps.forEach((dep) => dep.update())
    }
}
// 创建 watcher 时触发 getter
class Watcher {
    constructor(vm, key, updateFn) {
        Dep.target = this;
        this.vm[this.key];
        Dep.target = null;
    }
}
// 依赖收集，创建 Dep 实例
function defineReactive(obj, key, val) {
    this.observe(val);
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        get(){
            Dep.target && dep.addDep(Dep.target); // Dep.target 也就是 watcher 实例
            return val
        },
        set(newVal){
            if (newVal === val) return;
            dep.notify(); // 通知 dep 执行
        }
    })
}