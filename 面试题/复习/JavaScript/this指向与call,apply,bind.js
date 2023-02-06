/**
 * this指向与call、apply、bind
 *      this 问题对于每一个前端同学来说都不陌生，在平时卡覅中也经常碰到，
 *      有时候因为 this 还踩过不少坑，并且 this 问题在面试题中出现的概率也非常搞，
 *      我们一起来了解一下 this 的指向与call、apply、bind。
 */

/**
 * this指向
 *      ES5中的this
 *      在es5中，this一般指向函数调用时所在的执行环境，与函数定义的位置无关。
 *      也就可以理解成this永远指向最后调用它的对象。
 *      
 *      1、在普通函数中this总是指向它的直接调用者，默认情况下指向全局对象（浏览器为window）
 *      2、在严格模式下，没有直接调用者的函数中的this为undefined。
 *      3、call、apply、bind指向的是绑定的对象。
 *      4、对象函数调用，this指向的是绑定的对象。
 *      5、构造函数中的this，指向该构造函数 new 出来的实例对象。
 */
console.log("ES5中的this");
var obj01 = {
    a: function() {
        console.log(this);
        console.log(this.b);
        console.log(this.c);
        console.log(this.a);
    },
    b: 2,
    c: 3
};
var b = obj01.a;
b();
// 结果：window,f(){...},undefined,undefined
obj01.a();
// 结果：{a:..,b:2,c:3},2,3,f(){...}
console.log("ES5中的this");

/**
 * 解析：
 * b()调用，此时b函数所处的执行环境是全局环境，this指向window
 * obj.a()调用，此时a是作为对象方法进行调用，this指向调用对象obj
 */

/**
 * ES6中的this
 *      在ES6中新增了一种箭头函数，箭头函数的this时钟指向它定义时的this，而非执行时！
 *      1.箭头函数没有自己的this，它的this是继承来的，默认指向它定义时所在的对象，即 箭头函数中的this指向外层代码的this。
 *      2.不可当做构造函数，也就是说，不可以用new命令调用。否则会抛出一个错误。
 *      3.箭头函数内没有arguments 对象，可以用 rest 参数代替。
 *      4.不可以使用 yield 命令，因此箭头函数不能用作 generator 函数。
 *      5.箭头函数没有自己的this，所以不能用call，apply，bind这些方法改变this指向。
 */
 console.log("ES6中的this");
 var obj02 = {
    hi: function() {
        console.log(this); // obj02
        return () => {
            console.log(this); // obj02
        }
    },
    sayHi: function() {
        return function() {
            console.log(this); 
            return () => {
                console.log(this);
            }
        }
    },
    say: () => {
        console.log(this);
    }
};
const hi = obj02.hi(); // this -> obj02 对象
hi(); // this -> obj02对象
const sayHi = obj02.sayHi();
const sayHiBack = sayHi(); // this -> window
sayHi(); // this -> window
sayHiBack(); // this -> window
obj02.say(); // this -> window
// 输出结果依次为obj对象，obj对象，window，window，window」
/**
 * 解析：
 *      1.第一个obj02.hi()很好理解，hi为普通函数，this指向调佣它的那个对象，即obj02
 *      2.第二个执行hi()，它其实是上一个执行后返回的函数，并且是箭头函数，箭头函数本身没有this，我们往他的上一级去查找，
 *      我们刚刚得出上一级的this为obj02，所以这里的this也指向obj02。
 *      3.第三个执行obj02.sayhi()这里没有返回this，而是执行普通函数。
 *      4.第四个执行sayHi()，其实执行的是刚刚返回的那个普通函数，这里的this则指向调用它的那个对象，没有则指向window。
 *      5.第五个执行sayHiBack()，指向的是刚刚第四个执行返回的箭头函数，箭头函数我们往上一层找，也是window。
 *      6.第六个执行obj02.say()，这里这个say是一个箭头函数，当前代码块不存在this，只能往上一层找，指向window。
 */

/**
 * call apply bind 的区别
 *      我们都知道 call、apply、bind 都可以用来改变 this 的指向，单这三个函数稍稍有些不同。
 *      1、call与apply唯一的区别就是他们传参方式不同。call从第二个参数来时都是传给函数的，
 *          apply只有两个参数，第二个参数是一个数组，传给函数的参数都写在这个数组里。
 *      2、call与apply改变了函数的this指向后会立即执行，而bind是改变函数的this指向并返回这个函数，不会立即执行。
 *      3、call与apply的返回值是一个函数的执行结果，bind的返回值是改变了this指向的函数拷贝。
 */

/**
 * call()方法使用一个指定 this 值和单独给出的一个或多个参数来调用一个函数。
 * 语法：fun.call(thisArg,arg1[,arg2,arg3...])
 * 解释：call方法用来为一个函数指定this对象，第一个参数是你想要指定的那个对象，后面都是传给该函数的参数，之间用逗号隔开。
 */
 console.log("call");
let person01 = {
    name: "宋利生",
    gender: "男"
}

