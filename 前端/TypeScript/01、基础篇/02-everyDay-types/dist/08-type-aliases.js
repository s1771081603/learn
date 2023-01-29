"use strict";
function printCoord02(pt) {
    console.log("坐标的X值为：" + pt.x);
    console.log("坐标的Y值为：" + pt.y);
}
printCoord02({
    x: 100,
    y: 200
});
function printId02(id) {
    console.log(id);
}
function sanitizedInput(str) {
    return str.slice(0, 5);
}
console.log(sanitizedInput('songlisheng'));
