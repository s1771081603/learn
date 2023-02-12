// JS 篇
/**一、数据类型有几种？
 * 数据类型分为以下两种：
 *      1.基本数据类型：String、Number、Boolean、undefined、null、symbol
 *      2.引用数据类型：Object、Function、Array
 * */

/**二、类型转换机制？
 * 有时候声明变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的，如果运算的烈性与预期不符合，就会触发类型转换机制
 *      1.强制转换（显式转换）
 *      2.自动转换（隐式转换）
 * 显式转换
 *      1.Number() // Number 转换的时候是很严格的，只要有一个字符无法转成数值，整个字符串就会被转为 NaN
 *      2.parseInt() // parseInt 相比 Number，就没那么严格了，parseInt 函数逐个解析字符，遇到不能转换的字符就停下来
 *      3.String() // 可以将任意类型的值转化成字符串
 *      4.Boolean() // 可以将任意类型的值转为布尔值
 * 隐式转换
 *      1.比较运算（==、!=、>、<）、if、while 需要布尔值的地方
 *      2.算术运算（+、-、*、/、%）
 * */

/**三、判断数据类型的方法有哪些？
 *      1.typeof // 一般用来判断基本数据类型，除了 null会输出 Object 其他都正确；判断引用数据类型，除了函数会输出 function 其他的都输出 Object。
 *      2.instanceof // instanceof 可以准确的判断引用数据类型，它的原理是检测构造函数的 prototype 属性是否存在某个实例对象的原型链上
 *      3.constructor // 当一个函数被定义时，js 引擎会将函数添加 prototype 属性，然后在 prototype 属性上添加一个 constructor 属性，并让其指向该函数。
 *      4.Object.prototype.toString.call()
 *      // toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的[[Class]]。
 *      这是一个内部属性，其格式为[object ***]，其中***就是对象类型。
 *      对于 Object 对象，直接调用 toString() 就能返回[object Object]。
 *      而对于其他对象，则需要通过 call/apply 来调用才能返回正确的类型信息。
 *
 * typeof
 *      typeof 一般用来判断基本数据类型，除了判断 null 会输出 object，其他的都正确。
 *      typeof 判断引用数据类型，除了判断函数会输出 function ，其他的都输出 object。
 *      对于引用数据类型的判断，使用 typeof 并不准确，所以可以使用 instanceof 来判断引用数据类型
 *
 * instanceof
 *      instanceof 可以准确的判断引用数据类型，它的原理是检测构造函数的 prototype 属性是否存在某个实例对象的原型链上
 *      console.log(6 instanceof Number);                   // false
 *      console.log(true instanceof Boolean);               // false
 *      console.log('SongLiSheng' instanceof String);       // false
 *      console.log([] instanceof Array);                   // true
 *      console.log(function(){} instanceof Function);      // true
 *      console.log({} instanceof Object);                  // true
 *
 * constructor
 *      当一个函数被定义时，js引擎会将函数添加 prototype 属性，然后在 prototype 属性上添加一个 constructor 属性，并让其指向该函数。
 *      function F(){}
 *      let f = new F()
 *      f.constructor === F // true
 *      new Number(1).constructor === Number // true
 *      new Function().constructor === Function // true
 *      true.constructor === Boolean // true
 *      ''.constructor === String // true
 *      new Date().constructor === Date // true
 *      [].constructor === Array // true
 *      注意：
 *          null和undefined是无效的对象，所以他们不会有 constructor 属性
 *          函数的 constructor 是不稳定的，主要是因为开发者可以重写 prototype，
 *          原有的 constructor 引用会丢失，constructor 会默认为 object。
 *          function F(){}
 *          F.prototype = {}
 *          let f = new F()
 *          f.constructor === F // false
 *          console.log(f.constructor) //function Object(){...}
 *          为什么会变成 object
 *              因为 prototype 被重新赋值的是一个 {} ,{} 是 new Object 的字面量，因此
 *              new Object() 会将 Object 原型上的 constructor 传递给{}，也就是 Object 本身。
 *              因此，为了规范开发，在重写对象原型时一般都需要重新给 constructor 赋值，以保证对象的实例不被篡改。
 *
 * Object.prototype.toString.call()
 *      toString() 是Object 的原型方法，调用该方法，默认返回当前对象的[[Class]]。
 *      这是一个内部属性，其格式为[object ***]，其中***就是对象类型。
 *      对于 Object 对象，直接调用 toString() 就能返回[object Object]。
 *      而对于其他对象，则需要通过 call/apply 来调用才能返回正确的类型信息。
 *      Object.prototype.toString.call('') ;   // [object String]
 *      Object.prototype.toString.call(1) ;    // [object Number]
 *      Object.prototype.toString.call(true) ; // [object Boolean]
 *      Object.prototype.toString.call(Symbol()); //[object Symbol]
 *      Object.prototype.toString.call(undefined) ; // [object Undefined]
 *      Object.prototype.toString.call(null) ; // [object Null]
 *      Object.prototype.toString.call(new Function()) ; // [object Function]
 *      Object.prototype.toString.call(new Date()) ; // [object Date]
 *      Object.prototype.toString.call([]) ; // [object Array]
 *      Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
 *      Object.prototype.toString.call(new Error()) ; // [object Error]
 *      Object.prototype.toString.call(document) ; // [object HTMLDocument]
 *      Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用
 *
 * */

/**四、数组的常用方法有哪些？
 *
 * */