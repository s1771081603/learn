// 元组，限制数组的长度
let array01: string [] = ['a', 'b', 'c'];
let array02: (string | number) [] = ['a', 'b', 'c', 1, 2, 3];
let array03: [string, string, number] = ['12','12', 12];
let array04: [string, number] [] = [
    ['songlisheng', 26],
    ['cailu', 26]
];

// 枚举 enum
let sex02: 'male' | 'famale';
let state02: 1 | 2 | 3 | 4;
enum sex03 {
    Famale,
    Male,
}
console.log(sex03.Famale);

//  别名 type
type myState = 1 | 2 | 3 | 4 | 5;
let state03: myState;
state03 = 5;

type myvar = string | number | boolean ;
function demo03(a:myvar, b:myvar, c:myvar) {
    
}

let fun03:(a:number, b:number) => number;
type myfun = (a:number, b:number) => number;
let fun04:myfun = (a,b) => a*b ;
fun04(1,2);

