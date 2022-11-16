let info: string | number;
info = 'abc';
info.toUpperCase();
console.log(info);
info = 20;
info.toFixed();
console.log(info);

let demo02: string | null | undefined;
demo02 = 'songlisheng';
console.log(demo01);

function fun(a: string | number, b: number | string):void | number | null | undefined {
    
}

let arr01:(string | number | boolean)[] = ['abd', 1 , false];
arr01.push('songlisheng');
arr01.push(5);
arr01.push(true);
console.log(arr01);

let user01:{name:string} & {age:number};
user01 = {name: 'songlihsneg', age: 26};

let state: 1 | 2 | 3 | 4 | 5;
// state = 6; // error
state = 5;

let sex: 'male' | 'female';
// sex = 'ad'; // error
sex = 'female';

