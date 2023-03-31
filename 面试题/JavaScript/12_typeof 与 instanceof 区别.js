/** typeof
 * typeof 操作符返回一个字符串，表示未经计算的操作数的类型。
 * typeof 1 // 'number'
 * typeof '1' // 'string'
 * typeof undefined // 'undefined'
 * typeof true // 'boolean'
 * typeof Symbol() // 'symbol'
 * typeof null // 'object'
 * typeof [] // 'object'
 * typeof {} // 'object'
 * typeof console // 'object'
 * typeof console.log // 'function'
 * 从上面例子，前6个都是基础数据类型。虽然 typeof null 为 object，但这只是 JavaScript 存在的一个悠久 Bug，
 * 不代表 null 就是引用数据类型，并且 null 本身也不是对象。
 * 同时，可以发现引用类型数据，用 typeof 来判断的话，除了 function 会被识别出来之外，其余的都输出 object。
 */

/** instanceof
 * instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 */

/** typeof与instanceof都是判断数据类型的方法，区别如下：
 * typeof 会返回一个变量的基本类型，instanceof 返回的是一个布尔值。
 * instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型。
 * 而 typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了 function 类型以外，其他的也无法判断。
 * 
 * 如果需要通用检测数据类型，可以采用Object.prototype.toString，调用该方法，统一返回格式“[object Xxx]” 的字符串。
 *  function getType(obj){
 *      let type  = typeof obj;
 *      if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
 *          return type;
 *      }
 *      // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
 *      return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1'); 
 *  }
 */