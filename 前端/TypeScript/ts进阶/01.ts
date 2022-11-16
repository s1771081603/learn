// typescript 中的函数类型
// 函数在JavaScript中是最重要的编程方式，函数类型也是typescript中最重要的组成部分。
// 函数是有单独的类型Function:语法(形参:类型,形参:类型) => 返回值的类型
// 函数参数的可选类型
// 参数的默认值
// 函数的剩余参数
let str01:string = 'songlisheng';
str01 = 'cailu';

let fun01:Function = (a:number,b:number) => a * b;
console.log(fun01(1,3));

let fun02:(a:number,b:number) => number = (a,b) => a * b;
console.log(fun02(2,4));

type myfun = (a:number, b:number) => number;

let fun03:myfun = (a,b) => a*b;
console.log(fun03(3,6));

function calc(a:number, b:number, fn:myfun) {
    return fn(a,b)
}
console.log(calc(2,4,(a,b) => a+b));
