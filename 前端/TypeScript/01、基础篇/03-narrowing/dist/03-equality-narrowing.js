"use strict";
function example01(x, y) {
    if (x === y) {
        x.toUpperCase();
        y.toLowerCase();
    }
    else {
        console.log(x, y);
    }
}
function printAll04(strs) {
    if (strs !== null) {
        if (typeof strs == 'object') {
            for (const s of strs) {
                console.log(s);
            }
        }
        else if (typeof strs == 'string') {
            console.log(strs);
        }
        else {
            // ... 
        }
    }
}
function multiplyValue(container, factor) {
    if (container.value != null) {
        console.log(container.value);
        container.value *= factor;
        console.log(factor);
    }
}
multiplyValue({ value: 5 }, 6);