let speak = function(age,hobbit) {
    console.log(`我叫${ this.name }，性别${ this.gender }，今年${ age }，爱好${ hobbit }，欢迎优秀的你关注。`);
}
speak.call(person01,26,"前端开发") // 我叫宋利生，性别男，今年26，爱好前端开发，欢迎优秀的你关注。

/**
 * apply() 方法使用一个指定 this 值，以及一个以数组(类数组对象)的形式提供的参数。
 * 语法：fun.apply(thisArg,[arg1,arg2,arg3...])
 * apply方法与call方法基本类似，不同的是，两个的参数形式，apply方法传递的是一个有若干参数组成的数组。
 */
 console.log("apply");
speak.apply(person01,[26,"打游戏"]) // 我叫宋利生，性别男，今年26，爱好打游戏，欢迎优秀的你关注。

/**
 * bind
 *      bind方法会创建一个新函数。当这个新函数被调用时，bind()的第一个参数将作为它运行时的this，
 *      之后的一序列参数将会在传递的实参前传入作为它的参数。
 *      语法：fun.bind(thisArg,arg1[,arg2,arg3...])()
 *      bind 方法用来作为方法指定this对象并返回一个新函数，它的参数与call函数一样。
 *      （它本身时不会调用的需要自己手动调用）
 */
speak.bind(person01,26,"旅游")() // 我叫宋利生，性别男，今年26，爱好旅游，欢迎优秀的你关注。
// 注意这里需要自己再调用一次，因为bind置灰返回这个改变了this指向的函数，并不会自己执行。

/**
 * call，apply我们该用哪个?
 *      1.参数数量、顺序确定就用call，不确定就用apply。
 *      2.参数数量少用call，数量多用apply。
 *      3.参数集合已经是一个数组最好用apply。
 */

// bind 的应用场景
// 1.保存参数
// 我们先来看一刀经典面试题
// for (var i = 1; i < 6; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, i*1000);
// }
/**
 * 相信大家都知道这里会打印出五个6，因为在执行settimeout回调函数时，i已经变成了6
 * 那么如何让他打印出1,2,3,4,5呢
 * 当方法有很多，比如闭包、将var改成let是他形成块级作用域。我们也可以用bind来解决。
 */
// for (var i = 1; i < 6; i++) {
//     setTimeout(function(i) {
//         console.log(i);
//     }.bind(null,i), i*1000);
// }

// 2.回调函数this丢失问题
var student = {
  subject:['JS','VUE','REACT'],
  study: function(){
    setTimeout(function(){
      console.log(`我是南玖，我在学习${this.subject.join('、')}`)
    }.bind(this),0)
  }
}
student.study() //我是南玖，我在学习JS、VUE、REACT
// 想一想这里settimeout的回调如果不用bind绑定this，结果会怎样？
// 结果是报错，因为不给settimeout回调函数绑定this的话，那它的this应该指向的是全局window，全局没有subject，调用join会报错

/**
 * 模拟call
 * 思路：
 *      1.根据 call 的规则设置上下文对象，也就是 this 的指向。
 *      2.通过设置 context 的属性，将函数的 this 指向到 context 上。
 *      3.通过隐式绑定执行函数并传递参数。
 *      4.删除临时属性，返回函数执行结果。
 */
 Function.prototype.myCall = function(context){
    // context指的是那个想要借方法的对象，并为它指定默认值，没传就是window   
    var context01 = context || window    
    // 将要借用的那个方法绑定在当前要使用该方法的对象的fn属性上 
    context01.fn = this  
    // 这里的this指向你想要借用的那个方法也就是.myCall前面的调用者(这里的this指的是一个函数)  
    console.log(this)  
    //获取参数，也就是相当于call的参数列表 
    var args = [...arguments].slice(1)    
    // 将参数传给该函数并执行    
    var res = context01.fn(...args)    
    // 删除该方法    
    delete context01.fn    
    // 返回执行结果  
    return res
}
let a = {
    name: '宋利生'
}
function aFun(a,b,c) {
    console.log(`自学${this.name} ${a} ${b} ${c}`);
}
aFun.myCall(a,26,37,38)
/**
 * 模拟apply
 * 思路：与call类似，主要区别是参数的处理
 * 实现原理与call类似，主要是参数不同，apply接受一个参数数组
*/
Function.prototype.myApply = function (context){
    var context = context || window
    context.fn = this
    // 判断第二个参数是否为数组，不为数组需提示用户(报错提示)
    console.log(arguments.length)
    if(arguments.length > 2){
        throw new Error('只能传递两个参数')
    }else if(!(arguments[1] instanceof Array)){
        throw new Error('第二个参数需要是数组类型')
    }
    var res = context.fn(...arguments[1])
    delete context.fn
    return res
}
aFun.myApply(a,[26,27,28])

/**
 * 模拟bind
 */
 Function.prototype.myBind = function(context){
    var context = context || window
    var _this = this
    var args = [...arguments].slice(1)
    //这里返回的是一个函数
    var res = function(){
        return _this.call(context,...args)
    }
    return res
}
aFun.myBind(a,26,27,28)()