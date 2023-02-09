// 前言
/**
 * JavaScript 常被描述为一种 [基于原型的语言]
 *      每个对象都拥有一个[原型对象]，对象以原型为模板,从原型继承属性和方法。
 *      原型对象也可能拥有原型，并从中继承原型方法，一层一层以此类推。这种关系被称为[原型链]
 *      它解释了为何一个对象会拥有定义在其他对象中的属性和方法。
 * */

/**
 * 四句话道破原型与原型链：
 *      1、每个函数(类)天生自带一个属性 prototype属性，属性值是一个对象，里面存储了当前类供实例使用的属性和方法 【显示原型】。
 *      2、在浏览器默认给原型开辟的堆内存中有一个 constructor 属性：存储的是当前类本身（注意：自己开辟的堆内存中默认没有constructor属性，需要自己手动添加）【构造函数】。
 *      3、每个对象都有一个__proto__ 属性，这个属性指向当前实例所属类的原型（不确定所属类，都指向 object.prototype）【隐式原型】。
 *      4、当你视图获取一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 __proto__（也就是它的构造函数的显示原型 prototype）中查找。【原型链】
 * */

/**
 * 构造函数，原型与实例的关系：
 *      每个构造函数（constructor）都有一个原型对象（prototype），
 *      原型对象（prototype）都包含一个指向构造函数（constructor）的指针，
 *      而实例（instance）都包含一个指向原型对象（__proto__)的内部指针。
 * */

/**
 * prototype（显式原型）、__proto__ （隐式原型）与 constructor （构造函数）
 *
 * prototype（显式原型）
 *      每个函数都有一个 prototype 属性
 *      // 构造函数（类）
 *      function Person(name){
 *          this.name = name
 *      }
 *      // new了一个实例 （对象）
 *      var person = new Person('南玖')
 *      console.log(person) // Person { name: '南玖' }
 *      console.log(Person.prototype) // 构造函数（类）的原型 -----> 对象
 *      Person.prototype.age = 18 // 构造函数原型
 *      console.log(person.age) // 18
 *
 *      上面我们把这个函数 Person 的原型打印出来了，它指向的是一个对象，
 *      并且这个对象正是调用该构造函数而创建的实例的原型。
 *
 *      那实例与实例原型之间的关系又是怎样的呢？这里就要提到__proto__属性了
 *
 * __proto__ （隐式原型）
 *      从上面四句话中我们可以知道这是每个 JavaScript 对象（除null）都具有的一个属性，这个属性会指向该对象的原型 **也就是实例原型**。
 *      因为在 JavaScript 中没有类的概念，为了实现类似继承的方式，通过 __proto__ 将对象和原型联系起来组成原型链，得以让对象访问到不属于自己的属性。
 *      那么我们就能够证明实例与实例原型之间的关系
 *      console.log(person.__proto__)  //实例（对象）的原型 ---> 对象
 *      console.log(person.__proto__ === Person.prototype)  // 实例的原型与构造函数的原型相等
 *
 * constructor（构造函数）
 *      原型时没有属性指向实例的，因为一个构造函数可以创建多个实例对象
 *      从前面的四句话中我们知道 【在浏览器默认给原型开辟的堆内存中有一个 constructor 属性】，所以原型也是可以指向构造函数的，这个属性就是【constructor】
 *      console.log(Person.prototype.constructor) // 实例的显式原型的构造函数 ƒ Person(name){this.name = name}
 *      console.log(person.__proto__.constructor) // 实例的隐式原型的构造函数 ƒ Person(name){this.name = name}
 *      console.log(person.__proto__.constructor === Person.prototype.constructor) // true 实例原型的构造函数与类的构造函数相等
 *      console.log(Person === Person.prototype.constructor) // true
 * */

/**
 * 实例对象的__proto__是如何产生的？
 * 我们知道当我们使用 new 操作符时，生成的实例对象就拥有了 __proto__ 属性
 *      function Foo() {}
 *      // 这个函数时Function的实例对象
 *      // function是一个语法糖
 *      // 内部其实调用了new Function()
 *      所以可以说，在 new 的过程中，新对象被添加了 __proto__ 属性并且链接到了构造函数的原型上。
 * */

/**
 * new 的原理
 * 说简单点可以分为四步：
 *      1、新建一个空对象
 *      2、链接原型
 *      3、绑定 this ，执行构造函数
 *      4、返回新对象
 *      function myNew() {
 *          // 1、新建一个空对象
 *          let obj = {}
 *          // 2、获得构造函数
 *          let con = arguments.__proto__.constructor
 *          // 3、链接原型
 *          obj.__proto__ = con.prototype
 *          // 4.绑定 this，执行构造函数
 *          let res = con.apply(obj,arguments)
 *          // 5.返回新对象
 *          return typeof res === 'object' ? res : obj
 *      }
 * */

/**
 * 原型链：由__proto__串起来的链式关系，我们就称它为原型链。
 *
 * 原型链的作用
 * 原型链决定了 JavaScript 中继承的实现方式，当我们访问一个属性时，他的查找机制如下：
 *      访问对象实例属性，有的话直接返回，没有则通过 __proto__ 去它的原型对象上查找
 *      原型对象上能找到的话则返回，找不到继续通过原型对象的 __proto__ 查找
 *      一直往下找，知道找到 Object.prototype，如果能找到则返回，找不到就返回 undefined，
 *          不会再往下找了，因为 Object。prototype.__proto__ 是 null，
 *          说明了 Object 是所有对象的原型链顶层了。
 *
 *      我们可以发现，所有对象都可以通过原型链最终找到 Object.prototype ，
 *      虽然 Object.prototype 也是一个对象，但是这个对象却不是 Object 创造的，
 *      而是引擎自己创建了 Object.prototype 。
 *      所以可以这样说，所有实例都是对象，但是对象不一定都是实例。
 * */

/**
 * 构造函数的 __proto__ 是什么呢？
 *      由上面的原型链的解释，我们应该能够理解构造函数的 __proto__ 的，在 JavaScript
 *      中所有的东西都是对象，那么构造函数肯定也是对象，是对象就有 __proto__。
 *      function Person(){}
 *      console.log(Person.__proto__)
 *      console.log(Function.prototype)
 *      console.log(Person.__proto__ === Function.prototype) // true
 *      这也说明了所有函数都是 Function 的实例
 *
 *      那这么理解的话，Function.__proto__ 同样等于 Function.prototype
 *      Function.__proto__ === Function.prototype // true
 *      难道 Function.__proto__ 也是通过 new Function() 产生的吗？
 *
 *      答案是否定的，这个函数也是引擎自己创建的。
 *      首先引擎创建了 Object。prototype，然后创建了 Function.prototype，并且通过 __proto__ 将两者联系起来。
 *      这里很好地解释了上面的问题，为什么 let fun = Function.prototype.bind() 没有 prototype 属性。
 *      因为 Function.prototype 是引擎创建出来的对象，引擎认为不需要给这个对象添加 prototype 属性。
 */

/**
 * 总结
 * Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
 * Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
 * Function.prototype 和 Object.prototype 是两个特殊的对象，他们由引擎来创建
 * 除了以上两个特殊对象，其他对象都是通过构造器 new 出来的
 * 函数的 prototype 是一个对象，也就是原型
 * 对象的 __proto__ 指向原型， __proto__ 将对象和原型连接起来组成了原型链
 * */