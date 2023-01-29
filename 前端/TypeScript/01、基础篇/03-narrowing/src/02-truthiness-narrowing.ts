// 真值缩小
// 条件、&&、||、if语句、布尔否定(!)
function printAll02(strs: string | string[] | null) {
    if (strs && typeof strs == 'object') {
        for (const s of strs) { // null 也是一个object
            console.log(s);
        }
    } else if (typeof strs == 'string') {
        console.log(strs);
    } else {
        // ...
    }
}

function printAll03(values: number[] | undefined, factor: number) {
    if (!values) {
        return values
    } else {
        return values.map( x => x * factor)
    }
}
console.log(printAll03([3,4], 5));
