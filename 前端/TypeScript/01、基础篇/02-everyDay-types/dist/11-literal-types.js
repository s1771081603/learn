"use strict";
let textString = 'songlisheng';
textString = 'cailu';
const constString = 'songlisheng';
// constString = 'cailu';
function printText01(name, alignment) {
    console.log(name, alignment);
}
printText01('songlisheng', 'center');
printText01('cailu', 'left');
function compare(a, b) {
    return a === b ? 0 : a > b ? -1 : 1;
}
function configure(x) {
    console.log(x);
}
configure({
    width: 100
});
configure('auto');
