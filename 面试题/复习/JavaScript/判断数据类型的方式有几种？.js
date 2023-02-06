/**
 * 判断数据类型的几种方式
 * 前言
 *      一、数据类型有哪些
 *      二、数据类型判断方法
 *          1.typeof
 *          2.instanceof
 *          3.constructor
 *          4.Object.prototype.toString
 *          5.练习
 *          6.应用
 *      三、总结
 */

/**
 * 前言
 *      当我们封装一些工具类方法，需要对参数类型严格判断的时候，
 *      往往会用到类型判断，下面我介绍几种自己使用的类型判断方法
 */

/**
 * 一、数据类型有哪些
 *      在ECMAScript规范中，共定义了7中数据及类型，对于他们的分法也是多种多样，
 *      下面我总结一些简单清晰的分类方法。
 *      1.基本类型（简单类型/值类型/原始类型）：布尔、数值、字符串、undefined、null、symbol（ES6新增）
 *      2.引用类型（复杂类型）：Object
 *          基本包装对象：Boolean、Number、String。
 *          单体内置对象：Array、Function、Date、RegExp
 *          宿主环境对象：浏览器环境-HTMLDocument、Widow；Node环境-global等。
 */

/**
 * 二、数据类型判断方法
 *      1.typeof
 *          typeof返回值 object、number、boolean、undefined、function、string、symbol。
 *      typeof 返回的值都是字符串类型
 *      typeof操作可以判断基本类型的数据，但也存在一些特例，比如typeof nul 返回的是 object，
 *      因为逻辑上，null这个特殊值被认为是一个空对象的引用，表示一个空对象指针，实际上是基础类型。
 */
/**
 * 说一说JavaScript的数据类型以及存储方式
 * JavaScript 一共有八种数据类型
 * 基本数据类型：Undefined、Null、String、Number、Boolean、Symbol、BigInt
 * 引用数据类型：Object（Function、Array、date等）
 * JavaScript不支持创建任何自定义类型的数据，也就是说JavaScript中所有的值都是上面八种之一。
 *
 * 存储方式
 *      基本数据类型：直接存在栈内存中，占据空间小，，大小固定，属于被频繁使用的数据。
 *      引用数据类型：同时存在栈内存与堆内存中，占据空间大，大小不固定。引用数据将指针存在栈中，将值存在堆中。
 *                 当我们把对象值赋值给另外一个变量时，复制的是对象的指针，指向同一块内存地址。
 */

/**
 * null 与 undefined 的异同
 *      相同点：undefined和null都是基本数据类型，这两个基本数据类型分别都只有一个值，就是undefined和null。
 *      不同点：undefined表示未定义，null表示空对象。
 *            typeof null 返回 object，typeof undefined 返回 undefined。
 *            js null == undefined // true
 *               null === undefined // false
 *            其实 null 不是对象，虽然 typeof null 会输出 object，但是这只是js存在的一个BUG。
 *            js最初版本使用32位系统，为了考虑性能使用低位存储变量的类型信息，000开头表示对象，然而 null 表示为全零，所以将它错误的判断为 object。
 *            虽然现在的内部类型判断代码已经改变了，但是这个BUG一直留了下来。
 * */

/**
 * 说说JavaScript中判断数据类型的几种方法
 * typeof
 *      typeof 一般用来判断基本数据类型，除了判断 null 会输出 object，其他的都正确。
 *      typeof 判断引用数据类型，除了判断函数会输出 function ，其他的都输出 object。
 *      对于引用数据类型的判断，使用 typeof 并不准确，所以可以使用 instanceof 来判断引用数据类型
 *
 * instanceof
 *      instanceof 可以准确的判断引用数据类型，它的原理是检测构造函数的 prototype 属性是否存在某个实例对象的原型链上
 *      console.log(6 instanceof Number);                    // false
 *      console.log(true instanceof Boolean);                // false
 *      console.log('SongLiSheng' instanceof String);                // false
 *      console.log([] instanceof Array);                    // true
 *      console.log(function(){} instanceof Function);       // true
 *      console.log({} instanceof Object);
 *
 * constructor
 *      当一个函数被定义时，js引擎会将函数添加 prototype 属性，然后在 prototype 属性上添加一个 constructor 属性，并让其指向该函数。
 *      function F(){}
 *      let f = new F()
 *      f.constructor === F // true
 *      new Number(1).constructor === Number // true
 *      new Function().constructor === Function // true
 *      true.constructor === Boolean //true
 *      ''.constructor === String // true
 *      new Date().constructor === Date // true
 *      [].constructor === Array // true
 *      注意：
 *          null和undefined是无效的对象，所以他们不会有 constructor 属性
 *          函数的 constructor 是不稳定的，主要是因为开发者可以重写 prototype，原有的 constructor 引用会丢失，constructor 会默认为object
 *          function F(){}
 *          F.prototype = {}
 *          let f = new F()
 *          f.constructor === F // false
 *          console.log(f.constructor) //function Object(){...}
 *      为什么会变成 object
 *          因为 prototype 被重新赋值的是一个 {} ,{} 是 new Object 的字面量，因此 new Object() 会将 Object 原型上的 constructor 传递给{}，也就是 Object 本身。
 *          因此，为了规范开发，在重写对象原型时一般都需要重新给 constructor 赋值，以保证对象的实例不被篡改。
 *
 * Object.prototype.toString.call()
 *      toString() 是Object 的原型方法，调用该方法，默认返回当前对象的[[Class]]。这是一个内部属性，其格式为[object ***]，其中***就是对象类型。
 *      对于 Object 对象，直接调用 toString() 就能返回[object Object]。而对于其他对象，则需要通过 call/apply 来调用才能返回正确的类型信息。
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
 * */

