// 断言 <> 或者 as 强制转换成什么数据类型
function demo04(n:number|string) {
    // if (typeof n == 'string') {
    //     console.log(n.length);
    // }
    // console.log((<string>n).length);
    console.log((n as string).length);
    
}
demo04('songlisheng');

let str01 = 'songlisheng' as const; // 转换成只读的字符串
// str01 = 'a'; // error
str01 = 'songlisheng';

let arr02 = ['songlisheng', 26];
// arr02.push(null); // error
arr02.push('cailu');
console.log(arr02);

let arr03 = ['songlisheng', 26] as const,
arr04 = <const> ['cailu', 26]; // 转换成只读的数组
console.log(arr03, arr04);

let user02 = {
    name: 'songlisheng',
    age: 26,
    sex: 'male'
} as const,
user03 = <const> {
    name: 'cailu',
    age: 26,
    sex: 'famale'
};
console.log(user02, user03);

function demo05() {
    let str03:string = 'songlisheng',
    fun01 = (a:number, b:number):number => a + b;

    return [str03,fun01];
}
let [str05, fun05] = demo05() as [string, (a:number, b:number) => number];
let [str06, fun06] = <[string, (a:number, b:number) => number]>demo05();
let [str07, fun07] = demo05();
console.log(fun05(100,100));
console.log(fun06(100,100));
console.log((fun07 as Function)(100,100));
console.log((fun07 as (a:number, b:number) => number)(100,100));
console.log((<(a:number, b:number) => number>fun07)(100,100));
