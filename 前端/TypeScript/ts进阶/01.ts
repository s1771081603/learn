// typescript 中的函数类型
// 函数在JavaScript中是最重要的编程方式，函数类型也是typescript中最重要的组成部分。
// 函数是有单独的类型Function:语法(形参:类型,形参:类型) => 返回值的类型
// 函数参数的可选类型
let str01: string = 'songlisheng';
str01 = 'cailu';

let fun01: Function = (a: number, b: number) => a * b;
console.log(fun01(1,3));

let fun02: (a: number, b: number) => number = (a, b) => a * b;
console.log(fun02(2,4));

type myfun = (a: number, b: number) => number;

let fun03: myfun = (a, b) => a * b;
console.log(fun03(3,6));

function calc(a: number, b: number, fn: myfun) {
    return fn(a, b)
}
console.log(calc(2,4,(a, b) => a + b));
console.log(calc(2,4,(a, b) => a * b));

let user:{
    name: string,
    age: number,
    fun: (a: number, b: number) => void,
};
user = {
    name: 'songlisheng',
    age: 26,
    fun(a, b){
        console.log(a * b);
    }
}
user.fun(1,2);

const tuple:[string, () => void] = ['songlisheng', () => {}]


// 参数的默认值
const fun04: (a: number, b?: number) => number = (a, b) => {
    return 10
}
const fun05 = (a: number, b?: number): number => {
    return 10
}
console.log(fun04(1,5));
console.log(fun05(1,10));

const fun06 = (a: number = 1, b: number = 2, c: number = 3) => {
    console.log(a);
    console.log(b);
    console.log(c);
}
fun06();
fun06(10);
fun06(10,20);
fun06(10,20,30);
fun06(undefined,undefined,30);


// 函数的剩余参数
const fun07: (...args: any[]) => void = (...args) => console.log(args);
fun07(1,2,3,4,5,'song');

const fun08: (...args: number[]) => void = (...args) => console.log(args);
fun08(1,2,3,4,5);

const fun09: (a: number, b: number, ...args: any[]) => void = (a, b, ...args) => {
    console.log(a);
    console.log(b);
    console.log(args);
};
fun09(1,2,3,4,5);


// 函数的重载
// 为同一个函数提供多个函数类型定义来进行函数重载。
// 多个函数函数名相同，函数的参数类型、顺序、个数不同。
// 注意函数重载与返回值类型无关。
// ts重载的作用，感觉只是多了一个参数校验的功能。也就是说在进行函数调用的时候，会对参数进行检查，只有传入的参数类型、顺序、个数与定义的重载函数参数相同，才能调成功，否则报错。
function add01(a: number, b: number) {
    console.log(a + b)
}
add01(1,3);
function add02(a: string, b: string) {
    console.log(a + ' ' + b)
}
add02('songlisheng', 'cailu');

function add03(a: number | string, b: number | string) {
    if (typeof a == 'number' && typeof b == 'number'){
        console.log(a + b)
    } else if (typeof a == 'string' && typeof b == 'string'){
        console.log(a + ' ' + b)
    } else if (typeof a == 'string' && typeof b == 'number'){
        console.log(a + ' ' + b)
    } else if (typeof a == 'number' && typeof b == 'string'){
        console.log(a + ' ' + b)
    }
}
add03(1, 2);
add03('songlisheng', 'cailu');
add03(1, 'cailu');
add03('songlisheng', 2);

function add04(a: number, b: number): number;
function add04(a: string, b: string): string;
function add04(a: string, b: number): string;
function add04(a: number, b: string): string;
function add04(a: any, b: any): any{
    console.log(a + b)
}
add04(1,2);
add04('songlisheng','cailu');
add04(1,'cailu');
add04('songlisheng',2);