/**
 * js数据类型转换
 * 在 JavaScript 中类型转换有三种情况：
 *      转化为数字（调用Number()、parseInt()、parseFloat()）
 *      转换为字符串（调用.toString()、String()）
 *      转换为布尔值（调用Boolean()方法）
 *      null、undefined 没有 .toString()方法
 *
 *      转换为数字
 *          Number()：可以把任意值转换成数字，如果要转换的字符串中有不是数字的值，则会返回NaN
 *          Number('1')   // 1
 *          Number(true)  // 1
 *          Number('123s') // NaN
 *          Number({})  //NaN
 *
 *          parseInt(string,radix)：解析一个字符串并返回指定基数的十进制整数，radix 是2-36之间的整数，表示被解析字符串的基数。
 *          parseInt('2') //2
 *          parseInt('2',10) // 2
 *          parseInt('2',2)  // NaN
 *          parseInt('a123')  // NaN  如果第一个字符不是数字或者符号就返回NaN
 *          parseInt('123a')  // 123
 *
 *          parseFloat(string)：解析一个参数并返回一个浮点数。
 *          parseFloat('123a') // 123
 *          parseFloat('123a.01') // 123
 *          parseFloat('123.01') // 123.01
 *          parseFloat('123.01.1') // 123.01
 *
 *          隐式转换
 *          let str = '123'
 *          let res = str - 1 // 122
 *
 *          str + 1 // '1231'
 *          + str + 1 // 124
 *
 *      转化成字符串
 *          .toString() 注意：null、undefined 不能调用
 *          Number(123).toString() // 123
 *          [].toString() // ''
 *          true.toString()
 *
 *          String() 都能转
 *          String(123) // '123'
 *          String(true) // 'true'
 *          String([]) // ''
 *          String(null) // 'null'
 *          String(undefined) // 'undefined'
 *          String({})'[object Object]'
 *
 *          隐式转换：当 + 两边有一个是字符串，另一个是其他类型时，会先把其他类型转换成字符串再进行拼接，返回字符串。
 *          let a = 1
 *          a+'' // '1'
 *
 *      转换为布尔值
 *          Boolean()
 *          Boolean('') //false
 *          Boolean(0) //false
 *          Boolean(1) //true
 *          Boolean(null) //false
 *          Boolean(undefined) //false
 *          Boolean(NaN) //false
 *          Boolean({}) //true
 *          Boolean([]) //true
 *
 *          条件语句
 *          let a
 *          if(a) {
 *              //...   //这里a为undefined，会转为false，所以该条件语句内部不会执行
 *          }
 *
 *          隐式转换
 *          let str = '111'
 *          console.log(!!str) // true
 * */

/**
 * {} 和 [] 的valueOf和toString的返回结果？
 *      valueOf：返回指定对象的原始值
 *      | 对象 | 返回值 |
 *      | ------- | ------------------- |
 *      | Array | 返回数组对象本身。 |
 *      | Boolean | 布尔值。 |
 *      | Date | 存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。 |
 *      | Function | 函数本身。 |
 *      | Number | 数字值。 |
 *      | Object | 对象本身。这是默认情况。 |
 *      | String | 字符串值。 |
 *      | | Math 和 Error 对象没有 valueOf 方法。 |
 *
 *      toString：返回一个表示对象的字符串。
 *          默认情况下，toString() 方法被每个 Object 对象继承。
 *          如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。
 *      ({}).valueOf()   //{}
 *      ({}).toString()  //'[object Object]'
 *      [].valueOf()    //[]
 *      [].toString()   //''
 * */