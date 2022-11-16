"use strict";
// 元组，限制数组的长度
let array01 = ['a', 'b', 'c'];
let array02 = ['a', 'b', 'c', 1, 2, 3];
let array03 = ['12', '12', 12];
let array04 = [
    ['songlisheng', 26],
    ['cailu', 26]
];
// 枚举 enum
let sex02;
let state02;
var sex03;
(function (sex03) {
    sex03[sex03["Famale"] = 0] = "Famale";
    sex03[sex03["Male"] = 1] = "Male";
})(sex03 || (sex03 = {}));
console.log(sex03.Famale);
let state03;
state03 = 5;
function demo03(a, b, c) {
}
let fun03;
let fun04 = (a, b) => a * b;
fun04(1, 2);
