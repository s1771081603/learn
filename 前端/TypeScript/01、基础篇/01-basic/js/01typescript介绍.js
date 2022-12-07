"use strict";
/**
 * JavaScript 是一门非常优秀的语言，有这广泛的应用
 *  web端、移动端、小程序端、桌面端、服务器端
 * JavaScript 的缺点
 *      使用 var 关键字的作用域问题
 *      数组类型并不是连续的内存空间
 *      JavaScript 没有类型检测机制
 * JavaScript 的升级
 *      从底层到应用层都在慢慢的变好
 *      ES6 的推出，使用 JS 更加现代、更新更安全、更方便。
 *
 * JavaScript 类型的问题
 *  错误出现的越早越好，这是编程开发程序员的共识。
 *      编码时 <- 编译时 <- 运行时 <- 测试时 <- 上线后
 *  JavaScript 代码的安全隐患
 *      function demo(mess){            1. 没有对类型进行效验
 *          console.log(mess.length)    2.没有对是否传参进行效验
 *      }
 *      demo('hello'); // 正常调用
 *      demo(); // 没有参数隐患 error
 *      demo(100); // 类型不对隐患 error
 * */
function demo01(mess) {
    console.log(mess.length);
}
demo01('songlisheng'); // 11
// demo01(); // error 没有提供 mess 参数
demo01(100); // undefined
// demo01(true); // error 无法读取未定义的属性 length
// demo01(undefined); // error 无法读取未定义的属性 length
demo01([1, 2, 3]); // 3
demo01({
    name: 'songlishegn',
    age: 26
}); // undefined
// JavaScript 怎么解决
// 判断数据类型的方法
function dataType(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}
function demo02(mess) {
    if (mess) {
        if (dataType(mess) == 'array' || dataType(mess) == 'string') {
            console.log(mess.length);
        }
    }
    console.log('很抱歉，您输入的参数格式不符合要求！');
}
demo02('songlisheng'); // 11
// demo02(); // 报红是因为没有传入 mess 参数，但是不影响运行。运行结果为：很抱歉，您输入的参数格式不符合要求！
demo02(100); // 很抱歉，您输入的参数格式不符合要求！
demo02(true); // 很抱歉，您输入的参数格式不符合要求！
demo02(undefined); // 很抱歉，您输入的参数格式不符合要求！
demo02([1, 2, 3]); // 3
demo02({
    name: 'songlishegn',
    age: 26
}); // 很抱歉，您输入的参数格式不符合要求！
// TypeScript 怎么解决这类问题
function demo03(mess) {
    console.log(mess.length);
}
demo03('songlisheng'); // 11
// demo03(); // 报错，没有传入 mess 参数，因为限制传入参数为字符串或者数组
// demo03(100); // 报错，传入参数为数字，因为限制传入参数为字符串或者数组
// demo03(true); // 报错，传入参数为boolean，因为限制传入参数为字符串或者数组
// demo03(undefined); // 报错，传入参数为undefined，因为限制传入参数为字符串或者数组
// demo03([1,2,3]); // 3
// demo03({
//     name: 'songlishegn',
//     age: 26
// }); // 报错，传入参数为Object，因为限制传入参数为字符串或者数组
/**
 * 关于 typescript
 *      typescript 是微软2012年10月开发的一个开源的编程语言，当前版本为 4.8.4 。
 *      typescript 是 JavaScript 的超集，扩展了 JavaScript，为它添加了类型支持，来源于JavaScript，归于JavaScript。
 *      typescript 通过 typescript 编译器 或 babel 转译成 JavaScript 代码。
 *      typescript 可以编译出普通、干净、完整的 JavaScript 代码。
 *      可运行任何浏览器，任何操作系统，任何可运行JavaScript的地方。
 *
 * 为什么要用 typescript
 *      现在不会用 typescript 的程序员不是一个合格的前端，前端程序员也要有类型的思维。
 *      1. 静态写入
 *          静态类型化是一种功能，可以在开发人员编写脚本的时候检测错误。查找并修复错误是当今开发团队的迫切需求。
 *          有了这项功能，就会允许开发人员编写更健壮的代码并对其进行维护，以便使得代码质量更好、更清晰。
 *      2.大型的开发项目
 *          有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化。
 *          使用 typescript 来重构变更更容易、更方便。
 *      3.更好的协作
 *          当开发大型项目时，会有许多的开发人员，此时乱码和错误的机会也会增加。类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。
 *          这为开发团队创建了一个更好的编码和调试过程。
 *      4.更强的生产力
 *          干净的 ecmascript6 代码，自动完成和动态输入等因素有助于提高开发人员的工作效率。这些功能也有助于编译器创建优化的代码。
 * */ 
