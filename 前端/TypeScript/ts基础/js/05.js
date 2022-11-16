"use strict";
// 断言 <> 或者 as 强制转换成什么数据类型
function demo04(n) {
    // if (typeof n == 'string') {
    //     console.log(n.length);
    // }
    // console.log((<string>n).length);
    console.log(n.length);
}
demo04('songlisheng');
let str01 = 'songlisheng'; // 转换成只读的字符串
// str01 = 'a'; // error
str01 = 'songlisheng';
let arr02 = ['songlisheng', 26];
// arr02.push(null); // error
arr02.push('cailu');
console.log(arr02);
let arr03 = ['songlisheng', 26], arr04 = ['cailu', 26]; // 转换成只读的数组
console.log(arr03, arr04);
let user02 = {
    name: 'songlisheng',
    age: 26,
    sex: 'male'
}, user03 = {
    name: 'cailu',
    age: 26,
    sex: 'famale'
};
console.log(user02, user03);
function demo05() {
    let str03 = 'songlisheng', fun01 = (a, b) => a + b;
    return [str03, fun01];
}
let [str05, fun05] = demo05();
let [str06, fun06] = demo05();
let [str07, fun07] = demo05();
console.log(fun05(100, 100));
console.log(fun06(100, 100));
console.log(fun07(100, 100));
console.log(fun07(100, 100));
console.log(fun07(100, 100));
