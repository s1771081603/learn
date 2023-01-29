"use strict";
function printCoord01(pt) {
    console.log("坐标的X值为：" + pt.x);
    console.log("坐标的Y值为：" + pt.y);
}
printCoord01({
    x: 26,
    y: 35
});
function printName01(obj) {
    console.log("第一个人名为：" + obj.first);
    if (obj.last !== undefined) {
        console.log("最后一个人名为：" + obj.last.toUpperCase());
    }
    console.log("最后一个人名为：" + obj.last?.toUpperCase());
}
printName01({
    first: "宋利生",
    last: "蔡露"
});
printName01({
    first: "宋利生"
});
