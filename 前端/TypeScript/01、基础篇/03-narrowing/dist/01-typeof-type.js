"use strict";
function printAll01(strs) {
    if (typeof strs == 'object') {
        // for (const s of strs) { // null 也是一个object
        //     console.log(s);
        // }
    }
    else if (typeof strs == 'string') {
        console.log(strs);
    }
    else {
        // ...
    }
}
