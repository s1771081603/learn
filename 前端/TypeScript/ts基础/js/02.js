"use strict";
function demo01(a, b, c) {
    return a + b;
}
console.log(demo01(1, 2));
console.log(demo01(2, 3, 4));
let fun02 = (n1, n2) => n1 * n2;
console.log(fun02(3, 9));
let nums = [1, 2, 3, 5, 4, 6, 8, 9, 7, 31, 25, 11, 24];
nums.sort((a, b) => a - b);
console.log(nums);
