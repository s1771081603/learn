let x01 = undefined;
let x02 = null;

let x03: undefined = undefined;
let x04: null = null;

function print01(x: string | null) {
    if (x === null) {
        
    } else {
        console.log("hello," + x.toUpperCase());
    }
}

function print02(x: number | null) {
    // 断言不可能是 null 或者 undefined
    // console.log(x!.toFixed());
    // 如果是 null 或者 undefined 就不执行 后面的方法
    console.log(x?.toFixed());
}